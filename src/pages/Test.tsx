import imgbbUpload from "@/data/api/other/imgbbUpload";
import React, { useRef } from "react";

const Test: React.FC = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (fileInputRef.current?.files && fileInputRef.current.files.length > 0) {
			const file = fileInputRef.current.files[0];
			if (file.size <= 32 * 1024 * 1024) {
				// 32MB limit
				imgbbUpload(file);
			} else {
				console.log("Image size exceeds the limit.");
			}
		}
	};

	return (
		<div>
			<h1>Test</h1>
			<form onSubmit={handleFormSubmit}>
				<label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700">
					Upload Image (Max: 32MB)
				</label>
				<input
					id="imageUpload"
					type="file"
					accept="image/*"
					ref={fileInputRef}
					className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
				/>
				<button
					type="submit"
					className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>
					Upload
				</button>
			</form>
		</div>
	);
};

export default Test;
