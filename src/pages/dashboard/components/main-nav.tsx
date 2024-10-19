import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export function MainNav({
	className,
	...props
}: React.HTMLAttributes<HTMLElement>) {
	const navigation = [
		{
			nav: 'Overview',
			link: '/dashboard',
		},
		{
			nav: 'Users',
			link: '/dashboard/users',
		},
		{
			nav: 'Polls',
			link: '/dashboard/polls',
		},
		{
			nav: 'News',
			link: '/dashboard/news',
		},
		{
			nav: 'Admin',
			link: '/dashboard/admin/profile',
		},
	];

	return (
		<div className='flex justify-between h-16  items-center w-full   sticky top-16 z-50'>
			<nav
				className={cn('flex items-center space-x-4 lg:space-x-6', className)}
				{...props}>
				{navigation.map((item, idx) => (
					<Link
						key={idx}
						to={`${item.link}`}
						className='text-sm font-medium transition-colors hover:text-primary text-muted-foreground '>
						{item.nav}
					</Link>
				))}
			</nav>
		</div>
	);
}
