import React, { Component, PropTypes } from 'react';

class BoundariesSelect extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        $('.ui.accordion').accordion('refresh');
    }

    render() {
        const { boundaries, onChange, getInfo } = this.props || {};

        let groups = Object.keys(boundaries).map((group) => {
            return (
                <div className="">
                    <div className="title">
                        <i className="dropdown icon"></i>
                        {group}
                    </div>
                    <div className="content">   
                            {
                                Object.keys(boundaries[group]).map((k) => {
                                    return (
                                        <div>
                                            <div className="ui checkbox">
                                                <input type="checkbox" onChange={onChange.bind(null, k)} />
                                                <label>{k}</label>
                                                <a onClick={getInfo.bind(null, boundaries[group][k])}>
                                                    <i className="info circle icon"></i>
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                    </div>
                </div>    
            );
        });

        return (
            <div className="boundaries-select">
                <div className="ui styled fluid accordion">
                    {groups}
                </div>
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
