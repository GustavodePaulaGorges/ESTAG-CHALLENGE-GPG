import OrderInfo from "./orderInfo";
function OrderHistory() {
  return (
    <>
      <div className="OrderWrap">
        <div className="orderTitle">
        <h4>001)</h4>
        <h3>Total: 14.50</h3>
        </div>
        <div className="barBody OrderItems">
          <OrderInfo />
          <OrderInfo />
          <OrderInfo />
          <OrderInfo />
          <OrderInfo />
          <OrderInfo />
        </div>

      </div>
    </>
  );
}

export default OrderHistory