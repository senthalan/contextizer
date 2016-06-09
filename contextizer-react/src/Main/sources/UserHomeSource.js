import contextizerRequest from './../../contextizerRequest'

var UserHomeSource = {
    getAllNewses: function (req) {
        return contextizerRequest.post('/news/search',req);
    },
    getAllMedia: function (user) {
        return contextizerRequest.post('/media/getall',user);
    },
    clickMe: function(req){
        return contextizerRequest.post('/news/click' , req)
    }
};

export default UserHomeSource;