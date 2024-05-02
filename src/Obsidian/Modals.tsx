import { App, Modal } from "obsidian";
import { StrictMode } from "react";
import { Root, createRoot } from "react-dom/client";
import LoadDataComponent from "./LoadData";
import DataWranglerSettings from "./Settings";

export class ImportDataModal extends Modal {
	root: Root | null = null;
	settings: DataWranglerSettings;

	constructor(app: App, settings: DataWranglerSettings) {
		super(app)
		this.settings = settings
	}

	onOpen() {
		this.root = createRoot(this.containerEl.children[1]);
		this.root.render(
			<StrictMode>
			  <LoadDataComponent app={this.app} modal={this} tableConfigurations={this.settings.tableConfigurations}/>
			</StrictMode>
		);
	}

	onClose() {
	    if (this.root) {
			this.root.unmount();
		}
	}

}
