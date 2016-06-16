import alt from './../../alt'

import UserActions from './../actions/UserActions'
import NetworkState from './../../NetworkState.js'

class UserStore {

    constructor() {
        console.log('Initializing UserStore');

        this.user = {};
        this.isLoggedIn = false;


        this.userState = NetworkState.init();
        this.userRegisterState = NetworkState.init();


        if(localStorage.getItem("UserAuthorization")){
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
            refreshFailed:UserActions.REFRESH_FAILED,
            submitSubscribe:UserActions.SUBMIT_SUBSCRIBE,
            submitRegister:UserActions.SUBMIT_REGISTER,
            submitRegisterSuccess:UserActions.SUBMIT_REGISTER_SUCCESS,
            submitRegisterFailed:UserActions.SUBMIT_REGISTER_FAILED
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
        localStorage.setItem("UserAuthorization", signinResp.accessToken);
        localStorage.setItem("user", JSON.stringify(this.user));
        this.isLoggedIn = true;
        this.userState.succeed('Welcome ' + this.user.email);
        console.log('log in user success welcome '+ this.user.email);
        setTimeout(UserActions.resetUser, 3000)
    }

    loginFailed(errorMessage) {
        this.user = {};
        this.isLoggedIn = false;
        if (errorMessage=="Empty results from database"){
            errorMessage="So such user";
        }
        if (errorMessage=="One or more required parameters are missing"){
            errorMessage="Please fill fields";
        }
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
        localStorage.setItem("UserAuthorization", signinResp.accessToken);
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
        localStorage.removeItem("UserAuthorization");
        localStorage.removeItem("user");
        this.user = {};
        console.log('log out user success byeee '+ this.user.email);
        this.isLoggedIn = false;
    }

    submitSubscribe(SubscriptionReq) {
        this.isLoggedIn = false;
        this.userState.load('Signing in ...');
        console.log('refreshing user with Subscribe');
    }

    submitRegister(user) {
        console.log('refreshing user with Subscribe');
        this.isLoggedIn = false;
        this.userRegisterState.load('Signing up ...');
    }


    submitRegisterSuccess(loginResp) {
        console.log('refresh user sucess');
        this.user = loginResp.user;
        localStorage.setItem("UserAuthorization", loginResp.accessToken);
        localStorage.setItem("user", JSON.stringify(this.user));
        this.isLoggedIn = true;
        this.userState.succeed('Welcome ' + this.user.email);
        this.userRegisterState.succeed('Welcome ' + this.user.email);
        setTimeout(UserActions.resetUser, 3000)
    }

    submitRegisterFailed(errorMessage) {
        this.user = {};
        this.isLoggedIn = false;
        if (errorMessage=="User email is not available"){
            errorMessage="You have already registered ...."
        }
        this.userRegisterState.fail(errorMessage);
    }

    resetUser() {
        console.log('refresh user sucess user reset');
        this.userState.reset();
        this.userRegisterState.reset();
    }

}

export default alt.createStore(UserStore, 'UserStore');