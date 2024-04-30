import { Editor, MarkdownFileInfo, MarkdownView } from "obsidian";

export const BOOKKEEPER_CMD_PREFIX = "bookkeeper";

type EditorCallback = (
	editor: Editor,
	context: MarkdownView | MarkdownFileInfo,
) => void;
export interface EditorCommand {
	id: string;
	name: string;
	editorCallback: EditorCallback;
}

export const LoadDataCurrentFileCommand: EditorCommand = {
	id: BOOKKEEPER_CMD_PREFIX + "-load-data-current-file",
	name: "Load Data In The Current File",
	editorCallback: (editor: Editor) => {
		console.log(
			BOOKKEEPER_CMD_PREFIX + "-load-data-current-file" + " CLICKED",
		);
	},
};
