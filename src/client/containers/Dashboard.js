import React, { Component } from 'react';

import MarkersStore from '../stores/MarkersStore';
import MarkersActions from '../actions/MarkersActions';
import PolygonsStore from '../stores/PolygonsStore';
import PolygonsActions from '../actions/PolygonsActions';
import AltContainer from 'alt-container';

import DashboardPage from '../pages/DashboardPage';

const Dashboard = () => (
    <AltContainer stores={{
        Markers: MarkersStore,
        Polygons: PolygonsStore
    }} actions={{
        MarkersActions,
        PolygonsActions
    }}>
        <DashboardPage />
    </AltContainer>
);

export default Dashboard;
