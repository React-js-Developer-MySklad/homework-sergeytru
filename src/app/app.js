import html from "./app.html";
import './app.css'
import item_template from "./item.html";

let counterparties = [
    {
        "id": -5,
        "Наименование": "Московская биржа ММВБ-РТС",
        "ИНН": "7702077840",
        "Адрес": "Москва, ул. Фруктовая, 11А",
        "КПП": "1027739387411"
    },
    {
        "id": -4,
        "Наименование": "СПБ Биржа",
        "ИНН": "7801268965",
        "Адрес": "Санкт-Петербург, Речная ул. 5",
        "КПП": "1097800000440"
    },
    {
        "id": -3,
        "Наименование": "Санкт-Петербургская валютная биржа",
        "ИНН": "7825331045",
        "Адрес": "Санкт-Петербург, Васи Алексеева ул., 14",
        "КПП": "1037843013812"
    },
    {
        "id": -2,
        "Наименование": "Санкт-Петербургская Международная Товарно-сырьевая Биржа",
        "ИНН": "7840389730",
        "Адрес": "Санкт-Петербург, Нейшлотский пер. 7 лит Б корп 5",
        "КПП": "108984718890"
    },
    {
        "id": -1,
        "Наименование": "Национальный Клиринговый Центр",
        "ИНН": "7750004023",
        "Адрес": "Москва, 2-я Дзержинская ул., 17",
        "КПП": "1067711004481"
    }
];

const buildByTemplate = function (data) {
    let result = item_template;
    for (const column of ["id", "Наименование", "ИНН", "Адрес", "КПП"]) {
        result = result.replaceAll("$" + column + "$", data[column])
    }
    return result;
}

const rootElement = document.getElementById('root');
rootElement.innerHTML = html;

const tableBody = rootElement.querySelector(".main-data");

function activateDeleteButtons(rootElement) {
    rootElement.querySelectorAll('.delete-item-button').forEach(function (triggerEl) {
        let rowContainer = triggerEl.closest("[data-item-id]");
        let dataId = Number(rowContainer.getAttribute('data-item-id'));
        if (dataId !== undefined) {
            triggerEl.addEventListener("click", event => {
                counterparties = counterparties.filter(el => el.id !== dataId);
                updateTableBody();
                event.preventDefault();
            });
        }
    });
}

function updateTableBody() {
    tableBody.innerHTML = counterparties.map(oneof => buildByTemplate(oneof)).join("\n");
    //todo: редактирование по двойному нажатию
    activateDeleteButtons(tableBody);
}

updateTableBody();