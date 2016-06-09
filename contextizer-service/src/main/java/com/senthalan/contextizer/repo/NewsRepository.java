package com.senthalan.contextizer.repo;

import com.senthalan.contextizer.domain.News;
import com.senthalan.contextizer.domain.NewsWithTag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;


public interface NewsRepository extends MongoRepository<News, String> {

    Page<NewsWithTag> findByMedia(String mediaId, Pageable pageRequest);
}
