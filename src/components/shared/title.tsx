import React from 'react';

interface titleData {
	title: string;
}

const Title: React.FC<titleData> = ({ title }) => {
	return (
		<div className='flex items-center justify-between space-y-2'>
			<h2 className='text-2xl font-bold tracking-tight'>{title}</h2>
			{/* <div className="flex items-center space-x-2">
<CalendarDateRangePicker />
<Button>Download</Button>
</div> */}
		</div>
	);
};

export default Title;
