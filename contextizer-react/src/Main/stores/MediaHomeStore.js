import alt from './../../alt'

import MediaHomeActions from './../actions/MediaHomeActions'
import MediaUserStore from './MediaUserStore'
import NetworkState from './../../NetworkState.js'

class MediaHomeStore {

    constructor() {
        console.log('Initializing MediaHomeStore');

        this.newses = [];
        this.newses.content=[];

        this.newsState = NetworkState.init();
        this.publishState = NetworkState.init();

        this.bindListeners({
            resetHome: MediaHomeActions.RESET_HOME,
            getAllNewses: MediaHomeActions.GET_ALL_NEWSES,
            updateAllNewses: MediaHomeActions.UPDATE_ALL_NEWSES,
            getAllNewsesFailed: MediaHomeActions.GET_ALL_NEWSES_FAILED,
            publishNews: MediaHomeActions.PUBLISH_NEWS,
            publishNewsSuccess: MediaHomeActions.PUBLISH_NEWS_SUCCESS,
            publishNewsFailed: MediaHomeActions.PUBLISH_NEWS_FAILED
        });
    }

    resetHome(){
        this.newsState.reset();
        this.publishState.reset();
    }

    getAllNewses(){
        this.newsState.load('Loading newses ...');
    }

    updateAllNewses(newses){
        this.newsState.succeed();
        this.newses = newses;
        setTimeout(MediaHomeActions.resetHome, 3000);
    }
    getAllNewsesFailed(errorMessage){
        this.newses.content=[];
        if (errorMessage=="Empty results from database"){
            errorMessage="Now news published yet... "
        }
        this.newsState.fail(errorMessage);
    }

    publishNews(){
        this.publishState.load('Publishing  news ...');
    }

    publishNewsSuccess(success){
        this.publishState.succeed('News published successfully');
        var req = {mediaId: MediaUserStore.getState().media.id};
        setTimeout(MediaHomeActions.getAllNewses.bind(this, req), 300);
        //setTimeout(MediaHomeActions.resetHome,3000);
    }

    publishNewsFailed(errorMessage){
        this.publishState.fail(errorMessage);
    }


}

export default alt.createStore(MediaHomeStore, 'MediaHomeStore');