"use client";
// import dotenv from "dotenv";
import FormData from "form-data";
import axios from "axios";
// dotenv.config();

const imgbbUpload = async (image: File) => {
    if (!import.meta.env.VITE_IMGBB_API_KEY) {
        throw new Error("IMGBB_API_KEY is not defined");
    };
    if (!image) {
        throw new Error("Image is required");
    };
    if(import.meta.env.VITE_ENVIRONMENT === "development") {
        throw new Error("Image upload is disabled in development mode");
    }
	const formData = new FormData();
	formData.append("image", image);
	formData.append("key", import.meta.env.VITE_IMGBB_API_KEY!);

	const response = await axios.post("https://api.imgbb.com/1/upload", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
    return response.data.data.url;
};

export default imgbbUpload;
