import "../styles/components.css";
import RemoveItem from "../assets/RemoveItem.svg";
import CheckMark from "../assets/checkIcon.svg";
import { useSelector } from "react-redux";

function CartBar() {
  const { currentCart } = useSelector((state) => state.cartReducer);

  return (
    <>
      <div className={currentCart ? "space" : "hidden"} id="spacer"></div>
      <div className={currentCart ? "collapse" : "hidden"} id="cartBar">
        <div className="barHead">
          <h4>Total: RS 150.00</h4>
          <h4>Taxa: RS 15.00</h4>
          <button className="FinishBuy">
            Finalizar Compra <img className="btnIcon" src={CheckMark}></img>
          </button>
        </div>
        <div className="barBody">
          <div className="gridTemp">
            <span className="name">Nome do Produto</span>
            <span className="qtdtotal">quantidade</span>
            <span className="qtdtotal">Total ($)</span>
          </div>
          <div className="cartRow">
            <div className="textImg">
              <img
                src="https://images.freeimages.com/images/large-previews/379/banana-1328691.jpg"
                className="cartImg"
              ></img>
              <span>NOME DO PRODUTO</span>
            </div>
            <input type="number" className="w-20"></input>
            <span>R$12.12</span>
            <button className="remove">
              <img src={RemoveItem} className="btnIcon"></img>
            </button>
          </div>
        </div>
        
      </div>
    </>
  );
}

export default CartBar;
