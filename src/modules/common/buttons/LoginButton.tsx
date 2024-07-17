import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const { t } = useTranslation();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/profile',
      },
      authorizationParams: {
        prompt: 'login',
      },
    });
  };

  return (
    <button className='light-button mx-2' onClick={handleLogin}>
      {t('login')}
    </button>
  )
}

export default LoginButton;