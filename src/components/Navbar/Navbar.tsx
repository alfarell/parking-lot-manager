import { NavLink } from "react-router";
import "./Navbar.css";
import { IoMdMenu } from "react-icons/io";
import { useState } from "react";

interface Menu {
  id: string;
  label: string;
  path: string;
}

const navigations: Menu[] = [
  {
    id: "home",
    label: "Home",
    path: "/",
  },
  {
    id: "parking-list",
    label: "Daftar Parkir",
    path: "/parking-list",
  },
  {
    id: "transaction-list",
    label: "Daftar Transaksi",
    path: "/transaction-list",
  },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <nav className='base-navbar'>
      <div className='navbar-fixed-wrapper'>
        <div className='navbar-container'>
          <NavLink to='/'>
            <span className='navbar-title'>Parkirin</span>
          </NavLink>
          <div
            className='navbar-menu-button'
            onClick={() => setShowMenu((prevState) => !prevState)}
          >
            <IoMdMenu />
          </div>
          <div className='navbar-menu' data-show={showMenu}>
            <ul className='navbar-menu-list'>
              {navigations.map((item) => {
                return (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    className={({ isActive }) => {
                      let classList = "navbar-menu-item";
                      if (isActive) classList += " menu-active";
                      return classList;
                    }}
                  >
                    {item.label}
                  </NavLink>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
