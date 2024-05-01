import { BookKeeperCell, BookKeeperRow, BookKeeperTable, BookKeeperTableConfig, LoadBookKeeperTable, parseFormat } from "./DataModel";

export class CSVTable implements BookKeeperTable, LoadBookKeeperTable {
	name: string;
	config: BookKeeperTableConfig;
	contents: BookKeeperRow[];

	toMarkdown(this: any): string {
		throw new Error("Method not implemented.");
	}
	
	loadFromString(content: String, config: BookKeeperTableConfig, colSep=",", lineSep="\r") {
		this.config = config;
		this.contents = []
		this.name = ""
		content.split(lineSep).forEach((line, idx, arr) => {
			const row: BookKeeperRow = [];
			line.split(colSep).forEach((col, idx, lineArr) => {
				const cell: BookKeeperCell = {
					config: config.columns[idx],
					value: parseFormat(col, config.columns[idx].format)
				};
				row.push(cell);
			})
			this.contents.push(row)
		})
	}
}
