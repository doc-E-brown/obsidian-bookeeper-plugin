import { BookKeeperRow, BookKeeperTable, BookKeeperTableConfig } from "./DataModel";

export class CSVTable implements BookKeeperTable {
	name: string;
	config: BookKeeperTableConfig;
	contents: BookKeeperRow[];
	toMarkdown(this: any): string {
		throw new Error("Method not implemented.");
	}
}
