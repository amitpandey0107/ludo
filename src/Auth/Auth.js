import React, {Component} from 'react';
class Auth extends Component {
    constructor(props) {
        super(props)
        this.state={authenticated :false}
    }

    login(cb) {
        const isLogin = localStorage.getItem('isLogin');            
        isLogin === true ? this.authenticated = true : this.authenticated = false; 
        cb();
    }

    logout(cb) {
        this.authenticated = false;
        localStorage.clear();
        cb();
    }

    isAuthenticated() {
        return this.authenticated;

    }

    

}
export default new Auth();