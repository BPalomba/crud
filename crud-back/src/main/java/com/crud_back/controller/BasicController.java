package com.crud_back.controller;


import com.crud_back.dto.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.crud_back.repositories.ProductRepository;
import com.crud_back.services.ProductService;

import java.util.List;

@RestController
@RequestMapping("/products")
public class BasicController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductService productService;


    @GetMapping
    public ResponseEntity<?> getAll(){
        try{
            List <ProductDTO> productDTOS = productService.findAll();
            return  ResponseEntity.ok(productDTOS);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("error obtaining products: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody ProductDTO productDTO){
        try{
            ProductDTO savedProductDTO = productService.createProduct(productDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedProductDTO);
        } catch (Exception e ){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("error creating products: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteProduct(id);
            return ResponseEntity.ok("Product with ID " + id + " deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting product: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        try {
            ProductDTO updatedProduct = productService.updateProduct(id, productDTO);
            return ResponseEntity.ok(updatedProduct);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating product: " + e.getMessage());
        }
    }

}
