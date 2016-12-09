import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';

import MarkersActions from '../actions/MarkersActions';
import MarkersStore from '../stores/MarkersStore';
import UploadPhoto from '../components/UploadPhoto';
import Directions from './panels/Directions';
import Side from './panels/Side';
import ICentoCippi from './panels/ICentoCippi';
import ImageGallery from '../components/ImageGallery';

import Field from '../components/Field';
import Dropdown from '../components/Dropdown';

import { OverallCondition, RestorationPotential } from '../lib/MarkerCondition';

import { visitationStatuses } from '../lib/Enums';
let visitedOptions = [];
Object.keys(visitationStatuses).forEach((k) => { 
    visitedOptions.push({label: visitationStatuses[k], value: k}); 
});

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
        AppActions.checkUser();

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
        let { isLoggedIn } = this.props.App;

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

        if (this.state.changed && isLoggedIn) {
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
                                    { 
                                        isLoggedIn ? (
                                            <a className="item" data-tab="photo-settings">Photo Upload & Categorization</a>
                                        ) : null
                                    }
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
                            <div className="ui small rounded images marker-top-pic">
                                <ImageGallery images={(marker ? marker.images : [])} typeFilter={['side-1']} />
                            </div>
                            Overall Marker Condition: <span>{OverallCondition(marker)}</span><br />
                            Restoration Potential: <span>{RestorationPotential(marker)}</span>

                            <br /><br /><br />

                            Present in book: <span>{marker.isPresentInBook ? "yes" : "no"}</span><br />
                            Coordinates: <span>{_.round(_.get(marker, 'coordinates.0'), 6)}, {_.round(_.get(marker, 'coordinates.1'), 6)}</span><br />
                            Address: <span>{marker.address}</span><br />

                            <br /><br />

                            Visitation status: <Dropdown options={visitedOptions} value={_.get(marker, 'visitedStatus')} isDisabled={!isLoggedIn} onChange={_this.updateField.bind(_this, 'visitedStatus')} />
                            
                            <br /><br /><br />

                            <div className="ui form">
                                <Field placeholder="Enter value" label="Degrees North" isDisabled={!isLoggedIn} value={_.get(marker, 'clockwiseNorthDelta')} onChange={_this.updateField.bind(_this, 'clockwiseNorthDelta')} />
                                <Field placeholder="Enter value" label="Cap Triangle Height" isDisabled={!isLoggedIn} value={_.get(marker, 'spireHeight')} onChange={_this.updateField.bind(_this, 'spireHeight')} />
                                <Field placeholder="Enter value" label="Inscription" isDisabled={!isLoggedIn} value={_.get(marker, 'inscription')} onChange={_this.updateField.bind(_this, 'inscription')} />
                            </div>
                            <div className="ui tiny rounded images marker-bottom-pic">
                                <ImageGallery images={(marker ? marker.images : [])} typeFilter={['surroundings', 'approach', 'inscription']} />
                            </div>
                        </div>

                        <div className="ui tab segment" data-tab="i-cento">
                            <ICentoCippi marker={marker} isDisabled={!isLoggedIn} onChange={_this.updateField.bind(_this)} />
                        </div>

                        <div className="ui tab segment" data-tab="directions">
                            <Directions marker={marker} />
                        </div>

                        { [1, 2, 3, 4].map(side => {
                            return (
                                <div className="ui tab segment" data-tab={'side-' + side}>
                                    <Side marker={marker} side={side} isDisabled={!isLoggedIn} onChange={_this.updateField.bind(_this)} />
                                </div>
                            );
                        }) }

                        { 
                            isLoggedIn ? (
                                <div className="ui tab segment" data-tab="photo-settings">
                                    <UploadPhoto marker={marker} callback={ (ma) => { if (ma) { _this.setState({marker: ma}); } }} />
                                    {images}
                                </div>
                            ) : null
                        }

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
    marker: PropTypes.object,
    App: PropTypes.shape({
        isLoggedIn: PropTypes.bool.isRequired
    })
};

export default Marker;
