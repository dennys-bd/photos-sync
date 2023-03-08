import { useEffect, useMemo, useState } from "react";

import Login from "../components/LoginPage";

import { CircularProgress } from "@mui/material";
import axios from "axios";


const PHOTOS_READ_SCOPE = 'https://www.googleapis.com/auth/photoslibrary.readonly';

interface AuthControllerProps {
  setAuthOk: (ok: boolean) => void;
}

const AuthController = ({ setAuthOk }: AuthControllerProps) => {
  const [credential, setCredential] = useState(localStorage.getItem("credential"));
  const [token, setToken] = useState(localStorage.getItem("token"));

  const storeCredential = (response) => {
    console.debug('storing credential:')
    const { credential: credentialStr } = response
    console.debug({ credential: credentialStr })

    localStorage.setItem('credential', credentialStr)
    setCredential(credentialStr)
  }

  useMemo(() => {
    google.accounts.id.initialize({
      client_id: process.env.GOOGLE_CLIENT_ID,
      auto_select: true,
      callback: storeCredential,
      context: 'use',
      ux_mode: 'redirect'
    })

  }, [])

  useEffect(() => {
    if (!credential) {
      google.accounts.id.prompt()
    } else if (!token) {
      refreshToken()
    } else {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setAuthOk(true);
    }
  }, [credential, token])

  const storeToken = (tokenResponse) => {
    if (tokenResponse?.access_token) {
      console.log('veryfing token');
      if (google.accounts.oauth2.hasGrantedAnyScope(tokenResponse, PHOTOS_READ_SCOPE)) {
        console.log('storing token:')
        const {access_token: accessToken} = tokenResponse;
        console.log({ token: accessToken });

        localStorage.setItem("token", accessToken);
        setToken(accessToken);
      }
    }
  }

  const client = useMemo(() => {
    console.log('Initing a new token client')
    return google.accounts.oauth2.initTokenClient({
      client_id: process.env.GOOGLE_CLIENT_ID,
      callback: storeToken,
      scope: PHOTOS_READ_SCOPE,
      ux_mode: 'redirect'
    })
  }, [])

  const refreshToken = () => {
    console.log('Requesting a new access token');
    client.requestAccessToken();
  };

  if (!credential) {
    return <Login />;
  }

  return <CircularProgress />;
}

export default AuthController;
