import alt from './../../alt'
import MediaUserSource from './../sources/MediaUserSource'

class MediaUserActions {

    constructor() {
        this.generateActions('logout', 'resetUser');
    }

    login(media) {
        MediaUserSource.login(media)
            .then(this.loginSuccess)
            .catch(this.loginFailed);
        return media;
    }

    loginSuccess(loginResp) {
        return loginResp;
    }

    loginFailed(errorMessage) {
        return errorMessage;
    }


    refresh(media) {
        MediaUserSource.refresh(media)
            .then(this.refreshSuccess)
            .catch(this.refreshFailed);
        return media;
    }

    refreshSuccess(loginResp) {
        return loginResp;
    }

    refreshFailed(errorMessage) {
        return errorMessage;
    }

    submitRegister(media) {
        MediaUserSource.submitRegister(media)
            .then(this.submitRegisterSuccess)
            .catch(this.submitRegisterFailed);
        return media;
    }

    submitRegisterSuccess(loginResp) {
        return loginResp;
    }

    submitRegisterFailed(errorMessage) {
        return errorMessage;
    }

    resendToken(media){
        MediaUserSource.resendToken(media)
    }

}

export  default alt.createActions(MediaUserActions);