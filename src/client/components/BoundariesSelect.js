import React, { Component, PropTypes } from 'react';

class BoundariesSelect extends Component {
    constructor() {
        super();
    }

    render() {
        const { boundaries, onChange, getInfo } = this.props || {};

        let groups = Object.keys(boundaries).map((group) => {
            return (
                <div>
                    <h3>{group}</h3>

                    {
                        Object.keys(boundaries[group]).map((k) => {
                            return (
                                <div>
                                    <div className="ui checkbox">
                                        <input type="checkbox" onChange={onChange.bind(null, k)} />
                                        <label>{k}</label>
                                        <a onClick={getInfo.bind(null, boundaries[group][k])}>get data</a>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>    
            );
        });

        return (
            <div className="boundaries-select">
                {groups}
            </div>
        );
    }
}

BoundariesSelect.defaultProps = {
    value: null,
    label: null,
    placeholder: null,
    isDisabled: false,
    isTextarea: false,
    onChange: () => {},
    getInfo: () => {}
};

BoundariesSelect.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    isDisabled: PropTypes.boolean,
    isTextarea: PropTypes.boolean,
    onChange: PropTypes.func,
    getInfo: PropTypes.func
};

export default BoundariesSelect;
