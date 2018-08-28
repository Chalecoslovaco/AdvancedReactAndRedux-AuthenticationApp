import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (ChildComponent) => {
    class ComposedComponent extends Component {
        componentDidMount() {
            this.navigationHelper();
        }
    
        componentDidUpdate() {
            this.navigationHelper();
        }
    
        navigationHelper() {
            if(!this.props.auth) this.props.history.push('/');
        }

        render() {
            return <ChildComponent {...this.props} />;
        }
    }

    function mapStateToProps({ auth }) {
        return { auth: auth.authenticated };
    }

    return connect(mapStateToProps)(ComposedComponent);
};