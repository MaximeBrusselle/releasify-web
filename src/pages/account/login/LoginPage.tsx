import { FormWrapper } from "@/components/form/FormWrapper";
import { useState } from "react";
import { doSignInWithEmailAndPassword } from "@/auth/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const LoginPage = () => {
	const navigate = useNavigate();

	const handleFormSubmitted = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!isSigningIn) {
			setIsSigningIn(true);
			try {
				const result = await doSignInWithEmailAndPassword(event.currentTarget.email.value, event.currentTarget.password.value);
				if ("message" in result && "code" in result) {
					toast.error(result.message);
					setError(result.message);
					setIsSigningIn(false);
					return;
				}
			} catch (error) {
				toast.error("Failed to log in");
				setError("Failed to log in");
				setIsSigningIn(false);
				return;
			}
		}
		toast.success("Logged in successfully");
		navigate("/");
	};
	const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	return (
		<FormWrapper title="Log In" allError={error}>
			<form onSubmit={handleFormSubmitted}>
				<div className="flex flex-col w-full gap-2">
					<div className="flex flex-col w-full gap-1">
						<label htmlFor="email" className="text-lg font-semibold">
							Email
						</label>
						<input type="email" name="email" id="email" className="w-full p-2 border-2 border-gray-300 rounded-md" placeholder="Email" required />
					</div>
					<div className="flex flex-col w-full gap-1">
						<label htmlFor="password" className="text-lg font-semibold">
							Password
						</label>
						<input type="password" name="password" id="password" className="w-full p-2 border-2 border-gray-300 rounded-md" placeholder="Password" required />
					</div>
					<button className="w-full p-2 bg-blue-500 text-white rounded-md">Log In</button>
				</div>
			</form>
		</FormWrapper>
	);
};
