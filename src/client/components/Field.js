import React, { Component, PropTypes } from 'react';

class Field extends Component {
    constructor() {
        super();
    }

    render() {
        const { value, label, placeholder, isDisabled, onChange } = this.props || {};

        const classes = (isDisabled) ? 'disabled field' : 'field';

        return (
            <div className={classes}>
                <div className="ui labeled input">
                    <div className="ui label">{label}</div>
                    { (isDisabled) ? 
                        (<input type="text" placeholder={placeholder} value={value} disabled="" />) : 
                        (<input type="text" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value) } />) }
                </div>
            </div>
        );
    }
}

Field.defaultProps = {
    value: null,
    label: null,
    placeholder: null,
    isDisabled: false,
    onChange: () => {}
};

Field.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    isDisabled: PropTypes.boolean,
    onChange: PropTypes.func
};

export default Field;
