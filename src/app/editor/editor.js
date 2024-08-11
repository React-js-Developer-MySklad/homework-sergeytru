import editor_template from "./editor.html";
import nodeFromText from "../utils/nodeUtils";
import {Modal} from "flowbite";

let rootElement = nodeFromText(editor_template);
let form = rootElement.querySelector("form");
document.body.appendChild(rootElement);

let modal = new Modal(rootElement);
let curCallback = () => {};

rootElement.querySelectorAll("[type=submit]").forEach(btn => btn.addEventListener('click', event => {
    if (form.checkValidity()) {
        modal.hide();
        curCallback();
    } else {
        form.reportValidity();
    }
    event.preventDefault();
    event.stopPropagation();
}));

rootElement.querySelectorAll("[type=reset]").forEach(btn => btn.addEventListener('click', event => {
    modal.hide();
    event.preventDefault();
    event.stopPropagation();
}));

const key = field => field.attributes["data-key"].value;

function fillFields(data) {
    const targets = rootElement.querySelectorAll("[data-key]");
    targets.forEach(field => field.value = data[key(field)] || "");
}

function fillData(data) {
    const targets = rootElement.querySelectorAll("[data-key]");
    targets.forEach(field => data[key(field)] = field.value);
}

function editItem(data, callback) {
    fillFields(data);
    curCallback = () => {
        fillData(data);
        callback();
    }
    modal.show();
}

export default editItem;