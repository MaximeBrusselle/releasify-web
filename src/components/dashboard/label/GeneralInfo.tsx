import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

type GeneralInfoProps = {
	onPlatformAmount: number;
	notOnPlatformAmount: number;
};

export const GeneralInfo = (props: GeneralInfoProps) => {
	const { onPlatformAmount, notOnPlatformAmount } = props;
	const total = onPlatformAmount + notOnPlatformAmount;
	return (
		<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
			<Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
				<CardHeader className="pb-3">
					<CardTitle>Your Artists</CardTitle>
					<CardDescription className="max-w-lg text-balance leading-relaxed">Get an overview of your artists and add new ones, manage existing ones, and more.</CardDescription>
				</CardHeader>
				<CardFooter>
					<Link to={"#"}>
						<Button>Add new Artist</Button>
					</Link>
				</CardFooter>
			</Card>
			<Card x-chunk="dashboard-05-chunk-1">
				<CardHeader className="pb-2">
					<CardDescription>On Platform</CardDescription>
					<CardTitle className="text-4xl">{onPlatformAmount}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-xs text-muted-foreground">The amount of artists registered on the platform</div>
				</CardContent>
				<CardFooter>
					<Progress value={(onPlatformAmount * 100) / total} aria-label="1 coming out" />
				</CardFooter>
			</Card>
			<Card x-chunk="dashboard-05-chunk-2">
				<CardHeader className="pb-2">
					<CardDescription>Not On Platform</CardDescription>
					<CardTitle className="text-4xl">{notOnPlatformAmount}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-xs text-muted-foreground">The amount of artists not registered on the platform</div>
				</CardContent>
				<CardFooter>
					<Progress value={(notOnPlatformAmount * 100) / total} aria-label="0 already released" />
				</CardFooter>
			</Card>
		</div>
	);
};
