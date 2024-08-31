'use client'
import { Provider } from 'react-redux';
import store from './store';
import GeneralFunctions from '@/app/components/GeneralFunctions';

export function Providers({ children }) {
  
  return <Provider store={store}><GeneralFunctions>{children}</GeneralFunctions></Provider>;
}