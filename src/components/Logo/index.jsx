import "./logo.css";
import logo from "./logo.png";

export const Logo = () => {
  return (
    <div className="logo">
      <img src={logo} alt="Logo CiriFood" className="logo-img" />
    </div>
  );
};
