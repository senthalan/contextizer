import alt from './../../alt'

import UserHomeActions from './../actions/UserHomeActions'
import NetworkState from './../../NetworkState.js'

class UserHomeStore {

    constructor() {
        console.log('Initializing UserHomeStore');

        this.newses = [];
        this.newses.content=[];
        this.medias = [];
        this.relatedNewsRes={"newsId":1};
        this.tags = [];

        this.newsState = NetworkState.init();
        this.mediaState = NetworkState.init();
        this.relatedNewsState=NetworkState.init();


        this.seen = [];

        this.bindListeners({
            resetHome: UserHomeActions.RESET_HOME,
            getAllNewses: UserHomeActions.GET_ALL_NEWSES,
            getAllNewsesSuccess: UserHomeActions.GET_ALL_NEWSES_SUCCESS,
            getAllNewsesFailed: UserHomeActions.GET_ALL_NEWSES_FAILED,
            getAllMedia: UserHomeActions.GET_ALL_MEDIA,
            getAllMediaSuccess: UserHomeActions.GET_ALL_MEDIA_SUCCESS,
            clickMe: UserHomeActions.CLICK_ME,
            getRelatedNews:UserHomeActions.GET_RELATED_NEWS,
            getAllTags:UserHomeActions.GET_ALL_TAGS,
            getAllTagsSuccess:UserHomeActions.GET_ALL_TAGS_SUCCESS
        });
    }

    resetHome() {
        this.newsState.reset();
        this.mediaState.reset();
        this.relatedNewsState.reset();
    }

    getAllNewses() {
        this.newsState.load('Loading newses ...');
    }

    getAllNewsesSuccess(newses) {
        this.newsState.succeed();
        this.newses = newses;
        this.seen = [];
        setTimeout(UserHomeActions.resetHome, 3000);
    }

    getAllNewsesFailed(errorMessage) {
        this.newses.content=[];
        if (errorMessage=="Empty results from database"){
            errorMessage="No News found....."
        }
        this.newsState.fail(errorMessage);
    }

    getAllMedia(user) {
        this.mediaState.load('Loading newses ...');
    }

    getAllMediaSuccess(medias) {
        console.log('medias got from');
        this.mediaState.succeed();
        this.medias = medias;
    }

    clickMe(req) {
        this.seen.push(req.newsId);
    }

    getRelatedNews(relatedNews){
        this.relatedNewsState.succeed();
        this.relatedNewsRes=relatedNews;
        console.log("related news got from database",relatedNews);
    }

    getAllTags(){

    }

    getAllTagsSuccess(tags){
        this.tags=tags;
    }
}

export default alt.createStore(UserHomeStore, 'UserHomeStore');