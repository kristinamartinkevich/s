import { useAuth0 } from '@auth0/auth0-react';
import '../../../i18n/config';

function Profile() {
  const { user } = useAuth0();

  if (!user) {
    return null;
  }

  return (
    <div className='row align-items-center'>
      <div className='col-auto'>
        <img src={user.picture} className='rounded-circle' height="50px" />
      </div>
      <div className='col-3'>
        <span className='h2'>{user.nickname}</span>
      </div>
    </div>
  )
}

export default Profile;