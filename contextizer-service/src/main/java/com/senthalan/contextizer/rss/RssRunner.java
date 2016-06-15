package com.senthalan.contextizer.rss;


import com.senthalan.contextizer.domain.Media;
import com.senthalan.contextizer.domain.News;
import com.senthalan.contextizer.domain.NewsWithTag;
import com.senthalan.contextizer.service.MediaService;
import com.senthalan.contextizer.service.NewsService;
import com.senthalan.contextizer.util.MNException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.xml.stream.XMLStreamException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;


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

                    rssFeedParser.setURL(rssConfig.url);
                    Feed feed = rssFeedParser.readFeed();
                    for (FeedItem item : feed.getMessages()) {
                        if (media.name=="")
                        LOGGER.debug("get news with from RSSNews {} ",item);
                        if (newsService.findNewsByLink(item.link)){
                            break;
                        }
                        LOGGER.debug("save news with tag"+ rssConfig.tag);
                        if (!Objects.equals(rssConfig.tag, "common")){
                            newsService.publishNews(new News( media.name,media.id, item.getTitle(), item.getDescription(),
                                    item.getLink(), new HashSet<String>(Arrays.asList(rssConfig.tag))));
                        }
                        else {
                            LOGGER.debug("get news with from common tags");
                            newsService.publishNews(new News(media.name,media.id, item.getTitle(), item.getDescription(),
                                    item.getLink()));
                        }
                    }// feeditmes iter ends
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
