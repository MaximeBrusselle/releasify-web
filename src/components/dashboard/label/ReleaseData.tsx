import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ListFilter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ArtistDetail } from "@/data/artists/artistTypes";

interface ReleaseDataProps {
	artists: ArtistDetail[];
	selectedRow: ArtistDetail | null;
	handleSelectRow: (row?: ArtistDetail) => void;
}

export const ReleaseData = (props: ReleaseDataProps) => {
	const { handleSelectRow, selectedRow, artists } = props;
	const all = artists;

	const [sortType, setSortType] = useState("");

	const updateSelectedRow = (row: ArtistDetail) => {
		if (!selectedRow) {
			handleSelectRow(row);
		} else if (selectedRow!.id === row.id) {
			handleSelectRow();
		} else {
			handleSelectRow(row);
		}
	};

	const changeSortType = (type: string) => {
		if (type === "name") {
			sortArtistsByName();
		}
		setSortType(type);
	};

	const sortArtistsByName = () => {
		all.sort((a, b) => a.artistName.localeCompare(b.artistName));
	};

	return (
		<Tabs defaultValue="all">
			<div className="flex items-center">
				<TabsList>
					<TabsTrigger value="all">All</TabsTrigger>
					<TabsTrigger value="onPlatform">On Platform</TabsTrigger>
					<TabsTrigger value="notOnPlatform">Not On Platform</TabsTrigger>
				</TabsList>
				<div className="ml-auto flex items-center gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
								<ListFilter className="h-3.5 w-3.5" />
								<span className="sr-only sm:not-sr-only">Sort</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Sort by</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuCheckboxItem checked={sortType === "name"} onClick={(_) => changeSortType("name")}>
								Name
							</DropdownMenuCheckboxItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<TabsContent value="all">
				<TabCard artists={all} selectedRow={selectedRow} updateSelectedRow={updateSelectedRow} title={"All"} description={"All artists from you."} noData={"No artists found."} />
			</TabsContent>
			<TabsContent value="onPlatform">
				<TabCard
					artists={all.filter((artist) => !artist.id.startsWith("notExists"))}
					selectedRow={selectedRow}
					updateSelectedRow={updateSelectedRow}
					title={"On Platform"}
					description={"All artists registered on the platform."}
					noData={"No artists registered on the platform."}
				/>
			</TabsContent>
			<TabsContent value="notOnPlatform">
				<TabCard
					artists={all.filter((artist) => artist.id.startsWith("notExists"))}
					selectedRow={selectedRow}
					updateSelectedRow={updateSelectedRow}
					title={"Not On Platform"}
					description={"All artists not registered on the platform."}
					noData={"No artists not registered on the platform."}
				/>
			</TabsContent>
		</Tabs>
	);
};

type TabCardProps = {
	artists: ArtistDetail[];
	selectedRow: ArtistDetail | null;
	updateSelectedRow: (row: ArtistDetail) => void;
	title: string;
	description: string;
	noData: string;
};

const TabCard = (props: TabCardProps) => {
	const { artists, selectedRow, updateSelectedRow, title, description, noData } = props;
	return (
		<Card x-chunk="dashboard-05-chunk-3">
			<CardHeader className="px-7">
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Picture</TableHead>
							<TableHead className="sm:table-cell sm:text-left text-right">Name</TableHead>
							<TableHead className="hidden md:table-cell">Description</TableHead>
							<TableHead className="hidden lg:table-cell">Genres</TableHead>
							<TableHead className="hidden md:table-cell"># Of Releases</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{artists.length === 0 && (
							<TableRow>
								<TableCell colSpan={6} className="text-center">
									{noData}
								</TableCell>
							</TableRow>
						)}
						{artists.length > 0 &&
							artists.map((artist) => (
								<TableRow key={`${artist.artistName}tablerow`} className={`${artist.id === selectedRow?.id ? "bg-green-200" : ""}`} onClick={(_) => updateSelectedRow(artist)}>
									<TableCell>
										<img className="h-12 w-12 rounded-lg border-2 border-solid border-black object-cover" src={artist.profilePicture} alt="pfp" />
									</TableCell>
									<TableCell className="text-right sm:text-left sm:table-cell">{artist.artistName}</TableCell>
									<TableCell className="text-right sm:text-left sm:table-cell">{artist.description ? artist.description : "n/a"}</TableCell>
									<TableCell className="hidden lg:table-cell">
										{artist.genres.length === 0 && "n/a"}
										{artist.genres.length > 0 && artist.genres.map((genre) => (
											<Badge key={`${genre.name}genrebadge`} className="text-xs w-fit text-center" variant="default">
												{genre.name}
											</Badge>
										))}
									</TableCell>
									<TableCell className="hidden md:table-cell">{artist.releases.length}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};
