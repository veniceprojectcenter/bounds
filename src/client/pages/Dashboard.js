import React, { Component } from 'react';

import MarkersStore from '../stores/MarkersStore';
import MarkersActions from '../actions/MarkersActions';
import AppStore from '../stores/AppStore';
import AltContainer from 'alt-container';

import MarkersMap from '../containers/MarkersMap';


class Dashboard extends Component {
	componentDidMount() {
		MarkersActions.fetchMarkers();
	}

    render() {
        return (
            <div className="ui main container">
                <AltContainer stores={{ markers: function(){
                	return {
                		store: MarkersStore,
                		value: MarkersStore.getAll()
                		};
            		} }} actions={{ MarkersActions }}>
                	<MarkersMap />
            	</AltContainer>
            </div>
        );
    }
}

export default Dashboard;
