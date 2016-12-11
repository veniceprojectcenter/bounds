import React, { Component, PropTypes } from 'react';
import MarkersActions from '../actions/MarkersActions';
import PolygonsActions from '../actions/PolygonsActions';
import MarkersMap from '../components/MarkersMap';

import BoundariesSelect from '../components/BoundariesSelect';
import RegionInfo from '../components/RegionInfo';

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

    handleBoundaryClick(boundary) {
        let newState = this.state.boundaries;
        newState[boundary] = !newState[boundary];
        this.setState({boundaries: newState});
    }

    render() {
        let { markers, zoom, mapCenter } = this.props.Markers;
        let { regionInfo, selectedRegion, errorMessage } = this.props.Polygons;
        let _this = this;

        let showBoundaries = [];
        Object.keys(Boundaries).forEach((group) => {
            Object.keys(Boundaries[group]).forEach((boundary) => {
                if (_this.state.boundaries[boundary]) {
                    showBoundaries.push(Boundaries[group][boundary]);
                }
            });
        });

        return (
            <div> 
                <RegionInfo regionInfo={regionInfo} selectedRegion={selectedRegion} errorMessage={errorMessage} />
                <div className="stupid-boundary-select">              
                    <BoundariesSelect boundaries={Boundaries} onChange={this.handleBoundaryClick.bind(this)} getInfo={this.handleDefaultBoundarySelected.bind(this)} />
                </div>    
                <div className="marker-stupid-map">
                    <MarkersMap markers={markers} boundaries={showBoundaries} zoom={zoom} mapCenter={mapCenter} onRegionSelect={this.handleRegionSelected.bind(this)} />
                </div>
            </div>
        );
    }
}

DashboardPage.propTypes = {
    Markers: PropTypes.shape({
        markers: PropTypes.array,
        zoom: PropTypes.number,
        mapCenter: PropTypes.array
    }),
    Polygons: PropTypes.shape({
        regionInfo: PropTypes.object,
        selectedRegion: PropTypes.object,
        errorMessage: PropTypes.string
    })
}

export default DashboardPage;