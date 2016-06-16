import alt from './../../alt'

import MediaUserActions from './../actions/MediaUserActions'
import NetworkState from './../../NetworkState.js'

class MediaUserStore {

    constructor() {
        console.log('Initializing MediaUserStore');

        this.media = {};
        this.isLoggedIn = false;


        this.mediaState = NetworkState.init();
        this.mediaRegisterState = NetworkState.init();

        if(localStorage.getItem("Authorization")){
            var media = JSON.parse(localStorage.getItem('media'));
            MediaUserActions.refresh(media);
        }

        this.bindListeners({
            resetUser: MediaUserActions.RESET_USER,
            login: MediaUserActions.LOGIN,
            loginSuccess: MediaUserActions.LOGIN_SUCCESS,
            loginFailed: MediaUserActions.LOGIN_FAILED,
            logout: MediaUserActions.LOGOUT,
            refresh:MediaUserActions.REFRESH,
            refreshSuccess:MediaUserActions.REFRESH_SUCCESS,
            refreshFailed:MediaUserActions.REFRESH_FAILED,
            submitRegister:MediaUserActions.SUBMIT_REGISTER,
            submitRegisterSuccess:MediaUserActions.SUBMIT_REGISTER_SUCCESS,
            submitRegisterFailed:MediaUserActions.SUBMIT_REGISTER_FAILED
        });
    }

    login(media) {
        this.media = {};
        this.isLoggedIn = false;
        console.log("media saved " +media );
        localStorage.setItem("media", JSON.stringify(media));
        this.mediaState.load('Signing in ...');
    }

    loginSuccess(signinResp) {
        this.media = signinResp.media;
        localStorage.setItem("Authorization", signinResp.accessToken);
        localStorage.setItem("media", JSON.stringify(this.media));
        this.isLoggedIn = true;
        this.mediaState.succeed('Welcome ' + this.media.name);
        setTimeout(MediaUserActions.resetUser, 3000)
    }

    loginFailed(errorMessage) {
        if (errorMessage=="media not approved"){
            localStorage.removeItem("Authorization");
            console.log("media not approved");
        }
        else{
            this.media = {};
            localStorage.removeItem("Authorization");
            localStorage.removeItem("media");
        }
        this.isLoggedIn = false;
        if (errorMessage=="Empty results from database"){
            errorMessage="So such user";
        }
        if (errorMessage=="One or more required parameters are missing"){
            errorMessage="Please fill fields";
        }
        this.mediaState.fail(errorMessage);
    }

    refresh(media) {
        this.isLoggedIn = false;
        this.mediaState.load('Signing in ...');
    }

    refreshSuccess(signinResp) {
        this.media = signinResp.media;
        localStorage.setItem("Authorization", signinResp.accessToken);
        localStorage.setItem("media", JSON.stringify(this.media));
        this.isLoggedIn = true;
        this.mediaState.succeed('Welcome ' + this.media.name);
        setTimeout(MediaUserActions.resetUser, 3000)
    }

    refreshFailed(errorMessage) {
        this.media = {};
        this.isLoggedIn = false;
        localStorage.removeItem("Authorization");
        localStorage.removeItem("media");
        this.mediaState.fail(errorMessage);
    }

    submitRegister(media) {
        console.log('refreshing user with Subscribe');
        this.isLoggedIn = false;
        this.mediaRegisterState.load('Registering media...');
    }

    submitRegisterSuccess(media) {
        console.log('media');
        localStorage.setItem("media", JSON.stringify(media));
        this.mediaRegisterState.succeed("registered");
        this.mediaState.fail("media not approved");
    }

    submitRegisterFailed(errorMessage) {
        this.user = {};
        this.isLoggedIn = false;
        localStorage.removeItem("Authorization");
        localStorage.removeItem("media");
        if (errorMessage=="Media name is not available"){
            errorMessage="You have already registered ...."
        }
        this.mediaRegisterState.fail(errorMessage);
    }

    logout(){
        localStorage.removeItem("Authorization");
        localStorage.removeItem("media");
        this.media = {};
        this.isLoggedIn = false;
    }

    updateMedia(media){
        this.media = media;
        localStorage.setItem("media", JSON.stringify(this.media));
    }

    resetUser() {
        this.mediaState.reset();
    }

}

export default alt.createStore(MediaUserStore, 'MediaUserStore');