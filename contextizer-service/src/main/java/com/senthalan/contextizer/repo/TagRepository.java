package com.senthalan.contextizer.repo;

import com.senthalan.contextizer.domain.News;
import com.senthalan.contextizer.domain.Tag;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface TagRepository extends MongoRepository<Tag, String> {

}
