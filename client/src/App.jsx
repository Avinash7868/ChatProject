import { Routes, Route } from "react-router-dom";
import Registeration from "./components/registeration";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./graphql/apolloClient";
import UserData from "./components/userData";
import Login from "./components/login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProtectLogin from "./components/ProtectLogin";
import Subscription from "./components/sub";
import ChatHome from "./components/Chat/ChatHome";

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <>
        <Routes>
          <Route path="/" element={<Registeration />} />
          <Route path="Subscription" element={<Subscription />} />
          <Route element={<ProtectLogin />}>
            <Route path="login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="Data" element={<UserData />} />
            <Route path="Chathome" element={<ChatHome />} />
          </Route>
        </Routes>
      </>
    </ApolloProvider>
  );
};

export default App;