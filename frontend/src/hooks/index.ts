import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";


export interface Blog {
	content: string;
	title: string;
	id: number;
	author: {
		name: string;
	};
}

export const useBlogs = () => {
	const [loading, setLoading] = useState(true);
	const [blogs, setBlogs] = useState<Blog[]>([]);

	useEffect(() => {
		const fetchdata = () => {
				const token = localStorage.getItem("token");
				axios
					.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					.then((response) => {
						setBlogs(response.data.blogs);
						setLoading(false);
					});
		};
        fetchdata();
	}, []);

	return {
		loading,
		blogs,
	};
};

export const useBlog = ({ id }: { id: string }) => {
	const [loading, setLoading] = useState(true);
	const [blog, setBlog] = useState<Blog>({
		title: "",
		content: "",
		id: 1,
		author: { name: "" },
	});

	useEffect(() => {
		const encodedId = encodeURIComponent(id);
		const token = localStorage.getItem("token");
		const path = `${BACKEND_URL}/api/v1/blog/${encodedId}`;
		axios
			.get(path, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				// console.log(response.data.blog)
				setBlog(response.data.blog);
				setLoading(false);
			});
	}, []);

	return {
		loading,
		blog,
	};
};
