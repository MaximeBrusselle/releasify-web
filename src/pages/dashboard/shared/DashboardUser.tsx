import { UserDetailCard } from "@/components/dashboard/shared/UserDetailCard";
import { getArtistIndex } from "@/data/api/artist/getArtistIndex";
import { getLabelIndex } from "@/data/api/label/getLabelIndex";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export const DashboardUser = () => {
	let initialized = useRef(false);
	const [data, setData] = useState<any>(null);
	const [error, setError] = useState<boolean>(false);
	const userData = JSON.parse(localStorage.getItem("userData")!);

	useEffect(() => {
		if (initialized.current) return;
		initialized.current = true;
		async function fetchData() {
			switch (userData.type) {
				case "artist":
					try {
						const artistSegments = userData.artistObject._key.path.segments;
						const artistObj = await getArtistIndex(artistSegments[artistSegments.length - 1]);
						setData(artistObj);
                        toast.success("Got artist");
					} catch (error: any) {
                        toast.error(error.message);
						setError(true);
					}

					break;
				case "label":
					try {
						const labelSegments = userData.labelObject._key.path.segments;
						const labelObject = await getLabelIndex(labelSegments[labelSegments.length - 1]);
						setData(labelObject);
                        toast.success("Got label");
					} catch (error: any) {
                        toast.error(error.message);
						setError(true);
					}
					break;
				default:
					setData(userData);
					break;
			}
		}
		fetchData();
	}, []);
	return (
		<main className="w-full h-full flex justify-center items-center">
			<div className="sm:w-[50%] p-4">{data ? <UserDetailCard data={data} userData={userData} /> : <p className="font-bold text-3xl">No Data Found</p>}</div>
		</main>
	);
};
