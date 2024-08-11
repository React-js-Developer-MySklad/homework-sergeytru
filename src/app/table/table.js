import item_template from "./item.html";
import table_template from "./table.html";
import nodeFromText from "../utils/nodeUtils";

function initTable(editItem) {
    let counterparties = [
        {
            "id": -5,
            "Наименование": "Московская биржа ММВБ-РТС",
            "ИНН": "77020778401",
            "Адрес": "Москва, ул. Фруктовая, 11А",
            "КПП": "102773938"
        },
        {
            "id": -4,
            "Наименование": "СПБ Биржа",
            "ИНН": "78012689654",
            "Адрес": "Санкт-Петербург, Речная ул. 5",
            "КПП": "109780440"
        },
        {
            "id": -3,
            "Наименование": "Санкт-Петербургская валютная биржа",
            "ИНН": "78253310452",
            "Адрес": "Санкт-Петербург, Васи Алексеева ул., 14",
            "КПП": "103784301"
        },
        {
            "id": -2,
            "Наименование": "Санкт-Петербургская Международная Товарно-сырьевая Биржа",
            "ИНН": "78403897304",
            "Адрес": "Санкт-Петербург, Нейшлотский пер. 7 лит Б корп 5",
            "КПП": "108984718"
        },
        {
            "id": -1,
            "Наименование": "Национальный Клиринговый Центр",
            "ИНН": "77500040235",
            "Адрес": "Москва, 2-я Дзержинская ул., 17",
            "КПП": "106771100"
        }
    ];

    function buildByTemplate(data) {
        let text = item_template;
        for (const column of ["Наименование", "ИНН", "Адрес", "КПП"]) {
            text = text.replaceAll("$" + column + "$", data[column])
        }
        let result = nodeFromText(text);
        result.addEventListener("click", event => {
            if (event.target.classList.contains("delete-item-button")) {
                counterparties = counterparties.filter(el => el.id !== data.id);
                updateTableBody();
                event.preventDefault();
            }
        });
        result.addEventListener("dblclick", event => {
            editItem(data, () => updateTableBody());
            event.preventDefault();
        });
        return result;
    }

    let tableRoot = nodeFromText(table_template);
    const tableBody = tableRoot.querySelector(".main-data");

    function updateTableBody() {
        let newChildren = counterparties.map(oneof => buildByTemplate(oneof));
        tableBody.replaceChildren(...newChildren);
    }

    function addItem() {
        let newItem = {};
        newItem.id = Math.max(...counterparties.map(x => x.id)) + 1;
        editItem(newItem, () => updateTableBody());
    }

    updateTableBody();
    return {tableRoot, addItem};
}

export default initTable;