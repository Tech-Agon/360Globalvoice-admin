import React from 'react';
import { ModeToggle } from './mode-toggle';
import { NavLink } from 'react-router-dom';
import { UseAppDispatch } from '@/state/store';
import { Adminlogout } from '@/state/redux-state';
import { useRouter } from '@/routes/hooks';
import logo from "../../assets/logo.png"

const header: React.FC = () => {
	const dispatch = UseAppDispatch();
	const route = useRouter();

	return (
		<div className='w-full justify-between  bg-white dark:bg-[#131317]  p-2 flex items-center  py-3 px-4  md:px-8'>
			<NavLink to='/dashboard'>
			<div className='h-12 '>
			<img src={logo} alt="" className='w-full h-full' />
			</div>
			</NavLink>
			<div className='flex items-center justify-center gap-4'>
				<ModeToggle />

				<button
					onClick={() => {
						dispatch(Adminlogout());
						route.push('/');
					}}
					className='text-sm underline font-semibold cursor-pointer'>
					Logout
				</button>
			</div>
		</div>
	);
};

export default header;
