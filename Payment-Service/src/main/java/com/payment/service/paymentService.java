package com.payment.service;

import com.payment.model.Statement;

import java.util.List;

public interface paymentService {

    List<Statement> getAllStatements();

    List<Statement> getStatementByCustomerId(String customerId);

    Statement getStatementById(String statementId);

    Statement getStatementByOrderId(String orderId);

    Statement newTransaction(Statement newTransaction);

    void deleteStatement(String statementId);

}
