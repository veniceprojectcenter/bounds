import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

import MarkersActions from '../actions/MarkersActions';

class MarkersMap extends Component {
    constructor() {
    	super();
    	this.state = {data: "asd"};
    }
    handleClick(marker) {

        this.setState({data: JSON.stringify(marker, null, 4)});
        console.log(this.state.data);
    }

    componentDidMount() {
        this.state.map = L.map('map').setView([45.4371300, 12.3326500], 10);
        let mapLink = '<a href="http://www.esri.com/">Esri</a>';
        let wholink = 'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
        L.tileLayer(
            'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '&copy; '+mapLink+', '+wholink,
            maxZoom: 18,
            }).addTo(this.state.map);

        this.drawMarkers(this.props.markers);
    }

    componentWillReceiveProps(nextProps) {
    	this.drawMarkers(nextProps.markers);
    }

    drawMarkers(markers) {
    	let map = this.state.map;
    	let _handle = this.handleClick;
        const _this = this;

    	if(markers && markers.length > 0) {
			markers.forEach(function(e) {
				L.marker(e.coordinates).on('click', function() { _handle.call(_this, e); }).addTo(map);
			});
		}
    }

    render() {
        var styles = {width: '50%', height: 300};
        const { data } = this.state;
        return (
            <div className="ui main container">
                <div id="map"></div>
                <textarea id="data" style={styles} value={data}></textarea>
            </div>
        )
    }
}

MarkersMap.defaultProps = {
    markers: []
};

MarkersMap.propTypes = {
    markers: PropTypes.array,
};

export default MarkersMap;
