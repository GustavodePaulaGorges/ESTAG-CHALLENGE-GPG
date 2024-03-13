import "../styles/components.css";
import SuiteLogo from "../../public/SuiteStorelight.svg";
import CartIcon from "../assets/cart.svg";
import ArrowIcon from "../assets/arrowDown.svg";
import BarrelRoll from "../media/barrelRoll.mp3";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../redux/actions/setCart";
import { Link } from "react-router-dom";

function NavHeader() {
  const [classState, setClass] = useState(false);
  const { currentCart } = useSelector((state) => state.cartReducer);
  // console.log(currentCart)
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const dispatch = useDispatch();

  async function play() {
    setClass(true);
    new Audio(BarrelRoll).play();

    await delay(950);
    setClass(false);
  }

  const handleOpenCart = () => {
    dispatch(setCart(!currentCart));
  };

  return (
    <>
      <nav>
        <div className="navItems">
          <img
            onDoubleClick={() => play()}
            className={classState && "rotate"}
            id="NavLogo"
            src={SuiteLogo}
            alt="Suite Store Logo"
          />
          <div className="NavLinks">
            <Link to="/">Home</Link>
            <Link to="/admin">Cadastrar Produtos</Link>
            {/* !!!!!!! Fazer um IF pra caso n esteja logado aparecer o LOGIN/CADASTRO, e se tiver aparecer um link pro perfil !!!!!*/}
            <Link to="#0">Log-in/Cadastro</Link>
            <Link to="/history">Histórico</Link>
          </div>
          <div className="cartBtn" onClick={handleOpenCart}>
            <img className="NavIcon" src={CartIcon} />
            <img
              className={currentCart ? "NavIcon r180" : "NavIcon"}
              src={ArrowIcon}
            />
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavHeader;
