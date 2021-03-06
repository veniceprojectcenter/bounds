import alt from '../lib/Alt';
import Feathers from '../lib/Feathers';
import {URL} from '../lib/Constants'

class PolygonsActions {
    selectRegion(selectedRegion) {
        return (dispatch) => {
            dispatch(selectedRegion);

            fetch(URL + 'regionInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedRegion)
            })
            .then(this.checkStatus)
            .then(response => {
                return (response) ? response.json() : null;
            })
            .then(data => {
                this.updateRegionInfo(data);
            });
        };
    }

    clearRegion(a) {
        return a;
    }

    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            this.failed(response.statusText);
        }
    }

    updateRegionInfo(regionInfo) {
        return regionInfo;
    }

    failed(errorMessage) {
        return errorMessage;
    }
}

module.exports = alt.createActions(PolygonsActions);
