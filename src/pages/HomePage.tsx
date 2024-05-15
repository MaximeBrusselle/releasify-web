import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { doSignOut } from "@/auth/auth";
import { useContext } from "react";
import { AuthContext } from "@/auth/AuthProvider";

const HomePage: React.FC = () => {
	const { isLoggedIn } = useContext(AuthContext);
	return (
		<div className="flex flex-col justify-start items-center w-full h-full">
			<div className="h-fit w-full flex-col justify-start items-start">
				<h1 className="text-3xl font-bold underline">Welcome to the Releasify platform!</h1>
			</div>
			<div className="flex w-full sm:max-w-[40vw] h-full items-center justify-center">
				<div className="flex flex-row flex-wrap justify-center gap-2">
					{!isLoggedIn && <Link to={"/login"}>
						<Button variant="default" className="text-xl">
							Login
						</Button>
					</Link>}
					{isLoggedIn && <Button variant="default" className="text-xl" onClick={doSignOut}>
						Logout
					</Button>}
					{!isLoggedIn && <Link to="/register">
						<Button variant="default" className="text-xl">
							Register
						</Button>
					</Link>}
					<Link to="/releases">
						<Button variant="default" className="text-xl">
							View Releases
						</Button>
					</Link>
					<Link to="/artists">
						<Button variant="default" className="text-xl">
							View Artists
						</Button>
					</Link>
					<Link to="/labels">
						<Button variant="default" className="text-xl">
							View Labels
						</Button>
					</Link>
					<Link to="/faq">
						<Button variant="default" className="text-xl">
							Faq
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
