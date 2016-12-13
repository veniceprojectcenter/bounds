import React, { Component, PropTypes } from 'react';

import MarkersActions from '../../actions/MarkersActions';
import MarkersStore from '../../stores/MarkersStore';
import Field from '../../components/Field';
import ImageGallery from '../../components/ImageGallery';

import Dropdown from '../../components/Dropdown';

import { SideCondition } from '../../lib/MarkerCondition';

import _ from 'lodash';

var conditionOptions = [
    { value: null, label: '<Pick status>' },
    { value: 1, label: '1 - Excellent' },
    { value: 2, label: '2 - Good' },
    { value: 3, label: '3 - Average' },
    { value: 4, label: '4 - Poor' },
    { value: 5, label: '5 - Very Poor' }
];

class Side extends Component {
    constructor() {
        super();
    }

    render() {
        const { side, marker, onChange, isDisabled } = this.props || {};

        return (
            <div>
                <h3>Side #{side}</h3>

                <div className="ui small rounded images marker-side-pic">
                    <ImageGallery images={(marker ? marker.images : [])} typeFilter={['side-' + side]} />
                </div>

                Side condition: { SideCondition(marker, side) }

                <h3>Condition</h3>

                Biological growth on marker: <Dropdown options={conditionOptions} value={_.get(marker, 'sides.' + side + '.conditions.growthOn')} isDisabled={isDisabled} onChange={onChange.bind(null, 'sides.' + side + '.conditions.growthOn')} />
                <br />

                Biological growth around marker: <Dropdown options={conditionOptions} value={_.get(marker, 'sides.' + side + '.conditions.growthAround')} isDisabled={isDisabled} onChange={onChange.bind(null, 'sides.' + side + '.conditions.growthAround')} />
                <br />

                Surface cracking: <Dropdown options={conditionOptions} value={_.get(marker, 'sides.' + side + '.conditions.surfaceCracking')} isDisabled={isDisabled} onChange={onChange.bind(null, 'sides.' + side + '.conditions.surfaceCracking')} />
                <br />

                Environmental discoloration: <Dropdown options={conditionOptions} value={_.get(marker, 'sides.' + side + '.conditions.discoloration')} isDisabled={isDisabled} onChange={onChange.bind(null, 'sides.' + side + '.conditions.discoloration')} />
                <br />

                Structural disintegration: <Dropdown options={conditionOptions} value={_.get(marker, 'sides.' + side + '.conditions.structuralDisintegration')} isDisabled={isDisabled} onChange={onChange.bind(null, 'sides.' + side + '.conditions.structuralDisintegration')} />
                <br />
                <br />
                <br />

                <h3>Base</h3>

                <div className="ui form">
                    <Field placeholder="Enter value" label="Height (in cm)" isDisabled={isDisabled} value={_.get(marker, 'sides.' + side + '.baseSize.height')} onChange={onChange.bind(null, 'sides.' + side + '.baseSize.height')} />
                    <Field placeholder="Enter value" label="Width (in cm)" isDisabled={isDisabled} value={_.get(marker, 'sides.' + side + '.baseSize.width')} onChange={onChange.bind(null, 'sides.' + side + '.baseSize.width')} />
                </div>

                <h3>Ring</h3>

                <div className="ui form">
                    <Field placeholder="Enter value" label="Height (in cm)" isDisabled={isDisabled} value={_.get(marker, 'sides.' + side + '.ringSize.height')} onChange={onChange.bind(null, 'sides.' + side + '.ringSize.height')} />
                    <Field placeholder="Enter value" label="Width (in cm)" isDisabled={isDisabled} value={_.get(marker, 'sides.' + side + '.ringSize.width')} onChange={onChange.bind(null, 'sides.' + side + '.ringSize.width')} />
                </div>

                <h3>Spire</h3>

                <div className="ui form">
                    <Field placeholder="Enter value" label="Height (in cm)" isDisabled={isDisabled} value={_.get(marker, 'sides.' + side + '.spireSize.height')} onChange={onChange.bind(null, 'sides.' + side + '.spireSize.height')} />
                    <Field placeholder="Enter value" label="Width (in cm)" isDisabled={isDisabled} value={_.get(marker, 'sides.' + side + '.spireSize.width')} onChange={onChange.bind(null, 'sides.' + side + '.spireSize.width')} />
                </div>

            </div>
        );
    }
}

Side.defaultProps = {
    marker: {},
    side: null,
    isDisabled: false,
    onChange: () => {}
};

Side.propTypes = {
    marker: PropTypes.object,
    side: PropTypes.number,
    isDisabled: PropTypes.boolean,
    onChange: PropTypes.func
};

export default Side;
