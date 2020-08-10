import React, { Component } from 'react';
import PublicRoutes from './PublicRoutes';

import { connect } from 'react-redux';
import { LOADING, SUCCESS, ERROR } from '../Constants/misc';
import { login_action } from '../Action/login_action';
import { socket_action } from '../Action/socket_action';
import socketIOClient from "socket.io-client";
let IP = "3.6.140.2";
let PORT = [5021, 5021, 5021];
const ENDPOINT = `http://${IP}:${PORT[0]}/`;
// import socket from '../socket';

class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            isLodaing: false,
        }
    }

    componentDidMount() {  
        const socket = socketIOClient(ENDPOINT);
        this.props.socket_action(socket)
    }

    static getDerivedStateFromProps(props, state) {         
        if (props.login_reducer.status === LOADING) {
            return { isLodaing: true }
        } else if (props.login_reducer.status === SUCCESS) {
            let status = false;
            if (props.login_reducer.value === "true") {
                status = true;
            } else {
                status = false;
            }
            return { isLodaing: false, isLoggedIn: status };
        } else if (props.login_reducer.status === ERROR) {
            return { isLodaing: false };
        }
        return null;
    }

    render() {
        return (
            <>
                <PublicRoutes />
            </>
        );
    }
};

const mapStateToProps = state => {
    return {
        login_reducer: state.login_reducer,
        socket_reducer: state.socket_reducer,
    };
};

export default connect(mapStateToProps, { login_action, socket_action })(Routes);