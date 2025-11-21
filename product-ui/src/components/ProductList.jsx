import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../services/productService";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);

  const loadData = async () => {
    const response = await getProducts();
    setProducts(response.data);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Products</h2>
      <Link to="/create">
        <button>Create New Product</button>
      </Link>
      <ul>
        {products.map((p) => (
          <li key={p.id} style={{ marginBottom: 10 }}>
            {p.name} – ${p.price.toFixed(2)}
            <Link to={`/edit/${p.id}`} style={{ marginLeft: 10 }}>
              <button>Edit</button>
            </Link>
            <button onClick={() => handleDelete(p.id)} style={{ marginLeft: 10 }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
