import React, { Component, PropTypes } from 'react';
import MarkersActions from '../actions/MarkersActions';
import PolygonsActions from '../actions/PolygonsActions';
import MarkersMap from '../components/MarkersMap';

class DashboardPage extends Component {
    componentDidMount() {
        MarkersActions.fetchMarkers();
    }

    handleRegionSelected(selectedRegion) {
        PolygonsActions.selectRegion(selectedRegion);
    }

    render() {
        let { markers, zoom, mapCenter } = this.props.Markers;

        return (
            <div className="ui raised segment map">               
                <MarkersMap markers={markers} zoom={zoom} mapCenter={mapCenter} onRegionSelect={this.handleRegionSelected.bind(this)} />
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