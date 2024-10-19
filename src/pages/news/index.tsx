import News_block from '@/components/shared/newsBlock';
import Title from '@/components/shared/title';
import useAllNews, {  useGoogleNews } from '@/hooks/useAllNews';
import { useDeleteNews } from '@/hooks/useDeleteNews';
import { formatDate } from '@/lib/utils';
import { useRouter } from '@/routes/hooks';
import { Loader2Icon } from 'lucide-react';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const News: React.FC = () => {
	const { data: allNewsData, isPending: isAllNewsPending } = useAllNews();
	const {
		data: googleNewsData,
		error: googleNewsError,
		isLoading: isGoogleNewsLoading,
	} = useGoogleNews({ endpoint: 'latest', language: 'en-NG' });
	const route = useRouter();

	const handleEdit = (id: number) => {
		route.push(`/dashboard/news/edit-news/${id}`);
	};

	const [loadingNews, setLoadingNews] = useState<number | null>(null);
	const { mutate: deleteNews } = useDeleteNews();

	const handleDelete = (newsId: number) => {
		setLoadingNews(newsId);
		deleteNews(newsId, {
			onSuccess: () => {
				setLoadingNews(null);
			},
			onError: () => {
				setLoadingNews(null);
			},
		});
	};

	return (
		<div className='w-full justify-between mt-8 py-3 px-4 md:px-8'>
			<div className='flex justify-between mb-4'>
				<Title title='News' />
				<NavLink to='/create-news'>
					<button className='px-6 py-2 text-white font-medium bg-[#8725FE] active:bg-gray-900 rounded-lg duration-150'>
						Create News
					</button>
				</NavLink>
			</div>

			{/* Loading and Error states */}
			<div className='my-4'>
				{(isGoogleNewsLoading || isAllNewsPending) && (
					<div className='flex gap-1'>
						<p className='text-lg capitalize'>
							Fetching news...  
						</p>
						 <Loader2Icon className='animate-spin h-6'/>
					</div>
				)}
				{googleNewsError && (
					<p className='text-red-500'>
						Error fetching News: {googleNewsError.message}
					</p>
				)}
			</div>

			{/* Google News Section */}
			<div className='mt-6'>
				<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:gap-8'>
					{googleNewsData?.news?.items?.map((newsItem: any, index: number) => (
						<News_block
							key={index}
							id={index}
							date={formatDate(new Date(parseInt(newsItem?.timestamp, 10)))}
							title={newsItem?.title}
							description={newsItem?.snippet}
							imageUrl={newsItem?.images?.thumbnailProxied}
						/>
					))}
				</div>

				{/* Other News Section From Admin */}
				<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 lg:gap-8 mt-6'>
					{allNewsData?.news?.map((news: any) => (
						<News_block
							isLoading={loadingNews!}
							key={news?.newsId}
							date={formatDate(news?.date)}
							title={news?.title}
							description={news?.content}
							imageUrl={news?.imageUrl}
							id={news?.newsId}
							onEdit={handleEdit}
							onDelete={() => handleDelete(news?.newsId)}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default News;
