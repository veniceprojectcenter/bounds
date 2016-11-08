import React, { Component, PropTypes } from 'react';

import MarkersActions from '../../actions/MarkersActions';
import MarkersStore from '../../stores/MarkersStore';
import Field from '../../components/Field';
import ImageGallery from '../../components/ImageGallery';

import _ from 'lodash';

class Side extends Component {
    constructor() {
        super();
    }

    render() {
        const { side, marker, onChange } = this.props || {};

        return (
            <div className="ui form">
                <h3>Side #{side}</h3>

                <h3>Base</h3>

                <Field placeholder="Enter value" label="Height (in cm)" value={_.get(marker, 'sides.' + side + '.baseSize.height')} onChange={onChange.bind(null, 'sides.' + side + '.baseSize.height')} />
                <Field placeholder="Enter value" label="Width (in cm)" value={_.get(marker, 'sides.' + side + '.baseSize.width')} onChange={onChange.bind(null, 'sides.' + side + '.baseSize.width')} />

                <h3>Ring</h3>

                <Field placeholder="Enter value" label="Height (in cm)" value={_.get(marker, 'sides.' + side + '.ringSize.height')} onChange={onChange.bind(null, 'sides.' + side + '.ringSize.height')} />
                <Field placeholder="Enter value" label="Width (in cm)" value={_.get(marker, 'sides.' + side + '.ringSize.width')} onChange={onChange.bind(null, 'sides.' + side + '.ringSize.width')} />

                <h3>Spire</h3>

                <Field placeholder="Enter value" label="Height (in cm)" value={_.get(marker, 'sides.' + side + '.spireSize.height')} onChange={onChange.bind(null, 'sides.' + side + '.spireSize.height')} />
                <Field placeholder="Enter value" label="Width (in cm)" value={_.get(marker, 'sides.' + side + '.spireSize.width')} onChange={onChange.bind(null, 'sides.' + side + '.spireSize.width')} />

                <ImageGallery images={(marker ? marker.images : [])} typeFilter={['side-' + side]} />
            </div>
        );
    }
}

Side.defaultProps = {
    marker: {},
    side: null,
    onChange: () => {}
};

Side.propTypes = {
    marker: PropTypes.object,
    side: PropTypes.number,
    onChange: PropTypes.func
};

export default Side;
