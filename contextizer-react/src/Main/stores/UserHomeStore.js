import alt from './../../alt'

import UserHomeActions from './../actions/UserHomeActions'
import NetworkState from './../../NetworkState.js'

class UserHomeStore {

    constructor() {
        console.log('Initializing UserHomeStore');

        this.newses = [];
        this.medias = [];

        this.nameState = NetworkState.init();
        this.newsState = NetworkState.init();
        this.mediaState = NetworkState.init();

        this.bindListeners({
            resetHome: UserHomeActions.RESET_HOME,
            getAllNewses: UserHomeActions.GET_ALL_NEWSES,
            getAllNewsesSuccess: UserHomeActions.GET_ALL_NEWSES_SUCCESS,
            getAllNewsesFailed: UserHomeActions.GET_ALL_NEWSES_FAILED,
            getAllMedia: UserHomeActions.GET_ALL_MEDIA,
            getAllMediaSuccess: UserHomeActions.GET_ALL_MEDIA_SUCCESS
        });
    }

    resetHome() {
        this.nameState.reset();
    }

    getAllNewses() {
        this.newsState.load('Loading newses ...');
    }

    getAllNewsesSuccess(newses) {
        this.newsState.succeed();
        this.newses = newses;
        setTimeout(UserHomeActions.resetHome, 3000);
    }

    getAllNewsesFailed(errorMessage) {
        this.newsState.fail(errorMessage);
    }

    getAllMedia() {
        this.mediaState.load('Loading newses ...');
    }

    getAllMediaSuccess(medias) {
        console.log('medias got from');
        this.mediaState.succeed();
        this.medias = medias;
    }
}

export default alt.createStore(UserHomeStore, 'UserHomeStore');