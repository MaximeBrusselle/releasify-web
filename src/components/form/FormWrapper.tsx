import { ReactNode } from "react";

interface FormWrapperProps {
	title: string;
	children: ReactNode;
	allError: string | undefined;
}

export function FormWrapper({ title, children, allError }: FormWrapperProps) {
	return (
		<>
			<div className="flex flex-col w-full m-0 mb-8 gap-1">
				<h2 className="text-center font-extrabold text-4xl">{title}</h2>
				{allError && <p className="text-red-500 text-center">{allError}</p>}
			</div>
			<div className="flex flex-col justify-center items-center m-0 mb-8 w-full">{children}</div>
		</>
	);
}
