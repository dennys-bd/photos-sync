import { useEffect } from 'react';

const Login = () => {
  useEffect(() => {
    google.accounts.id.renderButton(
      document.getElementById("signinDiv"),
      {
        theme: 'outline',
        size: 'large',
      }
    )
  }, [])

  return <div id="signinDiv"/>
}

export default Login;
