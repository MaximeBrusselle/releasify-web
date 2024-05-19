import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const DashboardNotLoggedIn = () => {
	return (
		<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
			<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
				<div className="p-4 bg-white rounded-lg shadow-sm">
					<h2 className="text-2xl font-semibold text-foreground">Welcome to your dashboard!</h2>
					<p className="mt-2 text-lg text-muted-foreground">Please log in to access your dashboard.</p>
					<Link to="/login">
						<Button className="mt-4">Log in</Button>
					</Link>
				</div>
			</div>
		</main>
	);
};
