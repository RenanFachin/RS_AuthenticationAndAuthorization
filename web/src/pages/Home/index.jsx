import { FiTruck, FiTag, FiShoppingCart } from 'react-icons/fi';

import { Container } from "./styles";
import { Feature } from '../../components/Feature';
import { Header } from '../../components/Header';

import { useAuth } from '../../hooks/auth';
import { USER_ROLE } from '../../utils/roles'

export function Home() {
  // recuperando as infos do usuário
  const { user } = useAuth()

  return (
    <Container>
      <Header />

      <main>
        <Feature title="Produto" icon={FiTag} to="/product" />

        {
          // Habilitando somente usuários admin e sale
          [USER_ROLE.ADMIN, USER_ROLE.SALE].includes(user.role) &&
          <>
            {
              user.role === USER_ROLE.ADMIN &&
              <Feature title="Fornecedores" icon={FiTruck} to="/suppliers" />
            }
            <Feature title="Relatório de vendas" icon={FiShoppingCart} to="/sales-report" />
          </>
        }

      </main>
    </Container>
  )
}