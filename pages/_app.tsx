import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  console.log(`API_URL = ${process.env.API_URL}`);

  return <Component {...pageProps} />;
}

export default MyApp;
