import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import NotFound from '@/pages/not-found';

import { AdminProfileUpdateForm, All_polls, AllUsers, Create_user, CreateNews, CreatePoll, DashboardLayout, DashboardPage, EditNews, EditPoll, News, SignInPage } from './paths';
import PrivateRoute from './private_route';
import Loading from '@/components/shared/loading';




export const appRoutes = createBrowserRouter([
	{
		path: '/',
		element: (
			<Suspense fallback={<Loading />}>
				<SignInPage />
			</Suspense>
		),
	},
	{
		path: 'create-poll',
		element: (
			<PrivateRoute>
				<Suspense fallback={<Loading />}>
					<CreatePoll />
				</Suspense>
			</PrivateRoute>
		),
	},
	{
		path: 'edit-poll/:id',
		element: (
			<PrivateRoute>
				<Suspense fallback={<Loading />}>
					<EditPoll />
				</Suspense>
			</PrivateRoute>
		),
	},

	{
		path: '/dashboard',
		element: (
			<PrivateRoute>
				<Suspense fallback={<Loading />}>
					<DashboardLayout />
				</Suspense>
			</PrivateRoute>
		),
		children: [
			{
				index: true,
				element: (
					<Suspense fallback={<Loading />}>
						<DashboardPage />
					</Suspense>
				),
			},
			{
				path: 'users',
				element: (
					<Suspense fallback={<Loading />}>
						<AllUsers />
					</Suspense>
				),
			},
			{
				path: 'create-user',
				element: (
					<Suspense fallback={<Loading />}>
						<Create_user />
					</Suspense>
				),
			},
			{
				path: 'polls',
				element: (
					<Suspense fallback={<Loading />}>
						<All_polls />
					</Suspense>
				),
			},
			{
				path: 'news',
				element: (
					<Suspense fallback={<Loading />}>
						<News />
					</Suspense>
				),
			},
			{
				path: 'admin/profile',
				element: (
					<Suspense fallback={<Loading />}>
						<AdminProfileUpdateForm />
					</Suspense>
				),
			},
		],
	},

	{
		path: 'create-news',
		element: (
			<PrivateRoute>
				<Suspense fallback={<Loading />}>
					<CreateNews />
				</Suspense>
			</PrivateRoute>
		),
	},
	{
		path: 'dashboard/news/edit-news/:id',
		element: (
			<PrivateRoute>
				<Suspense fallback={<Loading />}>
					<EditNews />
				</Suspense>
			</PrivateRoute>
		),
	},
	{
		path: '*',
		element: <NotFound />,
	},
]);
