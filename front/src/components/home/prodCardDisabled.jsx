import { cartAddProduct } from "../../redux/actions/setCartInfo";
import { useState } from "react";
import { useDispatch } from "react-redux";

function prodCardDisabled({ product }) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");

  const handleProductClick = () => {
    alert(product.name + " está indisponivel no momento...")
  };
  console.log(parseInt(amount));
  return (
    <>
      <div className="ProdCard indis">
        <img className="ProdImg" src={product.image}></img>
        <div className="ProdInfo">
          <span className="prodName">{product.name}</span>
          <span>R$ {product.taxed_price} <span className="taxPrice">({product.tax_price})</span></span>
          <button className="indisBtn" onClick={handleProductClick}>
            Produto indisponível :,(
          </button>
        </div>
      </div>
    </>
  );
}

export default prodCardDisabled;
