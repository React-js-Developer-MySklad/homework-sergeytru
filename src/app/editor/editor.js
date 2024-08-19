import editor_template from "./editor.html";
import nodeFromText from "../utils/nodeUtils";
import {Modal} from "flowbite";

let rootElement = nodeFromText(editor_template);
let form = rootElement.querySelector("form");
document.body.appendChild(rootElement);

let modal = new Modal(rootElement);
let onSubmitAction = () => {};

rootElement.querySelectorAll("[type=submit]").forEach(btn => btn.addEventListener('click', event => {
    if (form.checkValidity()) {
        modal.hide();
        onSubmitAction();
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

const getKey = field => field.attributes["data-key"].value;

function fillFields(data) {
    const targets = rootElement.querySelectorAll("[data-key]");
    targets.forEach(field => field.value = data[getKey(field)] || "");
}

function fillData(data) {
    const targets = rootElement.querySelectorAll("[data-key]");
    targets.forEach(field => data[getKey(field)] = field.value);
}

function editItem(data, callback) {
    fillFields(data);
    onSubmitAction = () => {
        fillData(data);
        callback();
    }
    modal.show();
}

export default editItem;