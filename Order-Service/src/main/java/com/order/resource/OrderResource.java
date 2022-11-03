package com.order.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.order.address.Address;
import com.order.cart.Cart;
import com.order.cart.model.Orders;
import com.order.service.OrderService;

@RestController
@RequestMapping("order")
public class OrderResource {
	
	@Autowired
	OrderService orderService;
	
	@GetMapping("/getAllOrders")
	List<Orders> getAllOrders()
	{
		return orderService.getAllOrders();
	}
	
	@GetMapping("/getAllAddress")
	List<Address> getAllAddress()
	{
		return orderService.getAllAddress();
	}
	
	@GetMapping("/customer/{customerId}")
	List<Orders> allOrdersOfCustomer(@PathVariable("customerId") String customerId)
	{
		return orderService.getOrderByCustomerId(customerId);
	}

	@GetMapping("/address/{customerId}")
	List<Address> allAddressOfCustomer(@PathVariable("customerId") String customerId)
	{
		return orderService.getAddressByCustomerId(customerId);
	}

	@GetMapping("/{orderId}")
	Orders orderByid(@PathVariable("orderId") String orderId)
	{
		return orderService.getOrderById(orderId).get();
	}
//
	@PutMapping("/changeStatus/{orderId}")
	public String changeOrderstatus(@PathVariable String orderId, @RequestBody String status)
	{
		return orderService.changeStatus(status,orderId);
	}

	@PutMapping("/updateOrder/")
	public Orders updateOrder(@RequestBody Orders order)
	{
		return orderService.updateOrder(order);
	}

	@PutMapping("/modeOfPayment/{orderId}")
	public String updateModeOfPayment(@PathVariable String orderId, @RequestBody String paymentMethod)
	{
		return orderService.changeModeOfPayment(paymentMethod,orderId);
	}

	@PostMapping("/storeAddress")
	public void storeAddress(@RequestBody Address address) {
		orderService.storeAddress(address);
	}
	
	@PostMapping("/placeOrder")
	public void placeOrder(@RequestBody Cart cart) {
		orderService.placeOrder(cart);
	}
	
	@DeleteMapping("/deleteOrder/{orderId}")
	public void deleteOrder(@PathVariable String orderId) {
		orderService.deleteOrder(orderId);
	}
}
