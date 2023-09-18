import {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';

const AuthContext = createContext({});

import { api } from "../services/api";

function AuthProvider({ children }) {
  const [data, setData] = useState({});

  async function signIn({ email, password }) {
    try {
      const response = await api.post("sessions", { email, password }, {
        // Definindo as props para capturar o cookie
        withCredentials: true
      });


      // const { token, user } = response.data; -> o token agora retorna em cookie
      const { user } = response.data

      // console.log(user)

      localStorage.setItem("@estock:user", JSON.stringify(user));

      // Nos cookie não é necessário mais salvar no localstorage e tbm no estado
      // localStorage.setItem("@estock:token", token);
      // api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // setData({ token, user });


      setData({ user });

    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível entrar.");
      }
    }
  };

  function signOut() {
    // localStorage.removeItem("@estock:token");
    localStorage.removeItem("@estock:user");

    setData({});
  }


  useEffect(() => {
    // const token = localStorage.getItem("@estock:token");
    const user = localStorage.getItem("@estock:user");

    if (user) {
      // api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setData({
        // token,
        user: JSON.parse(user)
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      signIn,
      signOut,
      user: data.user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };