import { useState, useEffect } from "react";
import { getProduct, updateProduct } from "../services/productService";
import { useNavigate, useParams } from "react-router-dom";

function ProductEdit() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      const res = await getProduct(id);
      setName(res.data.name);
      setPrice(res.data.price);
    };
    loadProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct(id, { name, price: parseFloat(price) });
    navigate("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default ProductEdit;
