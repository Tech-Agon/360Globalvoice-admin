import React from 'react'
import VoterList from './VoterList';

interface Voter {
	name: string;
	country: string;
	phoneNo: string;
}

interface Candidate {
	candidateNo: number;
	name: string;
	votes: number;
	voters: Voter[];
}



const CandidateList: React.FC<{ candidates: Candidate[] }> = ({ candidates }) => {
    const totalVotes = candidates.reduce((sum, candidate) => sum + candidate.votes, 0);

    // Count votes by country
    const voteCountsByCountry: { [key: string]: number } = {};

    candidates.forEach((candidate) => {
        candidate.voters.forEach((voter) => {
            if (!voteCountsByCountry[voter.country]) {
                voteCountsByCountry[voter.country] = 0;
            }
            voteCountsByCountry[voter.country] += 1; // Increment the count for each voter
        });
    });

    const countries = Object.entries(voteCountsByCountry);
    const countryWithMostVotes = countries.reduce((max, curr) => (curr[1] > max[1] ? curr : max), ['', 0]);
    const countryWithLeastVotes = countries.reduce((min, curr) => (curr[1] < min[1] ? curr : min), ['', Infinity]);

    return (
        <div className=' space-y-6'>
            <div className='mb-4'>
                <h4 className='font-bold text-lg'>Poll Statistics</h4>
                <p>Total Votes: <span className='font-semibold'>{totalVotes}</span></p>
                <p>Country with Most Votes: <span className='font-semibold capitalize'>{countryWithMostVotes[0]} ({countryWithMostVotes[1]})</span></p>
                {countries.length > 1 && (
                    <p>Country with Least Votes: <span className='font-semibold capitalize'>{countryWithLeastVotes[0]} ({countryWithLeastVotes[1]})</span></p>
                )}
            </div>
            
            {candidates.map((candidate) => (
                <div key={candidate.candidateNo} className='border rounded-lg shadow-md p-4 bg-white dark:bg-black'>
                    <h3 className='font-bold text-xl text-purple-600 capitalize'>{candidate.name}</h3>
                    <p className='text-gray-700 dark:text-gray-400'>Votes: <span className='font-semibold'>{candidate.votes}</span></p>
                    <p className='text-gray-700 dark:text-gray-400'> Voters 👇🏽</p>
                    <VoterList voters={candidate.voters} />
                </div>
            ))}
        </div>
    );
};

export default CandidateList