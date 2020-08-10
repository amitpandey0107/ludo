import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Helmet } from "react-helmet";
import GoogleLogin from 'react-google-login';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import { connect } from 'react-redux';
import { LOADING, SUCCESS, ERROR } from '../../Constants/misc';
import { login_action } from '../../Action/login_action';
import { socket_action } from '../../Action/socket_action';
import socketIOClient from "socket.io-client";

import socket from '../../socket';

class Login extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem('token');
        let loggedIn = true;
        if (token == null) {
            loggedIn = false;
        }
        this.state = {
            isLoggedIn: false,
            userID: '',
            email: '',
            isLodaing: false,
            loggedIn,
            terms: false,
            defaultChecked: false,
            response: '',
            isLogIn:false,
            socket:{},
        }
    }

    componentDidMount() {
        // console.log('socket', socket);
    }

    static getDerivedStateFromProps(props, state) {
        console.log("=======================");
        console.log("props in login", props);
        console.log("=======================");
        if (props.login_reducer.status === LOADING) {
            return { isLodaing: true }
        } else if (props.login_reducer.status === SUCCESS) {
            return { isLodaing: false };
        } else if (props.login_reducer.status === ERROR) {
            return { isLodaing: false };
        } else if (props.socket_reducer.status === LOADING) {
            return { isLodaing: true }
        } else if (props.socket_reducer.status === SUCCESS) {
            return { isLodaing: false, socket:props.socket_reducer.value };
        } else if (props.socket_reducer.status === ERROR) {
            return { isLodaing: false };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        
        if (this.props.login_reducer.status === SUCCESS) {
            if (this.props.login_reducer.value === true) {
                store.addNotification({
                    title: 'Welcome',
                    message: 'Login Successful',
                    type: 'success',
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                });
                setTimeout(() => {
                    this.props.history.push('/lobby');
                }, 1000);
            } else {
                store.addNotification({
                    title: 'Oops',
                    message: 'Login failed! error in login',
                    type: 'danger',
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                });
            }
        }
    }


    makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    

    getCurrentUserData = (result) => {
        if (result.error) {
            store.addNotification({
                title: 'Info',
                message: 'You have closed the signin box',
                type: 'info',
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
        }
        console.log(result);
               
        let pp = result.profileObj.imageUrl;
        let un = result.profileObj.name;
        let ue = result.profileObj.email;
        let googleToken = result.tokenId;
        let randomString = this.makeid(25);

        let userLoginData = { "en": "SP", "data": { "pp": pp, "un": un, "ult": "google", "rfc": "", "ue": ue, "googleToken": googleToken, "SerialNumber": "e2:2c:b1:d9:4b:1f", "av": "51", "app_version": "1.2006.04.01_GOLD", "version_code": "51", "uniqueDeviceId": "f687d233bbda8b57", "packageName": "in.ludo.supremegold", "anov": "10", "det": "android", "lc": "en", "deviceType":"web", "connectionInfo": { "isConnected": true, "networkType": "MOBILE | LTE" }, "DeviceId": randomString } }

        // let IP = "3.6.140.2";

        // let PORT = [5021, 5028, 5027, 5026, 5023];

        // let banner = { "en": "GET_BANNERS", "data": {} };

        // for (let index = 0; index < 1; index++) {

            // const ENDPOINT = `http://${IP}:${PORT[0]}/`;

            // const socket = socketIOClient(ENDPOINT, {
            //     reconnection: true,
            //     reconnectionDelay: 1000,
            //     reconnectionDelayMax: 5000,
            //     reconnectionAttempts: Infinity
            // });

            // console.log(socket);

            // localStorage.setItem('socket', socket);
            

            // socket.on('connect', () => {
                const socket  = this.state.socket;

                socket.emit("req", JSON.stringify(userLoginData))     

            // });

            socket.on('error', console.log);

            socket.on('res', res => {            
                console.log(JSON.stringify(res, null, 4));              
                if (res.flag === true && res.errorCode === "0000"){                 
                    this.props.login_action(res.data.googleToken, true)
                }  
            }); 


            // BANNER
        //     const banner = {"en":"GET_BANNERS","data":{}};
        //     socket.emit("req", JSON.stringify(banner)) 
        //     socket.on('error', console.log);
        //     socket.on('res', res => {            
        //         console.log(JSON.stringify(res, null, 4));
                 
        //     }); 
        // }
    }


    agreeTermCondition = event => {
        this.setState({ terms: event.target.checked }, () => {
            console.log("This returned true or false", this.state.terms);
        });
    }



    render() {

        if (this.state.loggedIn === true) {
            return <Redirect to="/lobby" />
        }
      
        let googleContent = {};
        if (this.state.isLoggedIn) {
            googleContent = null;
        } else {
            googleContent = (
                <div className="ludoLogin-btn googleLogin-btn">
                    <i className="fab fa-google"></i>
                    <GoogleLogin
                        clientId="1058413361770-dsc9u0vmh0sraoqhndgt7rfpn1vhec8k.apps.googleusercontent.com"
                        buttonText="Sign in with Google"
                        onSuccess={this.getCurrentUserData}
                        onFailure={this.getCurrentUserData}
                    />
                </div>
            );
        }

        return (
            <>
                <Helmet>
                    <title>Ludo Supreme | Login Page</title>
                    <meta name="description" content="Login to Ludo Supreme" />
                </Helmet>

                <ReactNotification />
                <div className="mainWrapper">
                    <div className="ludoLogin-screen-wrapper ludoDesk-centerMode-box">
                        <div className="ludoLogin-inner ludocommon-bg">
                            <div className="ludoLogin-logoBox">
                                <div className="ludoLogin-dropShadow">
                                    <img src={"/assets/images/login/drop-shadow.png"} className="img-fluid" alt="shadow" />
                                </div>
                                <div className="ludoLogin-diceLogo">
                                    <img src={"/assets/images/login/dices.png"} className="img-fluid" alt="dices" />
                                </div>
                                <div className="ludoLogin-mainLogo">
                                    <img src={"/assets/images/logo.png"} className="img-fluid" alt="logo" />
                                </div>
                            </div>
                            <div className="ludoLogin-card">
                                <div className="ludoLogin-type-inner">
                                    <span className="signUptext-block"> Signup to get ₹5 free! </span>
                                    <div className="faceGoog-login-box">

                                        {googleContent}

                                    </div>
                                </div>
                            </div>
                            <div className="ludoLogin-termCon-block">
                                <div className="field-group chkblock">
                                    <input
                                        type="checkbox"
                                        id="agreeTerm"
                                        name="agreeTerm"
                                        value="agreeterms"
                                        defaultChecked={this.state.defaultChecked}
                                        onChange={this.agreeTermCondition}
                                    />
                                    <label htmlFor="agreeTerm"> I agree to the Terms &amp; Conditions <br /> @2020 Ludo Supreme</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        login_reducer: state.login_reducer,
        socket_reducer: state.socket_reducer,
    };
};

export default connect(mapStateToProps, { login_action, socket_action })(Login);
