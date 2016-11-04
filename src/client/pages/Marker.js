import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

import MarkersActions from '../actions/MarkersActions';
import MarkersStore from '../stores/MarkersStore';
import UploadPhoto from '../components/UploadPhoto';

import Select from 'react-select';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

class Marker extends Component {
    constructor(props) {
    	super(props);
    	this.state = {changed: false, marker: props.marker};
    }

    componentWillReceiveProps(newProps) {
        this.state = {changed: false, marker: newProps.marker};
    }

    componentDidMount() {
        MarkersActions.fetchMarkers();

        this.activateSemanticUI();
    }

    componentDidUpdate() {
        this.activateSemanticUI();
    }

    activateSemanticUI() {
        $('.tabular.menu .item').tab();
    }

    handleClick(marker) {
        if (!marker.clockwiseNorthDelta) {
            marker.clockwiseNorthDelta = 0;
        }
        this.setState({marker: marker, changed: false});
    }

    saveMarker() {
        MarkersActions.saveMarker(this.state.marker);
        this.setState({changed: false});
    }

    render() {
        const { marker } = this.state || {};

        let transitMap;
        let saveButton;
        let _this = this;

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
                Time: <span>{marker.transit.legs[0].duration.text}</span><br />
                Distance: <span>{marker.transit.legs[0].distance.text}</span><br />
                Total Walk: <span>{totalWalk + 'm'}</span><br />
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
                distanceFromPrevMaker = (<div>Distance from prev marker <span>{Math.abs(distanceFromPrevMaker)}m</span><br /></div>);
            }  
        }

        let images;

        var options = [
            { value: 0, label: '<Pick type/side>' },
            { value: 'side-1', label: 'Front face side #1' },
            { value: 'side-2', label: 'Side #2' },
            { value: 'side-3', label: 'Side #3' },
            { value: 'side-4', label: 'Side #4' },
            //{ value: 5, label: 'Top' },
            { value: 'surroundings', label: 'Surrounding area' },
            { value: 'approach', label: 'Approach photo' },
            { value: 'old-photo', label: 'Old photo' },
            { value: 'old-map', label: 'Old map' },
            { value: 'other', label: 'Other' }
        ];

        if (marker.images && marker.images.length > 0) {
            images = marker.images.map((img, i) => {
                let url = "http://bounds-imgs.s3-website-us-east-1.amazonaws.com/" + (img && img.src);
                return (
                    <div>
                        <a href={url} target="_blank"><img src={url} height="100px" /></a>
                        Side: <Select value={(img && img.type)} options={options} onChange={(e) => { 
                            let marker = this.state.marker; 
                            marker.images[i].type = e.value; 
                            this.setState({marker: marker, changed: true}); }} />
                    </div>
                );
            });
        }

        if (this.state.changed) {
            saveButton = <div>
                <button onClick={this.saveMarker.bind(this)}>Save</button>
                <br />
                <br />
            </div>;
        }

        return (
            <div className="ui main container">
                <div id="data">
                    <div className="marker-info">
                        <div className="marker-number">Marker #{marker.number[0]} {marker.isPresent ? "" : "(missing)"}</div>
                        <a target="_blank" href={"http://maps.google.com/?daddr=" + marker.coordinates[0] + "," + marker.coordinates[1]}>Navigation</a><br />
                        (also more directions below)<br />

                        {saveButton}

                        <span>Clockwise rotation delta from North:</span> <input type="text" value={marker.clockwiseNorthDelta} onChange={(e) => { 
                            let m = marker;
                            m.clockwiseNorthDelta = e.target.value;
                            console.log(m);
                            _this.setState({marker: m, changed: true}); }} />
                        
                        <br />
                        <br />

                        <div className="ui top attached tabular menu">
                            <div className="item active" data-tab="general">General</div>
                            { [1, 2, 3, 4].map(side => {
                                return (
                                    <div className="item" data-tab={'side-' + side}>Side #{side}</div>
                                );
                            }) }
                            <div className="item" data-tab="photo-settings">Photo Upload & Categorization</div>
                        </div>

                        <div className="ui bottom attached tab segment active" data-tab="general">
                            Is Present: <span>{marker.isPresent ? "yes" : "no"}</span><br />
                            Region: <span>{marker.otherData.localizzaz}</span><br />
                            Exact Address: <span>{marker.address}</span><br />

                            <h2>More directions</h2>

                            {distanceFromPrevMaker}
                            <br/>Transit from Piazzale Roma<br />
                            {transit}

                            {transitMap}
                        </div>

                        { [1, 2, 3, 4].map(side => {
                            return (
                                <div className="ui bottom attached tab segment" data-tab={'side-' + side}>
                                    Side {side}
                                </div>
                            );
                        }) }

                        <div className="ui bottom attached tab segment" data-tab="photo-settings">
                            <UploadPhoto marker={marker} callback={ (e) => { _this.setState({marker: e}); }} />
                            {images}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Marker.defaultProps = {
    marker: {}
};

Marker.propTypes = {
    marker: PropTypes.object
};

export default Marker;
