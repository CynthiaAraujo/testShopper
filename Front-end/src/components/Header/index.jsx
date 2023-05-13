import logo from "../../assets/logo_shopper.svg";
import "./styles.scss";

function Header({ nameUser, userIcon }) {
  return (
    <div className="headerContainer">
      <img className="logo" src={logo} alt="Logo Shopper" />
      <div className="user">
        <span>{nameUser}</span>
        <img src={userIcon} alt="User Icon" />
      </div>
    </div>
  );
}

export default Header;
