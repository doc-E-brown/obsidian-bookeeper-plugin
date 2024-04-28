import * as fs from "fs";

export class Row {
  
  Date: Date
  Amount: Number
  Vendor: String
  Balance: Number
  Tags: string[]
  
  constructor(settings: any) {
	  return this
  }
  
  new(date_string: string, amount: string, vendor: string, balance: string, tags?: string[]) {
      this.Date = new Date(date_string.split('/').reverse().join('-')); // Need to be able to configure the date format
      this.Amount = parseFloat(amount);
      this.Vendor = vendor;
      this.Balance = parseFloat(balance);   
	  if (tags ){
		this.Tags = tags;
	  } else {
		this.Tags = [];
	  }
  }
  
  header(): string { // Need to get the headers from the file or configure the file
    
    const headings = "| Date | Amount | Vendor | Balance | Tags |";
    const separator = "|---|---|---|---|---| ";
    
    return headings + "\n" + separator + " \n";

  }
  
  toMarkdown(): string {
    return "|" + [this.Date.toLocaleDateString(), this.Amount, this.Vendor, this.Balance, this.Tags.join(" ")].join("|")
  }
  
}

function clean_string(x: string): string {
	return x.trimStart().trimEnd().replace('"', '')
}

function rowFromString(value: string, sep: string): Row {
	const values = value.split(sep).map(clean_string);
	const tags = value.length >= 5 ? values.slice(4, values.length + 1) : undefined;
	const rec = new Row(null)
	rec.new(values[0], values[1], values[2], values[3], tags); 
	return rec
}

export function parseCsv(contents: string, sep: string = ',', line: string = '\r'): Row[] {
	const rows: Row[] = contents.split(line).map(rec => rowFromString(rec, sep));
	rows.pop(); // Ignore the trailing last lines
	return rows
	
}

async function writeLedger(filepath: fs.PathLike, rows: Row[]): Promise<void> {
  const heading = rows[0].header();
  await fs.promises.writeFile(filepath, heading, {flag: "a"});
  await rows.forEach(element => {
    fs.promises.writeFile(filepath, element.toMarkdown(), {flag: "a"});
  });
  
} 
/* 
async function main() {
  const csvFilePath = path.resolve('CSVData.csv');
  const headers = ['Date', 'Amount', 'Vendor', 'Balance'];
  var rows = await loadCsv(csvFilePath, headers);
  
  await writeLedger(path.resolve("CSVData.md"), rows);

  // rows = rows.sort((a: Row, b : Row) => {return a.Date.valueOf() - b.Date.valueOf();});
  // console.log(rows[0]);
}

 */
