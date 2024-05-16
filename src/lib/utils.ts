import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

export function getImageUrl(type: string, image: string): string {
	if (type === "") return new URL(`../assets/${image}`, import.meta.url).href;
	return new URL(`../assets/${type}/${image}`, import.meta.url).href;
}

export function capitalizeFirstLetter(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function handleSocialLinkClick(e: React.MouseEvent<HTMLImageElement>, url: string): void {
	e.stopPropagation();
	window.open(url, "_blank");
}

export function ignoreClick(event: React.MouseEvent<HTMLElement, MouseEvent>): void {
	const target = event.target as HTMLElement;
	if (target.nodeName.toLowerCase() !== "button") {
		event.stopPropagation();
	}
}

export function formatDateToYYYYMMDD(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed in JS
	const day = String(date.getDate()).padStart(2, '0');
  
	return `${year}-${month}-${day}`;
  }
