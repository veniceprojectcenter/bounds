import React, { Component, PropTypes } from 'react';

class MarkersFilter extends Component {
    constructor() {
        super();
    }

    render() {
        const { markers, filters, onPickFilter } = this.props || {};

        let options = Object.keys(filters).map((k) => {
            let obj = filters[k];

            return (
                <div className={obj.value ? "ui checked checkbox" : "ui checkbox"}>
                    { obj.value ? 
                        <input type="checkbox" onChange={onPickFilter.bind(null, k)} checked/> :
                        <input type="checkbox" onChange={onPickFilter.bind(null, k)} /> }
                    <label>{obj.label}</label>
                </div>
            );
        });

        return (
            <div>
                <div className="active title">
                    <i className="dropdown icon"></i>
                    Options for 1971 Markers
                </div>
                <div className="active content">   
                    { options }
                </div>
            </div>    
        );
    }
}

MarkersFilter.defaultProps = {
    markers: [],
    filter: {},
    onPickFilter: () => {}
};

MarkersFilter.propTypes = {
    markers: PropTypes.array,
    filters: PropTypes.object,
    onPickFilter: PropTypes.func
};

export default MarkersFilter;
