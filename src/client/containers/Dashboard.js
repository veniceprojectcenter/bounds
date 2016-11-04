import React, { Component } from 'react';

import MarkersStore from '../stores/MarkersStore';
import MarkersActions from '../actions/MarkersActions';
import AltContainer from 'alt-container';

import DashboardPage from '../pages/DashboardPage';

const Dashboard = () => (
    <AltContainer stores={{
        Markers: MarkersStore
    }} actions={{
        MarkersActions
    }}>
        <DashboardPage />
    </AltContainer>
);

export default Dashboard;
