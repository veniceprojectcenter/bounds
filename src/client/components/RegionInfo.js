import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

import PolygonsActions from '../actions/PolygonsActions';

import { Bar } from 'react-chartjs-2';

import 'leaflet-draw';
import 'leaflet-draw/src/leaflet.draw.css';

class RegionInfo extends Component {
    constructor() {
        super();
        this.state = {};
    }

    openModal() {
        $('.ui.modal')
        .modal({
            onHidden: () => {
                PolygonsActions.clearRegion(null);
            }
        })
        //.modal('setting', 'closable', false)
        .modal('observeChanges', true)
        .modal('detachable', false)
        .modal('show');
    }

    componentWillReceiveProps(newProps) {
        if (!this.props.regionInfo && newProps.selectedRegion) {
            this.openModal();
        }

        if (newProps.selectedRegion == null) {
            this.setState({initMap: false});
        }
    }

    componentDidUpdate() {
        if (this.state.initMap) { return; }

        if (this.props.selectedRegion && this.props.regionInfo) {
            console.log('two');
            this.drawMap();
        }
    }

    drawMap() {
        let { map } = this.state;

        if (!map) {
            var osmUrl = 'https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZG12b3VsZGplZmYiLCJhIjoiY2l1MzBxMjYzMGlqMzMwandnajM2MjF2bCJ9.GhXYtRS36ehGO941Ro0llA',
                osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                osm = L.tileLayer(osmUrl, {maxZoom: 18});


            let center = [45.4371300, 12.3326500];

            map = L.map('smallMap', {layers: [osm], center: new L.LatLng(center[0], center[1]), zoom: 10});
            this.setState({map});
        } else {
            map.eachLayer((layer) => {
                if(!layer._url) {
                    map.removeLayer(layer);
                }
            });
        }

        let myStyle = {
                "color": "#006b7b",
                "weight": 5,
                "opacity": 0.9
            };

        let geojson = L.geoJSON(this.props.selectedRegion, { style: myStyle });
        let featureGroup = L.featureGroup([geojson]);
        featureGroup.addTo(map); 
        map.fitBounds(featureGroup.getBounds());

        this.setState({initMap: true});
    }

    // NASTIEST FIX
    componentWillUnmount() {
        $('.ui.modal').remove();
    }

    render() {
        const { regionInfo, selectedRegion } = this.props || {};

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
            datasets: [{
                label: 'Population by age group',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: dataSet
            }]
        };

        const loader = (
            <div className="ui active inverted dimmer">
              <div className="ui large text loader">Aggregating census & labor data</div>
            </div>
        );

        const content = (
            <div className="ui stackable two column grid">
                <div className="column">
                    <div className="ui list info-pop-list">
                        <div className="item">
                            <div className="info-pop-icon">    
                                <i className="users icon"></i>
                            </div> 
                            <div className="content">
                                Total population: {_.get(regionInfo, 'P1')}
                            </div>
                        </div>
                        <div className="item">
                            <div className="info-pop-icon">
                                <i className="university icon"></i>
                            </div>
                            <div className="content">
                                People with university degree: {_.get(regionInfo, 'P47')}
                            </div>
                        </div>
                        <div className="item">
                            <div className="info-pop-icon">
                                <i className="student icon"></i>
                            </div>
                            <div className="content">
                                People with high-school: {_.get(regionInfo, 'P48')}
                            </div>
                        </div>
                        <div className="item">
                            <div className="info-pop-icon">
                                <i className="suitcase icon"></i>
                            </div>
                            <div className="content">
                                Work force: {_.get(regionInfo, 'P60')}
                            </div>
                        </div>
                        <div className="item">
                            <div className="info-pop-icon">
                                <i className="doctor icon"></i>
                            </div>
                            <div className="content">
                                Jobs: {_.get(regionInfo, 'ADDETTI')+_.get(regionInfo, 'ALTRI_RETRIB')+_.get(regionInfo, 'VOLONTARI')}
                            </div>
                        </div>
                        <div className="item">
                            <div className="info-pop-icon">
                                <i className="building icon"></i>
                            </div>
                            <div className="content">
                                Companies: {_.get(regionInfo, 'NUM_UNITA')}
                            </div>
                        </div>
                        <div className="item">
                            <div className="info-pop-icon">
                                <i className="hotel icon"></i>
                            </div>
                            <div className="content">
                                Commercial buildings: {_.get(regionInfo, 'E4')}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="info-pop-graph">
                        <Bar data={data} />
                    </div>
                </div>
            </div>
        );

        return (
            <div className="ui modal">
                <div className="header info-pop">Info for selected boundary</div>

                <div id="smallMap" style={{display: regionInfo ? '' : 'none'}}></div>
                { (!regionInfo) ? loader : content }

                <div className="actions">
                    <div className="ui positive right labeled icon approve button">
                        Good to know
                        <i className="checkmark icon"></i>
                    </div>
                </div>
            </div>
        );
    }
}

RegionInfo.defaultProps = {
    regionInfo: null,
    selectedRegion: null,
    errorMessage: null
};

RegionInfo.propTypes = {
    regionInfo: PropTypes.object,
    selectedRegion: PropTypes.object,
    errorMessage: PropTypes.string
};

export default RegionInfo;
