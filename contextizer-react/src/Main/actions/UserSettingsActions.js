import alt from './../../alt'
import UserSource from './../sources/UserSource'
import UserStore from './../stores/UserStore'
import UserActions from './../actions/UserActions'

class UserSettingsActions {


    constructor(){
        this.generateActions('resetSettings');
    }

    updateBasic(user) {
        UserSource.updateBasic(user)
            .then(this.updateBasicSuccess)
            .catch(this.updateBasicFailed);

        return 1;
    }

    updateBasicSuccess(resp) {
        UserActions.loginSuccess(resp);
        return resp;
    }

    updateBasicFailed(errormessage) {
        return errormessage;
    }

    changePassword(req) {
        UserSource.changePassword(req)
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

}

export  default alt.createActions(UserSettingsActions);