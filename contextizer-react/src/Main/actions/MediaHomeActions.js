import alt from './../../alt'
import MediaHomeSource from './../sources/MediaHomeSource'

class MediaHomeActions {

    constructor(){
        this.generateActions('resetHome');
    }

    getAllNewses(mediaName) {
        MediaHomeSource.getAllNewses(mediaName)
            .then(this.updateAllNewses)
            .catch(this.getAllNewsesFailed);
        return 1;
    }

    updateAllNewses(newses) {
        return newses;
    }

    getAllNewsesFailed(errorMessage) {
       return errorMessage;
    }

    publishNews(news){
        MediaHomeSource.publishNews(news)
            .then(this.publishNewsSuccess)
            .catch(this.publishNewsFailed);
        return 1;
    }

    publishNewsSuccess(success) {
        return success;
    }

    publishNewsFailed(errorMessage) {
        return errorMessage;
    }



}

export  default alt.createActions(MediaHomeActions);