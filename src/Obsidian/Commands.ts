import { App, Editor, MarkdownFileInfo, MarkdownView } from "obsidian";
import DataWrangler from "../../main";
import { PLUGIN_NAME } from "../constants";
import { ImportDataModal } from "./Modals";


type EditorCallback = (
	editor: Editor,
	context: MarkdownView | MarkdownFileInfo,
) => void;

type ModalCallback = (
	app: App,
	context: DataWrangler
) => void

export interface DataWranglerCommand {
	id: string;
	name: string;
	callBack: EditorCallback | ModalCallback;
}

export const LoadDataCurrentFileCommand: DataWranglerCommand = {
	id: PLUGIN_NAME + "-load-data-current-file",
	name: "Load Data In The Current File",
	callBack: (editor: Editor, context: MarkdownFileInfo | MarkdownView) => {
		console.log(
			PLUGIN_NAME + "-load-data-current-file" + " CLICKED",
		);
	},
};

export const CreateDataFileCommand: DataWranglerCommand = {
	id: PLUGIN_NAME + "-create-new-page",
	name: "Create New Data File",
	callBack: (app: App, context: DataWrangler) => {
		CreateDataPageCallback(app, context);
	},

}

export function CreateDataPageCallback(app: App, context: DataWrangler) {
	const modal = new ImportDataModal(app, context.settings);
	modal.open()

}
