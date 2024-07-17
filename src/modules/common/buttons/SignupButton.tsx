import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';

const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();
  const { t } = useTranslation();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/profile',
      },
      authorizationParams: {
        prompt: 'login',
        screen_hint: 'signup',
      },
    });
  };

  return (
    <button className='light-button' onClick={handleSignUp}>
      {t('signup')}
    </button>
  )
}

export default SignupButton;