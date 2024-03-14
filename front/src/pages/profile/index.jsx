
import NavHeader from "../../components/NavHeader";
import CartBar from "../../components/CartBar";
import OrderList from "../../components/history/orderList";
import "../../styles/global.css";

function Profile() {
  
  return (
    <>
      <NavHeader />
      <div className="mainBody">
        <div className="w100">
          <main>
            <div className="ProfileBody">
              <OrderList/>
            </div>
          </main>
        </div>
        <CartBar />
      </div>
    </>
  );
}

export default Profile;
