import alt from '../lib/Alt';
import Feathers from '../lib/Feathers';

class MarkersActions {
    fetchMarkers() {
        const markersService = Feathers.service('markers');

        return (dispatch) => {
            dispatch();

            markersService.find().then(page => {
                this.updateMarkers(page.data);
            }).catch((err) => {
                this.failed(err);
            });
        };
    }

    updateMarkers(markers) {
        return markers;
    }

    saveMarker(marker) {
        let _this = this;
        const markersService = Feathers.service('markers');
        markersService.update(marker._id, marker).then(() => {
            _this.fetchMarkers();
        });
    }

    failed(errorMessage) {
        return errorMessage;
    }
}

module.exports = alt.createActions(MarkersActions);
