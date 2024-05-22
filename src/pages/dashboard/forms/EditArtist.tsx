import { ValidationFieldErrorMap, ValidationReturn, useMultiStepForm } from "@/components/form/useMultiStepForm";
import { Progress } from "@/components/ui/progress";
import { Genre } from "@/data/genres/genreTypes";
import { ReleasePlatform } from "@/data/releases/releaseTypes";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { validateEditArtistGeneralInfo, validateEditArtistNameAndPfp, validateEditArtistPfpAndBanner, validateEditArtistSocials, validateEditUserObjectSocials, validatePfpAndBanner, valideEditObjectGeneralInfo } from "@/components/form/validations";
import { editUserObject } from "@/data/api/user/editUserObject";
import { Socials } from "@/components/form/artist/Socials";
import { GeneralInfo } from "@/components/form/artist/GeneralInfo";
import { PfpAndBanner } from "@/components/form/artist/PfpAndBanner";
import { NameAndPfp } from "@/components/form/artist/NameAndPfp";
import { editLabelArtist } from "@/data/api/label/editLabelArtist";

type EditArtistDetails = {
	id: string;
	name: string;
	realName: string;
	description: string;
	urls: ReleasePlatform[];
	genreList: Genre[];
	profilePicture: File | string;
	bannerPicture: File | string;
	bookingEmail: string;
};

export type { EditArtistDetails };

export const EditArtist = () => {
	let initialized = useRef(false);
	const navigate = useNavigate();
	const [isOnPlatform, setIsOnPlatform] = useState(false);
	useEffect(() => {
		if (initialized.current) return;
		initialized.current = true;
		if (userType !== "label") {
			navigate("/profile/user");
			return;
		}
		async function fetchData() {
			const artistData = JSON.parse(localStorage.getItem("artistData")!);
			if (!artistData) {
				throw new Error("Could not find artist to edit");
			}
			if (artistData.id.startsWith("notExists")) {
				setData({
					id: `notExists-${artistData.artistName}`,
					name: artistData.artistName,
					profilePicture: artistData.profilePicture,
					bannerPicture: "",
					realName: "",
					description: "",
					urls: [],
					genreList: [],
					bookingEmail: "",
				});
				setOriginalData({
					id: `notExists-${artistData.artistName}`,
					name: artistData.artistName,
					profilePicture: artistData.profilePicture,
					bannerPicture: "",
					realName: "",
					description: "",
					urls: [],
					genreList: [],
					bookingEmail: "",
				});
				setIsOnPlatform(false);
			} else {
				setData({
					id: artistData.id,
					name: artistData.artistName,
					realName: artistData.realName || "",
					description: artistData.description,
					urls: artistData.socials,
					genreList: artistData.genres,
					profilePicture: artistData.profilePicture,
					bannerPicture: artistData.bannerPicture,
					bookingEmail: artistData.bookingEmail || "",
				});
				setOriginalData({
					id: artistData.id,
					name: artistData.artistName,
					realName: artistData.realName || "",
					description: artistData.description,
					urls: artistData.socials,
					genreList: artistData.genres,
					profilePicture: artistData.profilePicture,
					bannerPicture: artistData.bannerPicture,
					bookingEmail: artistData.bookingEmail || "",
				});
				setIsOnPlatform(true);
			}
		}
		try {
			fetchData();
			toast.success("Ready to edit artist");
		} catch (error: any) {
			toast.error(error.message);
			navigate("/profile/user");
		}
	}, []);

	const userType = JSON.parse(localStorage.getItem("userData")!).type;
	const INITIAL_DATA: EditArtistDetails = {
		id: "",
		name: "",
		realName: "",
		description: "",
		urls: [],
		genreList: [],
		profilePicture: "",
		bannerPicture: "",
		bookingEmail: "",
	};
	const [data, setData] = useState<EditArtistDetails>(INITIAL_DATA);
	const [originalData, setOriginalData] = useState<EditArtistDetails>(INITIAL_DATA);
	const [errors, setErrors] = useState<ValidationFieldErrorMap>({});
	const [done, setDone] = useState(false);
	function updateFields(newData: Partial<EditArtistDetails>) {
		setData((prevData) => ({
			...prevData,
			...newData,
		}));
	}
	const { steps, currentStepIndex, currentStep, isFirstStep, isLastStep, nextStep, prevStep } = useMultiStepForm(
		isOnPlatform
			? [
					<GeneralInfo {...data} updateFields={updateFields} errors={errors} />,
					<PfpAndBanner {...data} updateFields={updateFields} errors={errors} />,
					<Socials {...data} updateFields={updateFields} errors={errors} />,
			  ]
			: [
					<NameAndPfp {...data} updateFields={updateFields} errors={errors} />,
			]
	);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// Validate the current step before allowing submission
		const validationFunctions = isOnPlatform ? [validateEditArtistGeneralInfo, validateEditArtistPfpAndBanner, validateEditArtistSocials] : [validateEditArtistNameAndPfp];
		const { isValid, errors }: ValidationReturn = validationFunctions[currentStepIndex](data);

		if (isValid) {
			if (!isLastStep) {
				setErrors({});
				return nextStep();
			}
			toast.promise(
				new Promise(async (resolve, reject) => {
					const result = await editLabelArtist(data, originalData);
					if (result?.code !== "success") {
						setErrors({ all: result.message });
						reject(result.message);
						return;
					}
					setDone(true);
					resolve(result);
				}),
				{
					loading: "Editing Artist...",
					success: "Artist edited successfully!",
					error: "Failed to edit artist.",
				}
			);
		} else {
			setErrors(errors!);
		}
	};

	return (
		<div className="flex flex-col justify-center items-center">
			{done ? (
				<div className="rounded-2xl p-4 shadow-input bg-white dark:bg-black font-sans w-[95%] flex flex-col items-center justify-start gap-5 m-4">
					<p className="text-semibold text-2xl text-center">Artist edited successfully!</p>
					<Link to={"/profile/artists"}>
						<button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
							Go To Artists
						</button>
					</Link>
				</div>
			) : (
				<div className="rounded-2xl p-4 shadow-input bg-white dark:bg-black font-sans w-[95%] flex flex-col items-center justify-start gap-5 m-4">
					<Progress value={(100 * (currentStepIndex + 1)) / steps.length} />
					<form onSubmit={handleSubmit} className="w-full">
						{currentStep}
						<div className="flex flex-row justify-center items-center gap-4">
							{!isFirstStep && (
								<button
									type="button"
									onClick={prevStep}
									className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
								>
									Back
								</button>
							)}
							<button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
								{isLastStep ? "Edit User" : "Next"}
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};
