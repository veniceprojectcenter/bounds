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

    saveMarkerImage(marker, attachedFile) {
        let _this = this;
        console.log(attachedFile);
        const markersService = Feathers.service('markers');
        const uploadsService = Feathers.service('uploads');
        uploadsService.create({uri: attachedFile})
            .then(function(response){
                console.log(response);
                var images = marker.images;
                if (images && images.length > 0) {
                    images.push({src: response.id});
                } else {
                    images = [{src: response.id}];
                }
                marker.images = images;
                markersService.update(marker._id, marker).then(() => {
                    _this.fetchMarkers();
                });
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
