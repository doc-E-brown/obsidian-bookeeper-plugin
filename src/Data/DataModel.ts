export enum BookKeeperFormat {
	label = "label",
	date = "date",
	currency = "currency",
	tag = "tag",
}
	
export interface BookKeeperCellConfig {
	key: string;
	format: BookKeeperFormat;
}

export interface BookKeeperCell{
	config: BookKeeperCellConfig;
	/* eslint-disable  @typescript-eslint/no-explicit-any */
	value?: any;
	
	toMarkdown(this): string
}

export type BookKeeperRow = BookKeeperCell[];

export interface BookKeeperTableConfig {
	name: string,
	columns: BookKeeperCellConfig[];
}

export interface BookKeeperTable {
	name: string;
	config: BookKeeperTableConfig;
	contents: BookKeeperRow[];
	toMarkdown(this): string
}
