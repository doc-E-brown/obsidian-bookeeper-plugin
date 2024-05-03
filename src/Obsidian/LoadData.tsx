import { App, Modal } from "obsidian";
import { useState } from "react";
import { CSVTable } from "../Data/Csv";
import { DataWranglerTableConfig } from "../Data/DataModel";

export interface Props {
	app: App,
	tableConfigurations: DataWranglerTableConfig[]
	modal: Modal,
};

export default function LoadDataComponent({app, tableConfigurations, modal}: Props) {

	const [dataFile, setDataFile] = useState<File>();
	const [configIdx, setConfigIdx] = useState(0);
	const [filePath, setFilePath] = useState("");
	const [validFormReason, setValidFormReason] = useState("");


	const options = tableConfigurations.map((config, idx, _arr) => {
		return <option value={idx} key={idx}>{config.name}</option>
	})
	
	const clearError = () => {
		setInterval(() => {
			setValidFormReason("")
		}, 3000)
	
	}
	
	const onSubmit = async (evt) => {
		evt.preventDefault();
		const config = tableConfigurations[configIdx]; 

		if (filePath == "") {
			setValidFormReason("No note path entered");
			clearError();
			return;
		} else {
			const data = await dataFile.text();
			const records = new CSVTable();
			records.name = dataFile.name;
			records.loadFromString(data, config);
			const mdContents = records.toMarkdown();
			
			const newPath = filePath + ".md";
			await app.vault.create(newPath, mdContents);
			modal.close()
		}
		
	}
	
	
	return (<>
	<h1> Load Data </h1>
	<table>
		<tbody>
			<tr>
				<td>Data file to import</td>
				<td><input name="data-file" type="file" multiple={false} accept=".csv,.txt,.tsv" onChange={(e) => setDataFile(e.target.files[0])}/></td>
			</tr>
			<tr>
			<td>Select data configuration</td>
			<td>
				<select name="config" onChange={(e) => setConfigIdx(parseInt(e.target.value))}>
				{options}	
				</select>
			</td>
			</tr>
			<tr>
				<td>Enter note path</td>
				<td><input name="path" type='text' onChange={(e) => setFilePath(e.target.value)}/></td>
			</tr>
		</tbody>
	</table>
	<button onClick={onSubmit}>Import Data</button>
	{validFormReason}
	</>
	)
}
