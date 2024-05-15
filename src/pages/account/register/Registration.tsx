import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Registration: React.FC = () => {
	return (
		<div className="flex flex-col justify-start items-center w-full h-full">
			<div className="h-fit w-full flex-col justify-center items-start">
				<h1 className="text-3xl font-bold underline text-center">Choose what type of account you want!</h1>
			</div>
			<div className="flex w-full sm:max-w-[40vw] h-full items-center justify-center">
				<div className="flex flex-row flex-wrap justify-center gap-2">
					<Link to="/register/artist">
						<Button variant="default" className="text-xl">
							Register as an Artist
						</Button>
					</Link>
					<Link to="/register/label">
						<Button variant="default" className="text-xl">
							Register as a Label
						</Button>
					</Link>
					<Link to="/register/user">
						<Button variant="default" className="text-xl">
							Register as a User
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Registration;

