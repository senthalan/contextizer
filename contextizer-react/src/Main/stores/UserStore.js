import alt from './../../alt'

import UserActions from './../actions/UserActions'
import NetworkState from './../../NetworkState.js'

class UserStore {

    constructor() {
        console.log('Initializing MediaUserStore');

        this.user = {};
        this.isLoggedIn = false;
        this.userState = NetworkState.init();

        if(localStorage.getItem("Authorization")){
            var user = JSON.parse(localStorage.getItem('user'));
            UserActions.refresh(user);
        }

        this.bindListeners({
            resetUser: UserActions.RESET_USER,
            login: UserActions.LOGIN,
            loginSuccess: UserActions.LOGIN_SUCCESS,
            loginFailed: UserActions.LOGIN_FAILED,
            logout: UserActions.LOGOUT,
            refresh:UserActions.REFRESH,
            refreshSuccess:UserActions.REFRESH_SUCCESS,
            refreshFailed:UserActions.REFRESH_FAILED
        });
    }

    login(user) {
        this.user = {};
        this.isLoggedIn = false;
        this.userState.load('Signing in ...');
    }

    loginSuccess(signinResp) {
        console.log('log in user sucess');
        this.user = signinResp.user;
        localStorage.setItem("Authorization", signinResp.accessToken);
        localStorage.setItem("user", JSON.stringify(this.user));
        this.isLoggedIn = true;
        this.userState.succeed('Welcome ' + this.user.email);
        console.log('log in user success welcome '+ this.user.email);
        setTimeout(UserActions.resetUser, 3000)
    }

    loginFailed(errorMessage) {
        this.user = {};
        this.isLoggedIn = false;
        this.userState.fail(errorMessage);
    }

    refresh(user) {
        console.log('refreshing user');
        this.isLoggedIn = false;
        this.userState.load('Signing in ...');
    }

    refreshSuccess(signinResp) {
        console.log('refresh user sucess');
        this.user = signinResp.user;
        localStorage.setItem("Authorization", signinResp.accessToken);
        localStorage.setItem("user", JSON.stringify(this.user));
        this.isLoggedIn = true;
        this.userState.succeed('Welcome ' + this.user.email);
        console.log('refresh user sucess welcome  '+ this.user.email);
        setTimeout(UserActions.resetUser, 3000)
    }

    refreshFailed(errorMessage) {
        this.user = {};
        this.isLoggedIn = false;
        this.userState.fail(errorMessage);
    }

    logout(){
        localStorage.removeItem("Authorization");
        localStorage.removeItem("user");
        this.user = {};
        console.log('log out user success byeee '+ this.user.email);
        this.isLoggedIn = false;
    }


    resetUser() {
        console.log('refresh user sucess user reset');
        this.userState.reset();
    }

}

export default alt.createStore(UserStore, 'UserStore');