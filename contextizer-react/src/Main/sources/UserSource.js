import contextizerRequest from './../../contextizerUserRequest'

var UserSource = {
    login: function (user) {
        return contextizerRequest.post('/user/authenticate', user);
    },
    refresh: function (req) {
        return contextizerRequest.post('/user/refresh', req);
    },
    submitRegister: function (user) {
        return contextizerRequest.post('/user', user);
    },
    submitSubscribe: function (SubscriptionReq) {
        return contextizerRequest.post('/user/subscribe',SubscriptionReq);
    }
};

export default UserSource;