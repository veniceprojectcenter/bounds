import React, { Component, PropTypes } from 'react';
import MarkersActions from '../actions/MarkersActions';
import MarkersMap from '../components/MarkersMap';

class DashboardPage extends Component {
    componentDidMount() {
        MarkersActions.fetchMarkers();
    }

    render() {
        let { markers, zoom, mapCenter } = this.props.Markers;

        return (
            <div className="ui raised segment map">               
                <MarkersMap markers={markers} zoom={zoom} mapCenter={mapCenter} />
            </div>
        );
    }
}

DashboardPage.propTypes = {
    Markers: PropTypes.shape({
        markers: PropTypes.array,
        zoom: PropTypes.number,
        mapCenter: PropTypes.array
    })
}

export default DashboardPage;