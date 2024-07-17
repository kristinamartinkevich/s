import { useNavigate } from 'react-router-dom';
import { fetchProduct, fetchSubscriptions, updateSubscription } from '../../utils/apiService';
import { useTranslation } from 'react-i18next';
import { useLoadingStore, useSubscriptionStore } from '../../../../store';

const UpdateSubscriptionButton = (props: any) => {
  const navigate = useNavigate();
  const { setIsPlanUpdated, setSubscriptions, setActivePlan } = useSubscriptionStore();
  const { t } = useTranslation();
  const { priceId, subscriptionId } = props;
  const { isAppLoading, setIsAppLoading } = useLoadingStore();

  const handleUpdate = () => {
    setIsAppLoading(true);

    updateSubscription(priceId, subscriptionId)
      .then(updatedSubscription => {
        setIsPlanUpdated(updatedSubscription);
        return updatedSubscription;
      })
      .then(updatedSubscription => {

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
          .then(() => {
            setIsAppLoading(false)
            if (updatedSubscription) {
              navigate('/profile');
            }
          })
          .catch(error => {
            setIsAppLoading(false);
            console.error('Error updating subscription:', error);
          });
      })
      .catch(error => {
        setIsAppLoading(false);
        console.error('Error updating subscription:', error);
      });
  };

  return (
    <button className='primary-button' onClick={handleUpdate} disabled={isAppLoading}>
      {t('select')}
    </button>
  )
}

export default UpdateSubscriptionButton;