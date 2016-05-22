import contextizerRequest from './../../contextizerRequest'

var UserHomeSource = {
    getAllNewses: function () {
        return contextizerRequest.get('/news/search');
    },
    getAllMedia: function (user) {
        return contextizerRequest.post('/media/getall');
    }
};

export default UserHomeSource;