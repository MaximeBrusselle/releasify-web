import { FormWrapper } from "@/components/form/FormWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AccountData = {
	artistname: string;
	realname: string;
	email: string;
	password: string;
	confirmPassword: string;
};

type AccountDataProps = AccountData & {
	updateFields: (newData: Partial<AccountData>) => void;
};

export function AccountData({ artistname, realname, email, password, confirmPassword, updateFields }: AccountDataProps) {
	return (
		<FormWrapper title="Account Data">
			<div className="flex flex-col items-start justify-center w-full h-full gap-8">
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-row justify-start items-center m-0 p-0">
						<Label htmlFor="artistname">Artist Name</Label>
						<p className="text-red-500">*</p>
					</div>
					<Input
						type="text"
						id="artistname"
						className="border-[1px] border-grey-200 border-solid"
						required
						autoFocus
						value={artistname}
						onChange={(e) => updateFields({ artistname: e.target.value })}
					/>
				</div>
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-row justify-start items-center m-0 p-0">
						<Label htmlFor="realname">Real Name</Label>
					</div>
					<Input type="text" id="realname" className="border-[1px] border-grey-200 border-solid" value={realname} onChange={(e) => updateFields({ realname: e.target.value })} />
					<p className="text-red-500" hidden>
						*
					</p>
				</div>
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-row justify-start items-center m-0 p-0">
						<Label htmlFor="email">Email</Label>
						<p className="text-red-500">*</p>
					</div>
					<Input type="email" id="email" className="border-[1px] border-grey-200 border-solid" required value={email} onChange={(e) => updateFields({ email: e.target.value })} />
					<p className="text-red-500" hidden>
						*
					</p>
				</div>
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-row justify-start items-center m-0 p-0">
						<Label htmlFor="password">Password</Label>
						<p className="text-red-500">*</p>
					</div>
					<Input type="password" id="password" className="border-[1px] border-grey-200 border-solid" required value={password} onChange={(e) => updateFields({ password: e.target.value })} />
					<p className="text-red-500" hidden>
						*
					</p>
				</div>
				<div className="flex flex-col gap-2 w-full">
					<div className="flex flex-row justify-start items-center m-0 p-0">
						<Label htmlFor="confirmpassword">Confirm Password</Label>
						<p className="text-red-500">*</p>
					</div>
					<Input
						type="password"
						id="confirmpassword"
						className="border-[1px] border-grey-200 border-solid"
						required
						value={confirmPassword}
						onChange={(e) => updateFields({ confirmPassword: e.target.value })}
					/>
					<p className="text-red-500" hidden>
						*
					</p>
				</div>
			</div>
		</FormWrapper>
	);
}
