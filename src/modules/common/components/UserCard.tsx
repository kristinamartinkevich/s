import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { fetchProduct, fetchSubscriptions } from '../../profile/utils/apiService';
import { useLoadingStore, useSubscriptionStore } from '../../../store';
import { useTranslation } from 'react-i18next';

const UserCard = () => {
  const { user } = useAuth0();
  const { setSubscriptions, activePlan, setActivePlan, isCancelled } = useSubscriptionStore();
  const { setIsAppLoading } = useLoadingStore();
  const { t } = useTranslation();


  if (!user) {
    return null;
  }

  useEffect(() => {
    setIsAppLoading(true);
    fetchSubscriptions()
      .then(subscriptions => {
        const activeSubscriptions = subscriptions.filter((subscription: any) => subscription.status === 'active');
        setSubscriptions(activeSubscriptions);
        return activeSubscriptions.length > 0 ? activeSubscriptions[0].plan.product : null;
      })
      .then(productId => {
        if (productId)
          fetchProduct(productId)
            .then(product => setActivePlan(product.description))
      })
      .then(() => setIsAppLoading(false))

  }, [setSubscriptions, isCancelled, setActivePlan]);

  return (
    <div className='row justify-content-between align-items-center profile-info shadow-sm my-3 mx-1'>
      <div className='col-auto d-flex align-items-center'>
        <div className='col-auto'>
          <img src={user.picture} alt="Profile" className='profile-pic rounded-circle' />
        </div>
        <div className='col-auto mx-2'>
          <div className='fw-bold main-text'>{user.name}</div>
          <div className='secondary-text'>@{user.nickname}</div>
        </div>
      </div>
      <div className={"col-auto subscription-plan " + (activePlan.toLowerCase())}>{t(activePlan.toLowerCase())}
      </div>
    </div>
  )
}

export default UserCard;