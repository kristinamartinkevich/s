import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { createSubscription } from '../../utils/apiService';
import { useLoadingStore, useSubscriptionStore } from '../../../../store';

const AddSubscriptionsButton = (props: any) => {
  const { setSubscriptionData } = useSubscriptionStore();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { customerId, priceId } = props;
  const { isAppLoading, setIsAppLoading } = useLoadingStore();

  const addSubscription = () => {
    setIsAppLoading(true);
    createSubscription(customerId, priceId)
      .then(subscription => {
        setSubscriptionData(subscription);
        return subscription;
      })
      .then(subscription => {
        setIsAppLoading(false);
        if (subscription) {
          navigate('/profile/subscribe', { state: { subscriptionData: subscription } });
        }
      })
      .catch(error => {
        setIsAppLoading(false);
        console.error('Error creating subscription:', error);
      });
  };

  return (
    <button className='primary-button' onClick={addSubscription} disabled={isAppLoading}>
      {t('select')}
    </button>
  );

}

export default AddSubscriptionsButton;