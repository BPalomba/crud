package com.crud_back.services;

import com.crud_back.dto.ProductDTO;


import java.util.List;


public interface ProductService {

    public List<ProductDTO> findAll();

    public ProductDTO createProduct(ProductDTO productDTO);

    void deleteProduct(Long id);

    ProductDTO updateProduct(Long id, ProductDTO productDTO);
}
