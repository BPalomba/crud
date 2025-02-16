package com.crud_back.services;

import com.crud_back.entities.Product;
import com.crud_back.dto.ProductDTO;
import com.crud_back.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.crud_back.services.ProductService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class ProductServiceImp implements ProductService {


    @Autowired
    private ProductRepository productRepository;

    // Get
    public List<ProductDTO> findAll(){
        List<Product> products = productRepository.findAll();

        return products.stream()
                .map(product -> ProductDTO.builder()
                        .id(product.getId())
                        .name(product.getName())
                        .description(product.getDescription())
                        .build())
                .collect(Collectors.toList());
    }

    // Post
    @Override
    public ProductDTO createProduct(ProductDTO productDTO) {

        // created product entity with enter data
        Product product = Product.builder()
                .name(productDTO.getName())
                .description(productDTO.getDescription())
                .build();


        // save in db the entity
        Product savedProduct = productRepository.save(product);


        // convert saved entity to DTO
        return ProductDTO.builder()
                .id(savedProduct.getId())
                .name(savedProduct.getName())
                .description(savedProduct.getDescription())
                .build();

    }


    // Delete
    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    // Put
    @Override
    public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product existingProduct = optionalProduct.get();
            existingProduct.setName(productDTO.getName());
            existingProduct.setDescription(productDTO.getDescription());

            Product updatedProduct = productRepository.save(existingProduct);
            return convertToDTO(updatedProduct);
        } else {
            throw new RuntimeException("Product not found with ID: " + id);
        }
    }

    private ProductDTO convertToDTO(Product product) {
        return ProductDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .build();
    }

    private Product convertToEntity(ProductDTO productDTO) {
        return Product.builder()
                .name(productDTO.getName())
                .description(productDTO.getDescription())
                .build();
    }



}
