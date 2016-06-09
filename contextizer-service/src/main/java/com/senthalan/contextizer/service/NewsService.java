package com.senthalan.contextizer.service;


import com.senthalan.contextizer.domain.*;
import com.senthalan.contextizer.message.MNStatus;
import com.senthalan.contextizer.message.NewsClickReq;
import com.senthalan.contextizer.message.NewsSearchReq;
import com.senthalan.contextizer.message.RelatedNewsResponse;
import com.senthalan.contextizer.repo.*;
import com.senthalan.contextizer.util.MNException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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

    @Autowired
    UserRepository userRepository;

    @Autowired
    MediaService mediaservice;




    public String publishNews(News news) throws MNException {
        LOGGER.debug("Media news publish request received with params : {}", news);

        if (!news.link.startsWith("http://") && !news.link.startsWith("https://")) {
            news.link = "http://".concat(news.link);
        }

        if (mediaRepository.findByName(news.media) == null) {
            throw new MNException(MNStatus.NO_SUCH_MEDIA);
        }

        news.views=new HashSet<>();

        newsRepository.save(news);
        return "SUCCESS";
    }

    public Page<NewsWithTag> getNews(NewsSearchReq req) throws MNException {
        LOGGER.debug("News get request received with params NewsSearchReq : {}", req);
        Page<NewsWithTag> newses;
        if (req.tag != null) {
            req.tag = req.tag.toLowerCase();
        }
        if (req.userId== null){
            if (req.mediaId != null && req.mediaId != "" && req.tag != null && req.tag != "") {
                newses = newsWithTagRepository.findByMediaAndTags(req.mediaId, req.tag, new PageRequest(req.skip, req.limit, Sort.Direction.DESC, "createdTime"));
            } else if (req.mediaId != null && req.mediaId != "" ) {
                newses = newsWithTagRepository.findByMedia(req.mediaId, new PageRequest(req.skip, req.limit, Sort.Direction.DESC, "createdTime"));
            } else if (req.tag != null && req.tag != "") {
                newses = newsWithTagRepository.findByTags(req.tag, new PageRequest(req.skip, req.limit,Sort.Direction.DESC, "createdTime"));
            } else {
                newses = newsWithTagRepository.findAll(new PageRequest(req.skip, req.limit,Sort.Direction.DESC, "createdTime"));
            }
        }
        else{
            User user = userRepository.findOne(req.userId);
            if (user == null) {
                throw new MNException(MNStatus.NO_SUCH_USER);
            }
            List<String> reqMedia=new ArrayList<>();
            if(req.mediaId == null || req.mediaId == "" ) {
                List<Media> medias=mediaservice.getAllMedia(user);
                reqMedia= medias.stream().filter(media -> media.subscribed).map(media -> media.name).collect(Collectors.toList());
            }
            else{
                reqMedia.add(req.mediaId);
            }
            LOGGER.debug("News get with updated params : {}", reqMedia + "   "+req.tag);
            if (req.tag != null && req.tag != "") {
                newses = newsWithTagRepository.findByMediaInAndTags(reqMedia, req.tag, new PageRequest(req.skip, req.limit, Sort.Direction.DESC, "createdTime"));
            } else {
                newses = newsWithTagRepository.findByMediaLike(reqMedia, new PageRequest(req.skip, req.limit, Sort.Direction.DESC, "createdTime"));
            }
        }

        if (newses.getContent() == null) {
            throw new MNException(MNStatus.ERROR);
        }
        if (newses.getContent().isEmpty()) {
            throw new MNException(MNStatus.NO_ENTRY_FOUND);
        }

        return newses;
    }

    public List<Tag> getTags() {
        LOGGER.debug("Get all tags");
        return TagRepository.findAll();
    }

    public Page<News> getAll() {
        LOGGER.debug("Get all news from news repository");
        return newsRepository.findAll(new PageRequest(0, 10,Sort.Direction.DESC, "createdTime"));
    }

    public RelatedNewsResponse click(NewsClickReq req) throws MNException {
        NewsWithTag news = newsWithTagRepository.findOne(req.newsId);
        if (news == null) {
            throw new MNException(MNStatus.NO_ENTRY_FOUND);
        }
        news.views.add(req.userId);
        NewsWithTag savedNews = newsWithTagRepository.save(news);
        if (savedNews == null) {
            throw new MNException(MNStatus.DB_ERROR);
        }
        savedNews.calculateSeen(req.userId);

        List<String> keywords = savedNews.keywords;
        List<NewsWithTag> sameNews=newsWithTagRepository.findByKeywordsIn(keywords, new Sort(Sort.Direction.DESC, "createdTime"));

        List<NewsWithTag> sortedNews=new ArrayList<>();
        HashSet<String> sortedId= new HashSet<>();
        sortedId.add(savedNews.id);

        sameNews.stream().filter(temp -> (!sortedId.contains(temp.id) && sortedNews.size() < 4)).forEach(temp -> {
            sortedId.add(temp.id);
            sortedNews.add(temp);
        });
//        sameNews = sameNews.stream().distinct().collect(Collectors.toList());

        RelatedNewsResponse relatedNewsResponse=new RelatedNewsResponse();
        relatedNewsResponse.newsId=req.newsId;
        relatedNewsResponse.relatedNews=sortedNews;

        return relatedNewsResponse;
    }
}
