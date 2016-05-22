import alt from './../../alt'
import UserSource from './../sources/UserSource'

class UserActions {

    constructor(){
        this.generateActions('logout', 'resetUser');
    }

    login(user) {
        UserSource.login(user)
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


    refresh(user) {
        UserSource.refresh(user)
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

export  default alt.createActions(UserActions);