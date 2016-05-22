package com.senthalan.contextizer.repo;

import com.senthalan.contextizer.domain.NewsWithTag;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface NewsWithTagRepository extends MongoRepository<NewsWithTag, String> {

}
