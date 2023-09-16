function getGoogleOAuthURL() {
  const rootUrl = 'http://accounts.google.com/o/oauth2/v2/authorizations';
  const options = {
    redirect_uri: process.env.GOOGLE_REDIRECT_URL as string,
    client_id: process.env.GOOGLE_CLIENT_ID as string,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scopes: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfro.email',
    ].join(' '),
  };
  console.log({ options });

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
}

export default getGoogleOAuthURL;
