import React, { Component, PropTypes } from 'react';
import DropzoneComponent from 'react-dropzone-component';
import ReactDOMServer from 'react-dom/server';
import {URL} from '../lib/Constants';

class UploadPhoto extends Component {
    constructor() {
        super();
        this.state = {progress: null};
    }

    componentDidMount() {
        this.activateSemanticUI();
    }

    componentDidUpdate() {
        this.activateSemanticUI();
    }

    activateSemanticUI() {
        if (!this.state.progress) return;
        $('#progress-bar').progress({
            percent: this.state.progress
        });
    }

    uploadFinished(res) {
        let {marker} = this.state;

        let response = JSON.parse(res.xhr.response);
        let id = response && response.id;

        this.setState({progress: null});
        
        if (this.props.callback) {
            this.props.callback(response.marker);
        }

        alert('done :)');
    }

    render() {
        let { marker } = this.props;
        let _this = this;

        var componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: true,
            postUrl: URL + 'uploads?marker_id=' + marker._id,
            paramName: "uri",
            uploadMultiple: false
        };

        var eventHandlers = { 
            complete: this.uploadFinished.bind(this),
            uploadprogress: (e, a) => { _this.setState({progress: Math.round(a)}) } 
        };

        var djsConfig = {
            addRemoveLinks: true,
            paramName: "uri",
            uploadMultiple: false,
            previewTemplate: ReactDOMServer.renderToStaticMarkup(<div>.</div>)
        };

        let progress;
        if (this.state.progress) {
            progress = (
                <div className="ui indicating progress" id="progress-bar">
                  <div className="bar"></div>
                  <div className="label">Upload Progress</div>
                </div>
            );
        }

        return (
            <div>
                {progress}

                <DropzoneComponent config={componentConfig}
                       eventHandlers={eventHandlers}
                       djsConfig={djsConfig} />
            </div>
        )
    }
}

UploadPhoto.propTypes = {
    marker: PropTypes.object.isRequired
};

export default UploadPhoto;
