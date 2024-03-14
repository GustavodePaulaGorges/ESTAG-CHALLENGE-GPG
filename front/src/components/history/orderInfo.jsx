import { useState, useEffect } from "react";
import ProductService from "../../services/products";

function OrderInfo({item}) {
  const [products, setProducts] = useState([]);
  const [selectedProd, setSelectedProduct] = useState({})

  async function getProducts() {
    await ProductService.getAllProducts().then(async (res) => {
      setProducts(res)
      const selectedProduct = res.find((product) => product.code === item.product_code)
      console.log(res)
      setSelectedProduct(selectedProduct)
    })
  }


  useEffect(() => {
    getProducts();
  }, []);


  
  return (
    <>
      <div className="cartRow">
        <div className="textImg">
          <span>{selectedProd.name}</span>
        </div>
        <span>{item.amount} unidade(s)</span>
        <span>R${item.price}</span>
        <div className="dropdown">
            <img
              src={selectedProd.image}
              className="ProductImg"
            ></img>
            <div className="dropdown-content">
              <img
                src={selectedProd.image}
                className="ProdImgExpanded"
              ></img>
            </div>
          </div>
      </div>
    </>
  );
}
export default OrderInfo;
