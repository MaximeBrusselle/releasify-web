import { ValidationFieldErrorMap, ValidationReturn, useMultiStepForm } from "@/components/form/useMultiStepForm";
import { Progress } from "@/components/ui/progress";
import { Genre } from "@/data/genres/genreTypes";
import { ReleasePlatform } from "@/data/releases/releaseTypes";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ArtistDetail } from "@/data/artists/artistTypes";
import { LabelDetail } from "@/data/labels/labelTypes";
import { getArtistIndex } from "@/data/api/artist/getArtistIndex";
import { getLabelIndex } from "@/data/api/label/getLabelIndex";
import { Socials } from "@/components/form/edituser/Socials";
import { PfpAndBanner } from "@/components/form/edituser/PfpAndBanner";
import { GeneralInfo } from "@/components/form/edituser/GeneralInfo";
import { validateEditUserObjectSocials, validatePfpAndBanner, valideEditObjectGeneralInfo } from "@/components/form/validations";
import { editUserObject } from "@/data/api/other/editUserObject";

type UserObjectDetails = {
	objectId: string;
	name: string;
	realName: string;
	description: string | undefined;
	urls: ReleasePlatform[];
	genreList: Genre[];
	profilePicture: File | string;
	bannerPicture: File | string;
	contactEmail: string;
};

export type { UserObjectDetails };

export const EditUserObjectDetails = () => {
	let initialized = useRef(false);
	const navigate = useNavigate();
	useEffect(() => {
		if (initialized.current) return;
		initialized.current = true;
		async function fetchData() {
			const userData = JSON.parse(localStorage.getItem("userData")!);
			switch (userData.type) {
				case "artist":
					const artistSegments = userData.artistObject._key.path.segments;
					const artistObj: ArtistDetail = await getArtistIndex(artistSegments[artistSegments.length - 1]);
					setData({
						objectId: artistObj.id,
						name: artistObj.artistName,
						realName: artistObj.realName || "",
						description: artistObj.description,
						urls: artistObj.socials,
						genreList: artistObj.genres,
						profilePicture: artistObj.profilePicture,
						bannerPicture: artistObj.bannerPicture,
						contactEmail: artistObj.bookingEmail || "",
					});
					break;
				case "label":
					const labelSegments = userData.labelObject._key.path.segments;
					const labelObject: LabelDetail = await getLabelIndex(labelSegments[labelSegments.length - 1]);
					setData({
						objectId: labelObject.id,
						name: labelObject.name,
						realName: "",
						description: labelObject.description,
						urls: labelObject.socials,
						genreList: labelObject.genres,
						profilePicture: labelObject.profilePicture,
						bannerPicture: labelObject.bannerPicture,
						contactEmail: labelObject.contactEmail || "",
					});
					break;
				default:
					navigate("/profile");
					break;
			}
		}
		try {
			fetchData();
			toast.success("Ready to edit profile");
		} catch (error: any) {
			toast.error(error.message);
		}
	}, []);

	const userType = JSON.parse(localStorage.getItem("userData")!).type;
	const INITIAL_DATA: UserObjectDetails = {
		objectId: "",
		name: "",
		realName: "",
		description: "",
		urls: [],
		genreList: [],
		profilePicture: "",
		bannerPicture: "",
		contactEmail: "",
	};
	const [data, setData] = useState<UserObjectDetails>(INITIAL_DATA);
	const [errors, setErrors] = useState<ValidationFieldErrorMap>({});
	const [done, setDone] = useState(false);
	function updateFields(newData: Partial<UserObjectDetails>) {
		setData((prevData) => ({
			...prevData,
			...newData,
		}));
	}

	const { steps, currentStepIndex, currentStep, isFirstStep, isLastStep, nextStep, prevStep } = useMultiStepForm([
		<GeneralInfo {...data} updateFields={updateFields} errors={errors} userType={userType} />,
		<PfpAndBanner {...data} updateFields={updateFields} errors={errors} />,
		<Socials {...data} updateFields={updateFields} errors={errors} />,
	]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// Validate the current step before allowing submission
		const validationFunctions = [valideEditObjectGeneralInfo, validatePfpAndBanner, validateEditUserObjectSocials];
		const { isValid, errors }: ValidationReturn = validationFunctions[currentStepIndex](data, userType);

		if (isValid) {
			if (!isLastStep) {
				setErrors({});
				return nextStep();
			}
			toast.promise(
				new Promise(async (resolve, reject) => {
					const result = await editUserObject(data, userType);
					if (result?.code !== "success") {
						setErrors({ all: result.message });
						reject(result.message);
						return;
					}
					setDone(true);
					resolve(result);
				}),
				{
					loading: "Editing User...",
					success: "User edited successfully!",
					error: "Failed to edit user.",
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
					<p className="text-semibold text-2xl text-center">User edited successfully!</p>
					<Link to={"/profile/user"}>
						<button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
							Go To User Details
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
