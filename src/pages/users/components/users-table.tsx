import React, { useState } from 'react';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import DeleteUser from './deleteUser';
import useAllUsers from '@/hooks/useAllUsers';
import { formatDate } from '@/lib/utils';
import { useDeleteUser } from '@/hooks/useDeleteUser ';
import PaginationControls from './paginationControls';
import { Loader2 } from 'lucide-react';

const Users_table: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 10; // Define your page size here

	const { data, isLoading, error } = useAllUsers(currentPage, pageSize);
	const { mutate: deleteUser, isPending } = useDeleteUser();

	const handleDelete = (userId: number) => {
		const confirmDelete = window.confirm(
			'Are you sure you want to delete this user?'
		);
		if (confirmDelete) {
			deleteUser(userId);
		}
	};

	const handleNextPage = () => {
		if (data && currentPage < data.totalPages) {
			setCurrentPage((prevPage) => prevPage + 1);
		}
	};

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage((prevPage) => prevPage - 1);
		}
	};

	if (isLoading) {
		return <div className='flex items-center'>Fetching users... <Loader2 className='animate-spin h-4'/></div>;
	}

	if (error) {
		return <div className='text-red-500'>Error loading users: {error.message}</div>;
	}



	return (
		<>
			<Table>
				<TableCaption>A list of all your users.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[200px]'>Username</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Country</TableHead>
						<TableHead>Date Registered</TableHead>
						<TableHead className='text-right'>No of Polls</TableHead>
						<TableHead className='text-right'>Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.users?.map((user: any) => (
						<TableRow key={user.userId}>
							<TableCell className='font-medium capitalize'>
								{user?.name || 'No Name'}
							</TableCell>
							<TableCell className='capitalize'>
								{user?.email || 'No Email'}
							</TableCell>
							<TableCell className='capitalize'>
								{user?.country || 'No Country'}
							</TableCell>
							<TableCell>{formatDate(user?.date) || 'No Date'}</TableCell>
							<TableCell className='text-right'>{user?.numOfPolls}</TableCell>
							<TableCell className='text-right text-lg font-bold'>
								<DeleteUser
									trigger='...'
									isLoading={isPending}
									username={user?.name}
									description={`Modify ${user?.email} Data`}
									deletFunc={() => handleDelete(user?.userId)}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={5}>Total Users</TableCell>
						<TableCell className='text-right'>
							{data?.totalUsers || 0}
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
			<PaginationControls
				currentPage={currentPage}
				totalPages={data?.totalPages || 1}
				onPrevious={handlePreviousPage}
				onNext={handleNextPage}
			/>
		</>
	);
};

export default React.memo(Users_table);
