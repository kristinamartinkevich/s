import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSubscriptionStore } from '../../../../store';

const ChangeSubscriptionButton = (props: any) => {
  const { t } = useTranslation();
  const { subscriptionId, currentPlan } = props;
  const navigate = useNavigate();
  const { subscriptionToUpdate, setSubscriptionToUpdate } = useSubscriptionStore();

  const handleUpdate = () => {
    setSubscriptionToUpdate({
      subscriptionId: subscriptionId,
      currentPlan: currentPlan,
    });
    if (subscriptionToUpdate) {
      navigate('/profile/update-subscription', { state: { subscriptionToUpdate } })
    }
  };

  return (
    <button className="primary-button" onClick={handleUpdate}>
      {t('change')}
    </button>
  )
}

export default ChangeSubscriptionButton;