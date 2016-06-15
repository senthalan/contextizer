import contextizerRequest from './../../contextizerMediaRequest'

var MediaHomeSource = {
    getAllNewses: function (req) {
        return contextizerRequest.post('/news/search',req);
    },

    publishNews: function (news) {
        return contextizerRequest.post('/news/publish', news);
    }

};

export default MediaHomeSource;