import { useState, useEffect } from "react";
import OrderHistory from "./orderHistory";

import OrderServie from "../../services/orders";


function OrderList() {
  const [orders, setOrders] = useState([]);

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
          <h3>Histórico de Compras:</h3>
          <div className="orderList">
            {orders.length >= 1 ? (
              orders.map((order) => (
                <OrderHistory key={order.code} order={order} />
              ))
            ) : (
              <h1>Não foram realiazidos pedidos ainda...</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default OrderList;
