import contextizerRequest from './../../contextizerRequest'

var MediaHomeSource = {
    getAllNewses: function () {
        return contextizerRequest.get('/news/search');
    },

    publishNews: function (news) {
        return contextizerRequest.post('/news/publish', news);
    }

};

export default MediaHomeSource;