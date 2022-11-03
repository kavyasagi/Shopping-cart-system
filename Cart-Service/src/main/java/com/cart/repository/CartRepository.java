package com.cart.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.cart.model.Cart;
import com.cart.model.Items;

@Repository
public interface CartRepository  extends MongoRepository<Cart, String>{
	Cart findBycartId(String cartId);

}
