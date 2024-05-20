import { ArtistRegistrationData } from "@/pages/account/register/ArtistRegistration";
import { ValidationFieldErrorMap, ValidationReturn } from "./useMultiStepForm";
import { LabelRegistrationData } from "@/pages/account/register/LabelRegistration";
import { UserRegistrationData } from "@/pages/account/register/UserRegistration";
import { AddReleaseData } from "@/pages/dashboard/forms/ArtistAddRelease";
import { LabelAddReleaseData } from "@/pages/dashboard/forms/LabelAddRelease";

function validateAccountData(data: ArtistRegistrationData | LabelRegistrationData | UserRegistrationData): ValidationReturn {
	let isValid = true;
	const errors: ValidationFieldErrorMap = {};

	// Basic validation
	if (!data.email || data.email === "" || !data.password || data.password === "" || !data.confirmPassword || data.confirmPassword === "") {
		isValid = false;
		errors["allFields"] = "Fill in the required fields.";
	}
	if (data.password !== data.confirmPassword) {
		isValid = false;
		errors["confirmPassword"] = "Passwords do not match.";
	}
	if (data.password.length < 6) {
		isValid = false;
		errors["password"] = "Password must be at least 6 characters long.";
	}
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
	if (!emailRegex.test(data.email)) {
		isValid = false;
		errors["email"] = "Invalid email format.";
	}

	//TODO: Check if username and email are unique
	let isUsernameUnique = true;
	let isEmailUnique = true;
	function isArtistRegistrationData(data: any): data is ArtistRegistrationData {
		return data.artistname !== undefined;
	}

	function isLabelRegistrationData(data: any): data is LabelRegistrationData {
		return data.labelname !== undefined;
	}

	function isUserRegistrationData(data: any): data is UserRegistrationData {
		return data.username !== undefined;
	}

	if (isArtistRegistrationData(data)) {
		data = data as ArtistRegistrationData;
		if (data.artistname === "") {
			isValid = false;
			errors["allFields"] = "Fill in the required fields.";
		}
		if (!isUsernameUnique) {
			isValid = false;
			errors["artistname"] = "Username already exists.";
		}
	} else if (isLabelRegistrationData(data)) {
		data = data as LabelRegistrationData;
		if (data.labelname === "") {
			isValid = false;
			errors["allFields"] = "Fill in the required fields.";
		}
		if (!isUsernameUnique) {
			isValid = false;
			errors["labelname"] = "Username already exists.";
		}
	} else if (isUserRegistrationData(data)) {
		data = data as UserRegistrationData;
		if (data.username === "") {
			isValid = false;
			errors["allFields"] = "Fill in the required fields.";
		}
		if (!isUsernameUnique) {
			isValid = false;
			errors["username"] = "Username already exists.";
		}
	}

	if (!isEmailUnique) {
		isValid = false;
		errors["email"] = "Email already exists.";
	}

	return { isValid: isValid, errors: errors };
}

function validateBannerAndGenres(data: ArtistRegistrationData | LabelRegistrationData): ValidationReturn {
	let isValid = true;
	const errors: ValidationFieldErrorMap = {};
	if (data.genreList.length === 0) {
		isValid = false;
		errors["genres"] = "At least one genre is required.";
	}
	return { isValid: isValid, errors: errors } /* Add validation logic */;
}

function validatePfp(_: UserRegistrationData): ValidationReturn {
	return { isValid: true };
}

function validateChooseLabel(data: ArtistRegistrationData): ValidationReturn {
	let isValid = true;
	const errors: ValidationFieldErrorMap = {};
	if (data.labelType.viewType === "label" && data.label === null) {
		isValid = false;
		errors["label"] = "Label is required.";
	}
	if (data.labelType.viewType === "labelNotOnPlatform" && data.label === null) {
		isValid = false;
		errors["labelname"] = "Label name is required.";
	}
	return { isValid: isValid, errors: errors };
}

function validateChooseArtists(data: LabelRegistrationData): ValidationReturn {
	let isValid = true;
	const errors: ValidationFieldErrorMap = {};
	data.newArtists.forEach((artist, index) => {
		if (artist.artistName === "") {
			isValid = false;
			errors[`newArtists${index}`] = "Artist name is required.";
		}
	});
	return { isValid: isValid, errors: errors };
}

function validateSocials(_: ArtistRegistrationData | LabelRegistrationData): ValidationReturn {
	return { isValid: true };
}

function validateReleaseGeneral(data: AddReleaseData | LabelAddReleaseData): ValidationReturn {
	let isValid = true;
	const errors: ValidationFieldErrorMap = {};
	if (data.name.length < 1 || data.name.length > 50) {
		isValid = false;
		errors["releasename"] = "Name must be between 1 and 50 characters.";
	}
	if (data.description.length > 300) {
		isValid = false;
		errors["description"] = "Description must be less than 300 characters.";
	}
	if (!data.releaseDate) {
		isValid = false;
		errors["releasedate"] = "Release date is required.";
	}
	return { isValid: isValid, errors: errors };
}

function validateReleaseArtists(data: AddReleaseData | LabelAddReleaseData): ValidationReturn {
	let isValid = true;
	const errors: ValidationFieldErrorMap = {};
	data.newArtists.forEach((artist, index) => {
		if (artist.artistName === "") {
			isValid = false;
			errors[`newArtists${index}`] = "Artist name is required.";
		}
	});
	return { isValid: isValid, errors: errors };
}

function validateReleaseLabel(data: AddReleaseData): ValidationReturn {
	let isValid = true;
	const errors: ValidationFieldErrorMap = {};
	if (data.labelType.viewType === "label" && data.label === null) {
		isValid = false;
		errors["label"] = "Label is required.";
	}
	if (data.labelType.viewType === "labelNotOnPlatform" && data.newLabel?.name === null) {
		isValid = false;
		errors["labelname"] = "Label name is required.";
	}
	return { isValid: isValid, errors: errors };
}

function validateReleaseUrls(_: any): ValidationReturn {
	return { isValid: true };
}

function validateReleasePfpAndGenres(data: AddReleaseData | LabelAddReleaseData): ValidationReturn {
	let isValid = true;
	const errors: ValidationFieldErrorMap = {};
	if (data.genreList.length === 0) {
		isValid = false;
		errors["genres"] = "At least one genre is required.";
	}
	return { isValid: isValid, errors: errors };
}

function validateGeneralInfo(data: ArtistRegistrationData | LabelRegistrationData): ValidationReturn {
	let isValid = true;
	const errors: ValidationFieldErrorMap = {};
	if (data.description.length > 300) {
		isValid = false;
		errors["description"] = "Description must be less than 300 characters.";
	}
	return { isValid: isValid, errors: errors };
}

function validateLabelReleaseArtists(data: LabelAddReleaseData): ValidationReturn {
	let isValid = true;
	const errors: ValidationFieldErrorMap = {};
	if(data.myArtists.length === 0 && data.otherArtists.length === 0 && data.newArtists.length === 0) {
		isValid = false;
		errors["allFields"] = "At least one artist is required.";
	}
	return { isValid: isValid, errors: errors };
}

export {
	validateAccountData,
	validateBannerAndGenres,
	validateGeneralInfo,
	validateChooseLabel,
	validateChooseArtists,
	validateSocials,
	validatePfp,
	validateReleaseGeneral,
	validateReleaseArtists,
	validateReleaseLabel,
	validateReleaseUrls,
	validateReleasePfpAndGenres,
	validateLabelReleaseArtists,
};
