import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchPrices } from '../utils/apiService';
import { useTranslation } from 'react-i18next';
import UpdateSubscriptionButton from './buttons/UpdateSubscriptionButton';
import { useLoadingStore, useSubscriptionStore } from '../../../store';

function UpdateSubscription() {
  const { state } = useLocation();
  const { setPrices, prices } = useSubscriptionStore();
  const { setIsAppLoading } = useLoadingStore();
  const { t } = useTranslation();

  useEffect(() => {
    setIsAppLoading(true);
    fetchPrices()
      .then(prices => {
        setPrices(prices);
      }).then(() => setIsAppLoading(false))
  }, [setPrices]);


  const isCurrentPlan = (priceId: any): boolean => {
    return priceId === state?.subscriptionToUpdate.currentPlan
  };

  return (
    <div className="row justify-content-center">
      {prices.map((price: any) => {
        return (
          <div
            key={price.id}
            className={`shadow-sm col-2 price-card ms-3 main-text  ${isCurrentPlan(price.id) ? "current-plan" : 'other-plan'}`}>

            <span className='fw-bold main-text'> {price.product.description}</span>
            <div className='secondary-text'>
              ${price.unit_amount / 100} {t('per-month')}</div>

            <div className='row justify-content-center mt-auto'>
              <div className='col-auto'>
                {!isCurrentPlan(price.id) && (
                  <UpdateSubscriptionButton priceId={price.id}
                    subscriptionId={state?.subscriptionToUpdate.subscriptionId} />
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default UpdateSubscription;