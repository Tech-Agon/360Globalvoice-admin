import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from '@/routes/hooks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInSchema } from '@/api/schema';
import { z } from 'zod';
import { toast } from 'sonner';
import { signIN } from '@/api';
import { setAdminID } from '@/state/redux-state';
import { UseAppDispatch } from '@/state/store';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const router = useRouter();
	const dispatch = UseAppDispatch();

	type FormData = z.infer<typeof SignInSchema>;

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>({ resolver: zodResolver(SignInSchema) });

	const onSubmit = async (values: FormData) => {
		try {
			setIsLoading(true);
			const data = await signIN(values);

			toast.success(data?.message || 'Login successful');
			dispatch(setAdminID(data));
			reset();
			router.push('/dashboard');
		} catch (error) {
			toast.error((error as Error).message || 'An unexpected error occurred');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='grid gap-4'>
					<div className='grid gap-1'>
						<label className='sr-only' htmlFor='email'>
							Email
						</label>
						<input
							id='email'
							placeholder='Email'
							{...register('email')}
							type='email'
							required
							autoCapitalize='none'
							autoComplete='email'
							autoCorrect='off'
							disabled={isLoading}
							className={cn(
								'p-[10px] bg-transparent border w-full rounded-md placeholder:text-gray-600 border-gray-200 dark:border-[#333138] sm:text-sm outline-none',
								errors.email?.message && 'border-destructive'
							)}
						/>
						{errors.email?.message && (
							<p className='text-destructive mt-1 text-sm'>
								{errors.email?.message}
							</p>
						)}
					</div>
					<div className='grid gap-1'>
						<label className='sr-only' htmlFor='password'>
							Password
						</label>
						<input
							id='password'
							placeholder='Enter password'
							{...register('password')}
							type='password'
							required
							autoCapitalize='none'
							autoCorrect='off'
							disabled={isLoading}
							className={cn(
								'p-[10px] bg-transparent border w-full rounded-md placeholder:text-gray-600 border-gray-200 dark:border-[#333138] sm:text-sm outline-none',
								errors.password?.message && 'border-destructive'
							)}
						/>
						{errors.password?.message && (
							<p className='text-destructive mt-1 text-sm'>
								{errors.password?.message}
							</p>
						)}
					</div>
					<button
						type='submit'
						disabled={isLoading}
						className='rounded-lg border flex justify-center items-center dark:bg-white px-12 py-3 text-sm font-medium dark:text-black bg-black text-white focus:outline-none focus:ring active:text-indigo-500'>
						{isLoading ? 'Please wait...' : 'Sign in'}
						{isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
					</button>
				</div>
			</form>
			{/* Optional section for other authentication methods */}
			{/* <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                    <span className='w-full border-t' />
                </div>
                <div className='relative flex justify-center text-xs uppercase'>
                    <span className='bg-background px-2 text-muted-foreground'>
                        Or continue with
                    </span>
                </div>
            </div>
            <button type='button' disabled={isLoading}>
                GitHub
            </button> */}
		</div>
	);
}
