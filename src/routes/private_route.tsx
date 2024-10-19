import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/state/store'; // Import your typed selector

interface PrivateRouteProps {
	children: React.ReactNode; // Expect children to be passed as props
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	// Check if user is authenticated
	const isAuthenticated = useAppSelector(
		(state) => !!state.persistedReducer.AdminData?.id
	);

	if (!isAuthenticated) {
		return <Navigate to='/' />;
	}
	return <>{children}</>; // Render children if authenticated
};

export default PrivateRoute;
