import { App, PluginSettingTab } from "obsidian";
import BookKeeper from "../../main";
import { BookKeeperColumnConfig, BookKeeperFormat, BookKeeperTableConfig } from "../Data/DataModel";

export class BookKeeperSettingsTab extends PluginSettingTab {
	plugin: BookKeeper;

	constructor(app: App, plugin: BookKeeper) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display() {
		const { containerEl } = this;
		containerEl.empty();
		console.log("BookKeeperSettings Clicked");
	}
}


export default interface BookKeeperSettings {
	tableConfigurations: BookKeeperTableConfig[]
}

export class DefaultBookKeeperSettings implements BookKeeperSettings{
	tableConfigurations: BookKeeperTableConfig[]; 

	constructor() {
		const date: BookKeeperColumnConfig = {key: "Date", format: BookKeeperFormat.date};
		const amount: BookKeeperColumnConfig = {key: "Amount", format: BookKeeperFormat.number};
		const vendor: BookKeeperColumnConfig = {key: "Vendor", format: BookKeeperFormat.label};
		const balance: BookKeeperColumnConfig = {key: "Balance", format: BookKeeperFormat.number};
		const tags: BookKeeperColumnConfig = {key: "Tags", format: BookKeeperFormat.number};
		
		this.tableConfigurations = [
			{
				name: "Default Configuration",
				columns: [
					date, amount, vendor, balance, tags
				]
			}
		]
	}

}
