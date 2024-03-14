import { cartAddProduct } from "../../redux/actions/setCartInfo";
import { useState } from "react";
import { useDispatch } from "react-redux";

function prodCard({ product }) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");

  const handleProductClick = () => {
    if (amount <= 0) {
      alert("Selecione uma quantidade válida");
    } 
    
    else {
      if (amount > product.amount) {
        alert("Quantidade de " + product.name + " indisponível em estoque")
      }
      else {
        dispatch(cartAddProduct({ ...product, quantity: parseInt(amount) }));
      }
      
    }
  };
  console.log(parseInt(amount));
  return (
    <>
      <div className="ProdCard">
        <img className="ProdImg" src={product.image}></img>
        <div className="ProdInfo">
          <span className="prodName">{product.name}</span>
          <span>R$ {product.taxed_price} <span className="taxPrice">({product.tax_price})</span></span>
          <span className="invisible text">Quantidade:</span>
          <input
            className="invisible input" id="AmntInput"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            type="number"
            min={1}
          ></input>
          <button className="invisible button" onClick={handleProductClick}>
            Adicionar
          </button>
        </div>
      </div>
    </>
  );
}

export default prodCard;
