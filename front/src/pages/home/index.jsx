import { useState, useEffect } from "react";

import ProductService from "../../services/products";
import CategoryService from "../../services/categories";

import NavHeader from "../../components/NavHeader";
import ProductsList from "../../components/home/productsList";
import CartBar from "../../components/CartBar";

import "../../styles/global.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    const data = await CategoryService.getAllCategories();
    setCategories(data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  async function getProducts() {
    const data = await ProductService.getAllProducts();
    setProducts(data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <NavHeader />
      <div className="mainBody">
        <div className="w100">
          <main>
            <ProductsList products={products} categories={categories} />
          </main>
        </div>

        <CartBar />
      </div>
    </>
  );
}

export default Home;
