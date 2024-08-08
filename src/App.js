import { useState } from "react";
import CreateProduct from "./CreateProudct";
import SearchBar from "./SearchBar";
import ProductsTable from "./ProductsTable";
import "./App.css";
import WariningMessage from "./WarningMessage";
import Swal from 'sweetalert2';

const key = "products";
const initialProducts = JSON.parse(localStorage.getItem(key)) || [];

const updateLocalStorage = (newProducts) => {
  localStorage.setItem(key, JSON.stringify(newProducts));
};

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [updatedProductIndex, setUpdatedProductIndex] = useState(-1);
  const [product, setProduct] = useState({
    name: "",
    cat: "",
    price: "",
    description: "",
  });
  const [updatedProduct, setUpdatedProduct] = useState(null);
  const [originalProducts, setOriginalProducts] = useState(initialProducts);

  const addProduct = () => {
    const newProducts = [...products];
    newProducts.push(product);
    updateLocalStorage(newProducts);
    setProducts(newProducts);
    setOriginalProducts(newProducts);
  };

  const updateProduct = () => {
    const updatedProducts = products.map((prod, index) =>
      index === updatedProductIndex ? updatedProduct : prod
    );
    updateLocalStorage(updatedProducts);
    setProducts(updatedProducts);
    setOriginalProducts(updatedProducts);
    setUpdatedProduct(null);
    setUpdatedProductIndex(-1);
  };

  const deleteProduct = (deletedIndex) => {
    const updatedProducts = originalProducts.filter((prod, index) => index !== deletedIndex);
    updateLocalStorage(updatedProducts);
    setProducts(updatedProducts);
    setOriginalProducts(updatedProducts);
  };

  const filterProducts = (e) => {
    const value = e.target.value;
    const filteredProducts = originalProducts.filter((prod) =>
      prod.name.toLowerCase().includes(value.toLowerCase())
    );
    if (filteredProducts.length === 0) {
      Swal.fire({
        title: 'No Match Found',
        text: 'No products match your search input.',
        icon: 'error',
      });
    }
    setProducts(filteredProducts);
  };

  const handleChangeOfProduct = (e) => {
    const updatedProd = updatedProduct ? { ...updatedProduct, [e.target.name]: e.target.value } : { ...product, [e.target.name]: e.target.value };
    updatedProduct ? setUpdatedProduct(updatedProd) : setProduct(updatedProd);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatedProduct ? updateProduct() : addProduct();
  };

  const handleUpdatedProduct = (prod, index) => {
    initialzeProducts();
    setUpdatedProduct(prod);
    setUpdatedProductIndex(index);
  };

  const initialzeProducts = () => {
    const storedProducts = JSON.parse(localStorage.getItem(key)) || [];
    setProducts(storedProducts);
    setOriginalProducts(storedProducts);
  };

  return (
    <>
      <CreateProduct
        product={updatedProduct || product}
        handleChange={handleChangeOfProduct}
        handleSubmit={handleSubmit}
      >
        <button id="create-btn" className="btn btn-primary" onClick={() => {
          if (document.getElementById("create-btn").innerText === "Update Product") {
            Swal.fire({
              title: 'Product Updated',
              text: 'The product has been successfully updated.',
              icon: 'success',
            }).then((result) => {
              if (result.isConfirmed) {
                updateProduct();
              }
            });
          }
        }}>
          {updatedProduct ? "Update Product" : "Add Product"}
        </button>
      </CreateProduct>
      <SearchBar filterProducts={filterProducts} />
      {products.length > 0 ? (
        <ProductsTable
          products={products}
          handleUpdatedProduct={handleUpdatedProduct}
          deleteProductByIndex={deleteProduct}
        />
      ) : (
        <WariningMessage />
      )}
    </>
  );
}

export default App;
