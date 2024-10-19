import React from 'react';
import { Outlet } from 'react-router-dom';
import AppScrollToTop from '../../providers/app-scroll-to-top';
import { MainNav } from '@/pages/dashboard/components/main-nav';
import Header from '../shared/header';

const DashboardLayout: React.FC = () => {
	return (
		<div className='h-full min-h-screen   bg-[#F8F8F9] dark:bg-[#0D0E10] text-[#242424]  dark:text-[#F8F8F9]   '>
			<Header />

			<section className='border-b min-h-full relative'>
				{/* <div className='flex items-center px-4 h-full sticy top-0'> */}
				{/* <TeamSwitcher /> */}
				<MainNav className='mx-6 ' />
				{/* </div> */}
			</section>
			<body>
				{/* to make page start from top */}
				<AppScrollToTop />

				<Outlet />
			</body>
		</div>
	);
};

export default DashboardLayout;
