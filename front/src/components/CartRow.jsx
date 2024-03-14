import RemoveItem from "../assets/RemoveItem.svg";
import { useDispatch } from "react-redux";
import {
  cartRemoveProduct,
  cartIncreaseProduct,
  cartDecreaseProduct,
} from "../redux/actions/setCartInfo";
import ArrowIcon from "../assets/arrowDownD.svg";

function CartRow({ product }) {
  const dispatch = useDispatch();

  const handleRemoveClick = () => {
    dispatch(cartRemoveProduct(product.code));
  };

  const handleIncreaseClick = () => {
    dispatch(cartIncreaseProduct(product.code));
  };

  const handleDecreaseClick = () => {
    dispatch(cartDecreaseProduct(product.code));
  };
  return (
    <>
      <div className="cartRow">
        <div className="textImg">
          <img src={product.image} className="cartImg"></img>
          <span> {product.name} </span>
        </div>
        <div className="QntyInfo">
          <img
            src={ArrowIcon}
            className="r180"
            onClick={handleIncreaseClick}
          ></img>
          {product.quantity}

          <img onClick={handleDecreaseClick} src={ArrowIcon}></img>
        </div>
        <span>R$ {product.taxed_price}</span>
        <button className="remove" onClick={handleRemoveClick}>
          <img src={RemoveItem} className="btnIcon"></img>
        </button>
      </div>
    </>
  );
}
export default CartRow;
