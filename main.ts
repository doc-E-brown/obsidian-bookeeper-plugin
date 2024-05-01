import { App, Plugin, PluginManifest } from "obsidian";
import { LoadDataCurrentFileCommand } from "./src/Obsidian/Commands";
import BookKeeperSettings, { BookKeeperSettingsTab, DefaultBookKeeperSettings } from "./src/Obsidian/Settings";

export default class BookKeeper extends Plugin {
	settings: BookKeeperSettings
	
	
	constructor(app: App, manifest: PluginManifest) {
		super(app, manifest);
	}

	async onload(): Promise<void> {
		// Load the settings
		await this.loadSettings();

		// Add the settings tab
		this.addSettingTab(new BookKeeperSettingsTab(this.app, this));

		// Add a simple command
		this.addCommand(LoadDataCurrentFileCommand);
	}

	onunload(): void {}

	async loadSettings() {
		this.settings = Object.assign({}, new DefaultBookKeeperSettings(), await this.loadData());
		console.log(this.settings)
	}
	
	async saveSettings() {
		await this.saveData(this.settings);
	}
}
