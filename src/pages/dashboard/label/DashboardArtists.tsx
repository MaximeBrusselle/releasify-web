import { useEffect, useRef, useState } from "react";
import { DashboardNotAllowed } from "../DashboardNotAllowed";
import { ArtistDetail } from "@/data/artists/artistTypes";
import toast from "react-hot-toast";
import { getLoginLabelArtists } from "@/data/api/label/getLoginLabelArtists";
import { GeneralInfo } from "@/components/dashboard/label/GeneralInfo";
import { ReleaseData } from "@/components/dashboard/label/ReleaseData";
import { DetailInfo } from "@/components/dashboard/label/DetailInfo";
import { getLoginLabelIndex } from "@/data/api/label/getLoginLabelIndex";

export const DashboardArtists = () => {
	let initialized = useRef(false);
	const [artists, setArtists] = useState<ArtistDetail[]>([]);
	const [selectedRow, setSelectedRow] = useState<ArtistDetail | null>(null);
	useEffect(() => {
		if (initialized.current) {
			return;
		}
		initialized.current = true;
		getArtists();
		getLabel();
	}, []);

	async function getLabel() {
		try {
			const userData = JSON.parse(localStorage.getItem("userData")!);
			const label = await getLoginLabelIndex(userData.labelObject);
			if (!label) {
				throw new Error("No label found");
			}
		} catch (error: any) {
			toast.error(error.message);
		}
	}

	async function getArtists() {
		try {
			const artistsFromLabel = await getLoginLabelArtists(userType);
			if (!artistsFromLabel) {
				throw new Error("No artists found");
			}
			setArtists(artistsFromLabel);
			toast.success("Got artists");
		} catch (error: any) {
			toast.error(error.message);
		}
	}
	const handleSelectRow = (row?: ArtistDetail) => {
		if (row) {
			setSelectedRow(row);
			return;
		}
		setSelectedRow(null);
	};
	const handleRowDeleted = () => {
		setSelectedRow(null);
		getArtists();
	};
	const userType = JSON.parse(localStorage.getItem("userData")!).type;
	if (userType !== "label") {
		return <DashboardNotAllowed />;
	}
	const onPlatformAmount = artists.filter((artist) => !artist.id.startsWith("notExists")).length;
	const notOnPlatformAmount = artists.filter((artist) => artist.id.startsWith("notExists")).length;

	return (
		<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
			<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
				<GeneralInfo onPlatformAmount={onPlatformAmount} notOnPlatformAmount={notOnPlatformAmount} />
				<ReleaseData handleSelectRow={handleSelectRow} selectedRow={selectedRow} artists={artists} />
			</div>
			<div>
				<DetailInfo selected={selectedRow} handleRowDeleted={handleRowDeleted} />
			</div>
		</main>
	);
};
