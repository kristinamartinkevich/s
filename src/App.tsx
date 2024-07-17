import { useAuth0 } from '@auth0/auth0-react';
import { Route, Routes } from 'react-router-dom';
import Footer from './modules/common/components/Footer';
import Loader from './modules/common/components/Loader';
import Home from './modules/common/components/Home';
import Profile from './modules/profile/components/Profile';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import NotFound from './modules/common/components/NotFound';
import ProtectedRoute from './modules/profile/utils/ProtectedRoute';
import Prices from './modules/profile/components/Prices';
import NavBar from './modules/common/components/NavBar';
import Subscribe from './modules/profile/components/Subscribe';
import UpdateSubscription from './modules/profile/components/UpdateSubscription';
import Subscription from './modules/profile/components/Subscription';

const stripePromise = loadStripe(
  'pk_test_51LRh97HIHTXcx6UMBABX1XoWGiOQ0Ez5UsvkwZpUieguCzclHU0YdOWkF650CvLu0mAepGBvJ49Va2ZLhdO7T3ZY003s3PLMYo'
);

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <NavBar />
      <div className="page-layout">
        <div className="page-layout_content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={<ProtectedRoute component={Profile} />}
            />
            <Route
              path="/prices"
              element={<ProtectedRoute component={Prices} />}
            />
            <Route
              path="/profile/subscribe"
              element={<ProtectedRoute component={Subscribe} />}
            />
            <Route
              path="/profile/subscription"
              element={<ProtectedRoute component={Subscription} />}
            />
            <Route
              path="/profile/update-subscription"
              element={<ProtectedRoute component={UpdateSubscription} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Elements>
  )
}

export default App