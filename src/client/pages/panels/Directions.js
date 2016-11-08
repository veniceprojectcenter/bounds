import React, { Component, PropTypes } from 'react';

import MarkersActions from '../../actions/MarkersActions';
import MarkersStore from '../../stores/MarkersStore';

class Directions extends Component {
    constructor() {
        super();
    }

    render() {
        const { marker } = this.props || {};

        let transit = "Not reachable";
        let transitMap;

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
                <iframe width="300" height="300" frameBorder="0" src={src}></iframe>
            );
        }

        let distanceFromPrevMaker = "";
        let prevMarker = MarkersStore.getMarkerNumber(marker.number - 1);
        if (prevMarker && prevMarker.driving && prevMarker.driving.legs.length > 0) {
            if (marker.driving && marker.driving.legs.length > 0) {
                distanceFromPrevMaker = prevMarker.driving.legs[0].distance.value - marker.driving.legs[0].distance.value;
                distanceFromPrevMaker = (<div>Distance from prev marker <span>{Math.abs(distanceFromPrevMaker)}m</span><br /></div>);
            }  
        }

        return (
            <div>
                <h2>More directions</h2>

                { (marker && marker.coordinates) ? (
                            <a target="_blank" href={"http://maps.google.com/?daddr=" + marker.coordinates[0] + "," + marker.coordinates[1]}>Navigation</a>
                            ) : null }

                {distanceFromPrevMaker}
                <br/>Transit from Piazzale Roma<br />
                {transit}

                {transitMap}
            </div>
        );
    }
}

Directions.defaultProps = {
    marker: {}
};

Directions.propTypes = {
    marker: PropTypes.object
};

export default Directions;
