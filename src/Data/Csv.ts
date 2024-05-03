import { DataWranglerCell, DataWranglerFormat, DataWranglerRow, DataWranglerTable, DataWranglerTableConfig, LoadDataWranglerTable, parseFormat } from "./DataModel";

export class CSVTable implements DataWranglerTable, LoadDataWranglerTable {
	name: string;
	config: DataWranglerTableConfig;
	contents: DataWranglerRow[];

	toMarkdown(): string {
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
	
	loadFromString(content: String, config: DataWranglerTableConfig, colSep=",", lineSep="\r\n") {
		this.config = config;
		this.contents = []
		this.name = ""
		content.split(lineSep).forEach((line, _rowIdx, _arr) => {
			const row: DataWranglerRow = [];
			let cells = line.replace(lineSep, "").split(colSep);
			
			if (cells.length == 1) {return;}
			
			const hasTags = line.indexOf("#") >= 0
			
			// Check if there are no tags in the table
			if (!hasTags){ cells.push("") }
			cells.forEach((col, colIdx, _lineArr) => {
				const cell: DataWranglerCell = {
					config: config.columns[colIdx],
					value: parseFormat(col, config.columns[colIdx].format)
				};
				row.push(cell);
			})
			this.contents.push(row)
		})
	}
}
