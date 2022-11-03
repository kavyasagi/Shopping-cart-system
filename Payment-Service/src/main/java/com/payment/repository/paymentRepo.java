package com.payment.repository;

import com.payment.model.Statement;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface paymentRepo extends MongoRepository<Statement,String> {
    List<Statement> findBycustomerId(String customerId);
    Statement findByorderId(String customerId);
}
