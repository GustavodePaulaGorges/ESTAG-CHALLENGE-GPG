import "../../styles/global.css";
import LoginModal from "../../components/login/LoginModal";

function Login() {
  return (
    <>
      <div className="mainBody">
        <div className="w100">
          <main>
            <LoginModal />
          </main>
        </div>
      </div>
    </>
  );
}

export default Login;
