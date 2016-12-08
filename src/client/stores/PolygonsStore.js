import React from 'react';
import _ from 'underscore';

import alt from '../lib/Alt';
import PolygonsActions from '../actions/PolygonsActions';

class PolygonsStore {
    constructor() {
        this.bindListeners({
            handleSelectRegion: PolygonsActions.selectRegion,
            handleUpdateRegionInfo: PolygonsActions.updateRegionInfo,
            handleFailed: PolygonsActions.failed
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
        console.log('asd', regionInfo);
        
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
}

module.exports = alt.createStore(PolygonsStore, 'PolygonsStore');
