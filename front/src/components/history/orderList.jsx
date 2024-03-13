import OrderHistory from "./orderHistory";
function OrderList() {
  return (
    <>
      <div className="orderWrap">
        <div className="orderBox">
          <h3>Histórico de Compras:</h3>
          <div className="orderList">
            <OrderHistory />
            <OrderHistory />
            <OrderHistory />
            <OrderHistory />
          </div>
        </div>
      </div>
    </>
  );
}
export default OrderList;
