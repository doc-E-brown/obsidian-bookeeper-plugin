import { App, Plugin, PluginManifest } from "obsidian";
import { LoadDataCurrentFileCommand } from "./Obsidian/Commands";
import BookKeeperSettings from "./Obsidian/Settings";

export default class BookKeeper extends Plugin {
	constructor(app: App, manifest: PluginManifest) {
		super(app, manifest);
	}

	onload(): void {
		// Add the settings tab
		this.addSettingTab(new BookKeeperSettings(this.app, this));

		// Add a simple command
		this.addCommand(LoadDataCurrentFileCommand);
	}

	onunload(): void {}

	async loadData() {}

	/* eslint-disable  @typescript-eslint/no-explicit-any */
	async saveData(data: any): Promise<void> {}
}
