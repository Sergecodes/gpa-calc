import Head from 'next/head';
import React from 'react';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import '@fontsource/roboto';
import '../styles/global.css';

// This default export is required in a new `pages/_app.js` file.
function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const { locale } = router;

	// For material-UI:
	React.useEffect(() => {
		// Remove the server-side injected CSS, (see github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_app.js)
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}

	}, []);

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta httpEquiv="content-type" content="text/html; charset=utf-8" />
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
				<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
				<title>{locale === 'en' ? 'GPA Calculator' : 'Calculateur de MGP'}</title>
			</Head>

			<Component {...pageProps} />
  	</>
   );
}

export default appWithTranslation(MyApp);
