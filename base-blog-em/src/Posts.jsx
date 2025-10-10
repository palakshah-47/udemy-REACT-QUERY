import { useState } from 'react';

import { fetchPosts, deletePost, updatePost } from './api';
import { PostDetail } from './PostDetail';
import { useQuery } from '@tanstack/react-query';
const maxPostPage = 10;

export function Posts() {
	const [currentPage, setCurrentPage] = useState(0);
	const [selectedPost, setSelectedPost] = useState(null);

	const { data, isError, error, isLoading, isFetching } = useQuery({
		queryKey: ['posts'],
		queryFn: fetchPosts,
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
				<button disabled onClick={() => {}}>
					Previous page
				</button>
				<span>Page {currentPage + 1}</span>
				<button disabled onClick={() => {}}>
					Next page
				</button>
			</div>
			<hr />
			{selectedPost && <PostDetail post={selectedPost} />}
		</>
	);
}

