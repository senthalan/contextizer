import contextizerRequest from './../../contextizerMediaRequest'

var MediaUserSource = {
    login: function (media) {
        return contextizerRequest.post('/media/authenticate', media);
    },
    submitRegister: function (media) {
        return contextizerRequest.post('/media', media);
    },
    refresh: function (req) {
        return contextizerRequest.post('/media/refresh', req);
    }
    ,
    resendToken: function (media) {
        return contextizerRequest.post('/media/resendToken', media);
    }
};

export default MediaUserSource;