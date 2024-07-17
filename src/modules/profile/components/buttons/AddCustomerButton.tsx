import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { createCustomer, updateUsersStripeCustomerId, fetchCustomer } from '../../utils/apiService';
import { useTranslation } from 'react-i18next';
import { useLoadingStore, useSubscriptionStore } from '../../../../store';

const AddCustomerButton = () => {
    const { t } = useTranslation();
    const { user } = useAuth0();
    const navigate = useNavigate();
    const { setCustomer, userCustomerID, setUserCustomerID } = useSubscriptionStore();
    const { isAppLoading, setIsAppLoading } = useLoadingStore();

    if (!user) {
        return
    }

    const addSub = async () => {
        if (user.stripeCusId) {
            setUserCustomerID(user.stripeCusId);
        }
        if (userCustomerID) {
            const costumer = await fetchCustomer(userCustomerID);
            if (!costumer.deleted) {
                if (user.sub) {
                    updateUsersStripeCustomerId(user.sub, costumer.id).then(() => {
                        navigate('/prices', { state: { customer: costumer } });
                    })
                }
            }
        }
        else {
            await addCustomer();
        }
    }

    const addCustomer = async () => {
        setIsAppLoading(true);
        await createCustomer(user)
            .then(createdCustomer => {
                setCustomer(createdCustomer);
                return createdCustomer;
            })
            .then(async createdCustomer => {
                const newCus = await updateUsersStripeCustomerId(user?.sub, createdCustomer.id);
                setUserCustomerID(newCus.user_metadata.stripeCusId);
                setIsAppLoading(false);
                if (createdCustomer && userCustomerID) {
                    navigate('/prices', { state: { customer: createdCustomer } });
                }
            })
            .catch(error => {
                setIsAppLoading(false);
                console.error('Error creating customer:', error);
            });
    };

    return (
        <button className='primary-button shadow-md' onClick={addSub} disabled={isAppLoading}>
            {t('new-subscription')}
        </button>
    );

}

export default AddCustomerButton;