export interface NavItem {
	title: string;
	path?: string;
	disabled?: boolean;
	external?: boolean;
	// icon?: keyof typeof Icons;
	label?: string;
	description?: string;
}

export interface NavItemWithChildren extends NavItem {
	items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
	items?: NavItemWithChildren[];
}
