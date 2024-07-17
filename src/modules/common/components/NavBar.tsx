import { useAuth0 } from '@auth0/auth0-react';
import logo from '../../../assets/logo.svg';
import LoginButton from '../buttons/LoginButton';
import SignupButton from '../buttons/SignupButton';
import SideNav from './SideNav';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const { isAuthenticated } = useAuth0();
  const NavBarButtons = () => (
    <div className='d-flex align-items-center col-auto'>
      <div className='mx-2'>
        {!isAuthenticated ? (
          <>
            <LoginButton />
            <SignupButton />
          </>
        ) : (
          <SideNav />
        )}
      </div>
    </div>
  );


  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <Link className="navbar-brand p-3 " to="/">
            <img src={logo} alt="S" height="60" />
          </Link>
          <ul className="navbar-nav">
            <li>
              <NavBarButtons />
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default NavBar;
