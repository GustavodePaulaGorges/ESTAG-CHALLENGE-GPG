import { useState, useEffect } from "react";
import OrderInfo from "./orderInfo";
import Order_ItemService from "../../services/order_items";
function OrderHistory({ order }) {
  const [order_items, setOrder_Items] = useState([]);
  const [selectedOrder_items, setselectedOrder_Items] = useState([]);
  
  async function getOrderItems() {
    await Order_ItemService.getAllOrder_Items().then(async (res) => {
      setOrder_Items(res)
      const filteredItems = await res.filter((item) => item.order_code == order.code)
      setselectedOrder_Items(filteredItems)
    })
  }


  useEffect(() => {
    getOrderItems();
  }, []);

  return (
    <>
      <div className="OrderWrap">
        <div className="orderTitle">
          <h4>#{order.code})</h4>
          <h3>Total: {order.total}</h3>
          <h3>Tax: {order.tax}</h3>
        </div>
        <div className="barBody OrderItems">
          {/* <div className="espaco"></div> */}
          {selectedOrder_items.length >= 1 ? (
            selectedOrder_items?.map((item) => (
              <OrderInfo key={item.code} item={item} />
            ))
          ) : (
            <h1>Não há nenhum item nesse pedido...?</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default OrderHistory;
