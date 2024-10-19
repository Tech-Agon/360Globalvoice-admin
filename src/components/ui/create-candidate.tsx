import { countriesWithCodes } from '@/pages/polls/create_poll/helper/schema';
import React, { useState, useRef, useEffect } from 'react';

interface CreateCandidateProps {
	candidate?: {
		name: string;
		country: string;
		biography: string;
		image: File | null;
	};
	onDataChange: (data: {
		name: string;
		country: string;
		biography: string;
		image: File | null;
	}) => void;
}

const MAX_CHAR_COUNT = 9000;
const MAX_FILE_SIZE_MB = 4;

const CreateCandidate: React.FC<CreateCandidateProps> = ({
	candidate,
	onDataChange,
}) => {
	const [imageUrl, setImageUrl] = useState<string>(
		candidate?.image ? URL.createObjectURL(candidate?.image) : ''
	);
	const [name, setName] = useState<string>(candidate?.name || '');
	const [country, setCountry] = useState<string>(candidate?.country || '');
	const [biography, setBiography] = useState<string>(
		candidate?.biography || ''
	);
	const [image, setImage] = useState<File | null>(candidate?.image || null);
	const [error, setError] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const onDataChangeRef = useRef(onDataChange);

	useEffect(() => {
		onDataChangeRef.current = onDataChange;
	}, [onDataChange]);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files ? event.target.files[0] : null;

		if (selectedFile) {
			if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
				setError(`File size exceeds ${MAX_FILE_SIZE_MB}MB limit.`);
				setImage(null);
				setImageUrl('');
			} else {
				setError(null);
				const fileUrl = URL.createObjectURL(selectedFile);
				setImage(selectedFile);
				setImageUrl(fileUrl);
			}
		} else {
			setImage(null);
			setImageUrl('');
			setError(null);
		}
	};

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setCountry(event.target.value);
	};

	const handleBiographyChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const newBiography = event.target.value;
		if (newBiography.length <= MAX_CHAR_COUNT) {
			setBiography(newBiography);
		}
	};

	const handleImageClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	useEffect(() => {
		onDataChangeRef.current({ name, country, biography, image });
	}, [name, country, biography, image]);

	useEffect(() => {
		return () => {
			if (imageUrl) {
				URL.revokeObjectURL(imageUrl);
			}
		};
	}, [imageUrl]);

	return (
		<section className='group block bg-white dark:bg-[#131317] p-3 shadow-md'>
			<form>
				<input
					type='file'
					accept='image/*'
					onChange={handleFileChange}
					ref={fileInputRef}
					className='hidden'
				/>

				<div
					className='relative cursor-pointer w-full h-[200px] bg-gray-200 rounded overflow-hidden flex items-center justify-center'
					onClick={handleImageClick}>
					{imageUrl ? (
						<img
							src={imageUrl}
							alt='Candidate profile'
							className='w-full h-full object-cover'
						/>
					) : (
						<span className='text-gray-500'>Click to upload image</span>
					)}
				</div>
				<p className='text-red-500 text-xs mt-2'>
					image size should not excede {MAX_FILE_SIZE_MB}mb
				</p>

				{error && <p className='text-red-500 mt-2'>{error}</p>}

				<div className='m-3'>
					<div className='mb-4'>
						<h3 className='font-medium'>Candidate Name</h3>
						<input
							type='text'
							value={name}
							onChange={handleNameChange}
							placeholder='Enter candidate name'
							className='peer h-9 w-full border-b bg-transparent p-0 placeholder-transparent focus:outline-none focus:ring-0 sm:text-sm'
						/>
					</div>

					<div className='mb-4'>
						<h3 className='font-medium'>Country </h3>
						<select
							value={country}
							onChange={handleCountryChange}
							className='peer h-9 w-full border-b bg-transparent bg-black p-0 focus:outline-none focus:ring-0 sm:text-sm'>
							<option value=''>Select a country</option>
							{countriesWithCodes.map((country, index) => (
								<option
									key={index}
									value={country.name}
									className=' dark:bg-[#0D0E10]'>
									{country.name}
								</option>
							))}
						</select>
					</div>

					<div className='mb-4'>
						<h3 className='font-medium'>Biography</h3>
						<textarea
							value={biography}
							onChange={handleBiographyChange}
							placeholder='Enter candidate biography'
							className='peer h-20 w-full border-b bg-transparent p-0 placeholder-transparent focus:outline-none focus:ring-0 sm:text-sm'
							maxLength={MAX_CHAR_COUNT}
						/>
						<div className='text-right text-xs text-gray-500'>
							{biography.length}/{MAX_CHAR_COUNT}
						</div>
					</div>
				</div>
			</form>
		</section>
	);
};

export default CreateCandidate;
