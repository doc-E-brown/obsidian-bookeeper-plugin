import { describe, expect, test } from "@jest/globals";
import {
	BookKeeperCellConfigIface,
	BookKeeperFormat,
	BookKeeperTableConfigIface,
} from "../../src/Data/DataModel";

describe("SerDe DataModel", () => {
	test("Save cell config to string", () => {
		const config: BookKeeperCellConfigIface = {
			key: "col1",
			format: BookKeeperFormat.date,
		};
		expect(JSON.stringify(config)).toBe('{"key":"col1","format":"date"}');
	});

	test("Load config from string", () => {
		const str_config = '{"key":"amount","format":"currency"}';

		const config: BookKeeperCellConfigIface = JSON.parse(str_config);
		expect(config).toStrictEqual({
			key: "amount",
			format: BookKeeperFormat.currency,
		});
	});

	test("Save table config to string", () => {
		const col1: BookKeeperCellConfigIface = {
			key: "col1",
			format: BookKeeperFormat.date,
		};
		const col2: BookKeeperCellConfigIface = {
			key: "col2",
			format: BookKeeperFormat.label
		};
		const table: BookKeeperTableConfigIface  = {
			name: "tmpTable",
			columns: [col1, col2]
		}
		
		const expected = "{\"name\":\"tmpTable\",\"columns\":[" + JSON.stringify(col1) + "," + JSON.stringify(col2) + "]}"
		expect(JSON.stringify(table)).toBe(expected)
	});
	
	test("Load table config from string", () => {
		const col1: BookKeeperCellConfigIface = {
			key: "vendor",
			format: BookKeeperFormat.label,
		};
		const col2: BookKeeperCellConfigIface = {
			key: "tags",
			format: BookKeeperFormat.tag
		};
		const config_str = "{\"name\":\"someTable\",\"columns\":[" + JSON.stringify(col1) + "," + JSON.stringify(col2) + "]}"
		const table: BookKeeperTableConfigIface = JSON.parse(config_str);
		expect(table).toStrictEqual({name: "someTable", columns: [col1, col2]})
	});
});
