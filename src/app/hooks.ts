import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { AppDispatcher, RootState } from './store';

export const useAppDispatch: () => AppDispatcher = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
