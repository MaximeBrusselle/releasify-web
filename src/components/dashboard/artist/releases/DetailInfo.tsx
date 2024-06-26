import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Copy, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { ReleaseIndex } from "@/data/releases/releaseTypes";
import { formattedDateOptions } from "@/lib/formattedDateOptions";
import { formatDateToYYYYMMDD, getImageUrl } from "@/lib/utils";
import ReleaseDetailArtistHover from "./ReleaseDetailArtistHover";
import ReleaseDetailLabelHover from "./ReleaseDetailLabelHover";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { removeRelease } from "@/data/api/release/removeRelease";
import toast from "react-hot-toast";
import { ArtistDetail } from "@/data/artists/artistTypes";
import { LabelDetail } from "@/data/labels/labelTypes";
import { useNavigate } from "react-router-dom";

type DetailInfoProps = {
	selected: ReleaseIndex | null;
	handleRowDeleted: () => void;
};

export const DetailInfo = (props: DetailInfoProps) => {
	const { selected, handleRowDeleted } = props;
	const locale = window.navigator.language;
	const navigate = useNavigate();

	async function handleDelete() {
		try {
			await removeRelease(selected!.id);
			toast.success("Release deleted");
			handleRowDeleted();
		} catch (error: any) {
			toast.error(error.message);
		}
	}

	function handleEditRelease() {
		if (!selected) return;
		localStorage.setItem("releaseData", JSON.stringify(selected));	
		localStorage.setItem("releaseDate", formatDateToYYYYMMDD(new Date(selected.releaseDate)));
		navigate(`/profile/releases/editRelease`);
	}

	return (
		<>
			{selected ? (
				<Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
					<CardHeader className="flex flex-row items-start bg-muted/50">
						<div className="grid gap-0.5">
							<CardTitle className="group flex items-center gap-2 text-lg font-extrabold">
								{selected.name}
								<Button
									size="icon"
									variant="outline"
									className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
									onClick={(_) => window.navigator.clipboard.writeText(selected.name)}
								>
									<Copy className="h-3 w-3" />
									<span className="sr-only">Copy Release Name</span>
								</Button>
							</CardTitle>
							<CardDescription>📆 {new Date(selected.releaseDate).toLocaleDateString(locale, formattedDateOptions)}</CardDescription>
						</div>
						<div className="ml-auto flex items-center gap-1">
							<Button size="sm" variant="outline" className="h-8 gap-1" onClick={handleEditRelease}>
								<Pencil className="h-3.5 w-3.5" />
								<span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">Edit</span>
							</Button>
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button size="sm" className="h-8 gap-1 bg-red-500 hover:bg-red-700">
										<Trash2 className="h-3.5 w-3.5 " />
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
										<AlertDialogDescription>This action cannot be undone. This will permanently delete this release and remove it from the server.</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction className="bg-red-500 hover:bg-red-700" onClick={handleDelete}>
											Delete
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button size="icon" variant="outline" className="h-8 w-8">
										<MoreVertical className="h-3.5 w-3.5" />
										<span className="sr-only">More</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<Link to={`/releases/${selected!.id}`}>
										<DropdownMenuItem>Go to Page</DropdownMenuItem>
									</Link>
									<DropdownMenuItem
										onClick={(_) => {
											toast("Not implemented yet", {
												icon: "🚧",
											});
										}}
									>
										Embed
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem>Other options</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</CardHeader>
					<CardContent className="p-6 text-sm">
						<div className="grid gap-3">
							<div className="font-bold">Release Details</div>
							<ul className="grid gap-3">
								<li className="flex items-center justify-between">
									<span className="text-muted-foreground">Name</span>
									<span>{selected.name}</span>
								</li>
								<li className="flex items-center justify-between">
									<span className="text-muted-foreground">Announcement Date</span>
									<span>{new Date(selected.announcementDate).toLocaleString(locale, formattedDateOptions)}</span>
								</li>
								<li className="flex items-center justify-between">
									<span className="text-muted-foreground">{new Date(selected.releaseDate) > new Date() ? "Planned Release Date" : "Release Date"}</span>
									<span>{new Date(selected.releaseDate).toLocaleString(locale, formattedDateOptions)}</span>
								</li>
							</ul>
							<Separator className="my-2" />
							{selected.description && (
								<>
									<div className="flex flex-col items-start justify-center gap-4">
										<div className="font-bold">Description</div>
										<span className="text-muted-foreground">{selected.description}</span>
									</div>
									<Separator className="my-2" />
								</>
							)}
							<div className="flex flex-col items-start justify-center gap-4">
								<div className="font-bold">Artists</div>
								<div className="flex flex-row gap-4 flex-wrap">
									{selected.artists.map((artist) => {
										if (!artist) return null;
										artist = artist as ArtistDetail;
										return <ReleaseDetailArtistHover artist={artist} key={`${artist.artistName}${artist.id}`} />;
									})}
								</div>
							</div>
						</div>
						<Separator className="my-4" />
						<div className="flex flex-col items-start justify-center gap-4">
							<div className="font-bold">Label</div>
							<div className="flex flex-row gap-4 flex-wrap">{selected.label ? <ReleaseDetailLabelHover label={selected.label as LabelDetail} /> : <p>Independantly Released</p>}</div>
						</div>
						<Separator className="my-4" />
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-3">
								<div className="font-bold">Genres</div>
								{selected.genres.map((genre) => (
									<div key={genre.id} className="flex items-center justify-between">
										<span>{genre.name}</span>
									</div>
								))}
							</div>
							<div className="grid auto-rows-max gap-3">
								<div className="font-bold">Genre Group</div>
								{selected.genres.map((genre) => (
									<div key={genre.id} className="flex items-center justify-between">
										<span>{genre.group.name}</span>
									</div>
								))}
							</div>
						</div>
						<Separator className="my-4" />
						<div className="grid gap-3">
							<div className="font-bold">Social links</div>
							<div className="flex flex-row gap-4 flex-wrap">
								{selected.urls.map((url) => (
									<a href={url.url} target="_blank" className="flex items-center gap-1 text-muted-foreground hover:underline" key={url.platform.name}>
										<img src={getImageUrl("socialplatforms", url.platform.logo)} alt={url.platform.name} className="h-4 w-4" />
										{url.platform.name}
									</a>
								))}
							</div>
						</div>
					</CardContent>
				</Card>
			) : (
				<Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
					<CardHeader>
						<CardTitle>No release selected</CardTitle>
						<CardDescription>Select a release to view its details.</CardDescription>
					</CardHeader>
				</Card>
			)}
		</>
	);
};
