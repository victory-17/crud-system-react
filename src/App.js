import { useState } from "react";
import CreateProduct from "./CreateProudct";
import SearchBar from "./SearchBar";
import ProductsTable from "./ProductsTable";
import "./App.css";
import WariningMessage from "./WarningMessage";

//products
//data = index product to update

//state dy
//state private
// change state => re-render
// initilze state by props
// override state [object, array]
//take deep copy
//override copy
//pass new state to setState
// outside return state prev value => state mash
// use local storage

const key = "products";
const initialProducts = JSON.parse(localStorage.getItem(key)) || [];

const updateLocalStorage = (newProducts) => {
  localStorage.setItem(key, JSON.stringify(newProducts));
};
function App() {
  //state
  const [products, setProducts] = useState(initialProducts); //lifiting up
  //const [filteredProducts, setFilteredProducts] = useState([]);
  const [updatedProductIndex, setUpdatedProductIndex] = useState(-1);
  const [product, setProduct] = useState({
    name: "",
    cat: "",
    price: "",
    description: "",
  });
  const [updatedProduct, setUpdatedProduct] = useState(null);

  //effects

  //functions (handlers)
  const addProduct = () => {
    const newProducts = [...products];
    newProducts.push(product);
    updateLocalStorage(newProducts);
    setProducts(newProducts);
  };

  const updateProduct = () => {
    //copy
    const updatedProducts = products.map((product, index) => {
      if (index === updatedProductIndex) {
        return updatedProduct;
      } else {
        return product;
      }
    });
    //setState
    updateLocalStorage(updatedProducts);
    setProducts(updatedProducts);
    setUpdatedProduct(null);
    setUpdatedProductIndex(-1);
  };

  const deleteProduct = (deletedIndex) => {
    const updatedProducts = JSON.parse(localStorage.getItem(key)).filter(
      (product, index) => index !== deletedIndex
    );
    updateLocalStorage(updatedProducts);
    setProducts(updatedProducts);
  };

  const filterProducts = (e) => {
    const value = e.target.value;
    const filterProducts = products.filter((product) =>
      product.name.includes(value)
    );
    if (filterProducts.length === 0) {
      initialProducts();
      alert("there's no results!");
    } else {
      setProducts(filterProducts);
    }
  };

  const handleChangeOfProduct = (e) => {
    if (updatedProduct) {
      setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updatedProduct) {
      updateProduct();
    } else {
      addProduct();
    }
  };

  const handleUpdatedProduct = (productToProduct, index) => {
    initialzeProducts();
    setUpdatedProduct(productToProduct);
    setUpdatedProductIndex(index);
  };

  const initialzeProducts = () =>
    setProducts(
      (prevState) => [...JSON.parse(localStorage.getItem(key))] || []
    );
  return (
    <>
      <CreateProduct
        product={updatedProduct ? updatedProduct : product}
        handleChange={handleChangeOfProduct}
        handleSubmit={handleSubmit}
      >
        <button id="create-btn" className="btn btn-primary">
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
