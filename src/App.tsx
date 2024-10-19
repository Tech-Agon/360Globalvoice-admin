import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { appRoutes } from './routes';
import { ThemeProvider } from './providers/theme-provider';
import { Toaster } from 'sonner';

const App: React.FC = () => {
	return (
		<>
			<ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
				<RouterProvider router={appRoutes} />
				<Toaster richColors position='top-right' closeButton />
			</ThemeProvider>
		</>
	);
};

export default App;
