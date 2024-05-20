import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { getRoutesForUsertype } from "./dashboardHomeRoutes";

export const DashboardHome = () => {
	const userType = JSON.parse(localStorage.getItem("userData")!).type;
	const routes = getRoutesForUsertype(userType);
	return (
		<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
			<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
				{routes.map((route) => (
					<Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
						<CardHeader className="pb-3">
							<CardTitle>{route.title}</CardTitle>
							<CardDescription className="max-w-lg text-balance leading-relaxed">{route.description}</CardDescription>
						</CardHeader>
						<CardFooter>
							<Link to={`${route.path}`}>
								<Button>{route.buttonText}</Button>
							</Link>
						</CardFooter>
					</Card>
				))}
			</div>
		</main>
	);
};
