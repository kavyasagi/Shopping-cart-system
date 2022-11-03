package com.payment.stripe;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CheckOutItemDto {
    private String productName;
    private int quantity;
    private double price;
    private String productId;
    private String userId;



}
