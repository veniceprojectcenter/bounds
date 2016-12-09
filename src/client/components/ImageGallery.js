import React, { Component, PropTypes } from 'react';
import { IMAGES_URL } from '../lib/Constants';
import _ from 'lodash';

class ImageGallery extends Component {
    constructor() {
        super();
    }

    render() {
        const { images, typeFilter, isDisabled, onChange } = this.props || {};

        let div;
        div = _.filter(images, (e) => { return _.indexOf(typeFilter, e.type) > -1; }).map((image) => {
            let url = IMAGES_URL + image.src;
            return (
                <div className="ui medium rounded image">
                    <a href={url} target="_blank"><img className="ui image" src={url} height="100px" /></a>
                </div>
            );
        });

        return (
            <div>
                {div}
            </div>
        );
    }
}

ImageGallery.defaultProps = {
    images: [],
    typeFilter: null,
    isDisabled: false,
    onChange: () => {}
};

ImageGallery.propTypes = {
    images: PropTypes.array,
    typeFilter: PropTypes.string,
    isDisabled: PropTypes.boolean,
    onChange: PropTypes.func
};

export default ImageGallery;
