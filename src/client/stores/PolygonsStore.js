import React from 'react';
import _ from 'underscore';

import alt from '../lib/Alt';
import PolygonsActions from '../actions/PolygonsActions';

class PolygonsStore {
    constructor() {
        this.bindListeners({
            handleSelectRegion: PolygonsActions.selectRegion,
            handleUpdateRegionInfo: PolygonsActions.updateRegionInfo,
            handleFailed: PolygonsActions.failed,
            clearRegion: PolygonsActions.clearRegion
        });

        this.state = {
            selectedRegion: null,
            regionInfo: null,
            errorMessage: null
        };
    }

    handleSelectRegion(selectedRegion) {
        this.setState({
            selectedRegion,
            regionInfo: null
        })
    }

    handleUpdateRegionInfo(regionInfo) {
        this.setState({
            regionInfo
        });
    }

    handleFailed(errorMessage) {
        console.error('failed', errorMessage);

        this.setState({
            errorMessage
        });
    }

    clearRegion(a) {
        this.setState({
            regionInfo: null,
            selectedRegion: null,
            errorMessage: null
        });
    }
}

module.exports = alt.createStore(PolygonsStore, 'PolygonsStore');
