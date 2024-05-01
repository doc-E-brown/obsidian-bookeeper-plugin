import { describe, test } from "@jest/globals";
import { CSVTable } from "../../src/Data/Csv";
import { BookKeeperColumnConfig, BookKeeperFormat, BookKeeperTableConfig } from "../../src/Data/DataModel";

function sampleConfig(): [string, BookKeeperTableConfig] {
	const col1: BookKeeperColumnConfig = {
		key: "Date",
		format: BookKeeperFormat.date
	};
	const col2: BookKeeperColumnConfig = {
		key: "Label",
		format: BookKeeperFormat.label
	};
	const col3: BookKeeperColumnConfig = {
		key: "Amount",
		format: BookKeeperFormat.number
	};
	
	const col4: BookKeeperColumnConfig = {
		key: "tags",
		format: BookKeeperFormat.tag
	};
	
	
	const config: BookKeeperTableConfig = {
		name: "Sample config",
		columns: [col1, col2, col3, col4]
		
	}
	
	const data = "2024-05-01,\"label\",\"175.25\",\"#tag1\"\r2023-12-03,\"some label\",\"123.45\",\"#tag1#tag2\""
	return [data, config]
}


describe("Test CSVTable", () => {
	test('Test load from string', () => {
		const [content, config] = sampleConfig() ;
		const table = new CSVTable();
		table.loadFromString(content, config);

		expect(table.config).toStrictEqual(config);
		expect(table.contents[0][0].value).toStrictEqual(new Date("2024-05-01"))
		expect(table.contents[0][1].value).toBe("label")
		expect(table.contents[0][2].value).toBe(175.25)
		expect(table.contents[1][0].value).toStrictEqual(new Date("2023-12-03"))
		expect(table.contents[1][1].value).toBe("some label")
		expect(table.contents[1][2].value).toBe(123.45)
		expect(table.contents[1][3].value).toStrictEqual(["#tag1", "#tag2"])
	})
})
