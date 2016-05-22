import alt from './../../alt'
import MediaUserSource from './../sources/MediaUserSource'

class MediaUserActions {

    constructor(){
        this.generateActions('logout', 'resetUser');
    }

    login(media) {
        MediaUserSource.login(media)
            .then(this.loginSuccess)
            .catch(this.loginFailed);
        return 1;
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
        return 1;
    }

    refreshSuccess(loginResp) {
        return loginResp;
    }

    refreshFailed(errorMessage) {
        return errorMessage;
    }


}

export  default alt.createActions(MediaUserActions);