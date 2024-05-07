import { FormWrapper } from "@/components/form/FormWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ValidationFieldErrorMap } from "@/components/form/useMultiStepForm";

type AccountData = {
	labelname: string;
	email: string;
	password: string;
	confirmPassword: string;
};

type AccountDataProps = AccountData & {
	updateFields: (newData: Partial<AccountData>) => void;
	errors: ValidationFieldErrorMap;
};

export function AccountData({ labelname, email, password, confirmPassword, updateFields, errors }: AccountDataProps) {
	return (
		<FormWrapper title="Account Data" allError={errors["allFields"]}>
			<div className="flex flex-col items-start justify-center w-full h-full gap-8 sm:max-w-[30vw]">
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-row justify-start items-center m-0 p-0">
						<Label htmlFor="labelname" className="font-bold text-lg">Label Name</Label>
						<p className="text-red-500">*</p>
					</div>
					<Input
						type="text"
						id="labelname"
						className="border-[1px] border-grey-200 border-solid w-full"
						// required
						autoFocus
						value={labelname}
						onChange={(e) => updateFields({ labelname: e.target.value })}
					/>
					{errors.labelname && <p className="text-red-500">{errors.labelname}</p>}
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
						// required
						value={email}
						onChange={(e) => updateFields({ email: e.target.value })}
					/>
					{errors.email && <p className="text-red-500">{errors.email}</p>}
				</div>
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-row justify-start items-center m-0 p-0">
						<Label htmlFor="password" className="font-bold text-lg">Password</Label>
						<p className="text-red-500">*</p>
					</div>
					<Input
						type="password"
						id="password"
						className="border-[1px] border-grey-200 border-solid"
						// required
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
						// required
						value={confirmPassword}
						onChange={(e) => updateFields({ confirmPassword: e.target.value })}
					/>
					{errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
				</div>
			</div>
		</FormWrapper>
	);
}
