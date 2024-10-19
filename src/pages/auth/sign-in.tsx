import { ModeToggle } from '@/components/shared/mode-toggle';
import { UserAuthForm } from './components/user-auth-form';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/state/store';
import React from 'react';
import logo from "../../assets/logo.png"

export default function SignInPage() {
	const navigate = useNavigate();
	const isAuthenticated = useAppSelector(
		(state) => !!state.persistedReducer.AdminData?.id
	);

	React.useEffect(() => {
		if (isAuthenticated) {
			navigate('/dashboard', { replace: true }); // Redirect to dashboard if already authenticated
		}
	}, [isAuthenticated, navigate]);

	if (isAuthenticated) {
		return null; // Render nothing while redirecting
	}
	return (
		<>
			<div className='absolute z-10 top-3 right-3 '>
				<ModeToggle />
			</div>
			<div className='container relative    flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
				<div className='relative max-lg:hidden min-h-screen  flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
					<div className='absolute inset-0 bg-zinc-900' />
					<div className='relative z-20 flex items-center text-lg font-medium'>
					<img src={logo} alt='360Globalvoice logo' className='mr-2 h-6 w-6'/>
						
						360globalvoice
					</div>
					<div className='relative z-20 mt-auto'>
						<blockquote className='space-y-2'>
							<p className='text-lg'>
								&ldquo;create polls and manage users for your poll
								application.&rdquo;
							</p>
							<footer className='text-sm'>
								Developed by The Team at Tech-agon
							</footer>
						</blockquote>
					</div>
				</div>

				{/* jkdjkd */}

				<div className='mx-auto max-lg:min-h-screen flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
					<div className='flex flex-col space-y-2 text-center'>
						<h1 className='text-2xl font-semibold tracking-tight'>
							Sign in to your account
						</h1>
						<p className='text-sm text-muted-foreground'>
							Enter your email and password below to access your dashboard
						</p>
					</div>
					<UserAuthForm />
					{/* <p className='px-8 text-center text-sm text-muted-foreground'>
						By clicking continue, you agree to our{' '}
						<Link
							to='#'
							className='underline underline-offset-4 hover:text-primary'>
							Terms of Service
						</Link>{' '}
						and{' '}
						<Link
							to='#'
							className='underline underline-offset-4 hover:text-primary'>
							Privacy Policy
						</Link>
						.
					</p> */}
				</div>
			</div>
		</>
	);
}
