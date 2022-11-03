package com.order.service;

import java.util.List;
import java.util.Optional;

import com.order.address.Address;
import com.order.cart.Cart;
import com.order.cart.model.Orders;

public interface OrderService {
	
	List<Orders> getAllOrders();
	List<Orders> getOrderByCustomerId(String customerId);
	List<Address> getAddressByCustomerId(String customerId);
	List<Address> getAllAddress();
	Orders getOrderById();
	Optional<Orders> getOrderById(String orderId);

	void storeAddress(Address address);
	String changeModeOfPayment(String paymentMethod, String orderId);
	String changeStatus(String orderStatus, String orderId);
	Orders updateOrder(Orders order);

	void placeOrder(Cart cart);
	void deleteOrder(String orderId);
	void onlinePayment(Cart cart);

}
