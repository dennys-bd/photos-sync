import { useState } from "react";
import AuthController from "./AuthController";

const ApplicationController = () => {
  const [isAuthOk, setAuthOk] = useState(false);

  if (!isAuthOk) {
    return <AuthController setAuthOk={setAuthOk} />;
  }
  return <div>TÁ LOGADO</div>
}

export default ApplicationController;

// import { useCurrentUser } from "./services/session";

// import Login from "./LoginPage";


// const Index = () => {
//   const currentUser = useCurrentUser();

//   if (currentUser) {
//     return <h2>Hello from React! uhull</h2>;
//   }

//   return <Login />
// }

// export default Index

// axios.get('https://www.googleapis.com/oauth2/v1/userinfo')
// .then(({ data: { email, picture, name, locale }}) => {
//   setUser({ email, name, locale, picture})
//   return 1
// })
