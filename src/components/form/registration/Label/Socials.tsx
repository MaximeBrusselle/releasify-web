import { FormWrapper } from "@/components/form/FormWrapper";
import { SocialInfo, Social } from "@/data/other/socialTypes";
import socialPlatforms from "@/data/other/socialPlatforms";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { getImageUrl } from "@/lib/utils";
import { ValidationFieldErrorMap } from "../../useMultiStepForm";

type SocialsData = {
	labelSocials: SocialInfo[];
};

type SocialsProps = SocialsData & {
	labelSocials: SocialInfo[];
	updateFields: (newData: Partial<SocialsData>) => void;
	errors: ValidationFieldErrorMap;
};

export function Socials({ labelSocials, updateFields, errors }: SocialsProps) {
	const addOrEditSocial = (platform: Social, url: string) => {
		if (url === "") {
			const newSocials = labelSocials.filter((social) => social.platform !== platform);
			updateFields({ labelSocials: newSocials });
		} else {
			const newSocials = labelSocials.filter((social) => social.platform !== platform);
			newSocials.push({ platform: platform, url: url });
			updateFields({ labelSocials: newSocials });
		}
	};

	return (
		<FormWrapper title="Socials" allError={errors["allFields"]}>
			<div className="flex flex-col items-center justify-center w-full h-full gap-8 sm:max-w-[30vw]">
				<div className="grid grid-cols-2 place-items-center gap-4 w-full">
					{socialPlatforms.map((platform) => {
						return (
							<div className="flex flex-col gap-2 w-full" key={platform.name}>
								<div className="flex flex-row justify-start items-center m-0 p-0 gap-2">
									<img src={getImageUrl("socialplatforms", platform.logo)} alt="logo" className="aspect-square w-6" />
									<Label htmlFor="labelname" className="font-bold text-lg">
										{platform.name}
									</Label>
								</div>
								<Input type="text" id="labelname" className="border-[1px] border-grey-200 border-solid w-full" onChange={(e) => addOrEditSocial(platform, e.target.value)} placeholder="Enter url..."/>
							</div>
						);
					})}
				</div>
			</div>
		</FormWrapper>
	);
}
