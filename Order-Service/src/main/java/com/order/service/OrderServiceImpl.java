package com.order.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.order.address.Address;
import com.order.cart.Cart;
import com.order.cart.model.Orders;
import com.order.repository.AddressRepository;
import com.order.repository.OrderRepository;

@Service
public class OrderServiceImpl implements OrderService {

	private static String orderId;
	int customerId;

	@Autowired
	OrderRepository orderRepo;

	@Autowired
	AddressRepository addressRepo;

	@Autowired
	RestTemplate restTemplate;

	@Override
	public List<Orders> getAllOrders() {
		return orderRepo.findAll();
	}

	@Override
	public List<Orders> getOrderByCustomerId(String customerId) {
		return orderRepo.findBycustomerId(customerId);
	}

	@Override
	public List<Address> getAddressByCustomerId(String customerId) {
		return addressRepo.findByCustomerId(customerId);
	}

	@Override
	public List<Address> getAllAddress() {
		return addressRepo.findAll();
	}

	@Override
	public Orders getOrderById() {
		return null;
	}

	@Override
	public Optional<Orders> getOrderById(String orderId) {
		return orderRepo.findById(orderId);
	}

	@Override
	public void storeAddress(Address address) {
		addressRepo.save(address);
	}

	@Override
	public String changeStatus(String orderStatus, String orderId) {
		Orders order = orderRepo.findById(orderId).get();
		order.setOrderStatus(orderStatus);
		orderRepo.save(order);
		return orderStatus;
	}

	@Override
	public Orders updateOrder(Orders order) {

		return orderRepo.save(order);
	}

	@Override
	public String changeModeOfPayment(String paymentMethod, String orderId) {
		Orders order = orderRepo.findById(orderId).get();
		order.setModeOfPayment(paymentMethod);
		orderRepo.save(order);
		return paymentMethod;
	}

	@Override
	public void placeOrder(Cart cart) {
		int noOfAddress = getAddressByCustomerId(cart.getCartId()).size();
		Orders order = new Orders();
		order.setAmountPaid(cart.getTotalPrice());
		order.setOrderStatus("Payment Pending");
		order.setCustomerId(cart.getCartId());
		order.setOrderDate(java.time.LocalDate.now());
		order.setAddress(getAddressByCustomerId(cart.getCartId()).get(noOfAddress - 1));
		orderRepo.save(order);
	}

	@Override
	public void deleteOrder(String orderId) {
		orderRepo.deleteById(orderId);

	}

	@Override
	public void onlinePayment(Cart cart) {
	}
}
