import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { MoveLeft } from 'lucide-react';
import { NewsFormValues, newsSchema } from './schema/schema';
import { useUpdateNews } from '@/hooks/useUpdateNews';
import useOneNews from '@/hooks/useOneNews';

const EditNews: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const { isLoading, isError, data: news, error } = useOneNews(Number(id));
	const { mutate: updateNews, isPending } = useUpdateNews();
	const [file, setFile] = useState<File | undefined>(undefined);
	const [imageUrl, setImageUrl] = useState<string | ArrayBuffer | null>('');

	const {
		control,
		handleSubmit,
		register,
		setValue,
		formState: { errors },
	} = useForm<NewsFormValues>({
		resolver: zodResolver(newsSchema),
		defaultValues: {
			title: news?.title || '',
			description: news?.content || '',
		},
	});

	const onSubmit = (data: NewsFormValues) => {
		updateNews({
			newsId: id!,
			title: data.title,
			content: data.description,
			author: 'Admin',
			image: file,
		});
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const selectedFile = event.target.files[0];
			setFile(selectedFile);
			setImageUrl(URL.createObjectURL(selectedFile));
		}
	};

	useEffect(() => {
		if (news) {
			setImageUrl(news.imageUrl);
			setValue('title', news.title);
			setValue('description', news.content);
		}
	}, [news, setValue]);

	if (isLoading) {
		return <div className='text-center py-10'>Loading...</div>;
	}

	if (isError) {
		return <div className='text-center text-red-500 py-10'>Error: {error?.message}</div>;
	}

	return (
		<div className='container mx-auto p-4 my-4'>
			<span
				onClick={() => window.history.back()}
				className='mb-3 cursor-pointer flex gap-3'>
				<MoveLeft />
				Back
			</span>
			<h1 className='text-[#8725FE] w-full max-lg:text-xl sticky top-0 bg-[#F8F8F9] dark:bg-[#0D0E10] py-3 md:py-4 tracking-tight mb-6 text-2xl font-bold capitalize'>
				Edit News
			</h1>

			<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
				{/* News Title */}
				<div>
					<label className='block text-sm font-semibold'>News Title</label>
					<input
						{...register('title')}
						type='text'
						className='mt-1 block w-full dark:bg-[#131317] capitalize p-4 rounded-md shadow-sm focus:border-b-purple-500 sm:text-base outline-none'
					/>
					{errors.title && (
						<p className='text-red-500 text-xs mt-1'>{errors.title.message}</p>
					)}
				</div>

				{/* Image */}
				<div>
					<label className='block text-sm  font-semibold mb-3'>
						Featured Image
					</label>
					<Controller
						name='image'
						control={control}
						render={({ field: { onChange } }) => (
							<div>
								<input
									type='file'
									onChange={(e) => {
										handleFileChange(e);
										onChange(e.target.files?.[0]);
									}}
									className='hidden'
									id='image-upload'
								/>
								<label
									htmlFor='image-upload'
									className='cursor-pointer w-full h-[40vh] flex items-center justify-center bg-gray-200 rounded'>
									{imageUrl ? (
										<img
											src={imageUrl as string}
											alt='Preview'
											className='w-full h-full object-cover rounded'
										/>
									) : (
										<p className='text-gray-500'>No Image</p>
									)}
								</label>
							</div>
						)}
					/>
				</div>

				{/* Description */}
				<div>
					<label className='block text-sm font-medium'>Description</label>
					<textarea
						{...register('description')}
						rows={10}
						className='mt-1 block w-full dark:bg-[#131317] border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm outline-none p-3'
					/>
					{errors.description && (
						<p className='text-red-500 text-xs mt-1'>
							{errors.description.message}
						</p>
					)}
				</div>

				<button
					type='submit'
					className='bg-[#8725FE] text-white py-2 px-4 rounded mt-4'>
					{isPending ? 'Saving...' : ' Save Changes'}
				</button>



			</form>
			
		</div>
	);
};


export default EditNews;