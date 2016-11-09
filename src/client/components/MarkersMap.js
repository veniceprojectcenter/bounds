import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router';

import MarkersActions from '../actions/MarkersActions';
import MarkersStore from '../stores/MarkersStore';

import _ from 'lodash';

class MarkersMap extends Component {
    constructor() {
        super();
        this.state = {};
    }

    handleClick(marker) {
        MarkersActions.moveMap(this.state.map._zoom, marker.coordinates);
        hashHistory.push('/marker/' + marker._id);
    }

    componentDidMount() {
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

        this.state.map = L.map('map', {layers: [osm], center: new L.LatLng(center[0], center[1]), zoom: this.props.zoom || 10});
        L.control.layers(baseMaps).addTo(this.state.map);

        this.drawMarkers(this.props.markers);
    }

    componentWillReceiveProps(nextProps) {
        this.drawMarkers(nextProps.markers);
    }

    drawMarkers(markers) {
        let { map } = this.state;
        let _handle = this.handleClick;
        const _this = this;

        var greyIcon = new L.Icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
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

        if(markers && markers.length > 0) {
            let groups = {
                "Present": {icon: null, f: (e) => { return e.isPresentInBook; }},
                "Non-present in 90s": {icon: greyIcon, f: (e) => {return !e.isPresentInBook; }}
            };

            if (this.state.markersControl) {
                map.removeControl(this.state.markersControl);
            }

            var overlayMaps = {};

            Object.keys(groups).forEach((key) => {
                let { f, icon } = groups[key];

                let presentMarkers = _.filter(markers, f).map((e) => { 
                    return L.marker(e.coordinates, icon ? {icon: icon} : null)
                        .on('click', _handle.bind(_this, e))
                        .bindTooltip("Marker #" + e.number, {direction: 'top'}); 
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
