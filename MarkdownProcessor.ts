import { Row } from "csv";
import { MarkdownPostProcessorContext } from "obsidian";

export function MarkdownCodeProcessor(
	source: string,
	element: HTMLElement,
	context: MarkdownPostProcessorContext,
): Promise<any> | void {
	const rows = source.split("\n").filter((row) => row.length > 0);

	const table = element.createEl("table");
	const body = table.createEl("body");

	const header = body.createEl("tr");
	header.createEl("th", { text: "Date" });
	header.createEl("th", { text: "Amount" });
	header.createEl("th", { text: "Vendor" });
	header.createEl("th", { text: "Balance" });
	header.createEl("th", { text: "Tags" });

	rows.forEach((val, idx, arr) => {
		console.log(val);
		const rec: Row = JSON.parse(val);
		const row = body.createEl("tr");
		row.createEl("td", { text: rec.date.toString() });
		row.createEl("td", { text: rec.amount.toString() });
		row.createEl("td", { text: rec.vendor });
		row.createEl("td", { text: rec.balance.toString() });
		const tagCell = row.createEl("td");

		// <a href="#bookkeeper/test" class="tag" target="_blank" rel="noopener">#bookkeeper/test</a>

		rec.tags.forEach((tag, idx, arr) => {
			const tagRow = tagCell.createEl("tr");
			const tagEl = tagRow.createEl("td");
			const tagHTML = tagEl.createEl("a", {
				text: tag,
				href: tag,
				cls: "tag",
			}); // "href=" + tag + "class=\"tag\" target=\"_blank\" rel=\"noopener\"");
			tagHTML.target = "_blank";
			tagHTML.rel = "noopener";
		});
	});
}
