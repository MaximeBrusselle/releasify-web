"use client";
// import dotenv from "dotenv";
import FormData from "form-data";
import axios from "axios";
// dotenv.config();

const imgbbUpload = async (image: File) => {
    if (!process.env.IMGBB_API_KEY) {
        throw new Error("IMGBB_API_KEY is not defined");
    };
    if (!image) {
        throw new Error("Image is required");
    };
    if(process.env.ENVIRONMENT === "development") {
        console.log("Development environment detected, skipping image upload");
        return "https://via.placeholder.com/150";
    }
	const formData = new FormData();
	formData.append("image", image);
	formData.append("key", process.env.IMGBB_API_KEY!);

	const response = await axios.post("https://api.imgbb.com/1/upload", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

    console.log(response.data.data.url);
    return response.data.data.url;
};

export default imgbbUpload;
