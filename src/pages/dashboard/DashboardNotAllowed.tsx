import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const DashboardNotAllowed = () => {
	return (
		<main className="flex flex-row flex-1 items-center justify-center p-4 sm:px-6 sm:py-0">
			<Card className="w-fit p-4" x-chunk="dashboard-05-chunk-0">
				<CardHeader className="pb-3 w-fit">
					<CardTitle>❌ Not Allowed</CardTitle>
					<CardDescription className="w-fit max-w-2xl text-balance leading-relaxed">
                        You are not allowed to access this page. Either your accounttype is not allowed to access this page or you are not logged in.
                        If you think this is a mistake, please contact support.
                    </CardDescription>
				</CardHeader>
			</Card>
		</main>
	);
};
