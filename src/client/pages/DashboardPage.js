import React, { Component, PropTypes } from 'react';
import MarkersActions from '../actions/MarkersActions';
import PolygonsActions from '../actions/PolygonsActions';
import MarkersMap from '../components/MarkersMap';

import BoundariesSelect from '../components/BoundariesSelect';

import Boundaries from '../boundaries';

class DashboardPage extends Component {
    constructor() {
        super();
        this.state = {
            boundaries: {}
        };
    }

    componentDidMount() {
        MarkersActions.fetchMarkers();
    }

    handleRegionSelected(selectedRegion) {
        PolygonsActions.selectRegion(selectedRegion);
    }

    handleDefaultBoundarySelected(boundary) {
        PolygonsActions.selectRegion(boundary.features[0].geometry);
    }

    handleBoundarySelect(boundary) {
        let newState = this.state.boundaries;
        newState[boundary] = !newState[boundary];
        this.setState({boundaries: newState});
    }

    render() {
        let { markers, zoom, mapCenter } = this.props.Markers;
        let _this = this;

        let showBoundaries = [];
        Object.keys(Boundaries).forEach((group) => {
            Object.keys(Boundaries[group]).forEach((boundary) => {
                if (_this.state.boundaries[boundary]) {
                    showBoundaries.push(Boundaries[group][boundary]);
                }
            });
        })

        return (
            <div className="ui raised segment map-bs">               
                <BoundariesSelect boundaries={Boundaries} onChange={this.handleBoundarySelect.bind(this)} getInfo={this.handleDefaultBoundarySelected.bind(this)} />
                <MarkersMap markers={markers} boundaries={showBoundaries} zoom={zoom} mapCenter={mapCenter} onRegionSelect={this.handleRegionSelected.bind(this)} />
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