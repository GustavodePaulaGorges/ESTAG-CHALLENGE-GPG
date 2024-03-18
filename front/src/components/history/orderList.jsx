import { useState, useEffect } from "react";
import OrderHistory from "./orderHistory";
import LoginService from "../../services/login";

import OrderServie from "../../services/orders";
function OrderList() {
  const [orders, setOrders] = useState([]);
  const firstName = localStorage.getItem("f_name");

  const postLogout = async (e) => {
    e.preventDefault();
    await LoginService.postLogout();
    window.location.reload();
  };

  async function getOrders() {
    const data = await OrderServie.getAllOrders();
    setOrders(data);
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <div className="orderWrap">
        <div className="orderBox">
          <h2>Histórico de compras de {firstName}</h2>
          <button onClick={postLogout}>Log-Out</button>
          <h3>Histórico de Compras:</h3>
          <div className="orderList">
            {orders.length >= 1 ? (
              orders.map((order) => (
                <OrderHistory key={order.code} order={order} />
              ))
            ) : (
              <h1>Não foram realizados pedidos ainda...</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default OrderList;
