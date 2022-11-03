package com.payment.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection = "statements")
public class Statement {

    @Id
    private String statementId;
    private String transactionType;
    private Double amount;
    private LocalDate date;
    private String orderId;
    private String customerId;
    private String transactionRemarks;

}
