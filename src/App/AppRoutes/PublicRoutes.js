import React from "react";
import { Route, Switch } from "react-router-dom";
import history from '../history';
import { withRouter } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
const UserLogin = React.lazy(() => import("../Components/loginComponent/login"));
const splashScreen = React.lazy(() => import("../Components/splashScreen/index"));
const Lobby = React.lazy(() => import("../Components/lobby/index"));
const playWithFriend = React.lazy(() => import("../Components/play/playWithFriends"));

const PublicRoutes = (props) => {
    return (
        <Switch>
            <AnimatedSwitch
                atEnter={{ opacity: 0.5 }}
                atLeave={{ opacity: 1 }}
                atActive={{ opacity: 1 }}
                className="switch-wrapper"
            >
                <Route exact path="/" component={splashScreen} />
                <Route exact path="/login" component={UserLogin} currentIndex='/' {...props} history={history} />
                <Route exact path="/lobby" component={Lobby} currentIndex='/' {...props} history={history} />
                <Route exact path="/play-with-friends" component={playWithFriend} currentIndex='/' {...props} history={history} />
            </AnimatedSwitch>
        </Switch>
    );
};

export default withRouter(PublicRoutes);