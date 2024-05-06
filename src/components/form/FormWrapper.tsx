import { ReactNode } from "react";

interface FormWrapperProps {
	title: string;
	children: ReactNode;
}

export function FormWrapper({ title, children }: FormWrapperProps) {
	return (
		<>
			<h2 className="text-center m-0 mb-8 font-extrabold text-4xl">{title}</h2>
			<div className="flex flex-col justify-center items-center m-0 mb-8">{children}</div>
		</>
	);
}
