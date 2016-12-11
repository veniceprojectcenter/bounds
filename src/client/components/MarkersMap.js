import React, { Component, PropTypes } from 'react';
import { hashHistory, Link } from 'react-router';
import ReactDOMServer from 'react-dom/server';

import MarkersActions from '../actions/MarkersActions';
import MarkersStore from '../stores/MarkersStore';

import defaultMarkerImage from '../assets/default-marker.png';
import missingMarkerImage from '../assets/missing-marker.png';
import greenMarkerImage from '../assets/green-marker.png';
import yellowMarkerImage from '../assets/yellow-marker.png';
import redMarkerImage from '../assets/red-marker.png';

import MarkerPopup from './MarkerPopup';
import { OverallCondition } from '../lib/MarkerCondition';
import { visitationStatuses } from '../lib/Enums';

import 'leaflet-draw';
import 'leaflet-draw/src/leaflet.draw.css';

const COLORS = ["#006b7b", "#d5fb00", "#0248ef", "#dba800", "#7485ff", "#00ae57", "#ff52c8", "#24ffdc", "#ae1700",
    "#a4c6ff", "#ff7d34", "#df79ff", "#3e5300", "#d7a8ff", "#caffce", "#00355f", "#ffac8d", "#662b00", "#ffdede"];

const iconOptions = {
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [1, -34],
    shadowSize: [41, 41]
};

const defaultIcon = new L.Icon(Object.assign({}, iconOptions, {iconUrl: defaultMarkerImage}));
const missingIcon = new L.Icon(Object.assign({}, iconOptions, {iconUrl: missingMarkerImage}));
const greenIcon = new L.Icon(Object.assign({}, iconOptions, {iconUrl: greenMarkerImage}));
const yellowIcon = new L.Icon(Object.assign({}, iconOptions, {iconUrl: yellowMarkerImage}));
const redIcon = new L.Icon(Object.assign({}, iconOptions, {iconUrl: redMarkerImage}));


class MarkersMap extends Component {
    constructor() {
        super();
        this.state = {};
    }

    handleClick(marker) {
        MarkersActions.moveMap(this.state.map._zoom, marker.coordinates);
        hashHistory.push('/marker/' + marker._id);
    }

    handlePolygonDrawStarted(e) {
        let i = this.state.drawnItems;
        i.eachLayer((layer) => {
            if(!layer._url) {
                i.removeLayer(layer);
            }
        });
    }

    handlePolygonCreated(e) {
        let { onRegionSelect } = this.props;

        var type = e.layerType,
            layer = e.layer;

        if (type === 'polygon') {
            var points = layer._latlngs;
            var geojson = layer.toGeoJSON();

            if (onRegionSelect) { 
                onRegionSelect(geojson.geometry);
            }
        }

        this.state.drawnItems.addLayer(layer);
    }

    componentDidMount() {
        var _this = this;

        var osmUrl = 'https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZG12b3VsZGplZmYiLCJhIjoiY2l1MzBxMjYzMGlqMzMwandnajM2MjF2bCJ9.GhXYtRS36ehGO941Ro0llA',
            osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            osm = L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib});

        var osmUrl2 = 'https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZG12b3VsZGplZmYiLCJhIjoiY2l1MzBxMjYzMGlqMzMwandnajM2MjF2bCJ9.GhXYtRS36ehGO941Ro0llA',
            osmAttrib2 = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            osm2 = L.tileLayer(osmUrl2, {maxZoom: 18, attribution: osmAttrib2});

        var baseMaps = {
            "Streets": osm,
            "Satellite": osm2
        };

        let center = [45.4371300, 12.3326500];
        if (this.props.mapCenter && this.props.mapCenter.length == 2) {           
            center = this.props.mapCenter;
        }

        var map = L.map('map', {layers: [osm], center: new L.LatLng(center[0], center[1]), zoom: this.props.zoom || 10});
        L.control.layers(baseMaps, null, {collapsed: false}).addTo(map);

        var drawnItems = new L.FeatureGroup();

        this.setState({map: map, drawnItems: drawnItems});

        var drawControl = new L.Control.Draw({
            draw: {
                position: 'topleft',
                polygon: {
                    title: 'Draw a polygon!',
                    allowIntersection: false,
                    drawError: {
                        color: 'red',
                        timeout: 1000
                    },
                    shapeOptions: {
                        color: 'red'
                    },
                    showArea: true
                },
                circle: false,
                marker: false,
                rectangle: false,
                polyline: false
            }
        });

        map.addControl(drawControl);

        map.on('draw:drawstart', this.handlePolygonDrawStarted.bind(this));
        map.on('draw:created', this.handlePolygonCreated.bind(this));

        this.drawMarkers(this.props.markers);
        this.drawBoundaries(this.props.boundaries);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.markers != nextProps.markers || this.props.boundaries.length != nextProps.boundaries.length) {
            this.drawMarkers(nextProps.markers);
            this.drawBoundaries(nextProps.boundaries);
        }
    }

    drawBoundaries(boundaries) {
        let i = 0;
        let mapObjects = [];

        let { map } = this.state;

        if (!map) { return; }
        
        boundaries.forEach((b) => {
            let myStyle = {
                "color": COLORS[i],
                "weight": 5,
                "opacity": 0.9
            };

            let json = L.geoJSON(b, { style: myStyle });
            mapObjects.push(json);

            i += 1;
        });

        let presentBoundariesGroup = L.featureGroup(mapObjects);
        presentBoundariesGroup.addTo(map); 
        if (mapObjects.length > 0) {
            map.fitBounds(presentBoundariesGroup.getBounds());
        }
    }

    drawMarkers(markers) {
        let { map, drawnItems } = this.state;
        let _handle = this.handleClick;
        const _this = this;

        if (!map) { return; }

        map.eachLayer((layer) => {
            if(!layer._url) {
                map.removeLayer(layer);
            }
        });

        if (drawnItems) {
            map.addLayer(drawnItems);
        }

        if(markers && markers.length > 0) {
            let presentMarkers = markers.map((marker) => {
                let icon = _this.getMarkerIcon(marker);
                
                let popupBody = ReactDOMServer.renderToStaticMarkup(
                    <MarkerPopup marker={marker} />
                );

                return L.marker(marker.coordinates, {icon: icon})
                    .bindPopup(popupBody)
                    .bindTooltip("Marker #" + marker.number, {direction: 'top'}); 
            });
            
            let presentMarkersGroup = L.layerGroup(presentMarkers);
            presentMarkersGroup.addTo(map); 
        }
    }

    getMarkerIcon(marker) {
        const condition = OverallCondition(marker);
        let icon = defaultIcon;

        if (!marker.isPresentInBook || marker.visitedStatus == 'missing') {
            icon = missingIcon;
        } else if (condition <= 2.5) {
            icon = greenIcon;
        } else if (condition <= 3.5) {
            icon = yellowIcon;
        } else if (condition <= 5) {
            icon = redIcon;
        }

        return icon;
    }

    render() {
        return (
            <div id="map"></div>
        )
    }
}

MarkersMap.defaultProps = {
    markers: [],
    boundaries: [],
    zoom: null,
    mapCenter: [],
    onRegionSelect: null
};

MarkersMap.propTypes = {
    markers: PropTypes.array,
    boundaries: PropTypes.array,
    zoom: PropTypes.number,
    mapCenter: PropTypes.array,
    onRegionSelect: PropTypes.func
};

export default MarkersMap;
