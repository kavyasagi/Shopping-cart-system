package com.cart.model;

import java.util.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class Items {

	private String productId;
	private String productName;
    private String image;
	private Double price;
	private int quantity;
	
	
	@Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Items other = (Items) obj;
        if (Objects.equals(this.productId, other.productId)) {
            return true;
        }
        if (Objects.equals(this.productName, other.productName)) {
            return true;
        }
        return false;
    }
	
	
}
