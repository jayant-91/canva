import { BlogCard } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks";
import { BlogSkeliton } from "../components/BlogSkeliton";

export const Blogs = () => {
	const { loading, blogs } = useBlogs();

	return (
		<div>
			<Appbar />

			{loading ? (
				<div className="flex justify-center">
					<div>
						<BlogSkeliton />
						<BlogSkeliton />
						<BlogSkeliton />
					</div>
				</div>
			) : (
				<div className="flex justify-center">
					<div>
						{blogs.map((blog) => (
							<BlogCard
								id={blog.id}
								key={blog.id}
								autherName={blog.author.name || "Anoynomus"}
								title={blog.title}
								content={blog.content}
								publishedDate={"2nd Feb 2024"}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
