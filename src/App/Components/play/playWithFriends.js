import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { LOADING, SUCCESS, ERROR } from '../../Constants/misc';
import { socket_action } from '../../Action/socket_action';

class playWithFriends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            join: false,
            create: true,
            current: 'current',
            amount: 0,
            amountSelected: false,
            socket:{},
        }
        this.onMessage = this.onMessage.bind(this);
    }
    
    static getDerivedStateFromProps(props, state) {
        console.log("=======================");
        console.log("props in play with friend", props);
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

    getBanner = () => {
        const socket = this.state.socket;
        const getBanner = { en: "GET_BANNERS", data: {} };
        socket.emit("req", JSON.stringify(getBanner))
        socket.on('error', console.log)
        socket.on('res', res => {
            console.log(JSON.stringify(res, null, 4));
        });
    }

    onMessage(message) {
        console.log(message);
    }

    joinTab() {
        this.setState({
            join: true,
            create: false,
        })
    }

    createTab() {
        this.setState({
            join: false,
            create: true,
        })
    }

    selectAmount(amt) {
        this.setState({
            amount: amt,
            amountSelected: true
        })
    }


    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedIn');
        this.props.history.push('/login')
    }


    render() {
        return (
            <>
                {this.getBanner()}
                <Helmet>
                    <title>Ludo SuperMe | Play with friend</title>
                    <meta name="description" content="Lobby" />
                </Helmet>

                <div className="mainWrapper">
                    <div className="ludoPlayWithFriend-screen-wrapper ludoDesk-centerMode-box">
                        <div className="ludoPlayWithFriend-inner ludocommon-bg">
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
                                                    <button type="button" className="btnOnlyImage-blank"><img src={"/assets/images/lobby/ic_wallet.png"} className="img-fluid" alt="" /></button>
                                                </div>
                                                <div className="addMoneyIcon">
                                                    <button type="button" className="btnOnlyImage-blank"><img src={"/assets/images/lobby/bttn_add_money.png"} className="img-fluid" alt="" /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ludoLobby-right-part">
                                    <div className="ludoLobby-right-inner">
                                        <div className="ludoLobby-headRight-icon notificationIcon">
                                            <button type="button" className="btnOnlyImage-blank"><img src={"/assets/images/lobby/ic_notifications.png"} className="img-fluid" alt="" /></button>
                                            <span className="notificationCount"> 5 </span>
                                        </div>
                                        <div className="ludoLobby-headRight-icon howToPlayIcon">
                                            <button type="button" className="btnOnlyImage-blank"><img src={"/assets/images/lobby/ic_how_to_play.png"} className="img-fluid" alt="" /></button>
                                        </div>
                                        <div className="ludoLobby-headRight-icon settingIcon">
                                            <button 
                                            type="button" 
                                            className="btnOnlyImage-blank"
                                            onClick={() => this.logout()}
                                            ><img src={"/assets/images/lobby/btn_settings.png"} className="img-fluid" alt="" /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="joinLudo-wrap">
                                <div className="joinLudo-inner">
                                    <div className="joinLudo-title">
                                        <h2> Play with Friends </h2>
                                    </div>

                                    <div className="joinLudo-tab-wrap">
                                        <ul className="joinLudo-tabs">
                                            <li className={`joinLudo-tab-link ${this.state.create ? 'current' : ''}`} data-tab="createLudo-id" onClick={() => this.createTab()}> Create </li>
                                            <li className={`joinLudo-tab-link ${this.state.join ? 'current' : ''}`} data-tab="joinLudo-id" onClick={() => this.joinTab()}> Join </li>
                                        </ul>
                                        <div className="joinLudo-tab-content">
                                            {this.state.create ?
                                                <div id="createLudo-id" className="joinLudo-tab-item current">
                                                    <div className="createLudo-entryAmount-block">
                                                        <h3 className="entryTitle">Entry Amount</h3>

                                                        <div className="entryAmount-button-block">
                                                            <div className="entryAmountBtn-inner">
                                                                <button className="entryAmount-btn amountSelected" onClick={() => this.selectAmount(0)}>
                                                                    <img src={"/assets/images/joinboard/button_amount_active.png"} className="img-fluid defaultAmount-bg" alt="" />
                                                                    <img src={"/assets/images/joinboard/button_amount_selected.png"} className="img-fluid selectAmount-bg" alt="" />
                                                                    <p> <span>`</span>0 </p>
                                                                </button>

                                                                <button className="entryAmount-btn" onClick={() => this.selectAmount(10)}>
                                                                    <img src={"/assets/images/joinboard/button_amount_active.png"} className="img-fluid defaultAmount-bg" alt="" />
                                                                    <img src={"/assets/images/joinboard/button_amount_selected.png"} className="img-fluid selectAmount-bg" alt="" />
                                                                    <p> <span>`</span>10 </p>
                                                                </button>

                                                                <button className="entryAmount-btn" onClick={() => this.selectAmount(50)}>
                                                                    <img src={"/assets/images/joinboard/button_amount_active.png"} className="img-fluid defaultAmount-bg" alt="" />
                                                                    <img src={"/assets/images/joinboard/button_amount_selected.png"} className="img-fluid selectAmount-bg" alt="" />
                                                                    <p> <span>`</span>50 </p>
                                                                </button>
                                                            </div>
                                                            <div className="entryAmount-input-block">
                                                                <input type="text" placeholder="Or enter amount here..." className="Inputfleid-control" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="createLudo-nofPlayer-block">
                                                        <h3 className="nofPlayer-title"> No. of Players </h3>

                                                        <div className="nofPlayer-button-block">
                                                            <div className="nofPlayerBtn-inner">
                                                                <button className="nofPlayer-btn noFplaySelected">
                                                                    <img src={"/assets/images/joinboard/button_player_2_active.png"} className="img-fluid defaultCircle-bg" alt="" />
                                                                    <img src={"/assets/images/joinboard/button_player_2_selected.png"} className="img-fluid selectCircle-bg" alt="" />
                                                                </button>

                                                                <button className="nofPlayer-btn">
                                                                    <img src={"/assets/images/joinboard/button_player_3_active.png"} className="img-fluid defaultCircle-bg" alt="" />
                                                                    <img src={"/assets/images/joinboard/button_player_3_selected.png"} className="img-fluid selectCircle-bg" alt="" />
                                                                </button>

                                                                <button className="nofPlayer-btn">
                                                                    <img src={"/assets/images/joinboard/button_player_4_active.png"} className="img-fluid defaultCircle-bg" alt="" />
                                                                    <img src={"/assets/images/joinboard/button_player_4_selected.png"} className="img-fluid selectCircle-bg" alt="" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="createLudo-btn-block">
                                                        <button type="button" className="createLudo-game-btn">
                                                            <img src={"/assets/images/joinboard/button_active_yellow.png"} className="img-responsive" alt="" />
                                                            <span> Create </span>
                                                        </button>
                                                    </div>
                                                    <div className="createLudo-prizebox-wrap">
                                                        <div className="prizeBox-img">
                                                            <img src={"/assets/images/joinboard/gr_prize_small.png"} className="img-fluid" alt="" />
                                                        </div>
                                                        <div className="prizeBox-text">
                                                            <p> 3 out of 4 win. Prize Pot: <span className="rupeeSymol">`</span>40</p>
                                                            <Link to=""> View Prize Distribution </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                : ''}
                                            {this.state.join ?
                                                <div id="joinLudo-id" className="joinLudo-tab-item current">
                                                    <div className="createLudo-entryAmount-block">
                                                        <h3 className="entryTitle"> Join </h3>

                                                        <div className="entryAmount-button-block">
                                                            <div className="entryAmount-input-block">
                                                                <input type="text" placeholder="Enter private code..." className="Inputfleid-control" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="ludoHome-footer-block">
                                <div className="ludoHome-footerInner">
                                    <Link to="/lobby" className="homeBtn">
                                        <img src={"/assets/images/joinboard/ic_home.png"} className="img-fluid" alt="" />
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </>
        )
    }
}
// export default playWithFriends;
const mapStateToProps = state => {
    return {
        socket_reducer: state.socket_reducer,
    };
};

export default connect(mapStateToProps, { socket_action })(playWithFriends);