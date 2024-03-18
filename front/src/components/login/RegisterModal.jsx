import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLogin } from "../../redux/actions/setLogin";

import Arrow from "../../assets/login/Vectorarrow.svg";
import Door from "../../assets/login/Vectordoor.svg";
import LoginService from "../../services/login";
import registerService from "../../services/register";

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
  const [f_name, setF_name] = useState("");
  const [l_name, setL_name] = useState("");

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

  const postRegister = async (e) => {
    e.preventDefault();
    let form = new FormData();
    let code = Math.random().toString(16).slice(2)
    form.append("code", code);
    form.append("f_name", f_name);
    form.append("l_name", l_name);
    form.append("email", email);
    form.append("password", password);
    let response = await registerService.postRegister(form);
    if (response == true) {
      postLogin(e)
    }
  };

  return (
    <>
      <div className="loginBg">
        <div className="loginWrapper">
          <h1 className="loginHead">Entre para a família Suite Store!</h1>

          <form
            className="registerForm"
            onSubmit={(e) => {
              e.preventDefault();
              postRegister(e);
            }}
          >
            <div className="registerInfo">
              <div>
                <label htmlFor="catName">Nome:</label>
                <input
                  className="loginInput"
                  type="text"
                  onChange={(e) => {
                    setF_name(e.target.value);
                  }}
                ></input>
              </div>

              <div>
                <label htmlFor="catTax">Sobrenome:</label>
                <input
                  className="loginInput"
                  type="text"
                  onChange={(e) => {
                    setL_name(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                <label htmlFor="catTax">Email:</label>
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
            <div className="RegisterWrap">
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
            <Link className="newHereLink" to="/">
              Já é da família?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default loginModal;
