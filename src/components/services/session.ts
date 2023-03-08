import { useMemo } from "react";

const PHOTOS_READ_SCOPE =
  "https://www.googleapis.com/auth/photoslibrary.readonly";

const storeCredential = (response) => {
  console.log(`storing credential:`);
  const { credential } = response;
  console.log({ credential });

  localStorage.setItem("credential", credential);
};

const storeToken = (token) => {
  console.log("storing token:");
  console.log({ token });

  localStorage.setItem("token", token);
};

export const requestNewToken = () => {
  console.log("Initing a new token client");
  const client = google.accounts.oauth2.initTokenClient({
    client_id: process.env.GOOGLE_CLIENT_ID,
    callback: storeToken,
    scope: PHOTOS_READ_SCOPE,
  });
  console.log("Requesting a new access token");
  client.requestAccessToken();
};

export const useCurrentUser = () => {
  const credential = localStorage.getItem("credential");

  useMemo(() => {
    google.accounts.id.initialize({
      client_id: process.env.GOOGLE_CLIENT_ID,
      auto_select: true,
      callback: storeCredential,
      context: "use",
      ux_mode: "redirect",
    });

    if (!credential) {
      google.accounts.id.prompt();
    }
  }, []);

  // const codeClient = localStorage.getItem("codeClient")

  // useMemo(() => {
  //   console.log('entrou')
  //   google.accounts.oauth2.initCodeClient({
  //     client_id: process.env.GOOGLE_CLIENT_ID,
  //     scope: 'https://www.googleapis.com/auth/photoslibrary.readonly',
  //     // ux_mode: 'redirect'
  //     callback: storeCodeClient
  //   })
  // }, [credential])

  // console.log({ code_2: codeClient.requestCode()});
  // return useMemo(() => {
  //   return google.
  // }, [useStoreCredential]);

  return null;
};
