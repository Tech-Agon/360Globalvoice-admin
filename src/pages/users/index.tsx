import Title from '@/components/shared/title';
import React from 'react';
import Users_table from './components/users-table';
import { NavLink } from 'react-router-dom';

const AllUsers: React.FC = () => {
	return (
		<div className='w-full  justify-between mt-8     py-3 px-4  md:px-8'>
			<div className='flex  justify-between'>
				<Title title='All Users' />
				<NavLink to='/dashboard/create-user'>
					<button className=' px-6 py-2 text-white max-md:text-sm font-medium bg-[#8725FE]  active:bg-gray-900 rounded-lg duration-150'>
						Create User
					</button>
				</NavLink>
			</div>

			{/* table */}
			<div className='mt-5'>
				<Users_table />
			</div>
		</div>
	);
};

export default AllUsers;
