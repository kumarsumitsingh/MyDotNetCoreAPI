import React, { useEffect, useState } from "react";
import { productApi } from "./api/productApi";

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
  id: null,
  name: "",
  price: ""
});

const handleSave = async () => {
  if (form.id) {
    // Update
    await productApi.update(form.id, { name: form.name, price: parseFloat(form.price) });
  } else {
    // Create
    await productApi.create({ name: form.name, price: parseFloat(form.price) });
  }

  // Clear form
  setForm({ id: null, name: "", price: "" });
  // Reload products
  loadProducts();
};

const handleDelete = async (id) => {
  await productApi.remove(id); 
  loadProducts(); // refresh the list after deletion
};


  const loadProducts = async () => {
    const res = await productApi.getAll();
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    
    <div style={{ padding: 20 }}>
      <h1>Product Management UI</h1>
      <div style={{ marginTop: 20 }}>
    <h2>{form.id ? "Update Product" : "Add Product"}</h2>
    <input
      type="text"
      placeholder="Name"
      value={form.name}
      onChange={(e) => setForm({ ...form, name: e.target.value })}
      style={{ marginRight: 10 }}
    />
    <input
      type="number"
      placeholder="Price"
      value={form.price}
      onChange={(e) => setForm({ ...form, price: e.target.value })}
      style={{ marginRight: 10 }}
    />
    <button onClick={handleSave}>
      {form.id ? "Update" : "Add"}
    </button>
  </div>
      <table border="1" cellPadding="8" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {products.map(p => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.name}</td>
            <td>${p.price}</td>
            <td>
              <button onClick={() => handleDelete(p.id)}>Delete</button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
}

export default App;
