import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from './schema';
import useCreateNews from '@/hooks/useCreateNews';


const NewsComponent: React.FC = () => {
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	type FormData = z.infer<typeof formSchema>;

	// Initialize React Hook Form
	const {
		control,
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
	});

	const { mutate: createNews, isPending } = useCreateNews();

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setValue('featuredImage', file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const onSubmit = (data: FormData) => {
		const newsData = {
			title: data.title,
			content: data.text,
			author: 'Admin',
			image: data.featuredImage,
		};

		createNews({ newsData });
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				{/* Title Input */}
				<label
					htmlFor='Title'
					className='relative block overflow-hidden border-b border-[#8725FE] bg-transparent pt-3 focus-within:border-[#8725FE]'>
					<input
						type='text'
						id='Title'
						placeholder='Enter post title'
						{...register('title')}
						className='peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-2xl'
					/>
					<span className='absolute start-0 top-2 -translate-y-[60%] text-sm text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs'>
						Enter post title
					</span>
				</label>
				{errors.title && <p className='text-red-500'>{errors.title.message}</p>}

				{/* Featured Image Upload */}
				<div className='mt-6'>
					<label className='block text-gray-700'>Featured Image</label>
					<input
						type='file'
						accept='image/*'
						onChange={handleImageChange}
						className='mt-2'
					/>
					{imagePreview && (
						<img
							src={imagePreview}
							alt='Preview'
							className='mt-4 h-64 w-full object-cover rounded'
						/>
					)}
					{errors.featuredImage && (
						<p className='text-red-500'>{errors.featuredImage.message}</p>
					)}
				</div>

				{/* Text Input */}
				<div className='mt-10'>
					<Controller
						control={control}
						name='text'
						render={({ field }) => (
							<textarea
								{...field}
								className='w-full h-64 p-2 border rounded dark:text-black'
								placeholder='Start writing your post here...'
							/>
						)}
					/>
					{errors.text && <p className='text-red-500'>{errors.text.message}</p>}
				</div>

				{/* Submit Button */}
				<div className='mt-6'>
					<button
						type='submit'
						className='px-4 max-md:w-full py-2 bg-[#8725FE] text-white rounded-md'
						disabled={isPending}>
						{isPending ? 'Creating...' : 'Create News'}
					</button>
				</div>
			</form>
		</>
	);
};

export default NewsComponent;
