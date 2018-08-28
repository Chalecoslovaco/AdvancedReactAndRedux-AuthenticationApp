import React, { Component } from 'react';

import requireAuth from './requireAuth';

class Feature extends Component {
    render() {
        return <div>feature component</div>;
    }
}

export default requireAuth(Feature);