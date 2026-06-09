import "./Header.css";
import profile from '../../assets/images/admin-profile.png'
import bell from '../../assets/images/bell-icon.png'

const Header = () => {
  return (
    <header className="header">
      <div />
      <div className="header-user">
        <div className="bell">
          <img src={bell} alt="bell"/>
        </div>
        <div className="profile">
          <img src={profile} alt="profile"/>
        </div>
      </div>
    </header>
  );
};

export default Header;