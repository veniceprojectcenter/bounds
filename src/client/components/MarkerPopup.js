import React, { Component, PropTypes } from 'react';

import { visitationStatuses } from '../lib/Enums';
import _ from 'lodash';
import { IMAGES_URL } from '../lib/Constants';

import { OverallCondition, RestorationPotential } from '../lib/MarkerCondition';

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

        let conditionDiv;
        let conditionGrade = OverallCondition(marker);
        if (conditionGrade) {
            conditionDiv = (
                <div>
                    Condition: {conditionGrade}
                    <br />
                    Restoration Potential: {RestorationPotential(marker)}
                </div>
            );
        }

        return (
            <div className="marker-popup">
                Marker #{marker.number}
                <br />
                {visitationStatuses[marker.visitedStatus]}
                {conditionDiv}

                {faceImageDiv}
                <br />

                <div className="ui animated button" tabIndex="0">
                    <div className="visible content">See More</div>
                    <div className="hidden content">
                        <a href={`#/marker/${marker._id}`}>
                            <i className="right arrow icon"></i>
                        </a>
                    </div>
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