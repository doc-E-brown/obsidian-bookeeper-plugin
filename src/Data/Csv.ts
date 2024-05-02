import { DataWranglerCell, DataWranglerFormat, DataWranglerRow, DataWranglerTable, DataWranglerTableConfig, LoadDataWranglerTable, parseFormat } from "./DataModel";

export class CSVTable implements DataWranglerTable, LoadDataWranglerTable {
	name: string;
	config: DataWranglerTableConfig;
	contents: DataWranglerRow[];

	toMarkdown(): string {
		console.log(this.contents)
		let table = "|" + this.config.columns.map((val, idx, arr) => {
			return val.key
		}).join("|") + "|"
		let sep = ""
		for(var i = 0; i < table.length; i++) {
			if (table[i] == "|") {sep += "|"} else {sep += "-"}
		}
		table += "\n" + sep + "\n";

		// Add the contents
		table += this.contents.map((row, idx, arr) => {
			return "|" + row.map((cell, idx, row) => {
				if (this.config.columns[idx].format == DataWranglerFormat.date) {
					return cell.value.toDateString();
				}
				return cell.value
			}).join("|") + "|"
		}).join("\n")
		return table

	}
	
	loadFromString(content: String, config: DataWranglerTableConfig, colSep=",", lineSep="\r") {
		this.config = config;
		this.contents = []
		this.name = ""
		content.split(lineSep).forEach((line, rowIdx, arr) => {
			const row: DataWranglerRow = [];
			line.split(colSep).forEach((col, colIdx, lineArr) => {
				const cell: DataWranglerCell = {
					config: config.columns[colIdx],
					value: parseFormat(col, config.columns[colIdx].format)
				};
				row.push(cell);
			})
			// Only add valid rows
			if (row.length == config.columns.length) {
				this.contents.push(row)
			}
		})
	}
}
