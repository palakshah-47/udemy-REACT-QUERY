import { fetchComments } from './api';
import './PostDetail.css';
import { useQuery } from '@tanstack/react-query';

export function PostDetail({ post }) {
	const { id } = post;
	const { data, isError, isLoading, error, isFetching } = useQuery({
		queryKey: ['comments', id],
		queryFn: () => fetchComments(id),
		staleTime: 2000,
	});

	if (isFetching) {
		return <div>Fetching Post...</div>;
	}

	if (isLoading) {
		return <div>Loading Post...</div>;
	}
	if (isError) {
		return (
			<>
				<h3>Oops, Something went wrong</h3>
				<p>Error: {error.toString()}</p>
			</>
		);
	}

	return (
		<>
			<h3 style={{ color: 'blue' }}>{post.title}</h3>
			<button>Delete</button> <button>Update title</button>
			<p>{post.body}</p>
			<h4>Comments</h4>
			{data.map((comment) => (
				<li key={comment.id}>
					{comment.email}: {comment.body}
				</li>
			))}
		</>
	);
}

