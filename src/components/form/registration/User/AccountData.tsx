import { FormWrapper } from "@/components/form/FormWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ValidationFieldErrorMap } from "@/components/form/useMultiStepForm";

type AccountData = {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
};

type AccountDataProps = AccountData & {
	updateFields: (newData: Partial<AccountData>) => void;
	errors: ValidationFieldErrorMap;
};

export function AccountData({ username, email, password, confirmPassword, updateFields, errors }: AccountDataProps) {
	return (
		<FormWrapper title="Account Data" allError={errors["allFields"]}>
			<div className="flex flex-col items-start justify-center w-full h-full gap-8 sm:max-w-[30vw]">
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-row justify-start items-center m-0 p-0">
						<Label htmlFor="username" className="font-bold text-lg">Username</Label>
						<p className="text-red-500">*</p>
					</div>
					<Input
						type="text"
						id="username"
						className="border-[1px] border-grey-200 border-solid w-full"
						autoFocus
						value={username}
						onChange={(e) => updateFields({ username: e.target.value })}
					/>
					{errors.username && <p className="text-red-500">{errors.username}</p>}
				</div>
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-row justify-start items-center m-0 p-0">
						<Label htmlFor="email" className="font-bold text-lg">Email</Label>
						<p className="text-red-500">*</p>
					</div>
					<Input
						type="email"
						id="email"
						className="border-[1px] border-grey-200 border-solid"
						value={email}
						onChange={(e) => updateFields({ email: e.target.value })}
					/>
					{errors.email && <p className="text-red-500">{errors.email}</p>}
				</div>
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-row justify-start items-center m-0 p-0">
						<Label htmlFor="password" className="font-bold text-lg">Password</Label>
						<p className="text-red-500">*</p>
						<p className=" font-extralight ml-1 text-sm">(min 6 chars)</p>
					</div>
					<Input
						type="password"
						id="password"
						className="border-[1px] border-grey-200 border-solid"
						value={password}
						onChange={(e) => updateFields({ password: e.target.value })}
					/>
					{errors.password && <p className="text-red-500">{errors.password}</p>}
				</div>
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-row justify-start items-center m-0 p-0">
						<Label htmlFor="confirmpassword" className="font-bold text-lg">Confirm Password</Label>
						<p className="text-red-500">*</p>
					</div>
					<Input
						type="password"
						id="confirmpassword"
						className="border-[1px] border-grey-200 border-solid"
						value={confirmPassword}
						onChange={(e) => updateFields({ confirmPassword: e.target.value })}
					/>
					{errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
				</div>
			</div>
		</FormWrapper>
	);
}
