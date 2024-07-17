import { useEffect } from 'react';
import { fetchPrices } from '../utils/apiService';
import { useLocation } from 'react-router';
import AddSubscriptionsButton from './buttons/AddSubscriptionsButton';
import { useTranslation } from 'react-i18next';
import { useLoadingStore, useSubscriptionStore } from '../../../store';

function Prices() {
  const { prices, setPrices } = useSubscriptionStore();
  const { setIsAppLoading } = useLoadingStore();
  const { state } = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    setIsAppLoading(true)
    fetchPrices()
      .then(prices => {
        setPrices(prices);
      }).then(() => setIsAppLoading(false))
  }, [setPrices]);

  return (
    <div className="row justify-content-center">
      {prices.map((price: any) => {
        return (
          <div key={price.id} className="shadow-lg col-3 price-card ms-3 p-4">
            <div className='main-text row'>{price.product.name}</div>
            <h5 className='secondary-text row mb-4'>€ {price.unit_amount / 100} / {t('per-month')}</h5>
            <div className='row'>
              <div className='col-6'>
                <AddSubscriptionsButton customerId={state?.customer.id} priceId={price.id} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default Prices;