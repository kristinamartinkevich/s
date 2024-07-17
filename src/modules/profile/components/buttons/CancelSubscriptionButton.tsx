import { cancelSubscription } from '../../utils/apiService';
import { useTranslation } from 'react-i18next';
import { useLoadingStore, useSubscriptionStore } from '../../../../store';

const CancelSubscriptionButton = (props: any) => {
  const { t } = useTranslation();
  const { setIsCancelled, setSubscriptions } = useSubscriptionStore();
  const subscriptionId = props.subscriptionId;
  const { isAppLoading, setIsAppLoading } = useLoadingStore();

  const handleCancel = () => {
    setIsAppLoading(true);
    cancelSubscription(subscriptionId)
      .then(subscriptionCancelled => {
        setIsCancelled(subscriptionCancelled);
        setSubscriptions([]);
        return subscriptionCancelled;
      })
      .then(subscriptionCancelled => {
        setIsAppLoading(false);
        if (subscriptionCancelled) {
          setIsCancelled(subscriptionCancelled);
          setSubscriptions([]);
        }
      })
      .catch(error => {
        setIsAppLoading(false);
        console.error('Error cancelling subscription:', error);
      });
  };

  return (
    <button className="light-button" onClick={handleCancel} disabled={isAppLoading}>
      {t('cancel')}
    </button>
  );
}

export default CancelSubscriptionButton;