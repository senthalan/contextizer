package com.senthalan.contextizer.repo;

import com.senthalan.contextizer.domain.News;
import com.senthalan.contextizer.domain.NewsWithTag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;


public interface NewsWithTagRepository extends MongoRepository<NewsWithTag, String> {

    Page<NewsWithTag> findByMediaIdAndTags(String mediaId, String tag, Pageable pageRequest);

    Page<NewsWithTag> findByMediaId(String mediaId, Pageable pageRequest);

    Page<NewsWithTag> findByTags(String tag, Pageable pageRequest);

    List<NewsWithTag> findByKeywordsIn(List<String> keywords, Sort createdTime);

    Page<NewsWithTag> findByMediaIdInAndTags(List<String> reqMedia, String tag, Pageable pageRequest);

    Page<NewsWithTag> findByMediaIdIn(List<String> reqMedia, Pageable pageRequest);

    News findByLink(String link);
}
