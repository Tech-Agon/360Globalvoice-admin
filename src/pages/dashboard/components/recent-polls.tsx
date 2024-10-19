import useAllPolls from '@/hooks/useAllPolls';
import { formatDate } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export function RecentPolls() {
	const { data: pollData, isLoading: isLoadingPolls } = useAllPolls();

	https: return (
		<div className='space-y-8 gap-3 '>
			<p>{isLoadingPolls && <div className='flex items-center '>loading... <Loader2 className='animate-spin h-4'/></div>}</p>
			{pollData?.polls?.slice(0, 5).map((poll: any) => (
				<a
					href={` https://360globalvoice.com/poll/${poll?.pollNo}`}
					target='_blank'
					key={poll?.pollNo}>
					<div className='flex items-center mb-5  cursor-pointer hover:border-b pb-2 transition-all ease-in duration-100 '>
						{/* avatar */}
						<div className='h-9 w-9 rounded-full bg-black dark:bg-white dark:text-black font-bold text-white flex justify-center items-center'>
							{poll?.createdBy?.isAdmin
								? `${(poll.createdBy.name?.charAt(0) || '').toUpperCase()}A`
								: `${(poll.createdBy?.name?.charAt(0) || '').toUpperCase()}${(
										poll.createdBy?.name?.charAt(
											poll.createdBy.name.length - 1
										) || ''
								  ).toUpperCase()}`}
						</div>

						{/* end avatar */}
						<div className='ml-4 space-y-1'>
							<p className='text-base capitalize'>{poll?.title}</p>
							<p className='text-sm font-medium capitalize leading-none text-muted-foreground '>
								{poll?.createdBy?.name || 'Admin'}
							</p>
							<p className='text-xs font-medium pt-2 leading-none text-muted-foreground '>
								{formatDate(poll?.createdAt)}
							</p>
						</div>
						{/* <div className='ml-auto font-medium'>+$1,999.00</div> */}
					</div>
				</a>
			))}
		</div>
	);
}
