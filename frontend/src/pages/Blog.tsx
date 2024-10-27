import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import { Appbar } from "../components/Appbar";
export const Blog = () => {
	const { id } = useParams();
	const { loading, blog } = useBlog({
		id: id || "",
	});

	return (
		<div>
			<Appbar />
			{loading ? (
				<div className="min-h-60 flex flex-col bg-white dark:bg-white">
                <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
                  <div className="flex justify-center">
                    <div className="animate-spin inline-block size-12 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                </div>
              </div>
			) : (
				<FullBlog blog={blog} />
			)}
		</div>
	);
};
