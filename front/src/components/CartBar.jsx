import "../styles/components.css";

import CheckMark from "../assets/checkIcon.svg";
import CartRow from "./CartRow";
import { useSelector } from "react-redux";
import OrderService from "../services/orders";
import Order_ItemService from "../services/order_items";
import rootReducer from "../redux/root-reducer";
import {
  selectProdTax,
  selectProdTotal,
} from "../redux/selectors/cartSelector";

function CartBar() {
  const { currentCart } = useSelector((state) => state.cartReducer);

  const productsTotal = useSelector(selectProdTotal);
  const productsTax = useSelector(selectProdTax);
  const { products } = useSelector(
    (rootReducer) => rootReducer.cartInfoReducer
  );

  const code = Math.random().toString(16).slice(2);
  
  const finishOrderItems = async (product) => {
    let formItem = new FormData();
      formItem.append("order_code", code);
      formItem.append("prod_code", product.code);
      formItem.append("amount", product.quantity);
      await Order_ItemService.postOrder_Item(formItem)
  }

  const finishPurchase = async (e) => {
    e.preventDefault();
    let formOrder = new FormData();
    formOrder.append("code", code);
    formOrder.append("total", productsTotal);
    formOrder.append("tax", productsTax);
    await OrderService.postOrder(formOrder);

    products.forEach(product => {
      finishOrderItems(product)
      console.log(code)
    });
    window.location.reload()

    alert("Pedido de código #" + code + " foi finalizado e pode ser lido no histórico!")
  };


  return (
    <>
      <div className={currentCart ? "space" : "hidden"} id="spacer"></div>
      <div className={currentCart ? "collapse" : "hidden"} id="cartBar">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            finishPurchase(e);
          }}
          className="barHead"
        >
          <h4>Total: R$ {productsTotal.toFixed(2)}</h4>
          <h4>Taxa: R$ {productsTax.toFixed(2)}</h4>
          <button className="FinishBuy">
            Finalizar Compra <img className="btnIcon" src={CheckMark}></img>
          </button>
        </form>
        <div className="barBody">
          <div className="gridTemp">
            <span className="name">Nome do Produto</span>
            <span className="qtdtotal">quantidade</span>
            <span className="qtdtotal">Total ($)</span>
          </div>

          {products.map((product) => (
            <>
              <CartRow key={product.code} product={product} />
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default CartBar;
