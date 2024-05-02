import { describe, expect, test } from "@jest/globals";
import {
	DataWranglerColumnConfig,
	DataWranglerFormat,
	DataWranglerTableConfig,
	parseFormat,
} from "../../src/Data/DataModel";

describe("SerDe DataModel", () => {
	test("Save cell config to string", () => {
		const config: DataWranglerColumnConfig = {
			key: "col1",
			format: DataWranglerFormat.date,
		};
		expect(JSON.stringify(config)).toBe('{"key":"col1","format":"date"}');
	});

	test("Load config from string", () => {
		const str_config = '{"key":"amount","format":"number"}';

		const config: DataWranglerColumnConfig = JSON.parse(str_config);
		expect(config).toStrictEqual({
			key: "amount",
			format: DataWranglerFormat.number,
		});
	});

	test("Save table config to string", () => {
		const col1: DataWranglerColumnConfig = {
			key: "col1",
			format: DataWranglerFormat.date,
		};
		const col2: DataWranglerColumnConfig = {
			key: "col2",
			format: DataWranglerFormat.label
		};
		const table: DataWranglerTableConfig  = {
			name: "tmpTable",
			columns: [col1, col2]
		}
		
		const expected = "{\"name\":\"tmpTable\",\"columns\":[" + JSON.stringify(col1) + "," + JSON.stringify(col2) + "]}"
		expect(JSON.stringify(table)).toBe(expected)
	});
	
	test("Load table config from string", () => {
		const col1: DataWranglerColumnConfig = {
			key: "vendor",
			format: DataWranglerFormat.label,
		};
		const col2: DataWranglerColumnConfig = {
			key: "tags",
			format: DataWranglerFormat.tag
		};
		const config_str = "{\"name\":\"someTable\",\"columns\":[" + JSON.stringify(col1) + "," + JSON.stringify(col2) + "]}"
		const table: DataWranglerTableConfig = JSON.parse(config_str);
		expect(table).toStrictEqual({name: "someTable", columns: [col1, col2]})
	});
	
	test("Load tags from string", () => {
		const raw = "#datawrangler/expense#datawrangler/phone"
		
		const result = parseFormat(raw, DataWranglerFormat.tag);
		expect(result).toStrictEqual(["#datawrangler/expense", "#datawrangler/phone"])

	})
});
