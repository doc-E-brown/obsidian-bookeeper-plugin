import { cloneDeep } from "lodash";
import { App, Plugin, PluginManifest } from "obsidian";
import { CreateDataFileCommand, CreateDataPageCallback, LoadDataCurrentFileCommand } from "./src/Obsidian/Commands";
import DataWranglerSettings, { DataWranglerSettingsTab, DefaultDataWranglerSettings } from "./src/Obsidian/Settings";

export default class DataWrangler extends Plugin {
	settings: DataWranglerSettings
	
	
	constructor(app: App, manifest: PluginManifest) {
		super(app, manifest);
	}

	async onload(): Promise<void> {
		// Load the settings
		await this.loadSettings();

		// Add the settings tab
		this.addSettingTab(new DataWranglerSettingsTab(this.app, this));

		// Add a slash commands
		this.addCommand(LoadDataCurrentFileCommand);
		this.addCommand(CreateDataFileCommand);
		
		// Add a ribbon command
		this.addRibbonIcon("file-spreadsheet", "Create new datawrangler page", (_evt) => {CreateDataPageCallback(this.app, this)})
	}

	onunload(): void {}

	async loadSettings() {
		const savedData = await this.loadData();
		if (!savedData) {
			this.settings = cloneDeep(new DefaultDataWranglerSettings())
		} else {
			this.settings = savedData
		}
	}
	
	async saveSettings() {
		await this.saveData(this.settings);
	}
}
