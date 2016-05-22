import alt from './../../alt'

import UserSettingsActions from './../actions/UserSettingsActions'
import NetworkState from './../../NetworkState.js'
import UserStore from './../stores/UserStore'
import UserActions from './../actions/UserActions'

class UserSettingsStore {

    constructor() {
        console.log('Initializing SettingsStore');


        this.basicState = NetworkState.init();
        this.passwordState = NetworkState.init();

        this.bindListeners({
            updateBasic: UserSettingsActions.UPDATE_BASIC,
            updateBasicSuccess: UserSettingsActions.UPDATE_BASIC_SUCCESS,
            updateBasicFailed: UserSettingsActions.UPDATE_BASIC_FAILED,
            changePassword: UserSettingsActions.CHANGE_PASSWORD,
            changePasswordSuccess: UserSettingsActions.CHANGE_PASSWORD_SUCCESS,
            changePasswordFailed: UserSettingsActions.CHANGE_PASSWORD_FAILED,
        });

    }

    resetSettings(){
        this.basicState.reset();
        this.passwordState.reset();
    }

    updateBasic(){
        this.basicState.load('Updating basic details');
    }

    updateBasicSuccess(){
        this.basicState.succeed('Basic details updated');
        setTimeout(UserSettingsActions.resetSettings, 3000);
    }

    updateBasicFailed(err){
        this.basicState.fail(err);
    }

    changePassword(){
        this.passwordState.load('Updating password');
    }

    changePasswordSuccess(){
        this.passwordState.succeed('Password updated');
        setTimeout(UserSettingsActions.resetSettings, 3000);
    }

    changePasswordFailed(err){
        this.passwordState.fail(err)
    }
}

export default alt.createStore(UserSettingsStore, 'UserSettingsStore');