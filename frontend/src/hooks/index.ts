import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

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
	const navigate = useNavigate();

	useEffect(() => {
		const fetchdata = async () => {
			const token = localStorage.getItem("token");
			if(!token) {
				return navigate(`/signin`);
			}
			try {
				const response = await axios.get(
					`${BACKEND_URL}/api/v1/blog/bulk`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setBlogs(response.data.blogs);
				setLoading(false);
			} catch (err) {
				return navigate(`/signin`);
			}
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

	const navigate = useNavigate();

	useEffect(() => {
		const getBlog = async () => {
			const token = localStorage.getItem("token");
			if (!token) {
				return navigate("/signin");
			}
			try {
				const encodedId = encodeURIComponent(id);
				const path = `${BACKEND_URL}/api/v1/blog/${encodedId}`;
				const response = await axios.get(path, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setBlog(response.data.blog);
				setLoading(false);
			} catch (err) {
				return navigate("/signin");
			}
		};

		getBlog();
	}, [id, navigate]);

	return {
		loading,
		blog,
	};
};
