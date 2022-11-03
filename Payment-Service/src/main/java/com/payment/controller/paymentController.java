package com.payment.controller;

//import com.payment.client.StripeClient;
import com.payment.model.Statement;
import com.payment.service.paymentService;
import com.stripe.model.Charge;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/payment")
public class paymentController {


    @Autowired
    paymentService service;

    @GetMapping("/allStatements")
    public List<Statement> getAllStatements() {
        return service.getAllStatements();
    }

    @GetMapping("/statements/{customerId}")
    public List<Statement> getStatementsByCustomerId(@PathVariable("customerId") String customerId) {
        return service.getStatementByCustomerId(customerId);
    }

    @GetMapping("/order/{orderId}")
    public Statement getStatementByOrderId(@PathVariable("orderId") String orderId) {
        return service.getStatementByOrderId(orderId);
    }

    @GetMapping("/{statementId}")
    public Statement getStatementById(@PathVariable("statementId") String statementId) {
        return service.getStatementById(statementId);
    }

    @PostMapping("/newStatement")
    public Statement addStatement(@RequestBody Statement statement) {
        return service.newTransaction(statement);
    }

    @DeleteMapping("/deleteStatement/{statementId}")
    public void deleteStatement(@PathVariable String statementId) {
        service.deleteStatement(statementId);
    }

}
