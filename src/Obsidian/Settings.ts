import { PathLike } from "fs";
import { App, PluginSettingTab } from "obsidian";
import DataWrangler from "../../main";
import { DataWranglerColumnConfig, DataWranglerFormat, DataWranglerTableConfig } from "../Data/DataModel";

export class DataWranglerSettingsTab extends PluginSettingTab {
	plugin: DataWrangler;

	constructor(app: App, plugin: DataWrangler) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display() {
		const { containerEl } = this;
		containerEl.empty();
		console.log("DataWranglerSettings Clicked");
	}
}


export default interface DataWranglerSettings {
	dataLocation: PathLike
	tableConfigurations: DataWranglerTableConfig[]
}

export class DefaultDataWranglerSettings implements DataWranglerSettings{
	dataLocation: PathLike;
	tableConfigurations: DataWranglerTableConfig[]; 

	constructor() {
		const date: DataWranglerColumnConfig = {key: "Date", format: DataWranglerFormat.date};
		const amount: DataWranglerColumnConfig = {key: "Amount", format: DataWranglerFormat.number};
		const vendor: DataWranglerColumnConfig = {key: "Vendor", format: DataWranglerFormat.label};
		const balance: DataWranglerColumnConfig = {key: "Balance", format: DataWranglerFormat.number};
		const tags: DataWranglerColumnConfig = {key: "Tags", format: DataWranglerFormat.tag};
		
		this.dataLocation = ".";
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
