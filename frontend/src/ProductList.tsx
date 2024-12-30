import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

function ProductList() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: 0 });
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:8080/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  const handleAddProduct = () => {
    axios.post('http://localhost:8080/products', {
        ...newProduct,
        price: parseFloat(newProduct.price.toString())
      })
      .then(() => {
        fetchProducts();
        setNewProduct({ name: '', description: '', price: 0 });
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
  };

  const handleDeleteProduct = (id: number) => {
    axios.delete(`http://localhost:8080/products/${id}`)
      .then(() => {
        fetchProducts();
      })
       .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  const handleEditProduct = (product: Product) => {
    setEditProduct(product);
  };

  const handleUpdateProduct = () => {
    if (editProduct) {
      axios.put(`http://localhost:8080/products/${editProduct.id}`, editProduct)
        .then(() => {
          fetchProducts();
          setEditProduct(null);
        })
        .catch(error => {
          console.error('Error updating product:', error);
        });
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Product List</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map(product => (
          <li key={product.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{product.name} - {product.description} - ${product.price}</span>
            <div>
              <button style={{ marginLeft: '5px', backgroundColor: '#f44336', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }} onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              <button style={{ marginLeft: '5px', backgroundColor: '#2196f3', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }} onClick={() => handleEditProduct(product)}>Edit</button>
            </div>
          </li>
        ))}
      </ul>

      <h3 style={{ marginTop: '20px', marginBottom: '10px' }}>Add New Product</h3>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
          style={{ marginRight: '5px', padding: '5px', borderRadius: '3px', border: '1px solid #ddd' }}
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
          style={{ marginRight: '5px', padding: '5px', borderRadius: '3px', border: '1px solid #ddd' }}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={e => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
          style={{ marginRight: '5px', padding: '5px', borderRadius: '3px', border: '1px solid #ddd' }}
        />
        <button style={{ backgroundColor: '#4caf50', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }} onClick={handleAddProduct}>Add Product</button>
      </div>

      {editProduct && (
        <div style={{ marginTop: '20px', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
          <h3 style={{ marginBottom: '10px' }}>Edit Product</h3>
          <input
            type="text"
            placeholder="Name"
            value={editProduct.name}
            onChange={e => setEditProduct({ ...editProduct, name: e.target.value })}
            style={{ marginRight: '5px', padding: '5px', borderRadius: '3px', border: '1px solid #ddd' }}
          />
          <input
            type="text"
            placeholder="Description"
            value={editProduct.description}
            onChange={e => setEditProduct({ ...editProduct, description: e.target.value })}
            style={{ marginRight: '5px', padding: '5px', borderRadius: '3px', border: '1px solid #ddd' }}
          />
          <input
            type="number"
            placeholder="Price"
            value={editProduct.price}
            onChange={e => setEditProduct({ ...editProduct, price: parseFloat(e.target.value) })}
            style={{ marginRight: '5px', padding: '5px', borderRadius: '3px', border: '1px solid #ddd' }}
          />
          <button style={{ backgroundColor: '#2196f3', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }} onClick={handleUpdateProduct}>Update Product</button>
        </div>
      )}
    </div>
  );
}

export default ProductList;
