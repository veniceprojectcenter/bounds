import React, { Component, PropTypes } from 'react';
import MarkersActions from '../actions/MarkersActions';
import PolygonsActions from '../actions/PolygonsActions';
import MarkersMap from '../components/MarkersMap';

import MarkersFilter from '../components/MarkersFilter';
import BoundariesSelect from '../components/BoundariesSelect';
import RegionInfo from '../components/RegionInfo';

import Boundaries from '../boundaries';


class DashboardPage extends Component {
    constructor() {
        super();
        this.state = {
            boundaries: {},
            filters: {
                attempted: {
                    value: true,
                    label: 'Visited in 2016',
                    func: (marker) => {
                        return marker.visitedStatus == null;
                    }
                },
                nonAttempted: {
                    value: true,
                    label: 'Not Visited',
                    func: (marker) => {
                        return marker.visitedStatus != null;
                    }
                }
            }
        };
    }

    componentDidMount() {
        MarkersActions.fetchMarkers();
        $('.ui.accordion').accordion('refresh');
    }

    componentDidUpdate() {
        $('.ui.accordion').accordion('refresh');
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

    handleFilterClick(key) {
        let newState = this.state.filters;
        newState[key].value = !newState[key].value;
        this.setState({filters: newState});
    }

    render() {
        let { markers, zoom, mapCenter } = this.props.Markers;
        let { regionInfo, selectedRegion, errorMessage } = this.props.Polygons;
        let { filters } = this.state;
        let _this = this;

        let showBoundaries = [];
        Object.keys(Boundaries).forEach((group) => {
            Object.keys(Boundaries[group]).forEach((boundary) => {
                if (_this.state.boundaries[boundary]) {
                    showBoundaries.push(Boundaries[group][boundary]);
                }
            });
        });

        let filteredMarkers = markers;
        Object.keys(filters).forEach((key) => {
            if (!filters[key].value) {
                filteredMarkers = _.filter(filteredMarkers, filters[key].func);
            }
        });

        return (
            <div> 
                <RegionInfo regionInfo={regionInfo} selectedRegion={selectedRegion} errorMessage={errorMessage} />
                <div className="marker-map-options">     
                    <div className="boundaries-select">
                        <div className="ui styled fluid accordion">    
                            <MarkersFilter 
                                markers={markers} 
                                filters={filters}
                                onPickFilter={this.handleFilterClick.bind(this)} />   
                            <BoundariesSelect 
                                boundaries={Boundaries} 
                                onPickBoundary={this.handleBoundaryClick.bind(this)} 
                                getInfo={this.handleDefaultBoundarySelected.bind(this)} />
                        </div>
                    </div>
                </div>    
                <div className="marker-stupid-map">
                    <MarkersMap 
                        markers={filteredMarkers} 
                        boundaries={showBoundaries} 
                        zoom={zoom} 
                        mapCenter={mapCenter} 
                        onRegionSelect={this.handleRegionSelected.bind(this)} />
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