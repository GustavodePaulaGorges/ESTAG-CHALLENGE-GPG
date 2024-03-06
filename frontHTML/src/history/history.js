"use strict";
const getOrders = fetch("http://localhost/routers/orders.php?op=GET").then(
  (res) => {
    return res.json();
  }
);

const getOrder_items = fetch(
  "http://localhost/routers/order_items.php?op=GET"
).then((res) => {
  return res.json();
});

const getProducts = fetch("http://localhost/routers/products.php?op=GET").then(
  (res) => {
    return res.json();
  }
);

const openModal = () =>
  document.getElementById("modal").classList.add("active");

const closeModal = () =>
  document.getElementById("modal").classList.remove("active");

const createRow = (order, index) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td id="content">#${index + 1}</td>
    <td id="content">#${order.code}</td>
    <td id="content">$${order.tax}</td>
    <td id="content">$${order.total}</td>
    <td> 
    <button class="mainBtn" onclick="openModal()"  id='openModal-${
      order.code
    }'>View</button>
    </td>
    `;
  document
    .querySelector("#purchaseTable>tbody")
    .appendChild(newRow)
    .classList.add("othRow");
};

const clearTable = () => {
  const rows = document.querySelectorAll("#PurchasesTable>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

const updateTable = async () => {
  clearTable();
  let orders = await getOrders;
  orders.forEach(createRow);
};

const openPurchase = async (event) => {
  const [action, index] = event.target.id.split("-");
  const listOrder_items = await getOrder_items;
  const orderSelected = listOrder_items.filter((i) => i.order_code === index);
  for (let item of orderSelected) {
    createModal(item);
  }
};

const createModal = async (item) => {
  const listProducts = await getProducts;
  let itemProduct = listProducts.find((obj) => obj.code == item.product_code);
  let taxTotal = itemProduct.tax_price * item.amount;
  console.log(itemProduct);
  const modalInfo = document.createElement("tbody");
  modalInfo.innerHTML += `
        <tr class="othRow">
            <td>${itemProduct.name}</td>
            <td>$${itemProduct.price}</td>
            <td>$${itemProduct.taxed_price}</td>
            <td>${item.amount}</td>
            <td>$${item.price}</td>
            <td>$${taxTotal.toFixed(2)}</td>
        </tr>
        `;

  document
    .querySelector("#PurchasesTable")
    .appendChild(modalInfo)
    .classList.add("othRow");
};

document
  .querySelector("#purchaseTable")
  .addEventListener("click", openPurchase);

document.querySelector("#modal").addEventListener("click", closeModal);
document.querySelector("#modal").addEventListener("click", clearTable);

updateTable();
