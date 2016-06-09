import alt from './../../alt'

import MediaSettingsActions from './../actions/MediaSettingsActions'
import NetworkState from './../../NetworkState.js'

class MediaSettingsStore {

    constructor() {
        console.log('Initializing SettingsStore');


        this.basicState = NetworkState.init();
        this.passwordState = NetworkState.init();
        this.rssState = NetworkState.init();

        this.bindListeners({
            resetSettings:MediaSettingsActions.RESET_SETTINGS,
            updateBasic: MediaSettingsActions.UPDATE_BASIC,
            updateBasicSuccess: MediaSettingsActions.UPDATE_BASIC_SUCCESS,
            updateBasicFailed: MediaSettingsActions.UPDATE_BASIC_FAILED,
            changePassword: MediaSettingsActions.CHANGE_PASSWORD,
            changePasswordSuccess: MediaSettingsActions.CHANGE_PASSWORD_SUCCESS,
            changePasswordFailed: MediaSettingsActions.CHANGE_PASSWORD_FAILED,
            rssUpdate: MediaSettingsActions.RSS_UPDATE,
            rssUpdateSuccess: MediaSettingsActions.RSS_UPDATE_SUCCESS,
            rssUpdateFailed: MediaSettingsActions.RSS_UPDATE_FAILED,
        });

    }

    resetSettings(){
        this.basicState.reset();
        this.passwordState.reset();
        this.rssState.reset();
    }

    updateBasic(){
        this.basicState.load('Updating basic details');
    }

    updateBasicSuccess(){
        this.basicState.succeed('Basic details updated');
        setTimeout(MediaSettingsActions.resetSettings, 3000);
    }

    updateBasicFailed(err){
        this.basicState.fail(err);
    }

    changePassword(){
        this.passwordState.load('Updating password');
    }

    changePasswordSuccess(){
        this.passwordState.succeed('Password updated');
        setTimeout(MediaSettingsActions.resetSettings, 3000);
    }

    changePasswordFailed(err){
        this.passwordState.fail(err)
    }

    rssUpdate(){
        this.rssState.load('Updating RSS Configurations ..');
    }

    rssUpdateSuccess(){
        this.rssState.succeed('RSS Configurations updated');
        setTimeout(MediaSettingsActions.resetSettings, 3000);
    }

    rssUpdateFailed(err){
        this.rssState.fail(err)
    }

}

export default alt.createStore(MediaSettingsStore, 'MediaSettingsStore');