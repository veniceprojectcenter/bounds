import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

import PolygonsActions from '../actions/PolygonsActions';

import { Bar } from 'react-chartjs-2';

class RegionInfo extends Component {
    constructor() {
        super();
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
        if (!this.props.selectedRegion && newProps.selectedRegion) {
            this.openModal();
        }
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
                            <i className="users icon"></i>
                            <div className="content">
                                Total population: {_.get(regionInfo, 'P1')}
                            </div>
                        </div>
                        <div className="item">
                            <i className="university icon"></i>
                            <div className="content">
                                People with university degree: {_.get(regionInfo, 'P47')}
                            </div>
                        </div>
                        <div className="item">
                            <i className="student icon"></i>
                            <div className="content">
                                People with high-school: {_.get(regionInfo, 'P48')}
                            </div>
                        </div>
                        <div className="item">
                            <i className="suitcase icon"></i>
                            <div className="content">
                                Work force: {_.get(regionInfo, 'P60')}
                            </div>
                        </div>
                        <div className="item">
                            <i className="doctor icon"></i>
                            <div className="content">
                                Jobs: {_.get(regionInfo, 'ADDETTI')+_.get(regionInfo, 'ALTRI_RETRIB')+_.get(regionInfo, 'VOLONTARI')}
                            </div>
                        </div>
                        <div className="item">
                            <i className="building icon"></i>
                            <div className="content">
                                Companies: {_.get(regionInfo, 'NUM_UNITA')}
                            </div>
                        </div>
                        <div className="item">
                            <i className="hotel icon"></i>
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
