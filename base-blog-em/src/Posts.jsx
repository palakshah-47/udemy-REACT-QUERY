import { useState, useEffect } from 'react';

import { fetchPosts, deletePost, updatePost } from './api';
import { PostDetail } from './PostDetail';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { use } from 'react';
const maxPostPage = 10;

export function Posts() {
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedPost, setSelectedPost] = useState(null);

	const queryClient = useQueryClient();

	useEffect(() => {
		if( currentPage >= maxPostPage ) return;
		const nextPage = currentPage + 1;
		queryClient.prefetchQuery({
			queryKey: ['posts', nextPage],
			queryFn: () => fetchPosts(nextPage),
		});
	}, [currentPage, queryClient]);

	const { data, isError, error, isLoading, isFetching } = useQuery({
		queryKey: ['posts', currentPage],
		queryFn: () => fetchPosts(currentPage),
		staleTime: 2000,
	});

	if (isFetching) {
		return <div>Fetching posts...</div>;
	}

	if (isLoading) {
		return <div>Loading posts...</div>;
	}

	if (isError) {
		return (
			<>
				<h3>Oops, Something went worng</h3>
				<p></p>Error: {error.toString()}
			</>
		);
	}

	return (
		<>
			<ul>
				{data.map((post) => (
					<li key={post.id} className="post-title" onClick={() => setSelectedPost(post)}>
						{post.title}
					</li>
				))}
			</ul>
			<div className="pages">
				<button
					disabled={currentPage <= 1}
					onClick={() => {
						setCurrentPage((page) => page - 1);
					}}
				>
					Previous page
				</button>
				<span>Page {currentPage}</span>
				<button
					disabled={currentPage >= maxPostPage}
					onClick={() => {
						setCurrentPage((page) => page + 1);
					}}
				>
					Next page
				</button>
			</div>
			<hr />
			{selectedPost && <PostDetail post={selectedPost} />}
		</>
	);
}

