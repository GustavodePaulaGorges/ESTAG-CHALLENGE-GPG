import { useState } from "react";
import Arrow from "../../assets/login/Vectorarrow.svg";
import Door from "../../assets/login/Vectordoor.svg";
function loginModal() {
  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);
  return (
    <>
      <div className="loginBg">
        <div className="loginWrapper">
          <h1 className="loginHead">Bem vind@ de volta à Suite Store!!</h1>

          <form className="loginForm">
            <div className="loginInfo">
              <div>
                <label for="catName">Email:</label>
                <input className="loginInput" type="email"></input>
              </div>

              <div>
                <label for="catTax">Senha:</label>
                <input className="loginInput" type="password"></input>
              </div>
            </div>

            <div>
              <button
                className="BtnLogIn"
                onMouseEnter={toggleHover}
                onMouseLeave={toggleHover}
              >
                <div className="BtnIcoIn">
                  <img className={hovered ? "BtnArrow ArrowAnimate" : "BtnArrow"}  src={Arrow}></img>
                  <img className="BtnDoor" src={Door}></img>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default loginModal;
