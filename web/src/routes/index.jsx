import { BrowserRouter } from 'react-router-dom';

import { useAuth } from "../hooks/auth";

import { AdminRoutes } from './admin.routes';
import { CustomerRoutes } from './customer.routes';
import { SaleRoutes } from './sale.routes';

import { AuthRoutes } from './auth.routes';
import { USER_ROLE } from '../utils/roles';

export function Routes() {
  const { user } = useAuth();

  function AccessRoute(){
    // Como existem diferentes tipos de roles para os usuários, o if ternário não cobriria todas as possibilidades. Solução: utilizar o switch e receber o tipo de role do user como param
    switch(user.role){
      case USER_ROLE.ADMIN:
        return <AdminRoutes />
      case USER_ROLE.CUSTOMER:
        return <CustomerRoutes />
      case USER_ROLE.SALE:
        return <SaleRoutes />
      default:
        return <CustomerRoutes />
    }
  }

  return (
    <BrowserRouter>
      {user ? <AccessRoute /> : <AuthRoutes />}
    </BrowserRouter>
  );
}