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

    static getAll() {
        return this.state.markers;
    }

    static getMarker(id) {
        let query = _.filter(this.state.markers, e => { return e._id == id; });
        return query && query[0];
    }

    static getMarkerNumber(search) {
        let query = _.filter(this.state.markers, e => { return e.number[0] == search; });
        return query && query[0];
    }
}

module.exports = alt.createStore(PolygonsStore, 'PolygonsStore');
