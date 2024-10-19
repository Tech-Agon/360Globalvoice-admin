import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Overview } from './components/overview';
import { RecentPolls } from './components/recent-polls';
import Title from '@/components/shared/title';
import Quick_view from '@/components/ui/quick-view';
import { ChartBar, Loader2, Newspaper, Users } from 'lucide-react';
import useAllPolls from '@/hooks/useAllPolls';
import useAllNews, { useGoogleNews } from '@/hooks/useAllNews';
import useAllUser from '@/hooks/useTotalUsers';

const DashboardPage: React.FC = () => {
	const { data, isLoading } = useAllUser();
	const { data: pollData, isLoading: isLoadingPolls } = useAllPolls();
	const { data: newsData, isLoading: isLoadingNews } = useAllNews();

	document.title = "360globalvoice Admin"

	const {
		data: googleNewsData,
		error: googleNewsError,
		isLoading: isGoogleNewsLoading,
	} = useGoogleNews({ endpoint: 'latest', language: 'en-NG' });

	const totalUsers = isLoading ? <div className='flex items-center '>loading... <Loader2 className='animate-spin h-6'/></div> : data?.totalUsers;
	const totalPolls = isLoadingPolls ? <div className='flex items-center '>loading... <Loader2 className='animate-spin h-6'/></div> : pollData?.length;
	const totalPollsByAdmin = isLoadingPolls
		? 'Please Wait...'
		: pollData?.polls?.filter((poll: any) => poll?.createdBy?.isAdmin).length;
	const totalNewsFromAdmin = isLoadingNews
		? "loading..."
		: newsData?.news?.length;
	const totalGoogleNews =
		googleNewsError || !googleNewsData
			? 0
			: isGoogleNewsLoading
			? 0
			: googleNewsData?.news?.items?.length || 0;

	const totalNews = totalGoogleNews + totalNewsFromAdmin;

	const quickViewData = [
		{
			title: 'Total Users',
			number: totalUsers,
			link: '/dashboard/users',
			svg: <Users />,
		},
		{
			title: 'Total Polls',
			number: totalPolls,
			link: '/dashboard/polls',
			svg: <ChartBar />,
		},
		{
			title: 'Total News',
			number: totalNews,
			link: '/dashboard/news',
			svg: <Newspaper />,
		},
		{
			title: 'Create New Poll',
			number: `You created ${totalPollsByAdmin} polls`,
			link: '/create-poll',
			svg: <ChartBar />,
		},
	];
	// return (
	// 	<div className='w-full  h-full flex justify-center items- flex-col'></div>
	// );

	return (
		<>
			{/* <div className='md:hidden'>
				<img
					src=''
					width={1280}
					height={866}
					alt='Dashboard img'
					className='block dark:hidden'
				/>
				<img
					src=''
					width={1280}
					height={866}
					alt='Dashboard img'
					className='hidden dark:block'
				/>
			</div> */}
			<div className=' flex-col flex'>
				<div className='flex-1 space-y-4 p-8 pt-6 w-full'>
					<Title title='Dashboard' />
					{/* tabs */}
					<div className='space-y-4'>
						<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
							{quickViewData?.map((item, idx) => (
								<div key={idx}>
									<Quick_view
										title={item.title}
										number={item.number}
										link={item.link}
										svg={item.svg}
									/>
								</div>
							))}
						</div>
						<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
							{/* <Card className='col-span-4'>
								<CardHeader>
									<CardTitle>Overview</CardTitle>
								</CardHeader>
								<CardContent className='pl-2'>
									<Overview />
								</CardContent>
							</Card> */}

							{/* polls */}
							<Card className='col-span-3 max-lg:col-span-4 w-full'>
								<CardHeader>
									<CardTitle>Recent Polls</CardTitle>
									{/* <CardDescription>Total polls.</CardDescription> */}
								</CardHeader>
								<CardContent>
									<RecentPolls />
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DashboardPage;
