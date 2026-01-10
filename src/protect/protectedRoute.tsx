import { Navigate, Outlet, useLocation } from 'react-router-dom';
import type { FC } from 'react';
import { Preloader } from '../components/preloader/preloader';
import { getUser, getUserRequest } from '../slices/userSlice/userSlice';
import { useSelector } from '../service/store';

export const ProtectedRoute: FC<{ onlyUnAuth?: boolean }> = ({
  onlyUnAuth = false
}) => {
  const Loading = useSelector(getUserRequest);
  const user = useSelector(getUser);
  const location = useLocation();

  if (Loading) {
    return <Preloader />;
  }

  if (onlyUnAuth && user.name !== '') {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && user.name == '') {
    return <Navigate to='/login' state={{ from: location }} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
