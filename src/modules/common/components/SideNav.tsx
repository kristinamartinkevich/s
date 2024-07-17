import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import UserCard from './UserCard';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import LanguageSwitchButton from '../buttons/LanguageSwitchButton';
import ThemeToggle from './ThemeToggle';

const SideNav = () => {
  const { logout } = useAuth0();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <>
      <button className="icon-button shadow-sm" data-bs-toggle="offcanvas" data-bs-target="#sideNav">
        <MenuIcon className='icon' fontSize='large' />
      </button>

      <div className="offcanvas offcanvas-end" tabIndex={-1} id="sideNav" aria-labelledby="sideNavLabel">
        <div className='row justify-content-end'>
          <span className='col-auto'><LanguageSwitchButton /></span>
          <span className='col-auto'><ThemeToggle /></span>
        </div>
        <UserCard />
        <div className="offcanvas-body">
          <span className='list-label row'>{t('account')}</span>
          <span className="list-item row shadow-sm" data-bs-dismiss="offcanvas" >
            <Link to="/profile">
              <PersonIcon className='icon' fontSize='large' />
              {t('account')}</Link></span>
          <span className="list-item row shadow-sm" data-bs-dismiss="offcanvas" >
            <Link to="/profile/subscription">
              <SubscriptionsIcon className='icon' fontSize='large' />
              {t('subscription')}</Link>
          </span>

        </div>
        <hr />
        <span className="list-item row logout shadow-sm ">
          <a onClick={handleLogout}>
            <LogoutIcon className='icon' fontSize='large' />
            {t('logout')}</a>
        </span>
      </div >
    </>
  )
}

export default SideNav;