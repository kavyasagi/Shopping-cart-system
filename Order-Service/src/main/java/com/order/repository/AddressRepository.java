package com.order.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.order.address.Address;

@Repository
public interface AddressRepository extends MongoRepository<Address, String> {
	List<Address> findByCustomerId(String customerId);
}
