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

    saveMarker(marker, attachedFile) {
        let _this = this;
        console.log(attachedFile);
        const markersService = Feathers.service('markers');
        const uploadsService = Feathers.service('uploads');
        uploadsService.create({uri: attachedFile})
            .then(function(response){
                console.log(response);
                _this.fetchMarkers();
            });
    }

    failed(errorMessage) {
        return errorMessage;
    }
}

module.exports = alt.createActions(MarkersActions);
