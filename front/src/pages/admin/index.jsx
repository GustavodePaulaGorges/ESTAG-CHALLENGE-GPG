import { useState, useEffect } from "react";

import NavHeader from "../../components/NavHeader";
import ProdList from "../../components/admin/prodList";
import CatList from "../../components/admin/catList";
import CartBar from "../../components/CartBar";
import CatForm from "../../components/admin/catForm";
import ProdForm from "../../components/admin/prodForm";
import ProductService from "../../services/products";
import CategoryService from "../../services/categories";

import "../../styles/global.css";

function Admin() {
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
            <div className="adminList">
              <ProdForm categories={categories}/>
              <CatForm />
              <ProdList categories={categories} products={products} />
              <CatList categories={categories} />
            </div>
          </main>
        </div>
        <CartBar />
      </div>
    </>
  );
}

export default Admin;
