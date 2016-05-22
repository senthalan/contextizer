import contextizerRequest from './../../contextizerRequest'

var MediaUserSource = {
    login: function (media) {
        return contextizerRequest.post('/media/authenticate', media);
    },
    refresh: function (req) {
        return contextizerRequest.post('/media/refresh', req);
    }

};

export default MediaUserSource;