import alt from '../lib/Alt';
import Feathers from '../lib/Feathers';

class MarkersActions {
    fetchMarkers() {
        const markersService = Feathers.service('markers');

        return (dispatch) => {
            
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

    saveMarkerImage(marker, id) {
        let _this = this;
        const markersService = Feathers.service('markers');
        
        var images = marker.images;
        if (images && images.length > 0) {
            images.push({src: id});
        } else {
            images = [{src: id}];
        }
        marker.images = images;
        markersService.update(marker._id, marker).then(() => {
            _this.fetchMarkers();
        });
        return null;
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
