package com.senthalan.contextizer.api;

import com.senthalan.contextizer.domain.News;
import com.senthalan.contextizer.domain.NewsWithTag;
import com.senthalan.contextizer.domain.Tag;
import com.senthalan.contextizer.message.MNResponse;
import com.senthalan.contextizer.message.NewsClickReq;
import com.senthalan.contextizer.message.NewsSearchReq;
import com.senthalan.contextizer.message.RelatedNewsResponse;
import com.senthalan.contextizer.service.NewsService;
import com.senthalan.contextizer.util.Authorize;
import com.senthalan.contextizer.util.MNException;
import org.apache.cxf.rs.security.cors.CrossOriginResourceSharing;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import javax.ws.rs.*;
import java.util.List;

@Produces("application/json")
@CrossOriginResourceSharing(
        allowAllOrigins = true,
        allowCredentials = true,
        allowHeaders = {"Origin", "Content-Type", "Accept", "Authorization"}
)
@Path("contextizer/service/news")
public class NewsApi {

    private static final Logger LOGGER = LoggerFactory.getLogger(NewsApi.class);

    @Autowired
    NewsService newsService;

    @POST
    @Path("/publish")
    @Authorize
    public MNResponse<String> publishNews(News news) throws MNException {
        return new MNResponse<>(newsService.publishNews(news));
    }

    @POST
    @Path("/search")
    @Authorize
    public MNResponse<Page<NewsWithTag>> getNews(NewsSearchReq req) throws MNException {
        return new MNResponse<>(newsService.getNews(req));
    }

    @GET
    @Path("/tags")
    public MNResponse<List<Tag>> getTags() {
        return new MNResponse<>(newsService.getTags());
    }

    @GET
    @Path("/search")
    public MNResponse<Page<News>> getAll() {
        return new MNResponse<>(newsService.getAll());
    }

    @POST
    @Path("/click")
    public MNResponse<RelatedNewsResponse> click(NewsClickReq req) throws MNException {
        return new MNResponse<>(newsService.click(req));
    }
}
