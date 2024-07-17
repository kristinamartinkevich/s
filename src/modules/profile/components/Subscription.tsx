import { useEffect } from 'react';
import AddCustomerButton from './buttons/AddCustomerButton';
import { fetchProduct, fetchSubscriptions } from '../utils/apiService';
import CancelSubscriptionButton from './buttons/CancelSubscriptionButton';
import ChangeSubscriptionButton from './buttons/ChangeSubscriptionButton';
import { useTranslation } from 'react-i18next';
import { useLoadingStore, useSubscriptionStore } from '../../../store';

function Subscription() {
  const { subscriptions, setSubscriptions, activePlan, setActivePlan, isCancelled } = useSubscriptionStore();
  const { isAppLoading, setIsAppLoading } = useLoadingStore();
  const { t } = useTranslation();

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

  const getDate = (currentPeriodEnd: any) => {
    return new Intl.DateTimeFormat('en-US').format(new Date(currentPeriodEnd * 1000)) || null
  }

  const renderSubscription = () => {
    return (
      <div className='row'>
        {subscriptions.map((subscription) => (
          <div key={subscription.id} className='col-4 card mt-5 p-4 border-0 shadow-sm'>
            <span className='row align-items-center mb-3'>
              <span className='col-auto main-text h4'>
                {t('current-plan')}
                <span className={activePlan.toLowerCase() + "-plan"}>
                  {activePlan} <span className='col-auto text-secondary'>
                    (${subscription.plan.amount / 100} {t('per-month')})
                  </span>
                </span>
              </span>
            </span>
            <span className='row align-items-center'>
              <span className='col-auto secondary-text'>
                {t('next-payment')} {getDate(subscription?.current_period_end)}
              </span>
            </span>

            <span className='row mt-4'>
              <span className='col-auto'>
                <CancelSubscriptionButton subscriptionId={subscription?.id} />
              </span>
              <span className='col-auto'>
                <ChangeSubscriptionButton subscriptionId={subscription?.id} currentPlan={subscription?.plan.id} />
              </span>
            </span>
          </div>
        ))}
      </div>
    )
  };

  return (
    <>
      {!isAppLoading && !subscriptions.length ? (
        <div className='row'>
          <div className='col-auto'>
            <AddCustomerButton />
          </div>
        </div>
      ) : <>
        {renderSubscription()}
      </>}
    </>
  )
}

export default Subscription;