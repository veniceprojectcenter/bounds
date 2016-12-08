import React, { Component, PropTypes } from 'react';
import MarkersActions from '../actions/MarkersActions';
import PolygonsActions from '../actions/PolygonsActions';
import MarkersMap from '../components/MarkersMap';

import BoundariesSelect from '../components/BoundariesSelect';

import Boundaries from '../boundaries';
import { Bar } from 'react-chartjs-2';


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
        this.openModal();
    }

    handleDefaultBoundarySelected(boundary) {
        PolygonsActions.selectRegion(boundary.features[0].geometry);
        this.openModal();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.Polygons.regionInfo) {
            //this.openModal();
        }
    }

    openModal() {
        $('.ui.modal').modal('show');
    }

    handleBoundarySelect(boundary) {
        let newState = this.state.boundaries;
        newState[boundary] = !newState[boundary];
        this.setState({boundaries: newState});
    }

    render() {
        let { markers, zoom, mapCenter } = this.props.Markers;
        let { regionInfo } = this.props.Polygons;
        let _this = this;

        let showBoundaries = [];
        Object.keys(Boundaries).forEach((group) => {
            Object.keys(Boundaries[group]).forEach((boundary) => {
                if (_this.state.boundaries[boundary]) {
                    showBoundaries.push(Boundaries[group][boundary]);
                }
            });
        });

        let dataSet = [];
        let labelSet = [];
        let i = 14;

        while (i <= 29) {
            dataSet.push(_.get(regionInfo, 'P' + i));
            labelSet.push((i != 29 ? ((i - 14) * 5) + " - " + ((i - 13) * 5 - 1) : '75+'));
            i += 1;
        }

        const data = {
          labels: labelSet,
          datasets: [
            {
              label: 'Population by age group',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: dataSet
            }
          ]
        };

        let modal = (
            <div className="ui modal">
              <div className="header">Info for selected boundary</div>
              <div className="content">
                <p>Total population: {_.get(regionInfo, 'P1')}</p>
                <p>People with university degree: {_.get(regionInfo, 'P47')}</p>
                <p>People with high-school: {_.get(regionInfo, 'P48')}</p>
                <p>Work force: {_.get(regionInfo, 'P60')}</p>
                <p>Jobs: {_.get(regionInfo, 'ADDETTI')}</p>
                <p>ALTRI_RETRIB: {_.get(regionInfo, 'ALTRI_RETRIB')}</p>
                <p>VOLONTARI: {_.get(regionInfo, 'VOLONTARI')}</p>
                <p>Companies: {_.get(regionInfo, 'NUM_UNITA')}</p>
                <p>Commercial buildings: {_.get(regionInfo, 'E4')}</p>

                <div>
                    <Bar data={data} />
                </div>
              </div>
            </div>
        );

        return (
            <div> 
                { modal }
                <div className="stupid-boundary-select">              
                    <BoundariesSelect boundaries={Boundaries} onChange={this.handleBoundarySelect.bind(this)} getInfo={this.handleDefaultBoundarySelected.bind(this)} />
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
        regionInfo: PropTypes.object
    })
}

export default DashboardPage;