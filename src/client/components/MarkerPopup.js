import React, { Component, PropTypes } from 'react';

import { visitationStatuses } from '../lib/Enums';
import _ from 'lodash';
import { IMAGES_URL } from '../lib/Constants';

class MarkerPopup extends Component {
    render() {
    	let { marker } = this.props;

    	let faceImageDiv;
        let faceImage = _.filter(marker.images, (image) => { return image.type == 'side-1'; });
        if (faceImage.length > 0) {
            let imageStyle = {
                backgroundImage: 'url(' + (IMAGES_URL + faceImage[0].src) + ')',
                backgroundSize: 'cover',
                backgroundPosition: '50%'
            };

            faceImageDiv = (
                <div className="popup-img" style={imageStyle}></div>
            );
        }

        return (
            <div className="marker-popup">
                Marker #{marker.number}
                <br />
                {visitationStatuses[marker.visitedStatus]}

                {faceImageDiv}
                <br />

                <div className="ui animated button" tabIndex="0">
                    <div className="visible content">See More</div>
                    <a className="marker-arrow-link" href={`#/marker/${marker._id}`}>
                        <div className="hidden content">
                            <i className="right arrow icon"></i>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

MarkerPopup.defaultProps = {
    marker: {}
};

MarkerPopup.propTypes = {
    marker: PropTypes.object.required
};

export default MarkerPopup;