import { create } from 'zustand';

export interface LoadingState {
    isAppLoading: boolean;
    setIsAppLoading: (loading: boolean) => void;
}

export interface ThemeState {
    isDark: boolean;
    setIsDark: (isDark: boolean) => void;
}

export interface SubscriptionState {
    userCustomerID: string;
    subscriptions: any[];
    subscriptionToUpdate: any | null;
    isCancelled: boolean;
    customer: any | null;
    name: string;
    messages: string;
    paymentIntent: any;
    prices: any[];
    subscriptionData: any | null;
    subscriptionId: string;
    currentPlan: string;
    isPlanUpdated: boolean;
    activePlan: string;
    setUserCustomerID: (userCustomerID: string) => void;
    setSubscriptions: (subscriptions: any[]) => void;
    setSubscriptionToUpdate: (subscription: any | null) => void;
    setIsCancelled: (isCancelled: boolean) => void;
    setCustomer: (customer: any | null) => void;
    setName: (name: string) => void;
    setMessages: (messages: string) => void;
    setPaymentIntent: (paymentIntent: any) => void;
    setPrices: (prices: any[]) => void;
    setSubscriptionData: (data: any | null) => void;
    setSubscriptionId: (id: string) => void;
    setCurrentPlan: (plan: string) => void;
    setIsPlanUpdated: (updated: boolean) => void;
    setActivePlan: (activePlan: string) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
    userCustomerID: '',
    subscriptions: [],
    subscriptionToUpdate: null,
    isCancelled: false,
    customer: null,
    name: '',
    messages: '',
    paymentIntent: null,
    prices: [],
    subscriptionData: null,
    subscriptionId: '',
    currentPlan: '',
    isPlanUpdated: false,
    activePlan: '',
    setUserCustomerID: (userCustomerID) => set({ userCustomerID }),
    setSubscriptions: (subscriptions) => set({ subscriptions }),
    setSubscriptionToUpdate: (subscription) => set({ subscriptionToUpdate: subscription }),
    setIsCancelled: (isCancelled) => set({ isCancelled }),
    setCustomer: (customer) => set({ customer }),
    setName: (name) => set({ name }),
    setMessages: (messages) => set({ messages }),
    setPaymentIntent: (paymentIntent) => set({ paymentIntent }),
    setPrices: (prices) => set({ prices }),
    setSubscriptionData: (data) => set({ subscriptionData: data }),
    setSubscriptionId: (id) => set({ subscriptionId: id }),
    setCurrentPlan: (plan) => set({ currentPlan: plan }),
    setIsPlanUpdated: (updated) => set({ isPlanUpdated: updated }),
    setActivePlan: (activePlan) => set({ activePlan: activePlan }),
}));

export const useLoadingStore = create<LoadingState>((set) => ({
    isAppLoading: false,
    setIsAppLoading: (loading) => set({ isAppLoading: loading }),
}));

export const useThemeState = create<ThemeState>((set) => ({
    isDark: false,
    setIsDark: (isDark) => set({ isDark: isDark }),
}));
