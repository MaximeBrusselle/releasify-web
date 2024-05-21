import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Copy, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { getImageUrl } from "@/lib/utils";
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
import toast from "react-hot-toast";
import { ArtistDetail } from "@/data/artists/artistTypes";
import { LabelDetail } from "@/data/labels/labelTypes";
import { removeArtistFromLabel } from "@/data/api/label/removeArtistFromLabel";

type DetailInfoProps = {
	selected: ArtistDetail | null;
	handleRowDeleted: () => void;
};

export const DetailInfo = (props: DetailInfoProps) => {
	let { selected } = props;
	const { handleRowDeleted } = props;
	const userType = JSON.parse(localStorage.getItem("userData")!).type;

	async function handleDelete() {
		try {
			if (!selected) {
				throw new Error("No artist selected");
			}
			if(selected.id.startsWith("notExists")) {
				await removeArtistFromLabel({ userType: userType, artist: selected })
			} else {
				await removeArtistFromLabel({ userType: userType, artistId: selected.id });
			}
			toast.success("Artist removed from label");
			handleRowDeleted();
		} catch (error: any) {
			toast.error(error.message);
		}
	}

	return (
		<>
			{selected ? (
				<Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
					<CardHeader className="flex flex-row items-start bg-muted/50">
						<div className="grid gap-0.5">
							<CardTitle className="group flex items-center gap-2 text-lg font-extrabold">
								{selected.artistName}
								<Button
									size="icon"
									variant="outline"
									className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
									onClick={(_) => window.navigator.clipboard.writeText(selected!.artistName)}
								>
									<Copy className="h-3 w-3" />
									<span className="sr-only">Copy Release Name</span>
								</Button>
							</CardTitle>
							<CardDescription>{selected.description || "n/a"}</CardDescription>
						</div>
						<div className="ml-auto flex items-center gap-1">
							<Button size="sm" variant="outline" className="h-8 gap-1">
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
										<AlertDialogDescription>This action cannot be undone. This will permanently remove this artist from your label</AlertDialogDescription>
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
									{selected.id !== "" && (
										<Link to={`/artists/${selected.id}`}>
											<DropdownMenuItem>Go to Page</DropdownMenuItem>
										</Link>
									)}
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
							<div className="w-full flex justify-center items-center">
								<img src={selected.profilePicture} alt={selected.artistName} className="w-36 rounded-lg aspect-square object-cover border-2 border-solid border-black" />
							</div>
							<div className="font-bold">Artist Details</div>
							<ul className="grid gap-3">
								<li className="flex items-center justify-between">
									<span className="text-muted-foreground">Name</span>
									<span>{selected.artistName}</span>
								</li>
								{selected.realName && (
									<li className="flex items-center justify-between">
										<span className="text-muted-foreground">Real Name</span>
										<span>{selected.realName}</span>
									</li>
								)}
								{/* other fields */}
							</ul>
							<Separator className="my-2" />
							<div className="flex flex-col items-start justify-center gap-4">
								<div className="font-bold">Description</div>
								<span className="text-muted-foreground">{selected.description || "n/a"}</span>
							</div>
						</div>
						<Separator className="my-4" />
						<div className="flex flex-col items-start justify-center gap-4">
							<div className="font-bold">Label</div>
							<div className="flex flex-row gap-4 flex-wrap">{selected.label ? <ReleaseDetailLabelHover label={selected.label as LabelDetail} /> : <p>Independantly Released</p>}</div>
						</div>
						<Separator className="my-4" />
						{selected.genres.length === 0 && (
							<div className="flex flex-col items-start justify-center gap-4">
								<div className="font-bold">Genres</div>
								<div className="flex flex-row gap-4 flex-wrap">No genres found</div>
							</div>
						)}
						{selected.genres.length > 0 && (
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
						)}
						<Separator className="my-4" />
						<div className="grid gap-3">
							<div className="font-bold">Social links</div>
							<div className="flex flex-row gap-4 flex-wrap">
								{selected.socials.length === 0 && <p>No socials found</p>}
								{selected.socials.length > 0 && selected.socials.map((url) => (
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
