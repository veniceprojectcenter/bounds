import React, { Component, PropTypes } from 'react';

class BoundariesSelect extends Component {
    constructor() {
        super();
    }

    render() {
        const { boundaries, onPickBoundary, getInfo } = this.props || {};

        let groups = Object.keys(boundaries).map((group) => {
            return (
                <div>
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
                                                <input type="checkbox" onChange={onPickBoundary.bind(null, k)} />
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
            <div>{groups}</div>
        );
    }
}

BoundariesSelect.defaultProps = {
    boundaries: [],
    onPickBoundary: () => {},
    getInfo: () => {}
};

BoundariesSelect.propTypes = {
    boundaries: PropTypes.array,
    onPickBoundary: PropTypes.func,
    getInfo: PropTypes.func
};

export default BoundariesSelect;
