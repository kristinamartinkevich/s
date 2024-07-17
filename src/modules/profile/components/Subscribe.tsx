import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmPayment } from '../utils/apiService';
import { useTranslation } from 'react-i18next';
import { useLoadingStore, useSubscriptionStore, useThemeState } from '../../../store';
import { useEffect } from 'react';

const darkBase = {
  iconColor: '#fff',
  color: '#a3a2a6',
  fontWeight: '500',
  fontSize: '16px',
  fontSmoothing: 'antialiased',
  ':-webkit-autofill': {
    color: '#a3a2a6',
  },
  '::placeholder': {
    color: '#a3a2a6',
  }
}

const lightBase = {
  iconColor: '#adacb0',
  color: '#adacb0',
  fontWeight: '500',
  fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
  fontSize: '16px',
  fontSmoothing: 'antialiased',
  ':-webkit-autofill': {
    color: '#adacb0',
  },
  '::placeholder': {
    color: '#adacb0',
  }
}

function Subscribe() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { name, messages, setMessages, setName, setPaymentIntent } = useSubscriptionStore();
  const stripe = useStripe();
  const elements = useElements();
  const { isAppLoading, setIsAppLoading } = useLoadingStore();
  const { t } = useTranslation();
  const { isDark } = useThemeState();

  if (!stripe || !elements) {
    return null;
  }

  useEffect(() => {
    base = isDark ? darkBase : lightBase;
  }, [isDark]);

  let base = isDark ? darkBase : lightBase;

  useEffect(() => {
    setMessages('');
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsAppLoading(true);
    const cardElement = elements.getElement(CardElement);
    confirmPayment(stripe, state?.subscriptionData.clientSecret, cardElement, name)
      .then((result) => {
        const { error, paymentIntent } = result;
        if (error) {
          setIsAppLoading(false);
          setMessages(error);
          return;
        }
        setMessages('');
        setPaymentIntent(paymentIntent);
        return paymentIntent;
      })
      .then((paymentIntent) => {
        setIsAppLoading(false);
        if (paymentIntent && paymentIntent.status === 'succeeded') {
          navigate('/profile');
        }
      })
      .catch((error) => {
        setIsAppLoading(false);
        console.error('Error confirming payment:', error);
      });
  };


  return (
    <>
      <div className='row justify-content-center'>
        <h5 className="secondary-text col-6">
          <div>Test card:4242424242424242</div>
          <div>SCA:4000002500003155</div>
        </h5>
      </div>
      <div className="row justify-content-center">
        <div className="col-6 main-text payment-card col-6">
          <form onSubmit={handleSubmit}>
            <div className='row my-3'>
              <div className='col'>
                <input
                  placeholder={t('full-name')}
                  className='input'
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className='row my-4'>
              <div className='col'>
                <CardElement options={{
                  style: {
                    base: base
                  },
                }} />
              </div>
            </div>

            <div className='row mt-5'>
              <div className='col-auto'>
                <button className='primary-button' type='submit' disabled={isAppLoading}>
                  {t('subscribe')}
                </button>
                <div className='col-auto'>{messages}</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Subscribe;