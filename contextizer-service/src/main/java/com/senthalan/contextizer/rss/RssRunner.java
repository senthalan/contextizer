package com.senthalan.contextizer.rss;


import com.senthalan.contextizer.domain.Media;
import com.senthalan.contextizer.domain.News;
import com.senthalan.contextizer.domain.NewsWithTag;
import com.senthalan.contextizer.message.NewsSearchReq;
import com.senthalan.contextizer.service.MediaService;
import com.senthalan.contextizer.service.NewsService;
import com.senthalan.contextizer.util.MNException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.xml.stream.XMLStreamException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;


public class RssRunner {
    private static final Logger LOGGER = LoggerFactory.getLogger(RssRunner.class);

    @Autowired
    RSSFeedParser rssFeedParser;

    @Autowired
    MediaService mediaService;

    @Autowired
    NewsService newsService;

    public void run() throws MNException {


        try {
            List<Media> medias = mediaService.getAllMedia();

            for (Media media : medias) {
                List<Media.RssConfig> rssConfigs = media.rssConfig;
                for (Media.RssConfig rssConfig : rssConfigs) {

//                    List<News> newsesToPublish = new ArrayList<>();
                    List<NewsWithTag> newsesFromDb = new ArrayList<>();
                    
                    try {
                        newsesFromDb = newsService.getNews(new NewsSearchReq(media.name, rssConfig.tag,null)).getContent();
                    } catch (MNException e) {
                        LOGGER.error("MNException getting news for media: " + media.name + " rssconfig tag: " + rssConfig.tag, e);
                    }

                    rssFeedParser.setURL(rssConfig.url);
                    Feed feed = rssFeedParser.readFeed();
                    boolean foundLastPublished = false;
                    for (FeedItem item : feed.getMessages()) {
                        for (NewsWithTag news : newsesFromDb) {
                            if (Objects.equals(item.link, news.link)) {
                                foundLastPublished = true;
                                break;
                            }
                        }// db newses check iter ends
                        if (foundLastPublished) {
                            break;
                        } else {
                            newsService.publishNews(new News( media.name, item.getTitle(), item.getDescription(),
                                    item.getLink(), new HashSet<String>(Arrays.asList(rssConfig.tag))));
                        }
                    }// feeditmes iter ends


//                    for (News news : newsesToPublish) {
//                        newsService.publishNews(news);
//                    }

                }//rssCOnfigs iter ends
            }//medias iter ends
        } catch (MNException e) {
            LOGGER.error("RSS_RUNNER MNException ", e);
        } catch (MalformedURLException e) {
            LOGGER.error("RSS_RUNNER MalformedURLException ", e);
        } catch (XMLStreamException e) {
            LOGGER.error("RSS_RUNNER XMLStreamException ", e);
        } catch (IOException e) {
            LOGGER.error("RSS_RUNNER IOException ", e);
        }
    }
}
