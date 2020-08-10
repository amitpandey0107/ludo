import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link, Redirect } from 'react-router-dom';
import Slider from "react-slick";
import { connect } from 'react-redux';
import { LOADING, SUCCESS, ERROR } from '../../Constants/misc';
import { socket_action } from '../../Action/socket_action';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import socket from '../../socket';

class Lobby extends Component {
    constructor(props) {
        super(props);


        const token = localStorage.getItem('token');
        let loggedIn = true;
        if (token == null) {
            loggedIn = false;
        }
        this.state = {
            loggedIn,
            socket:{},
        }
    }

    static getDerivedStateFromProps(props, state) {
        console.log("=======================");
        console.log("props in lobbby", props);
        console.log("=======================");
        if (props.socket_reducer.status === LOADING) {
            return { isLodaing: true }
        } else if (props.socket_reducer.status === SUCCESS) {
            return { isLodaing: false, socket:props.socket_reducer.value };
        } else if (props.socket_reducer.status === ERROR) {
            return { isLodaing: false };
        } else if (props.socket_reducer.status === "NONE") {
            return { isLodaing: false, socket:props.socket_reducer.value };
        }
        return null;
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedIn');
        this.props.history.push('/login')
    }

    // componentDidMount() {
    //     console.log('=======================');
    //     console.log(socket);
    //     console.log('=======================');
    //     const getBanner = { en: "GET_BANNERS", data: {} };
    //     socket.emit("req", JSON.stringify(getBanner))
    //     socket.on('error', console.log)
    //     socket.on('res', res => {
    //         console.log(JSON.stringify(res, null, 4));
    //     });
    // }

    getBanner = () => {
        const socket = this.state.socket;
        const getBanner = { en: "GET_BANNERS", data: {} };
        socket.emit("req", JSON.stringify(getBanner))
        socket.on('error', console.log)
        socket.on('res', res => {
            console.log(JSON.stringify(res, null, 4));
        });
    }

    render() {

        

        if (this.state.loggedIn === false) {
            return <Redirect to="/" />
        }
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 3000,
            arrows: false,
        };
        return (
            <>
                {this.getBanner()}
                <Helmet>
                    <title>Ludo Supreme | Lobby</title>
                    <meta name="description" content="Lobby" />
                </Helmet>
                <div className="mainWrapper">
                    <div className="ludolobby-screen-wrapper ludoDesk-centerMode-box">
                        <div className="ludolobby-inner">
                            <div className="ludolobby-top-head">
                                <div className="ludoLobby-left-part">
                                    <div className="ludoUser-Profile-img">
                                        <img src={"/assets/images/lobby/border-ring.png"} className="img-fluid lobbyProfile-ring-img" alt="" />
                                        <div className="userProfileImg">
                                            <img src={"/assets/images/lobby/user.png"} className="img-fluid" alt="" />
                                        </div>
                                    </div>
                                    <div className="ludoUser-nameMoney-block">
                                        <div className="ludoUser-name">
                                            <span> Mariya Joseph </span>
                                        </div>
                                        <div className="ludoWallert-money-block">
                                            <div className="ludoWallert-money-inner">
                                                <div className="walletMoney-text">
                                                    <span> ₹4500 </span>
                                                </div>
                                                <div className="wallertIcon">
                                                    <button type="button" className="btnOnlyImage-blank">
                                                        <img src={"/assets/images/lobby/ic_wallet.png"} className="img-fluid" alt="" />
                                                    </button>
                                                </div>
                                                <div className="addMoneyIcon">
                                                    <button type="button" className="btnOnlyImage-blank">
                                                        <img src={"/assets/images/lobby/bttn_add_money.png"} className="img-fluid" alt="" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ludoLobby-right-part">
                                    <div className="ludoLobby-right-inner">
                                        <div className="ludoLobby-headRight-icon notificationIcon">
                                            <button type="button" className="btnOnlyImage-blank">
                                                <img src={"/assets/images/lobby/ic_notifications.png"} className="img-fluid" alt="" />
                                            </button>
                                            <span className="notificationCount"> 5 </span>
                                        </div>
                                        <div className="ludoLobby-headRight-icon howToPlayIcon">
                                            <button type="button" className="btnOnlyImage-blank">
                                                <img src={"/assets/images/lobby/ic_how_to_play.png"} className="img-fluid" alt="" />
                                            </button>
                                        </div>
                                        <div className="ludoLobby-headRight-icon settingIcon">
                                            <button type="button" className="btnOnlyImage-blank" onClick={() => this.logout()}>
                                                <img src={"/assets/images/lobby/btn_settings.png"} className="img-fluid" alt="" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="ludoSuperMe-adsLobby-wrap">
                                <Slider {...settings} className="adsLobby-slide-inner">
                                    <div className="adsLobby-item">
                                        <img src={"/assets/images/lobby/telegrame-ad.png"} className="img-fluid m-auto d-block" alt="" />
                                    </div>
                                    <div className="adsLobby-item">
                                        <img src={"/assets/images/lobby/telegrame-ad.png"} className="img-fluid m-auto d-block" alt="" />
                                    </div>
                                    <div className="adsLobby-item">
                                        <img src={"/assets/images/lobby/telegrame-ad.png"} className="img-fluid m-auto d-block" alt="" />
                                    </div>
                                </Slider>
                            </div>

                            <div className="ludolobby-logo-area">
                                <img src={"/assets/images/logo.png"} className="img-fluid m-auto d-block" alt="" />
                            </div>

                            <div className="ludoLobby-chooseGame-play">
                                <div className="chooseGame-playWith-inner">
                                    <div className="choosePlayWith-img">
                                        <button type="button" className="btnOnlyImage-blank">
                                            <img src={"/assets/images/lobby/multiplayer_button_dash.png"} className="img-fluid m-auto d-block" alt="" />
                                        </button>
                                    </div>
                                    <div className="choosePlayWith-img">
                                        <Link to='/play-with-friends' className="btnOnlyImage-blank">
                                            <img src={"/assets/images/lobby/multiplayer_friend_button_dash.png"} className="img-fluid m-auto d-block" alt="" />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="ludolobby-bottom-box">
                                <div className="winningName-rank-inner">
                                    <img src={"/assets/images/lobby/gr_prize.png"} className="img-fluid" alt="" />
                                    <h5> rahul_champ <span>just won </span> ₹1200 <span> with Rank 1! </span> </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        socket_reducer: state.socket_reducer,
    };
};

export default connect(mapStateToProps, { socket_action })(Lobby);
