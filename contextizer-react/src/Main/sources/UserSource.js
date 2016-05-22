import contextizerRequest from './../../contextizerRequest'

var UserSource = {
    login: function (user) {
        return contextizerRequest.post('/user/authenticate', user);
    },
    refresh: function (req) {
        return contextizerRequest.post('/user/refresh', req);
    },
    updateBasic: function (user) {
        return contextizerRequest.post('/user', user);
    }
};

export default UserSource;