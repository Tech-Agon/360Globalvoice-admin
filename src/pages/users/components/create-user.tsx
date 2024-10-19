import React from 'react';
import { Create_user_form } from './create_user_form';

const Create_user: React.FC = () => {
	return (
		<div className='h-[86vh]  flex '>
			<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
				<div className='flex flex-col space-y-2 text-center'>
					<h1 className='text-2xl font-semibold tracking-tight'>
						Create a new user account
					</h1>
					<p className='text-sm text-muted-foreground'>
						Enter username, email and password below to create account
					</p>
				</div>
				<Create_user_form />
				<p className='px-8 text-center text-sm text-muted-foreground'>
					By clicking create account, you agree to having full approval from
					user with whose details you are using to create account .
				</p>
			</div>
		</div>
	);
};

export default Create_user;
