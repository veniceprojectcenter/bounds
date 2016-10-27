import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import Dropzone from 'react-dropzone';

import MarkersActions from '../actions/MarkersActions';
import MarkersStore from '../stores/MarkersStore';

import Select from 'react-select';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

class MarkersMap extends Component {
    constructor() {
    	super();
    	this.state = {changed: false, marker: null};
    }

    handleClick(marker) {
        this.setState({marker: marker});
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(this.showPosition, this.showPosition, {enableHighAccuracy:true, maximumAge: 60000,timeout:60000 });

        this.state.map = L.map('map').setView([45.4371300, 12.3326500], 10);
        let mapLink = '<a href="http://www.esri.com/">Esri</a>';
        let wholink = 'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
        L.tileLayer(
            'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '&copy; '+mapLink+', '+wholink,
            maxZoom: 18,
            }).addTo(this.state.map);

        let lc = L.control.locate().addTo(this.state.map);
        //lc.start();

        this.drawMarkers(this.props.markers);
    }

    componentWillReceiveProps(nextProps) {
    	this.drawMarkers(nextProps.markers);
    }

    drawMarkers(markers) {
    	let map = this.state.map;
    	let _handle = this.handleClick;
        const _this = this;

        var emptyIcon = L.icon({
            iconUrl: 'http://rvap.umbc.edu/wp-content/uploads/2012/03/greendot3.png',
            iconSize: [30, 30],
        });

    	if(markers && markers.length > 0) {
			markers.forEach(e => {
				L.marker(e.coordinates, (e.isPresent ? null : {icon: emptyIcon})).on('click', () => { _handle.call(_this, e); }).addTo(map);
            });
		}
    }

    onDrop(acceptedFiles) {
        const reader  = new FileReader();
        let {marker} = this.state;

        reader.readAsDataURL(acceptedFiles[0]);
        reader.addEventListener("load", () => {
            MarkersActions.saveMarkerImage(marker, reader.result);
        }, false);
    }

    showPosition(position) {
        console.log(position.coords);
    }

    saveMarker() {
        console.log(this);
        MarkersActions.saveMarker(this.state.marker);
        this.setState({changed: false});
    }

    render() {
        const { marker } = this.state;

        let info;
        let transitMap;
        let saveButton;
        let _this = this;

        if (marker) {
            let transit = "Not reachable";
            if (marker.transit && marker.transit.legs && marker.transit.legs.length > 0) {
                let totalWalk = 0;
                let navigation = [];

                marker.transit.legs[0].steps.forEach(step => {
                    navigation.push(<div> 
                        {step.html_instructions} for {step.duration.text}
                        <br />
                    </div>);
                    if (step.travel_mode == 'WALKING') {
                        totalWalk += step.distance.value;
                    }
                });

                transit = (<div>
                    Time <input type="text" value={marker.transit.legs[0].duration.text} /><br />
                    Distance <input type="text" value={marker.transit.legs[0].distance.text} /><br />
                    Total Walk <input type="text" value={totalWalk + 'm'} /><br />
                    {navigation}
                </div>);

                const src = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyCClBh_fUQeZ0XIwKLLmJpfHMsfLOkTGnk&origin=Piazzale Roma, Venice&destination=${marker.address}&mode=transit`;
                transitMap = (
                    <iframe width="300" height="300" frameBorder="0" src={src}> </iframe>
                );
            }

            let distanceFromPrevMaker = "";
            let prevMarker = MarkersStore.getMarkerNumber(marker.number[0] - 1);
            if (prevMarker && prevMarker.driving && prevMarker.driving.legs.length > 0) {
                if (marker.driving && marker.driving.legs.length > 0) {
                    distanceFromPrevMaker = prevMarker.driving.legs[0].distance.value - marker.driving.legs[0].distance.value;
                    distanceFromPrevMaker = (<div><br />Distance from prev marker <span>{Math.abs(distanceFromPrevMaker)}m</span><br /></div>);
                }  
            }

            let images;

            var options = [
                { value: 0, label: '<Pick side>' },
                { value: 1, label: 'North' },
                { value: 2, label: 'East' },
                { value: 3, label: 'South' },
                { value: 4, label: 'West' },
                { value: 5, label: 'Top' },
                { value: 6, label: 'Other' }
            ];

            if (marker.images && marker.images.length > 0) {
                images = marker.images.map((img, i) => {
                    return (
                        <div>
                            <img src={"/uploads/" + img.src} height="100px" />
                            Side: <Select value={img.side} options={options} onChange={(e) => { 
                                let marker = this.state.marker; 
                                marker.images[i].side = e.value; 
                                this.setState({marker: marker, changed: true}); }} />
                        </div>
                    );
                });
            }

            info = (<div className="marker-info">
                <div className="marker-number">Marker #{marker.number[0]}</div>

                <Dropzone onDrop={(e) => {this.onDrop.call(_this, e) }} multiple={false} accept="image/*">
                  <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
               
                {images}


                Is Present <input type="text" value={marker.isPresent} /><br />
                Region <input type="text" value={marker.otherData.localizzaz} /><br />
                <a target="_blank" href={"http://maps.google.com/?daddr=" + marker.coordinates[0] + "," + marker.coordinates[1]}>Navigation</a><br />
                Exact Address <input type="text" value={marker.address} /><br />
                {distanceFromPrevMaker}
                <br/>Transit from Piazzale Roma<br />
                {transit}
            </div>);

            if (this.state.changed) {
                saveButton = <button onClick={this.saveMarker.bind(this)}>Save</button>;
            }
        }

        return (
            <div className="ui main container">
                <div id="map"></div>
                <div id="data">
                    {info}
                    {saveButton}
                    {transitMap}
                </div>
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
