import html from "./app.html";
import './app.css'
import editItem from "./editor/editor";
import initTable from './table/table';

const rootElement = document.getElementById('root');
rootElement.innerHTML = html;

const tableShell = document.getElementById('table-placeholder');
tableShell.appendChild(initTable(editItem));