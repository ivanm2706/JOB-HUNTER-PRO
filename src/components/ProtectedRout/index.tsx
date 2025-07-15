import { Navigate } from 'react-router-dom';
import type { JSX } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import isValideToken from '../../utils/isValidToken';
import { logout } from '../../features/auth/authSlice';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  if (!isValideToken(token)) {
    dispatch(logout());
    console.log('to Namigate' + token);
    return <Navigate to="/" replace />;
  }

  return children;
}
