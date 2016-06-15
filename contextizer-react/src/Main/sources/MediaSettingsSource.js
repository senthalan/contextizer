import contextizerRequest from './../../contextizerMediaRequest'

var MediaSettingsSource = {
    updateBasic: function (media) {
        return contextizerRequest.put('/media/basicConfig', media);
    },
    changePassword: function (req) {
        return contextizerRequest.put('/media/password', req);
    },
    rssUpdate: function (req) {
        return contextizerRequest.put('/media/rssConfig', req);
    }

};

export default MediaSettingsSource;