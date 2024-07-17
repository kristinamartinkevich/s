const apiServerUrl: string | undefined = import.meta.env.VITE_API_SERVER_URL;

const clientId = import.meta.env.VITE_AUTH0_M2MCLIENT_ID;
const clientSecret = import.meta.env.VITE_AUTH0_M2M_CLIENT_SECRET;
const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
const auth0Audience = `https://${auth0Domain}/api/v2/`;

export const fetchPrices = async () => {
    try {
        const { prices } = await fetch(`${apiServerUrl}/config`).then((r) =>
            r.json()
        );
        return prices;
    } catch (error) {
        console.error('Error fetching prices:', error);
        throw error;
    }
};

export const createSubscription = async (customerId: any, priceId: any) => {
    try {
        const response = await fetch(`${apiServerUrl}/create-subscription`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                priceId,
                customer: customerId,
            }),
        });
        const { subscriptionId, clientSecret } = await response.json();
        return { subscriptionId, clientSecret };
    } catch (error) {
        console.error('Error creating subscription:', error);
        throw error;
    }
};


export const confirmPayment = async (
    stripe: any,
    clientSecret: string,
    cardElement: any,
    name: string
) => {
    if (!stripe || !cardElement) {
        return { error: 'Stripe or card element not available', intent: null };
    }

    try {
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: name,
                },
            },
        });

        if (error) {
            return { error: error.message, intent: null };
        }

        return { errorr: null, paymentIntent };
    } catch (error) {
        console.error('Error confirming card payment:', error);
        return { error: 'An error occurred during payment confirmation', intent: null };
    }
};

export const createCustomer = async (user: any) => {
    try {
        const { customer } = await fetch(`${apiServerUrl}/create-customer`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: user.nickname,
                email: user.email,
            }),
        })
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                return result;
            });

        return customer;
    } catch (error) {
        console.error('Error creating customer:', error);
        throw error;
    }
};

export const cancelSubscription = async (subscriptionId: string) => {
    try {
        await fetch(`${apiServerUrl}/cancel-subscription`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subscriptionId: subscriptionId,
            }),
        })
            .then((response) => {
                return response.json();
            })

        return true;
    } catch (error) {
        console.error('Error canceling subscription:', error);
        throw error;
    }
};

export const fetchSubscriptions = async () => {
    try {
        const { subscriptions } = await fetch(
            `${apiServerUrl}/subscriptions`
        ).then((r) => r.json());
        return subscriptions.data;
    } catch (error) {
        console.error('Error fetching subscription:', error);
        throw error;
    }
};

export const updateSubscription = async (priceId: any, subscriptionId: any) => {
    try {
        await fetch(`${apiServerUrl}/update-subscription`, {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                subscriptionId: subscriptionId,
                newPriceId: priceId,
            }),
        })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                return response;
            });

        return true;
    } catch (error) {
        console.error('Error updating subscription:', error);
        throw error;
    }
};

export const fetchProduct = async (productId: string) => {
    try {
        const { product } = await fetch(
            `${apiServerUrl}/products/${productId}`)
            .then((response) => {
                return response.json();
            })
        return product;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};

export const fetchCustomer = async (cusId: string) => {
    try {
        const { customer } = await fetch(
            `${apiServerUrl}/customers/${cusId}`)
            .then((response) => {
                return response.json();
            })
        return customer;
    } catch (error) {
        console.error('Error fetching customer:', error);
        throw error;
    }
};

export const getToken = async () => {

    try {
        const response = await fetch(`https://${auth0Domain}/oauth/token`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                grant_type: 'client_credentials',
                client_id: clientId,
                client_secret: clientSecret,
                audience: auth0Audience
            })
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching token:', error);
        throw error;
    }
};


export const updateUsersStripeCustomerId = async (userId: string, cusId: string) => {
    const token = await getToken();
    let newUser;
    if (token && token.access_token) {
        try {
            await fetch(`${auth0Audience}users/${userId}`, {
                method: 'PATCH',
                headers: {
                    authorization: `${token.token_type} ${token.access_token}`,
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    user_metadata: { stripeCusId: cusId }
                }),
            })
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    newUser = response;
                    return response;
                });

            return newUser;
        } catch (error) {
            console.error('Error registering customers:', error);
            throw error;
        }
    }
};
