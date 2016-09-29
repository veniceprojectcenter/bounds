import alt from '../lib/Alt';
import Feathers from '../lib/Feathers';

class MarkersActions {
    fetchMarkers() {
        const postsService = Feathers.service('markers');

        return (dispatch) => {
            
            postsService.find().then(page => {
                this.updateMarkers(page.data);
            }).catch((err) => {
                this.failed(err);
            });
        };
    }

    updateMarkers(markers) {
        return markers;
    }

    failed(errorMessage) {
        return errorMessage;
    }
}

module.exports = alt.createActions(MarkersActions);
