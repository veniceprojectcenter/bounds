import React, { Component, PropTypes } from 'react';

import MarkersStore from '../stores/MarkersStore';
import MarkersActions from '../actions/MarkersActions';
import AltContainer from 'alt-container';

import MarkerPage from '../pages/Marker';

const Marker = ({ params: { id } }) => {
	return (
		<AltContainer stores={{
	        marker: () => { return { store: MarkersStore, value: MarkersStore.getMarker(id) }; }
	    }} actions={{
	        MarkersActions
	    }}>
	        <MarkerPage />
	    </AltContainer>
	);
};
    

Marker.propTypes = {
    params: PropTypes.shape({
        id: PropTypes.string
    })
};

export default Marker;
