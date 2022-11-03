package com.cart.service;

import com.cart.model.Cart;
import com.cart.model.Items;
import com.cart.repository.CartRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class CartServiceImplTest {
    @Mock
    CartRepository repo;

    @Mock
    RestTemplate restTemplate;

    @InjectMocks
    CartServiceImpl service;

    static List<Cart> carts = new ArrayList<>();
    static List<Items> items = new ArrayList<>();

    @BeforeAll
    public static void init()
    {
        items.add(new Items("pid1","ProductName1","img",120.0,2));
        items.add(new Items("pid2","ProductName2","img",1340.0,1));
        items.add(new Items("pid3","ProductName3","img",1205.0,1));
        items.add(new Items("pid4","ProductName4","img",5120.0,3));

        carts.add(new Cart("cart1",1000,new ArrayList<Items>()));
        carts.add(new Cart("cart2",1000,new ArrayList<Items>()));
        carts.add(new Cart("cart3",1000,new ArrayList<Items>()));
        carts.add(new Cart("cart4",1000,new ArrayList<Items>()));
    }

    @Test
    void getCartById() {
        String cartId = "cart3";
        when(repo.findBycartId(cartId)).thenReturn(carts.stream().filter(cart -> cart.getCartId() == cartId).findFirst().get());
        assertEquals(cartId, service.getCartById(cartId).getCartId());
    }

    @Test
    void getAllCarts() {
        when(repo.findAll()).thenReturn(carts);
        assertEquals(carts.size(),service.getAllCarts().size());
    }

    @Test
    void addCart() {
        String name = "user1";
        Cart newCart = new Cart(name,0,new ArrayList<Items>());
        service.addCart(name);
        verify(repo,times(1)).save(newCart);
    }

//    @Test
//    void addToCart() {
//        Items item = new Items("pid5","ProductName5","img",null,2);
//        String cartId = "cart3";
//        when(repo.findBycartId(cartId)).thenReturn(carts.get(2));
//        assertEquals(carts.get(2),service.addToCart(item,cartId));
//    }

    @Test
    void updateCart() {
    }

    @Test
    void cartTotal() {
    }
}