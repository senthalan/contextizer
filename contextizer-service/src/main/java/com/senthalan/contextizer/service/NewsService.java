package com.senthalan.contextizer.service;


import com.senthalan.contextizer.domain.News;
import com.senthalan.contextizer.domain.Tag;
import com.senthalan.contextizer.message.MNStatus;
import com.senthalan.contextizer.repo.MediaRepository;
import com.senthalan.contextizer.repo.NewsRepository;
import com.senthalan.contextizer.repo.NewsWithTagRepository;
import com.senthalan.contextizer.repo.TagRepository;
import com.senthalan.contextizer.domain.NewsWithTag;
import com.senthalan.contextizer.util.MNException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class NewsService {
    private static final Logger LOGGER = LoggerFactory.getLogger(NewsService.class);

    @Autowired
    NewsRepository newsRepository;

    @Autowired
    NewsWithTagRepository newsWithTagRepository;

    @Autowired
    TagRepository TagRepository;

    @Autowired
    MediaRepository mediaRepository;




    public String publishNews(News news) throws MNException {
        LOGGER.debug("Media news publish request received with params : {}", news);

        if (!news.link.startsWith("http://") && !news.link.startsWith("https://")) {
            news.link = "http://".concat(news.link);
        }

        if (mediaRepository.findOne(news.mediaId) == null) {
            throw new MNException(MNStatus.NO_SUCH_MEDIA);
        }

        newsRepository.save(news);
        try {
            Runtime.getRuntime().exec("python /home/senthalan/cse_uom/software_project/contextizer-service/src/main/autotopic/tagger.py");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "SUCCESS";
    }

    public List<NewsWithTag> getNews() throws MNException {
        LOGGER.debug("All news get from news with tag");

        List<NewsWithTag> newses=newsWithTagRepository.findAll();

        if (newses == null) {
            throw new MNException(MNStatus.ERROR);
        }
        if (newses.isEmpty()) {
            throw new MNException(MNStatus.NO_ENTRY_FOUND);
        }
        return newses;
    }

    public List<Tag> getTags() {
        LOGGER.debug("Get all tags");
        return TagRepository.findAll();
    }
}
