import React from "react";
import { Route, Switch } from "react-router-dom";
import history from '../history';
import { withRouter } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
const Lobby = React.lazy(() => import("../Components/lobby/index"));

const PrivateRoutes = (props) => {
    console.log('In Private Route');
    return (
        <Switch>
            <AnimatedSwitch
                atEnter={{ opacity: 0.5 }}
                atLeave={{ opacity: 1 }}
                atActive={{ opacity: 1 }}
                className="switch-wrapper"
            >
                <Route exact path="/lobby" component={Lobby} currentIndex='/' {...props} history={history} />
            </AnimatedSwitch>
        </Switch>
    );
};

export default withRouter(PrivateRoutes);