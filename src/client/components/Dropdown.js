import React, { Component, PropTypes } from 'react';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Dropdown extends Component {
    constructor() {
        super();
    }

    render() {
        const { value, isDisabled, options, onChange } = this.props || {};

        return (
            <Select value={value} options={options} onChange={(e) => onChange(e.value) } />
        );
    }
}

Dropdown.defaultProps = {
    value: null,
    isDisabled: false,
    onChange: () => {},
    options: []
};

Dropdown.propTypes = {
    value: PropTypes.string,
    isDisabled: PropTypes.boolean,
    onChange: PropTypes.func,
    options: PropTypes.array
};

export default Dropdown;
