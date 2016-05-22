import alt from './../../alt'
import UserHomeSource from './../sources/UserHomeSource'
import UserStore from './../stores/UserStore'

class UserHomeActions {

    constructor(){
        this.generateActions('resetHome');
    }

    getAllNewses() {
        UserHomeSource.getAllNewses()
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
        user=UserStore.user;
        console.log('get news for user : '+user);
        UserHomeSource.getAllMedia(user)
            .then(this.getAllMediaSuccess);
        return 1;
    }

    getAllMediaSuccess(medias){
        return medias
    }

}

export  default alt.createActions(UserHomeActions);