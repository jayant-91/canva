

export const BlogSkeliton = () => {
	return (
		<div className="flex animate-pulse p-4 border-b pb-4 w-screen max-w-screen-md">
			<div className="shrink-0">
				<span className="size-6 block bg-gray-200 rounded-full"></span>
			</div>

			<div className="ms-1 mt-2 w-full">
				<div className="flex ">
					<p className="h-4 bg-gray-200 rounded-full w-1/6"></p>
					<p className="h-4 bg-gray-200 rounded-full w-1/6"></p>
				</div>
				

				<ul className="mt-5 mb-3 space-y-3">
					<li className="w-3/5 h-5 bg-gray-200 rounded-full"></li>
					<li className="w-full mt-4 h-3 bg-gray-200 rounded-full"></li>
				</ul>
				<p className="mt-6 h-2 bg-gray-200 rounded-full w-1/6"></p>
			</div>
		</div>
	);
};

