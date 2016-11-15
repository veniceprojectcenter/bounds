import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

import MarkersActions from '../actions/MarkersActions';
import MarkersStore from '../stores/MarkersStore';
import UploadPhoto from '../components/UploadPhoto';
import Directions from './panels/Directions';
import Side from './panels/Side';
import ICentoCippi from './panels/ICentoCippi';
import ImageGallery from '../components/ImageGallery';

import Field from '../components/Field';
import Dropdown from '../components/Dropdown';

import _ from 'lodash';

var photoOptions = [
    { value: 0, label: '<Pick type/side>' },
    { value: 'side-1', label: 'Front face side #1' },
    { value: 'side-2', label: 'Side #2' },
    { value: 'side-3', label: 'Side #3' },
    { value: 'side-4', label: 'Side #4' },
    { value: 'inscription', label: 'Inscription close-up' },
    { value: 'surroundings', label: 'Surrounding area' },
    { value: 'approach', label: 'Approach photo' },
    { value: 'old-photo', label: 'Old photo' },
    { value: 'old-map', label: 'Old map' },
    { value: 'other', label: 'Other' }
];

var visitedOptions = [
    { value: 0, label: '<Pick status>' },
    { value: 'reached', label: 'Reached' },
    { value: 'unreachable', label: 'Existing, but unreachable' },
    { value: 'unsure', label: 'Unreachable, unknown' },
    { value: 'missing', label: 'Confirmed, missing' }
];

class Marker extends Component {
    constructor(props) {
    	super(props);
    	this.state = {changed: false, marker: props.marker};
    }

    componentWillReceiveProps(newProps) {
        this.state = {changed: false, marker: newProps.marker};
    }

    componentDidMount() {
        MarkersActions.fetchMarkers();

        this.activateSemanticUI();
    }

    componentDidUpdate() {
        this.activateSemanticUI();
    }

    activateSemanticUI() {
        $('.vertical.menu a.item').tab();
    }

    saveMarker() {
        MarkersActions.saveMarker(this.state.marker);
        this.setState({changed: false});
    }

    updateField(field, newValue) {
        let newObj = _.setWith(this.state.marker, field, newValue, Object);
        this.setState({marker: newObj, changed: true});
    }

    render() {
        const { marker } = this.state || {};

        let saveButton;
        let _this = this;

        let images;

        if (marker.images && marker.images.length > 0) {
            images = marker.images.map((img, i) => {
                let url = "http://bounds-imgs.s3-website-us-east-1.amazonaws.com/" + (img && img.src);
                return (
                    <div>
                        <a href={url} target="_blank"><img src={url} height="100px" /></a>
                        Side: <Dropdown value={(img && img.type)} options={photoOptions} onChange={_this.updateField.bind(_this, 'images.' + i + '.type')} />    
                    </div>
                );
            });
        }

        if (this.state.changed) {
            saveButton = <div>
                <button onClick={this.saveMarker.bind(this)}>Save</button>
                <br />
                <br />
            </div>;
        }

        return (
            <div className="ui main container marker-info">
                <div className="marker-number">Marker #{marker.number} {marker.isPresentInBook ? "" : "(missing)"}</div>

                {saveButton}
                

                <div className="ui stackable grid">
                    <div className="four wide column">
                        <div className="ui vertical fluid menu">
                            <div className="item">
                                <div className="header">General</div>
                                <div className="menu">
                                    <a className="item active" data-tab="general">Main info</a>
                                    <a className="item" data-tab="i-cento">Data from I Cento Cippi</a>
                                    <a className="item" data-tab="directions">Directions</a>
                                    <a className="item" data-tab="photo-settings">Photo Upload & Categorization</a>
                                </div>
                            </div>
                            <div className="item">
                                <div className="header">Sides</div>
                                <div className="menu">
                                    { [1, 2, 3, 4].map(side => {
                                        return (
                                            <a className="item" data-tab={'side-' + side}>Side #{side}</a>
                                        );
                                    }) }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="twelve wide stretched column">
                        <div className="ui tab segment active" data-tab="general">
                            Is Present in book: <span>{marker.isPresentInBook ? "yes" : "no"}</span><br />
                            Coordinates: <span>{_.round(_.get(marker, 'coordinates.0'), 6)}, {_.round(_.get(marker, 'coordinates.1'), 6)}</span><br />
                            Exact Address: <span>{marker.address}</span><br />

                            <br /><br /><br />

                            Visitation status: <Dropdown options={visitedOptions} value={_.get(marker, 'visitedStatus')} onChange={_this.updateField.bind(_this, 'visitedStatus')} />
                            
                            <br /><br />

                            <div className="ui form">
                                <Field placeholder="Enter value" label="Clockwise North Delta" value={_.get(marker, 'clockwiseNorthDelta')} onChange={_this.updateField.bind(_this, 'clockwiseNorthDelta')} />
                                <Field placeholder="Enter value" label="Spire Triangle Height" value={_.get(marker, 'spireHeight')} onChange={_this.updateField.bind(_this, 'spireHeight')} />
                                <Field placeholder="Enter value" label="Inscription" value={_.get(marker, 'inscription')} onChange={_this.updateField.bind(_this, 'inscription')} />
                            
                                <ImageGallery images={(marker ? marker.images : [])} typeFilter={['surroundings', 'approach', 'inscription']} />
                            </div>
                        </div>

                        <div className="ui tab segment" data-tab="i-cento">
                            <ICentoCippi marker={marker} onChange={_this.updateField.bind(_this)} />
                        </div>

                        <div className="ui tab segment" data-tab="directions">
                            <Directions marker={marker} />
                        </div>

                        { [1, 2, 3, 4].map(side => {
                            return (
                                <div className="ui tab segment" data-tab={'side-' + side}>
                                    <Side marker={marker} side={side} onChange={_this.updateField.bind(_this)} />
                                </div>
                            );
                        }) }

                        <div className="ui tab segment" data-tab="photo-settings">
                            <UploadPhoto marker={marker} callback={ (ma) => { if (ma) { _this.setState({marker: ma}); } }} />
                            {images}
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

Marker.defaultProps = {
    marker: {}
};

Marker.propTypes = {
    marker: PropTypes.object
};

export default Marker;
