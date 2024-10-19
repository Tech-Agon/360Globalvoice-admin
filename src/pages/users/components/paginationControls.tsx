import React from 'react';

interface PaginationControlsProps {
	currentPage: number;
	totalPages: number;
	onPrevious: () => void;
	onNext: () => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
	currentPage,
	totalPages,
	onPrevious,
	onNext,
}) => {
	return (
		<div className='flex justify-center items-center gap-4 mt-6'>
			<button
				onClick={onPrevious}
				disabled={currentPage === 1}
				className={`px-4 py-2 border rounded-md text-white bg-[#8725FE]  focus:outline-none focus:ring-2 focus:ring-[#8725FE] focus:ring-opacity-50 transition-colors duration-300 ${
					currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
				}`}
				aria-label='Previous Page'>
				&laquo; Previous
			</button>
			<span className='text-lg'>
				Page {currentPage} of {totalPages}
			</span>
			<button
				onClick={onNext}
				disabled={currentPage === totalPages}
				className={`px-4 py-2 border rounded-md text-white bg-[#8725FE]  focus:outline-none focus:ring-2 focus:ring-[#8725FE] focus:ring-opacity-50 transition-colors duration-300 ${
					currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
				}`}
				aria-label='Next Page'>
				Next &raquo;
			</button>
		</div>
	);
};

export default PaginationControls;
