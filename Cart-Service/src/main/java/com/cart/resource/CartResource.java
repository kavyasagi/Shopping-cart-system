package com.cart.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cart.model.Cart;
import com.cart.model.Items;
import com.cart.service.CartService;

@RestController
@CrossOrigin
@RequestMapping("cart")
public class CartResource {

	@Autowired
	CartService cartService;


	@GetMapping("/getAllCarts")
	public ResponseEntity<List<Cart>> getAllCarts() {
		return ResponseEntity.ok(cartService.getAllCarts());
	}

	@GetMapping("/getCart/{cartId}")
	public ResponseEntity<Cart> getCart(@PathVariable("cartId") String cartId) {

		if(cartService.getCartById(cartId) != null)
		{
			return ResponseEntity.ok(cartService.getCartById(cartId));
		}
		return new ResponseEntity("CART NOT FOUND	", HttpStatus.NO_CONTENT);
	}

	@PostMapping("/addCart/{userId}")
	public void addCart(@PathVariable("userId") String userId) {
		cartService.addCart(userId);
	}
	
	@PostMapping("/addToCart/{userId}")
	public ResponseEntity<Cart> addToCart(@RequestBody Items item,@PathVariable("userId") String userId) {
		return ResponseEntity.ok(cartService.addToCart(item,userId));
	}

	@PutMapping("/updateCart")
	public ResponseEntity<Cart> updateCart(@RequestBody Cart cart ) {
		return ResponseEntity.ok(cartService.updateCart(cart));
	}
	
	
}
