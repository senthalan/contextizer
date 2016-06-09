import alt from './../../alt'
import UserHomeSource from './../sources/UserHomeSource'
import UserStore from './../stores/UserStore'

class UserHomeActions {

    constructor(){
        this.generateActions('resetHome');
    }

    getAllNewses(req) {
        UserHomeSource.getAllNewses(req)
            .then(this.getAllNewsesSuccess)
            .catch(this.getAllNewsesFailed);
        return 1;
    }

    getAllNewsesSuccess(newses) {
        return newses;
    }

    getAllNewsesFailed(errorMessage) {
        return errorMessage;
    }

    getAllMedia(user) {
        UserHomeSource.getAllMedia(user)
            .then(this.getAllMediaSuccess);
        return 1;
    }

    getAllMediaSuccess(medias){
        return medias
    }

    clickMe(req){
        UserHomeSource.clickMe(req)
            .then(this.getRelatedNews);
        return 1;
    }

    getRelatedNews(relatedNews){
        return relatedNews;
    }

}

export  default alt.createActions(UserHomeActions);