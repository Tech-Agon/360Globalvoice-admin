import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Link } from 'react-router-dom';

interface cardData {
	title: string;
	svg: any;
	number: string;
	link: string;
}

const Quick_view: React.FC<cardData> = ({ title, svg, number, link }) => {
	return (
		<Link to={`${link}`}>
			<Card className='hover:shadow-lg ease-in transition-all duration-200'>
				<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
					<CardTitle className='text-sm font-medium'>{title}</CardTitle>
					<div className='h-2 w-2 text-muted-foreground'>{svg}</div>
				</CardHeader>
				<CardContent>
					<div className='text-2xl '>{number}</div>
					{/* <p className='text-xs text-muted-foreground'>+20.1% from last month</p> */}
				</CardContent>
			</Card>
		</Link>
	);
};

export default Quick_view;
