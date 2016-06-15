package com.senthalan.contextizer.repo;

import com.senthalan.contextizer.domain.News;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface NewsRepository extends MongoRepository<News, String> {

    News findByLink(String link);
}
