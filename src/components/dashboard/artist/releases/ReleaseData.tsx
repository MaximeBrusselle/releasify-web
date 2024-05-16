import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ListFilter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ReleaseIndex } from "@/data/releases/releaseTypes";
import { formattedDateOptions } from "@/lib/formattedDateOptions";
import { useState } from "react";

interface ReleaseDataProps {
	releases: ReleaseIndex[];
	selectedRow: ReleaseIndex | null;
	handleSelectRow: (row?: ReleaseIndex) => void;
}

export const ReleaseData = (props: ReleaseDataProps) => {
	const { handleSelectRow, selectedRow, releases } = props;
	const all = releases;

	const [sortType, setSortType] = useState("");

	const updateSelectedRow = (row: ReleaseIndex) => {
		if (!selectedRow) {
			handleSelectRow(row);
		} else if (selectedRow!.id === row.id) {
			handleSelectRow();
		} else {
			handleSelectRow(row);
		}
	};

	const changeSortType = (type: string) => {
		if (type === "date") {
			sortReleasesByDate();
		} else if (type === "name") {
			sortReleasesByName();
		} else if (type === "labelname") {
			sortReleasesByLabel();
		}
		setSortType(type);
	}

	const sortReleasesByDate = () => {
		all.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
	}

	const sortReleasesByName = () => {
		all.sort((a, b) => a.name.localeCompare(b.name));
	}

	const sortReleasesByLabel = () => {
		all.sort((a, b) => {
			if (a.label && b.label) {
				const result = a.label.name.localeCompare(b.label.name);
				if (result === 0) {
					return a.name.localeCompare(b.name);
				}
				return result;
			}
			return 0;
		});
	}

	return (
		<Tabs defaultValue="all">
			<div className="flex items-center">
				<TabsList>
					<TabsTrigger value="all">All</TabsTrigger>
					<TabsTrigger value="announced">Announced</TabsTrigger>
					<TabsTrigger value="released">Released</TabsTrigger>
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
							<DropdownMenuCheckboxItem checked={sortType === "date"} onClick={(_) => changeSortType("date")}>Releasedate</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem checked={sortType === "name"} onClick={(_) => changeSortType("name")}>Name</DropdownMenuCheckboxItem>
							<DropdownMenuCheckboxItem checked={sortType === "labelname"} onClick={(_) => changeSortType("labelname")}>Label Name</DropdownMenuCheckboxItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<TabsContent value="all">
				<TabCard releases={all} selectedRow={selectedRow} updateSelectedRow={updateSelectedRow} title={"All"} description={"All releases from you."} noData={"No releases found."}/>
			</TabsContent>
			<TabsContent value="announced">
				<TabCard releases={all.filter((release) => new Date(release.releaseDate) > new Date())} selectedRow={selectedRow} updateSelectedRow={updateSelectedRow} title={"Announced"} description={"All announced releases from you."} noData={"No announced releases found."}/>
			</TabsContent>
			<TabsContent value="released">
				<TabCard releases={all.filter((release) => new Date(release.releaseDate) <= new Date())} selectedRow={selectedRow} updateSelectedRow={updateSelectedRow} title={"Released"} description={"All previous releases from you."} noData={"No previous releases found."}/>
			</TabsContent>
		</Tabs>
	);
};

type TabCardProps = {
	releases: ReleaseIndex[];
	selectedRow: ReleaseIndex | null;
	updateSelectedRow: (row: ReleaseIndex) => void;
	title: string;
	description: string;
	noData: string;
};

const TabCard = (props: TabCardProps) => {
	const { releases, selectedRow, updateSelectedRow, title, description, noData } = props;
	const locale = window.navigator.language;
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
							<TableHead>Cover art</TableHead>
							<TableHead className="sm:table-cell sm:text-left text-right">Name</TableHead>
							<TableHead className="hidden sm:table-cell">Artists</TableHead>
							<TableHead className="hidden md:table-cell">ReleaseDate</TableHead>
							<TableHead className="hidden lg:table-cell">Genres</TableHead>
							<TableHead className="hidden md:table-cell">Label</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{releases.length === 0 && (
							<TableRow>
								<TableCell colSpan={6} className="text-center">
									{noData}
								</TableCell>
							</TableRow>
						)}
						{releases.length > 0 &&
							releases.map((release) => (
								<TableRow key={`${release.name}tablerow`} className={`${release.id === selectedRow?.id ? "bg-green-200" : ""}`} onClick={(_) => updateSelectedRow(release)}>
									<TableCell>
										<img className="h-12 w-12 rounded-lg border-2 border-solid border-black" src={release.picture} alt="" />
									</TableCell>
									<TableCell className="text-right sm:text-left sm:table-cell">{release.name}</TableCell>
									<TableCell className="hidden sm:table-cell">
										{release.artists.map((artist) => (
											<p key={`${artist.artistName}artists`} className="text-xs">
												{artist.artistName}
											</p>
										))}
									</TableCell>
									<TableCell className="hidden md:table-cell">{new Date(release.releaseDate).toLocaleDateString(locale, formattedDateOptions)}</TableCell>
									<TableCell className="hidden lg:table-cell">
										{release.genres.map((genre) => (
											<Badge key={`${genre.name}genrebadge`} className="text-xs w-fit text-center" variant="default">
												{genre.name}
											</Badge>
										))}
									</TableCell>
									<TableCell className="hidden md:table-cell">{release.label ? release.label.name : "No Label"}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};
