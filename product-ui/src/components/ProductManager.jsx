import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", price: "" });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or Update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${form.id}`, {
          name: form.name,
          price: parseFloat(form.price),
        });
      } else {
        await axios.post(API_URL, {
          name: form.name,
          price: parseFloat(form.price),
        });
      }
      setForm({ id: null, name: "", price: "" });
      setIsEditing(false);
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setForm({ id: product.id, name: product.name, price: product.price });
    setIsEditing(true);
  };

  // Delete product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchProducts();
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Product Management</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <button type="submit">{isEditing ? "Update" : "Add"}</button>
        {isEditing && <button onClick={() => { setIsEditing(false); setForm({ id: null, name: "", price: "" }); }}>Cancel</button>}
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductManager;
