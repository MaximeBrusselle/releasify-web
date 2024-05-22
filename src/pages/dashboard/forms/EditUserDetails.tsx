import { ValidationFieldErrorMap, ValidationReturn, useMultiStepForm } from "@/components/form/useMultiStepForm";
import { Progress } from "@/components/ui/progress";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { validateUserDetails } from "@/components/form/validations";
import { AuthContext } from "@/auth/AuthProvider";
import { User } from "firebase/auth";
import { UserPfpAndName } from "@/components/form/edituser/UserPfpAndName";
import { editNormalUser } from "@/data/api/user/editNormalUser";

type UserDetails = {
	name: string;
	profilePicture: File | string;
};

export type { UserDetails };

export const EditUserDetails = () => {
	let initialized = useRef(false);
	const navigate = useNavigate();
	const currentUser = useContext(AuthContext).currentUser as User;
	useEffect(() => {
		if (initialized.current) return;
		initialized.current = true;
		async function fetchData() {
			const userData = JSON.parse(localStorage.getItem("userData")!);
			if (userData.type === "user") {
				setData({
					name: currentUser.displayName || "",
					profilePicture: currentUser.photoURL || "",
				});
			} else {
				toast("You are not a normal user, redirected to correct page.", {
					icon: "🚫",
				});
				navigate("/profile/user/editObject");
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
	const INITIAL_DATA: UserDetails = {
		name: "",
		profilePicture: "",
	};
	const [data, setData] = useState<UserDetails>(INITIAL_DATA);
	const [errors, setErrors] = useState<ValidationFieldErrorMap>({});
	const [done, setDone] = useState(false);
	function updateFields(newData: Partial<UserDetails>) {
		setData((prevData) => ({
			...prevData,
			...newData,
		}));
	}

	const { steps, currentStepIndex, currentStep, isFirstStep, isLastStep, nextStep, prevStep } = useMultiStepForm([
		//TODO: add the page
		<UserPfpAndName {...data} updateFields={updateFields} errors={errors} />,
	]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// Validate the current step before allowing submission
		const validationFunctions = [validateUserDetails];
		const { isValid, errors }: ValidationReturn = validationFunctions[currentStepIndex](data);

		if (isValid) {
			if (!isLastStep) {
				setErrors({});
				return nextStep();
			}
			toast.promise(
				new Promise(async (resolve, reject) => {
					const result = await editNormalUser(data, userType);
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
