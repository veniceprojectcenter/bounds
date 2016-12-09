import React, { Component, PropTypes } from 'react';

import MarkersActions from '../../actions/MarkersActions';
import MarkersStore from '../../stores/MarkersStore';
import Field from '../../components/Field';
import ImageGallery from '../../components/ImageGallery';

import _ from 'lodash';

class ICentoCippi extends Component {
    constructor() {
        super();
    }

    render() {
        const { marker, onChange, isDisabled } = this.props || {};

        return (
            <div className="ui form">
                <Field placeholder="Enter value" label="Structural Characteristics" isTextarea={true} isDisabled={isDisabled} value={_.get(marker, 'bookData.structuralChar')} onChange={onChange.bind(null, 'bookData.structuralChar')} />
                <Field placeholder="Enter value" label="Conservation" isTextarea={true} isDisabled={isDisabled} value={_.get(marker, 'bookData.conservation')} onChange={onChange.bind(null, 'bookData.conservation')} />
                <div className="ui tiny rounded images marker-bottom-pic">
                    <ImageGallery images={(marker ? marker.images : [])} typeFilter={['old-photo', 'old-map']} />
                </div>
            </div>
        );
    }
}

ICentoCippi.defaultProps = {
    marker: {},
    isDisabled: false,
    onChange: () => {}
};

ICentoCippi.propTypes = {
    marker: PropTypes.object,
    isDisabled: PropTypes.boolean,
    onChange: PropTypes.func
};

export default ICentoCippi;
