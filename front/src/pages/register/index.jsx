import "../../styles/global.css";
import RegisterModal from "../../components/login/RegisterModal";

function Register() {
  return (
    <>
      <div className="mainBody">
        <div className="w100">
          <main>
            <RegisterModal />
          </main>
        </div>
      </div>
    </>
  );
}

export default Register;
