package com.senthalan.contextizer.api;

import com.senthalan.contextizer.domain.News;
import com.senthalan.contextizer.domain.NewsWithTag;
import com.senthalan.contextizer.domain.Tag;
import com.senthalan.contextizer.message.MNResponse;
import com.senthalan.contextizer.service.NewsService;
import com.senthalan.contextizer.util.MNException;
import org.apache.cxf.rs.security.cors.CrossOriginResourceSharing;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.*;
import java.util.List;

@Produces("application/json")
@Path("contextizer/service/news")
public class NewsApi {

    private static final Logger LOGGER = LoggerFactory.getLogger(NewsApi.class);

    @Autowired
    NewsService newsService;

    @POST
    @Path("/publish")
    public MNResponse<String> publishNews(News news) throws MNException {
        return new MNResponse<>(newsService.publishNews(news));
    }

    @GET
    @Path("/search")
    public MNResponse<List<NewsWithTag>> getNews()  throws MNException {
        return new MNResponse<>(newsService.getNews());
    }

    @GET
    @Path("/tags")
    public MNResponse<List<Tag>> getTags()  {
        return new MNResponse<>(newsService.getTags());
    }

}
