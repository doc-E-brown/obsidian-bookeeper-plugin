export enum DataWranglerFormat {
	label = "label",
	date = "date",
	// currency = "currency",
	number = "number",
	tag = "tag",
}
	
const stripQuotes = (val: string) => { return val.replace(/^"(.+(?="$))"$/, '$1'); }
	
export function parseFormat(value: string, format: DataWranglerFormat) : Date | number | string | string[] | void[] {
	switch(format) {

	case DataWranglerFormat.label: return stripQuotes(value);
	case DataWranglerFormat.number: return parseFloat(stripQuotes(value)); 
	// TODO, extra date configuration
	case DataWranglerFormat.date: return new Date(value.split("/").reverse().join("-")); 
	case DataWranglerFormat.tag: return stripQuotes(value).split("#").map((tag, idx, tags) => {
		if (tag) {return "#" + stripQuotes(tag)}
	}).filter((val, idx, tag) => val);
}
}
	
export interface DataWranglerColumnConfig {
	key: string;
	format: DataWranglerFormat;
}

export interface DataWranglerCell{
	config: DataWranglerColumnConfig;
	/* eslint-disable  @typescript-eslint/no-explicit-any */
	value?: any;
}

export type DataWranglerRow = DataWranglerCell[];

export interface DataWranglerTableConfig {
	name: string,
	columns: DataWranglerColumnConfig[];
}

export interface DataWranglerTable {
	name: string;
	config: DataWranglerTableConfig;
	contents: DataWranglerRow[];
	toMarkdown(): string
}

export interface LoadDataWranglerTable {
	loadFromString(content: String, config: DataWranglerTableConfig, colSep: string, lineSep: string)
}

