import { App, PluginSettingTab } from "obsidian";
import BookKeeper from "../main";

class BookKeeperSettings extends PluginSettingTab {
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

export default BookKeeperSettings;
