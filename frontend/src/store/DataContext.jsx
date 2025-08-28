import { createContext,useContext,useReducer ,useState} from "react";
import Cookies from "js-cookie";
const DataContext = createContext({});

const bearerTokenReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      Cookies.set('bearerToken', action.payload);
      return action.payload;
    case 'LOGOUT':
      Cookies.remove('bearerToken');
      return null;
    default:
      return state;
  }
};

export const DataProvider = ({ children }) => {
    const [token, dispatchBearerToken] = useReducer(
    bearerTokenReducer,
    Cookies.get('bearerToken') || null
  );

  const [email, setEmail]  = useState("");


  const login = (token) => {
    dispatchBearerToken({ type: 'LOGIN', payload: token });
  };
  return (
    <DataContext.Provider value={{email,setEmail,token, login }}>
      {children}
    </DataContext.Provider>
  );
};



export const useDataContext = () => {
    return useContext(DataContext);
};
