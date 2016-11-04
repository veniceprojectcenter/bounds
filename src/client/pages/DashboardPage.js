import React, { Component, PropTypes } from 'react';
import MarkersActions from '../actions/MarkersActions';
import MarkersMap from '../components/MarkersMap';

class DashboardPage extends Component {
    componentDidMount() {
        MarkersActions.fetchMarkers();
    }

    render() {
        let { markers } = this.props.Markers;

        return (
            <div className="ui main container">
                <MarkersMap markers={markers} />
            </div>
        );
    }
}

DashboardPage.propTypes = {
    Markers: PropTypes.shape({
        markers: PropTypes.array
    })
}

export default DashboardPage;