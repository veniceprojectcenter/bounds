import React from 'react';
import _ from 'underscore';

import alt from '../lib/Alt';
import MarkersActions from '../actions/MarkersActions';

class MarkersStore {
    constructor() {
        this.bindListeners({
            handleFetchMarkers: MarkersActions.fetchMarkers,
            handleUpdateMarkers: MarkersActions.updateMarkers,
            handleFailed: MarkersActions.failed,
            handleMoveMap: MarkersActions.moveMap
        });

        this.state = {
            errorMessage: null,
            markers: [],
            zoom: null,
            mapCenter: null
        };
    }

    handleFetchMarkers() {
        //clear posts state
    }

    handleUpdateMarkers(markers) {
        this.setState({
            markers,
            errorMessage: null
        });
    }

    handleFailed(errorMessage) {
        console.error('blog failed', errorMessage);

        this.setState({
            errorMessage
        });
    }

    handleMoveMap(params) {
        let {zoom, mapCenter} = params;
        this.setState({
            zoom,
            mapCenter
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

module.exports = alt.createStore(MarkersStore, 'MarkersStore');
