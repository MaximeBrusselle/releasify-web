import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Copy, MoreVertical, Pencil } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { getImageUrl } from "@/lib/utils";
import { useContext } from "react";
import { AuthContext } from "@/auth/AuthProvider";
import { Genre } from "@/data/genres/genreTypes";
import { SocialInfo } from "@/data/other/socialTypes";
import { User } from "firebase/auth";
import toast from "react-hot-toast";

type UserDetailCardProps = {
	data: any;
	userData: any;
};

export const UserDetailCard = (props: UserDetailCardProps) => {
	const { data, userData } = props;
	const currentUser = useContext(AuthContext).currentUser as User;

	return (
		<Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
			<CardHeader className="flex flex-row items-start bg-muted/50">
				<div className="grid gap-0.5">
					<CardTitle className="group flex items-center gap-2 text-lg font-extrabold">
						{currentUser.displayName || currentUser.email}
						<Button
							size="icon"
							variant="outline"
							className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
							onClick={(_) => {
								window.navigator.clipboard.writeText(currentUser.displayName || "");
								toast("Name copied to clipboard!", {
									icon: "📋",
								});
							}}
						>
							<Copy className="h-3 w-3" />
							<span className="sr-only">Copy Release Name</span>
						</Button>
					</CardTitle>
					{data.realName && <CardDescription>{data.realName}</CardDescription>}
				</div>
				<div className="ml-auto flex items-center gap-1">
					<Link to={"/profile/user/editObject"}>
						<Button size="sm" variant="outline" className="h-8 gap-1">
							<Pencil className="h-3.5 w-3.5" />
							<span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">Edit</span>
						</Button>
					</Link>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button size="icon" variant="outline" className="h-8 w-8">
								<MoreVertical className="h-3.5 w-3.5" />
								<span className="sr-only">More</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{data.id && (
								<Link to={`/${userData.type}s/${data.id}`}>
									<DropdownMenuItem>Go to Page</DropdownMenuItem>
								</Link>
							)}
							<DropdownMenuSeparator />
							<DropdownMenuItem>Other options</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</CardHeader>
			<CardContent className="p-6 text-sm">
				<div className="grid gap-3">
					<div className="w-full flex sm:flex-row flex-col gap-2 justify-center items-center">
						<img
							src={currentUser.photoURL || "https://i.ibb.co/nPh6PCt/default-pfp.jpg"}
							alt={currentUser.displayName || ""}
							className="w-36 rounded-lg aspect-square object-cover border-2 border-solid border-black"
						/>
						{userData.type !== "user" && (
							<img
								src={data.bannerPicture}
								alt={userData.type}
								className="h-36 object-cover rounded-[20px] border-black border-[6px] border-solid xl:aspect-[1400/400] lg:aspect-[1400/500] md:aspect-[1400/600] aspect-[1400/900]"
							/>
						)}
					</div>
					<div className="font-bold">User Details</div>
					<ul className="grid gap-3">
						<li className="flex items-center justify-between">
							<span className="text-muted-foreground">Name</span>
							<span>{currentUser.displayName}</span>
						</li>
						{data.realName && (
							<li className="flex items-center justify-between">
								<span className="text-muted-foreground">Real Name</span>
								<span>{data.realName}</span>
							</li>
						)}
						<li className="flex items-center justify-between">
							<span className="text-muted-foreground">Email</span>
							<span>{currentUser.email}</span>
						</li>
						{userData.type === "artist" && (
							<li className="flex items-center justify-between">
								<span className="text-muted-foreground">Bookings Email</span>
								<span>{data.bookingEmail}</span>
							</li>
						)}
						{userData.type === "label" && (
							<li className="flex items-center justify-between">
								<span className="text-muted-foreground">Contact Email</span>
								<span>{data.contactEmail}</span>
							</li>
						)}
						<li className="flex items-center justify-between">
							<span className="text-muted-foreground">UserType</span>
							<span>{userData.type}</span>
						</li>
						{/* other fields */}
					</ul>
					<Separator className="my-2" />
					<div className="flex flex-col items-start justify-center gap-4">
						<div className="font-bold">Description</div>
						<span className="text-muted-foreground">{data.description || "n/a"}</span>
					</div>
				</div>
				{userData.type === "label" && (
					<>
						<Separator className="my-4" />
						<div className="flex flex-col items-start justify-center gap-4">
							<div className="font-bold">Artists</div>
							<Link to={"/profile/artists"}>
								<Button>Go to artists</Button>
							</Link>
						</div>
					</>
				)}
				{userData.type !== "user" && (
					<>
						<Separator className="my-4" />
						<div className="flex flex-col items-start justify-center gap-4">
							<div className="font-bold">Releases</div>
							<Link to={"/profile/releases"}>
								<Button>Go to releases</Button>
							</Link>
						</div>
						<Separator className="my-4" />
						{data.genres.length === 0 && (
							<div className="flex flex-col items-start justify-center gap-4">
								<div className="font-bold">Genres</div>
								<div className="flex flex-row gap-4 flex-wrap">No genres found</div>
							</div>
						)}
						{data.genres.length > 0 && (
							<div className="grid grid-cols-2 gap-4">
								<div className="grid gap-3">
									<div className="font-bold">Genres</div>
									{data.genres.map((genre: Genre) => (
										<div key={genre.id} className="flex items-center justify-between">
											<span>{genre.name}</span>
										</div>
									))}
								</div>
								<div className="grid auto-rows-max gap-3">
									<div className="font-bold">Genre Group</div>
									{data.genres.map((genre: Genre) => (
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
								{data.socials.length === 0 && <p>No socials found</p>}
								{data.socials.length > 0 &&
									data.socials.map((url: SocialInfo) => (
										<a
											href={url.url}
											target="_blank"
											className="flex items-center gap-1 text-muted-foreground sm:hover:underline underline sm:no-underline"
											key={url.platform.name}
										>
											<img src={getImageUrl("socialplatforms", url.platform.logo)} alt={url.platform.name} className="h-4 w-4" />
											{url.platform.name}
										</a>
									))}
							</div>
						</div>
					</>
				)}
			</CardContent>
		</Card>
	);
};
