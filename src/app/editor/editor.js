import editor_template from "./editor.html";
import nodeFromText from "../utils/nodeUtils";
import {Modal} from "flowbite";

let rootElement = nodeFromText(editor_template);
document.body.appendChild(rootElement);

let modal = new Modal(rootElement);

const key = field => field.attributes["data-key"].value;

function fillFields(data) {
    const targets = rootElement.querySelectorAll("[data-key]");
    targets.forEach(field => field.value = data[key(field)]);
}

function fillData(data) {
    const targets = rootElement.querySelectorAll("[data-key]");
    targets.forEach(field => data[key(field)] = field.value);
}

function editItem(data, callback) {
  fillFields(data);
  modal.updateOnHide(() => {
      fillData(data);
      callback();
  });
  modal.show();
}

export default editItem;