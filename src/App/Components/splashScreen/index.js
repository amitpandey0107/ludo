import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import { LOADING, SUCCESS, ERROR } from '../../Constants/misc';
import { get_server_action } from '../../Action/get_server_action';
import socketIOClient from "socket.io-client";

class splashScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            getserver: '',
        }
    }
    componentDidMount() {
        this.props.get_server_action();
        // setTimeout(() => this.setState({ redirect: true }), 5000);   
        
        let getBanner = { en: "GET_BANNERS", data: {} };

        let IP = "3.6.140.2";

        let PORT = [5021, 5021, 5021];

        for (let index = 0; index < 1; index++) {

            const ENDPOINT = `http://${IP}:${PORT[index]}/`;

            const socket = socketIOClient(ENDPOINT);
            // console.log(socket);
            

            socket.on('connect', () => {

                socket.emit("req", JSON.stringify(getBanner))

                // setInterval(() => {
                //     socket.emit("req", JSON.stringify({
                //         en: "NRC",
                //         data: {}
                //     }))
                // }, 30 * 1000)


            });

            socket.on('error', console.log);

            socket.on('res', function (res) {
                console.log(res);
                

                console.log(JSON.stringify(res, null, 4));

                switch (res.en) {
                    case 'SP': {
                        socket.uid = res.data._id;
                        // socket.emit("req", JSON.stringify(joinPWFEvent));
                        break;
                    }
                    case 'GET_BANNERS': {
                        socket.emit("req", JSON.stringify(getBanner));
                        break;
                    }
                }


            });
        }


    }
    static getDerivedStateFromProps(props, state) {
        if (props.get_server_reducer.status === LOADING) {
            return { getserver: '' }
        } else if (props.get_server_reducer.status === SUCCESS) {
            return { getserver: props.get_server_reducer.value }
        } else if (props.get_server_reducer.status === ERROR) {
            return { getserver: '' }
        }
        return null;
    }

    componentWillUnmount() {
        clearTimeout();
    }

    // getData =() => {
    //     const socket = socketIOClient(ENDPOINT);
    //     console.log(socket);

    //     socket.emit('req', JSON.stringify(SP_Data) , function (confirmation) {
    //         console.log('confirmation', confirmation);
    //     });       
    // }

    render() {
        return (
            <>
                {/* {this.getData()} */}
                <Helmet>
                    <title>Ludo Supreme | Splash Screen</title>
                    <meta name="description" content="Welcome to Ludo Supreme" />
                </Helmet>
                {this.state.redirect ? <Redirect to="/login" /> :
                    <div className="mainWrapper">
                        <div className="ludoSplash-screen-wrapper ludoDesk-centerMode-box">
                            <div className="ludoSplash-inner">
                                <div className="ludoSplash-top-box">
                                    <div className="ludoLogo-area">
                                        <img src={"/assets/images/logo.png"} className="img-fluid m-auto d-block" alt="face" />
                                    </div>
                                    <div className="ludoSplash-tagline-text">
                                        <p> Play Ludo. Win Money. </p>
                                    </div>
                                </div>

                                <div className="ludoSplash-center-box">
                                    <div className="ludoSplash-loading-box">
                                        <img src={"/assets/images/loader.gif"} className="img-fluid m-auto d-block" alt="loader" />
                                        <span> Loading... </span>
                                    </div>
                                </div>

                                <div className="ludoSplash-bottom-box">
                                    <img src={"/assets/images/rng-certified.png"} className="img-fluid" alt="rng-certified" />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        get_server_reducer: state.get_server_reducer,
    };
};

export default connect(mapStateToProps, { get_server_action })(splashScreen);