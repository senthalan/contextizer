import alt from './../../alt'
import MediaSettingsSource from './../sources/MediaSettingsSource.js'

class MediaSettingsActions {


    constructor(){
        this.generateActions('resetSettings');
    }

    updateBasic(media) {
        MediaSettingsSource.updateBasic(media)
            .then(this.updateBasicSuccess)
            .catch(this.updateBasicFailed);
        return 1;
    }

    updateBasicSuccess(resp) {
        return resp;
    }

    updateBasicFailed(errormessage) {
        return errormessage;
    }

    changePassword(req) {
        MediaSettingsSource.changePassword(req)
            .then(this.changePasswordSuccess)
            .catch(this.changePasswordFailed);
        return 1;
    }

    changePasswordSuccess(resp) {
        return resp;
    }

    changePasswordFailed(errorMessage) {
        return errorMessage;
    }

    rssUpdate(req) {
        MediaSettingsSource.rssUpdate(req)
            .then(this.rssUpdateSuccess)
            .catch(this.rssUpdateFailed);
        return 1;
    }

    rssUpdateSuccess(resp) {
        return resp;
    }

    rssUpdateFailed(errorMessage) {
        return errorMessage;
    }


}

export  default alt.createActions(MediaSettingsActions);