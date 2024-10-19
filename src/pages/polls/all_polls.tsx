import { useState } from 'react';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { NavLink } from 'react-router-dom';
import Title from '@/components/shared/title';
import useAllPolls from '@/hooks/useAllPolls';
import { useDeletePoll } from '@/hooks/useDeletePolls';
import DialogProp from '@/components/shared/dialogProp';
import CandidateList from './components/CandidateList';
import { Loader2 } from 'lucide-react';

const All_polls = () => {
	const { data, isLoading } = useAllPolls();
	const { mutate: deletePoll } = useDeletePoll();

	document.title = 'All Polls';

	const [loadingPoll, setLoadingPoll] = useState<number | null>(null);
	const [activeTab, setActiveTab] = useState('all');

	const handleDelete = (pollNo: number, pollTitle: string) => {
		const confirmed = window.confirm(
			`Are you sure you want to delete "${pollTitle}"?`
		);

		if (confirmed) {
			setLoadingPoll(pollNo);
			deletePoll(
				{ userId: 1000, pollNo },
				{
					onSuccess: () => {
						setLoadingPoll(null);
					},
					onError: () => {
						setLoadingPoll(null);
					},
				}
			);
		}
	};

	// Filter admin polls
	const adminPolls = data?.polls?.filter((poll: any) => poll?.createdBy?.isAdmin) || [];

	const allPollsLength = data?.polls?.length || 0;
	const adminPollsLength = adminPolls?.length;


	return (
		<div className='w-full justify-between mt-8 py-3 px-4 md:px-8'>
			<div className='flex mb-8 justify-between'>
				<Title title='Polls' />
				<NavLink to='/create-poll'>
					<button className='px-6 py-2 text-white max-md:text-sm font-medium bg-[#8725FE] active:bg-gray-900 rounded-lg duration-150'>
						Create Poll
					</button>
				</NavLink>
			</div>
			{/* Tab Navigation */}
			<div className='flex gap-2 mb-8 max-md:text-sm'>
				<button
					onClick={() => setActiveTab('all')}
					className={`rounded px-4 py-2 ${activeTab === 'all' ? 'bg-purple-700 text-white' : 'bg-gray-200 dark:bg-black'}`}
				>
					All Polls ({allPollsLength})
				</button>
				<button
					onClick={() => setActiveTab('admin')}
					className={` rounded px-4 py-2 ${activeTab === 'admin' ? 'bg-purple-700 text-white' : 'bg-gray-200 dark:bg-black'}`}
				>
					Admin Polls ({adminPollsLength})
				</button>
			</div>

			{/* Content Based on Active Tab */}
			{activeTab === 'all' ? (
				<>
					{/* Loading Indicator */}
					<p>{isLoading && <div className='flex items-center'>Fetching polls.. <Loader2 className='animate-spin h-4'/></div>}</p>
					<div className='grid gap-6 px-4 md:px-6 lg:px-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
						{data?.polls?.map((poll: any) => (
						<Card
							key={poll?.pollNo}
							className='w-full  rounded-lg shadow-lg transition-transform transform hover:scale-105 overflow-hidden bg-white dark:bg-[#131317]'>
							<CardHeader className='p-4 border-b bg-gradient-to-r from-purple-700 to-indigo-500 text-white'>
								<CardTitle className='text-lg font-bold text-center'>
									{poll?.title}
								</CardTitle>
							</CardHeader>
							<CardContent className='p-4'>
								<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
									{poll?.candidates?.map((candidate: any) => (
										<div className='flex flex-col items-center' key={candidate?.id}>
											<img
												className='w-20 h-20 rounded-full object-cover border-4 shadow-lg transition-transform transform hover:scale-105'
												src={candidate?.image}
												alt='candidate'
											/>
											<span className='mt-2 text-xs capitalize font-medium text-center'>{candidate?.name}</span>
										</div>
									))}
								</div>
							</CardContent>
							<div className='p-4 border-t flex flex-col sm:flex-row gap-2 sm:gap-4'>
								<a
									href={`http://360globalvoice.com/poll/${poll?.pollNo}`}
									target='_blank'
									rel='noopener noreferrer'
									className='py-2 px-4 bg-[#8725FE] text-center text-white w-full rounded-lg border border-transparent text-sm font-semibold hover:bg-[#6b1dcb] transition duration-300'>
									View Poll
								</a>
								<DialogProp 
									title={<h2 className='text-xl capitalize'>{poll?.title} Poll Result</h2>} 
									trigger={
										<button className='w-full rounded-lg border border-transparent py-2 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition duration-300'>
											View Result
										</button>
									} 
									content={
										<div className='p-4 space-y-6'>
											<CandidateList candidates={poll?.candidates} />
										</div>
									} 
								/>
							</div>
							<CardFooter className='p-4 border-t flex flex-col sm:flex-row gap-2 sm:gap-4'>
								<NavLink to={`/edit-poll/${poll?.pollNo}`} className='w-full'>
									<button className='w-full rounded-lg border border-transparent py-2 text-sm font-semibold bg-gray-800 text-white hover:bg-gray-700 transition duration-300'>
										Edit Poll
									</button>
								</NavLink>
								<button
									onClick={() => handleDelete(poll?.pollNo, poll?.title)}
									className='w-full rounded-lg border border-transparent py-2 text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition duration-300'>
									{loadingPoll === poll?.pollNo ? 'Deleting...' : 'Delete Poll'}
								</button>
							</CardFooter>
						</Card>
						))}
					</div>
				</>
			) : (
				<>
					{/* Admin Polls Section */}
					<p>{isLoading && <div className='flex items-center'>Fetching admin polls.. <Loader2 className='animate-spin h-4'/></div>}</p>
					<div className='grid gap-6 px-4 md:px-6 lg:px-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
						{adminPolls?.length > 0 ? (
							adminPolls.map((poll: any) => (
								<Card
								key={poll?.pollNo}
								className='w-full  rounded-lg shadow-lg transition-transform transform hover:scale-105 overflow-hidden bg-white dark:bg-[#131317]'>
								<CardHeader className='p-4 border-b bg-gradient-to-r from-purple-700 to-indigo-500 text-white'>
									<CardTitle className='text-lg font-bold text-center'>
										{poll?.title}
									</CardTitle>
								</CardHeader>
								<CardContent className='p-4'>
									<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
										{poll?.candidates?.map((candidate: any) => (
											<div className='flex flex-col items-center' key={candidate?.id}>
												<img
													className='w-20 h-20 rounded-full object-cover border-4 shadow-lg transition-transform transform hover:scale-105'
													src={candidate?.image}
													alt='candidate'
												/>
												<span className='mt-2 text-xs capitalize font-medium text-center'>{candidate?.name}</span>
											</div>
										))}
									</div>
								</CardContent>
								<div className='p-4 border-t flex flex-col sm:flex-row gap-2 sm:gap-4'>
									<a
										href={`http://360globalvoice.com/poll/${poll?.pollNo}`}
										target='_blank'
										rel='noopener noreferrer'
										className='py-2 px-4 bg-[#8725FE] text-center text-white w-full rounded-lg border border-transparent text-sm font-semibold hover:bg-[#6b1dcb] transition duration-300'>
										View Poll
									</a>
									<DialogProp 
										title={<h2 className='text-xl capitalize'>{poll?.title} Poll Result</h2>} 
										trigger={
											<button className='w-full rounded-lg border border-transparent py-2 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition duration-300'>
												View Result
											</button>
										} 
										content={
											<div className='p-4 space-y-6'>
												<CandidateList candidates={poll?.candidates} />
											</div>
										} 
									/>
								</div>
								<CardFooter className='p-4 border-t flex flex-col sm:flex-row gap-2 sm:gap-4'>
									<NavLink to={`/edit-poll/${poll?.pollNo}`} className='w-full'>
										<button className='w-full rounded-lg border border-transparent py-2 text-sm font-semibold bg-gray-800 text-white hover:bg-gray-700 transition duration-300'>
											Edit Poll
										</button>
									</NavLink>
									<button
										onClick={() => handleDelete(poll?.pollNo, poll?.title)}
										className='w-full rounded-lg border border-transparent py-2 text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition duration-300'>
										{loadingPoll === poll?.pollNo ? 'Loading...' : 'Delete Poll'}
									</button>
								</CardFooter>
							</Card>
							))
						) : (
							<div className=' mt-8'>
								<h2 className='text-xl'>No Admin Polls available</h2>
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default All_polls;
