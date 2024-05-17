"use client";
import { getLabels } from "@/data/api/getLabels";
import { LabelDetail, LabelIndex } from "@/data/labels/labelTypes";
import LabelComponent from "@/pages/labels/LabelComponent";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const LabelsPage: React.FC = () => {
	const initialized = useRef(false);
	const [labels, setLabels] = useState<LabelDetail[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	useEffect(() => {
		if (!initialized.current) {
			initialized.current = true;
			async function fetchData() {
				try {
					const fetchedReleases = await getLabels();
					setLabels(fetchedReleases);
					setLoading(false);
				} catch (error: any) {
					setError(true);
					console.error(error.message);
					throw new Error(error.message);
				}
			}
			if (loading && !error) {
				toast.promise(fetchData(), {
					loading: "Fetching labels...",
					success: "Labels fetched",
					error: "Error fetching labels",
				});
			}
		}
	}, []);
	return (
		<div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-center">
				{labels.map((label) => (
					<LabelComponent key={label.id} label={label} />
				))}
			</div>
		</div>
	);
};

export default LabelsPage;
