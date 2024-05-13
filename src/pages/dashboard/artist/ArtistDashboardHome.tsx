import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";

export const ArtistDashboardHome = () => {
	return (
		<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
			<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
				<Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
					<CardHeader className="pb-3">
						<CardTitle>Your Profile</CardTitle>
						<CardDescription className="max-w-lg text-balance leading-relaxed">Get an overview of your profile and change all your info.</CardDescription>
					</CardHeader>
					<CardFooter>
						<Link to={"user"}>
							<Button>Go to edit profile</Button>
						</Link>
					</CardFooter>
				</Card>
				<Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
					<CardHeader className="pb-3">
						<CardTitle>Your Releases</CardTitle>
						<CardDescription className="max-w-lg text-balance leading-relaxed">Get an overview of your releases and edit them or announce new ones.</CardDescription>
					</CardHeader>
					<CardFooter>
						<Link to={"releases"}>
							<Button>Go to releases</Button>
						</Link>
					</CardFooter>
				</Card>
				<Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
					<CardHeader className="pb-3">
						<CardTitle>Your Requests</CardTitle>
						<CardDescription className="max-w-lg text-balance leading-relaxed">Check collab requests and other requests.</CardDescription>
					</CardHeader>
					<CardFooter>
						<Link to={"requests"}>
							<Button>Go to requests</Button>
						</Link>
					</CardFooter>
				</Card>
				<Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
					<CardHeader className="pb-3">
						<CardTitle>Your Analytics</CardTitle>
						<CardDescription className="max-w-lg text-balance leading-relaxed">Get all kinds of analytics of your profile.</CardDescription>
					</CardHeader>
					<CardFooter>
						<Link to={"analytics"}>
							<Button>Go to analytics</Button>
						</Link>
					</CardFooter>
				</Card>
				<Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
					<CardHeader className="pb-3">
						<CardTitle>Your Settings</CardTitle>
						<CardDescription className="max-w-lg text-balance leading-relaxed">Edit your settings</CardDescription>
					</CardHeader>
					<CardFooter>
						<Link to={"settings"}>
							<Button>Go to settings</Button>
						</Link>
					</CardFooter>
				</Card>
			</div>
		</main>
	);
};
