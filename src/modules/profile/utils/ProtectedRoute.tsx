import { withAuthenticationRequired } from '@auth0/auth0-react';
import { ComponentType } from 'react';
import Loader from '../../common/components/Loader';

interface ProtectedRouteProps {
  component: ComponentType;
}

function ProtectedRoute({
  component,
}: ProtectedRouteProps) {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <Loader />,
  });

  return <Component />
}

export default ProtectedRoute;