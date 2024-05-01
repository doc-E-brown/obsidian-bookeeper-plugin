export enum BookKeeperFormat {
	label = "label",
	date = "date",
	// currency = "currency",
	number = "number",
	tag = "tag",
}
	
const stripQuotes = (val: string) => { return val.replace(/^"(.+(?="$))"$/, '$1'); }
	
export function parseFormat(value: string, format: BookKeeperFormat) : Date | number | string | string[] | void[] {
	switch(format) {

	case BookKeeperFormat.label: return stripQuotes(value);
	case BookKeeperFormat.number: return parseFloat(stripQuotes(value)); 
	case BookKeeperFormat.date: return new Date(value); 
	case BookKeeperFormat.tag: return stripQuotes(value).split("#").map((tag, idx, tags) => {
		if (tag) {return "#" + stripQuotes(tag)}
	}).filter((val, idx, tag) => val);
}
}
	
export interface BookKeeperColumnConfig {
	key: string;
	format: BookKeeperFormat;
}

export interface BookKeeperCell{
	config: BookKeeperColumnConfig;
	/* eslint-disable  @typescript-eslint/no-explicit-any */
	value?: any;
}

export type BookKeeperRow = BookKeeperCell[];

export interface BookKeeperTableConfig {
	name: string,
	columns: BookKeeperColumnConfig[];
}

export interface BookKeeperTable {
	name: string;
	config: BookKeeperTableConfig;
	contents: BookKeeperRow[];
	toMarkdown(this): string
}

export interface LoadBookKeeperTable {
	loadFromString(content: String, config: BookKeeperTableConfig, colSep: string, lineSep: string)
}

