import { lazy } from 'react';

export const SignInPage = lazy(() => import('@/pages/auth/sign-in'));
export const DashboardLayout = lazy(() => import('@/components/layouts/Dashboard-layout'));
export const DashboardPage = lazy(() => import('@/pages/dashboard'));
export const AllUsers = lazy(() => import('@/pages/users'));
export const CreateUser = lazy(() => import('@/pages/users/components/create-user'));
export const AllPolls = lazy(() => import('@/pages/polls/all_polls'));
export const CreatePoll = lazy(() => import('@/pages/polls/create_poll/create-poll'));
export const News = lazy(() => import('@/pages/news'));
export const CreateNews = lazy(() => import('@/pages/news/create-news'));
export const EditPoll = lazy(() => import('@/pages/polls/edit_poll'));
export const EditNews = lazy(() => import('@/pages/news/edit-news'));
export const AdminProfileUpdateForm = lazy(() => import('@/pages/users/AdminProfileUpdate'));
export const Create_user = lazy(() => import('@/pages/users/components/create-user'));
export const All_polls = lazy(() => import('@/pages/polls/all_polls'));

