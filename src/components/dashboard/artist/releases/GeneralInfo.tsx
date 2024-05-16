import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import toast from "react-hot-toast";

type GeneralInfoProps = {
	announcedAmount: number;
	releasedAmount: number;
};

export const GeneralInfo = (props: GeneralInfoProps) => {
	const { announcedAmount, releasedAmount } = props;
	const total = announcedAmount + releasedAmount;
	return (
		<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
			<Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
				<CardHeader className="pb-3">
					<CardTitle>Your Releases</CardTitle>
					<CardDescription className="max-w-lg text-balance leading-relaxed">Get an overview of your releases and create new ones, manage old ones, and more.</CardDescription>
				</CardHeader>
				<CardFooter>
					<Button
						onClick={() => {
							toast("Feature not implemented yet", { icon: "🚧" });
						}}
					>
						Add new release
					</Button>
				</CardFooter>
			</Card>
			<Card x-chunk="dashboard-05-chunk-1">
				<CardHeader className="pb-2">
					<CardDescription>Announced</CardDescription>
					<CardTitle className="text-4xl">{announcedAmount}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-xs text-muted-foreground">coming out soon</div>
				</CardContent>
				<CardFooter>
					<Progress value={(announcedAmount * 100) / total} aria-label="1 coming out" />
				</CardFooter>
			</Card>
			<Card x-chunk="dashboard-05-chunk-2">
				<CardHeader className="pb-2">
					<CardDescription>Released</CardDescription>
					<CardTitle className="text-4xl">{releasedAmount}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-xs text-muted-foreground">already released</div>
				</CardContent>
				<CardFooter>
					<Progress value={(releasedAmount * 100) / total} aria-label="0 already released" />
				</CardFooter>
			</Card>
		</div>
	);
};
