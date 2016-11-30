import React, { Component, PropTypes } from 'react';
import { hashHistory, Link } from 'react-router';
import ReactDOMServer from 'react-dom/server';

import MarkersActions from '../actions/MarkersActions';
import MarkersStore from '../stores/MarkersStore';
import { IMAGES_URL } from '../lib/Constants';
import defaultMarker from '../assets/default-marker.png';
import missingMarker from '../assets/missing-marker.png';

import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';

import _ from 'lodash';

class MarkersMap extends Component {
    constructor() {
        super();
        this.state = {};
    }

    handleClick(marker) {
        console.log('asdas');
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
        var type = e.layerType,
            layer = e.layer;

        if (type === 'polygon') {
            var points = layer._latlngs;
            var geojson = layer.toGeoJSON();

            console.log(geojson);
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
    }

    componentWillReceiveProps(nextProps) {
        this.drawMarkers(nextProps.markers);
    }

    drawMarkers(markers) {
        let { map, drawnItems } = this.state;
        let _handle = this.handleClick;
        const _this = this;

        if (!map) { return; }

        var greyIcon = new L.Icon({
            iconUrl: missingMarker,
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        var defaultIcon = new L.Icon({
            iconUrl: defaultMarker,
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        map.eachLayer((layer) => {
            if(!layer._url) {
                map.removeLayer(layer);
            }
        });

        if (drawnItems) {
            map.addLayer(drawnItems);
        }

        if(markers && markers.length > 0) {
            let groups = {
                "Present": {icon: defaultIcon, f: (e) => { return e.isPresentInBook; }},
                "Non-present in 90s": {icon: greyIcon, f: (e) => {return !e.isPresentInBook; }}
            };

            if (this.state.markersControl) {
                map.removeControl(this.state.markersControl);
            }

            var overlayMaps = {};

            Object.keys(groups).forEach((key) => {
                let { f, icon } = groups[key];

                let presentMarkers = _.filter(markers, f).map((marker) => { 

                    let faceImageDiv;
                    let faceImage = _.filter(marker.images, (image) => { return image.type == 'side-1'; });
                    if (faceImage.length > 0) {
                        faceImageDiv = (
                            <img src={IMAGES_URL + faceImage[0].src} height="100px" />
                        );
                    }

                    let popupBody = ReactDOMServer.renderToStaticMarkup(
                        <div className="marker-popup">
                            Marker #{marker.number}
                            <br />

                            {faceImageDiv}
                            <br />
                            <a href={`#/marker/${marker._id}`}>See more...</a>
                        </div>
                    );

                    return L.marker(marker.coordinates, icon ? {icon: icon} : null)
                        .bindPopup(popupBody)
                        .bindTooltip("Marker #" + marker.number, {direction: 'top'}); 
                });
                
                let presentMarkersGroup = L.layerGroup(presentMarkers);
                overlayMaps[key] = presentMarkersGroup;
                presentMarkersGroup.addTo(map); 
            });

            let markersControl = L.control.layers(null, overlayMaps);
            this.setState({markersControl});

            markersControl.addTo(map);
        }
    }

    render() {
        return (
            <div id="map"></div>
        )
    }
}

MarkersMap.defaultProps = {
    markers: [],
    zoom: null,
    mapCenter: []
};

MarkersMap.propTypes = {
    markers: PropTypes.array,
    zoom: PropTypes.number,
    mapCenter: PropTypes.array
};

export default MarkersMap;
