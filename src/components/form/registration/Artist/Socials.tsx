import { FormWrapper } from "@/components/form/FormWrapper";
import { SocialInfo } from "@/data/other/socialTypes";
import { socialPlatforms } from "@/data/other/socialsArtists";

type SocialsData = {
	socials: SocialInfo[];
};

type SocialsProps = SocialsData & {
	socials: SocialInfo[];
	updateFields: (newData: Partial<SocialsData>) => void;
};

export function Socials({ socials, updateFields }: SocialsProps) {
	const addOrEditSocial = (index: number, newSocial: SocialInfo) => {
		updateFields({
			socials: socials.map((social, i) => (i === index ? newSocial : social)),
		});
	}

	return (
		<FormWrapper title="Socials">
			<div className="flex flex-col items-start justify-center w-full h-full gap-8"></div>
		</FormWrapper>
	);
}
