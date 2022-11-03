package com.payment.service;

import com.payment.model.Statement;
import com.payment.repository.paymentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class paymentServiceImpl implements paymentService{

    @Autowired
    paymentRepo repo;

    @Override
    public List<Statement> getAllStatements() {
        return repo.findAll();
    }

    @Override
    public List<Statement> getStatementByCustomerId(String customerId) {
        return repo.findBycustomerId(customerId);
    }

    @Override
    public Statement getStatementById(String statementId) {
        return repo.findById(statementId).get();
    }

    @Override
    public Statement getStatementByOrderId(String orderId) {
        return repo.findByorderId(orderId);
    }

    @Override
    public Statement newTransaction(Statement newTransaction) {
        newTransaction.setDate(java.time.LocalDate.now());
        return repo.save(newTransaction);
    }

    @Override
    public void deleteStatement(String statementId) {
        repo.deleteById(statementId);
    }
}
