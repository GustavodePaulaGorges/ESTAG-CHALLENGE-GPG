import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLogin } from "../../redux/actions/setLogin";

import Arrow from "../../assets/login/Vectorarrow.svg";
import Door from "../../assets/login/Vectordoor.svg";
import LoginService from "../../services/login";

function loginModal() {
  const { loggedIn } = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();

  const handleLogIn = () => {
    dispatch(setLogin(!loggedIn));
  };

  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postLogin = async (e) => {
    e.preventDefault();
    let form = new FormData();
    form.append("email", email);
    form.append("password", password);
    let response = await LoginService.postLogin(form);
    if (response == true) {
      handleLogIn();
      window.location.reload();
    }
  };

  return (
    <>
      <div className="loginBg">
        <div className="loginWrapper">
          <h1 className="loginHead">Bem vind<span className="main">@</span> de volta à Suite Store!!</h1>

          <form
            className="loginForm"
            onSubmit={(e) => {
              e.preventDefault();
              postLogin(e);
            }}
          >
            <div className="loginInfo">
              <div>
                <label htmlFor="catName">Email:</label>
                <input
                  className="loginInput"
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>
              </div>

              <div>
                <label htmlFor="catTax">Senha:</label>
                <input
                  className="loginInput"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></input>
              </div>
            </div>

            <div>
              <button
                className="BtnLogIn"
                onMouseEnter={toggleHover}
                onMouseLeave={toggleHover}
              >
                <div className="BtnIcoIn">
                  <img
                    className={hovered ? "BtnArrow ArrowAnimate" : "BtnArrow"}
                    src={Arrow}
                  ></img>
                  <img className="BtnDoor" src={Door}></img>
                </div>
              </button>
            </div>
          </form>
          <div className="newHere">
            <Link className="newHereLink" to="/register">Novo aqui?</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default loginModal;
