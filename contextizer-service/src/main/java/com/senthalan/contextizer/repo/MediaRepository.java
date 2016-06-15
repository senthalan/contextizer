package com.senthalan.contextizer.repo;

import com.senthalan.contextizer.domain.Media;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface MediaRepository extends MongoRepository<Media, String> {

    Media findByName(String name);

    Media findOneByContactPersonEmail(String contactPersonEmail);

    @Query(value = "{ status : 'APPROVED' }")
    List<Media> findApproved();
}
