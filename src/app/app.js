import html from "./app.html";
import './app.css'
import editItem from "./editor/editor";
import initTable from './table/table';

const rootElement = document.getElementById('root');
rootElement.innerHTML = html;

let {tableRoot, addItem} = initTable(editItem);
document.getElementById('table-placeholder').appendChild(tableRoot);
document.getElementById('add-row-button').addEventListener("click", addItem);