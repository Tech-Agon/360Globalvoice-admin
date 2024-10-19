import React from 'react';
import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';
import { useCreateUser } from '@/hooks/useCreateUser';
import { authData } from '@/api/types';
import { countriesWithCodes } from '@/pages/polls/create_poll/helper/schema';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Create_user_form({ className, ...props }: UserAuthFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { mutate } = useCreateUser();

	async function onSubmit(event: React.SyntheticEvent) {
		event.preventDefault();
		setIsLoading(true);

		const form = event.currentTarget as HTMLFormElement;
		const formData = new FormData(form);

		const userData: authData = {
			name: formData.get('name') as string,
			phoneNo: formData.get('phone') as string,
			email: formData.get('email') as string,
			password: formData.get('password') as string,
			country: formData.get('country') as string,
		};

		mutate(userData, {
			onSuccess: () => {
				setIsLoading(false);
				form.reset();
			},
			onError: () => {
				setIsLoading(false);
			},
		});
	}

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<form onSubmit={onSubmit}>
				<div className='grid gap-4'>
					<div className='grid gap-1'>
						<label className='sr-only' htmlFor='name'>
							Name
						</label>
						<input
							id='name'
							name='name'
							placeholder='Name'
							type='text'
							required
							autoCapitalize='none'
							autoComplete='name'
							autoCorrect='off'
							disabled={isLoading}
							className='p-[10px] bg-transparent border w-full rounded-md placeholder:text-gray-600 border-gray-200 dark:border-[#333138] sm:text-sm outline-none'
						/>
					</div>
					<div className='grid gap-1'>
						<label className='sr-only' htmlFor='phone'>
							Phone number
						</label>
						<input
							id='phone'
							name='phone'
							placeholder='Phone'
							type='number'
							required
							autoCapitalize='none'
							autoComplete='tel'
							autoCorrect='off'
							disabled={isLoading}
							className='p-[10px] bg-transparent border w-full rounded-md placeholder:text-gray-600 border-gray-200 dark:border-[#333138] sm:text-sm outline-none'
						/>
					</div>
					<div className='grid gap-1'>
						<label className='sr-only' htmlFor='email'>
							Email
						</label>
						<input
							id='email'
							name='email'
							placeholder='Email'
							type='email'
							required
							autoCapitalize='none'
							autoComplete='email'
							autoCorrect='off'
							disabled={isLoading}
							className='p-[10px] bg-transparent border w-full rounded-md placeholder:text-gray-600 border-gray-200 dark:border-[#333138] sm:text-sm outline-none'
						/>
					</div>
					<div className='grid gap-1'>
						<label className='sr-only' htmlFor='password'>
							Password
						</label>
						<input
							id='password'
							name='password'
							placeholder='Enter password'
							type='password'
							required
							autoCapitalize='none'
							autoCorrect='off'
							disabled={isLoading}
							className='p-[10px] bg-transparent border w-full rounded-md placeholder:text-gray-600 border-gray-200 dark:border-[#333138] sm:text-sm outline-none'
						/>
					</div>
					<div className='grid gap-1'>
						<label className='sr-only' htmlFor='country'>
							Country
						</label>
						<select
							id='country'
							name='country'
							required
							disabled={isLoading}
							className='p-[10px] bg-transparent border w-full rounded-md border-gray-200 dark:border-[#333138] sm:text-sm outline-none'>
							<option value='' disabled className='dark:bg-[#0D0E10]'>
								Select your country
							</option>
							{countriesWithCodes.map((country, index) => (
								<option
									key={index}
									value={country.name}
									className='dark:bg-[#0D0E10]'>
									{country.name}
								</option>
							))}
						</select>
					</div>
					<button
						disabled={isLoading}
						className='flex justify-center rounded border dark:bg-white px-12 py-3 text-sm font-medium dark:text-black bg-black text-white focus:outline-none focus:ring active:text-indigo-500'>
						{isLoading && <Loader className='mr-2 h-4 w-4 animate-spin' />}
						Create User
					</button>
				</div>
			</form>
		</div>
	);
}
