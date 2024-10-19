import React from 'react'

interface Voter {
	name: string;
	country: string;
	phoneNo: string;
}

const VoterList: React.FC<{ voters: Voter[] }> = ({ voters }) => {
	return (
		<div className='mt-3'>
			<ul className='flex overflow-x-auto space-x-4 p-2'>
				{voters.map((voter) => (
					<li key={voter.phoneNo} className='flex-shrink-0 bg-gray-100 dark:bg-[#131317] rounded-lg p-4'>
						<div>
							<p className='font-medium capitalize'>{voter.name}</p>
							<p className='text-sm capitalize'>Country: {voter.country}</p>
							<p className='text-sm'>Phone: {voter.phoneNo}</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};


export default VoterList