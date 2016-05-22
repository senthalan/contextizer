import alt from './../../alt'

import MediaUserActions from './../actions/MediaUserActions'
import NetworkState from './../../NetworkState.js'

class MediaUserStore {

    constructor() {
        console.log('Initializing MediaUserStore');

        this.media = {};
        this.isLoggedIn = false;
        this.mediaState = NetworkState.init();

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
        });
    }

    login(media) {
        this.media = {};
        this.isLoggedIn = false;
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
        this.media = {};
        this.isLoggedIn = false;
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
        this.mediaState.fail(errorMessage);
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