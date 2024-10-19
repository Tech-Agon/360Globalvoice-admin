// import { useRouter } from '@/routes/hooks';
// import { Button } from '@/components/ui/button';

import { useRouter } from '../../routes/hooks';

export default function NotFound() {
	const router = useRouter();

	return (
		<div className='bg-[#F8F8F9] dark:bg-[#0D0E10] absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center'>
			<span className='bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent'>
				404
			</span>
			<h2 className='font-heading my-2 text-2xl font-bold'>
				Something&apos;s missing
			</h2>
			<p>
				Sorry, the page you are looking for doesn&apos;t exist or has been
				moved.
			</p>
			<div className='mt-8 flex justify-center gap-2'>
				<button onClick={() => router.back()}>Go back</button>
				<button onClick={() => router.push('/dashboard')}>Back to Home</button>
			</div>
		</div>
	);
}
