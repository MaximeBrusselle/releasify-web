import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const ArtistDashboardNotImplemented = () => {
	return (
		<main className="flex flex-row flex-1 items-center justify-center p-4 sm:px-6 sm:py-0">
			<Card className="w-fit p-4" x-chunk="dashboard-05-chunk-0">
				<CardHeader className="pb-3 w-fit">
					<CardTitle>Coming soon...</CardTitle>
					<CardDescription className="w-fit max-w-2xl text-balance leading-relaxed">
                        This page is not implemented yet but is coming soon. More info will be available in the future.
                    </CardDescription>
				</CardHeader>
			</Card>
		</main>
	);
};
