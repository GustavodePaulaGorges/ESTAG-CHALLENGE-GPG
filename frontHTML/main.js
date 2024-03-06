const getLocalStorage = () => JSON.parse(localStorage.getItem("db_cart")) ?? [];

const formOrder = document.getElementById("finishForm");
const select = document.querySelector("select");
const urlOrder = "http://localhost/routers/orders.php?op=POST";
const urlItem = "http://localhost/routers/order_items.php?op=POST";


const setCart = (db_cart) =>
  localStorage.setItem("db_cart", JSON.stringify(db_cart));


const readCart = () => getLocalStorage();
const cart = readCart();

const createCart = (product) => {
  cart.push(product);
  setCart(cart);
}

const getCategories = fetch("http://localhost/routers/categories.php?op=GET").then(
  (res) => {
    return res.json();
  }
);

const getProducts = fetch("http://localhost/routers/products.php?op=GET").then(
  (res) => {
    return res.json();
  }
);

const createOptions = async () => {
  let products = await getProducts;
  for (const i of products) {
    const option = document.createElement("option");
    option.textContent = i.name;
    option.value = i.code;
    select.appendChild(option);
  }
};
createOptions();

const calcTaxSum = () => {
  let cart = readCart();
  let taxSum = 0;
  let totalSum = 0;
  for (const item of cart) {
    taxSum = parseFloat(taxSum) + parseFloat(item.taxtotal);
    totalSum = parseFloat(totalSum) + parseFloat(item.total);
  }
  return { taxSum: taxSum, totalSum: totalSum };
};

const displayTaxSum = () => {
  let calc = calcTaxSum();
  const priceDisplay = document.createElement("div");
  priceDisplay.innerHTML = `
    <div class="priceWrapper">
        <p class="tLabel">Tax:</p>
        <p class="tFinish">$${calc.taxSum.toFixed(2)}</p>
    </div>
    <div class="priceWrapper">
        <p class="tLabel">Total:</p>
        <p class="tFinish">$${calc.totalSum.toFixed(2)}</p>
    </div>
    `;
  document
    .querySelector(".fRight>div")
    .appendChild(priceDisplay)
    .classList.add("w-30");
};

function objectToFormData(obj) {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    formData.append(key, value);
  });
  console.log(formData.getAll("order_code"));
  return formData;
}

const postOrder = async (f_order) => {
  try {
    console.log("ORDER " + f_order.getAll("code"));
    const res = await fetch(urlOrder, {
      method: "POST",
      body: f_order,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const postOrderItem = async (f_item) => {
  console.log("ITEM " + f_item.getAll("order_code"));
  try {
    const res = await fetch(urlItem, {
      method: "POST",
      body: f_item,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const updateCart = (index, cart) => {
  const db_cart = readCart();
  db_cart[index] = cart;
  setCart(db_cart);
};

const deleteCart = (index) => {
  const db_cart = readCart();
  db_cart.splice(index, 1);
  setCart(db_cart);
};

const deleteCartI = (index) => {
  const db_cart = readCart();
  db_cart.splice(index);
  setCart(db_cart);
  window.location.reload();
};

const clearFields = () => {
  const fields = document.querySelectorAll(".formInput");
  fields.forEach((field) => (field.value = ""));
};


const isValidFields = () => {
  return document.getElementById("cartForm").reportValidity();
};

const calcInput = async () => {
  let products = await getProducts;
  let categories = await getCategories;

  let product = document.querySelector("select").value;
  let amount = document.getElementById("inputAmnt").value;
  let selectedProduct = products.find((element) => element.code == product);
  let selectedCategory = categories.find(
    (element) => element.code == selectedProduct.category_code
  );

  let taxPrice = parseFloat(
    selectedProduct.price * parseFloat(selectedCategory.tax / 100)
  );
  let taxedPrice = parseFloat(taxPrice) + parseFloat(selectedProduct.price);

  document.getElementById("inputTax").value = (taxPrice * amount).toFixed(2);
  document.getElementById("inputUnit").value = (taxedPrice * amount).toFixed(2);
};

const saveCart = async () => {
  if (isValidFields()) {
    let products = await getProducts;
    let product = document.querySelector("select").value;
    let amount = document.getElementById("inputAmnt").value;
    let selectedProduct = products.find((element) => element.code == product);
    let product_code = selectedProduct.code;
    let price = selectedProduct.taxed_price;
    let taxPrice = selectedProduct.tax_price;
    let total = parseFloat(price) * parseFloat(amount);
    let taxtotal = parseFloat(taxPrice) * parseFloat(amount);
    let StockAmnt = selectedProduct.amount;
    let duplicateProd = cart.find((item) => item.product_code == selectedProduct.code)
    if (amount <= StockAmnt) {
      const cartItem = {
        code : Math.random().toString(16).slice(2),
        product_code,
        amount,
        total,
        taxtotal,
      };
      
      const index = document.getElementById("selectProd").dataset.index;

      if (index == "new") {
        
        if (duplicateProd) {
          let dIndex = cart.map(item => item.code).indexOf(duplicateProd.code)
          let amount = parseInt(duplicateProd.amount) + parseInt(document.getElementById("inputAmnt").value)
          let total = parseFloat(price) * parseFloat(amount);
          let taxtotal = parseFloat(taxPrice) * parseFloat(amount);
          if (amount <= StockAmnt) {
            const cartItem = {
              code : duplicateProd.code,
              product_code,
              amount,
              total,
              taxtotal,
            };
            updateCart(dIndex, cartItem)
            clearFields();
            window.location.reload()

          } else {
            alert(
              "Selected amount of " + selectedProduct.name + " insufficient in stock"
            );
          }

        } else {
          createCart(cartItem);
          clearFields();
        }

      } else {
        updateCart(index, cartItem);
        clearFields();
        document.getElementById("selectProd").dataset.index = "new";
        window.location.reload()
      }

    } else {
      alert(
        "Selected amount of " + selectedProduct.name + " insufficient in stock"
      );
    }

    updateTable();
  }
};



const finishPurchase = () => {
  let cart = readCart();
  let length = cart.length;
  if (length != 0) {
    savePurchase();
  } else {
    alert("There are no products on the cart...");
  }
};

// criar o ORDER e os ORDER_ITEMS relacionados a ele
const savePurchase = async () => {
  let calc = calcTaxSum();

  const order = {
    code: Math.random().toString(16).slice(2),
    tax: calc.taxSum,
    total: parseFloat(calc.totalSum.toFixed(2)),
  };
  const f_order = objectToFormData(order);
  await postOrder(f_order);
  for (item of cart) {
    const order_item = {
      order_code: order.code,
      prod_code: item.product_code,
      amount: parseInt(item.amount),
    };
    let f_item = objectToFormData(order_item);
    await postOrderItem(f_item);
  }
  deleteCartI()
};

const createRow = (cart, index) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td id="content">${cart.product_code}</td>
    <td id="content">${cart.amount}</td>
    <td id="content">$${parseFloat(cart.total)
      .toFixed(2)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")}</td>
    <td> 
        <button class="secBtn" id='edit-${index}'>Edit</button>
        <button class="mainBtn" id='delete-${index}'>Delete</button>
    </td>
    `;

  document
    .querySelector("#cartTable>tbody")
    .appendChild(newRow)
    .classList.add("othRow");
};

const clearTable = () => {
  const rows = document.querySelectorAll("#cartTable>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

const clearDisplay = () => {
  const priceDisplay = document.querySelectorAll(".fRight>div div");
  priceDisplay.forEach((display) => display.parentNode.removeChild(display));
};

const updateTable = () => {
  const db_cart = readCart();
  clearTable();
  clearDisplay();
  db_cart.forEach(createRow);
  displayTaxSum();
};

const fillFields = async (cart) => {
  let listProducts = await getProducts;
  let selectedProduct = listProducts.find(
    (obj) => obj.code == cart.product_code
  );
  let productID = selectedProduct.code;
  console.log(productID);
  document.getElementById("inputAmnt").value = cart.amount;
  document.getElementById("selectProd").dataset.index = cart.index;
  document.getElementById("selectProd").value = productID;
};

const editCart = (index) => {
  const cart = readCart()[index];
  cart.index = index;
  fillFields(cart);
};

const editDelete = (event) => {
  if (event.target.type == "submit") {
    const [action, index] = event.target.id.split("-");

    if (action == "edit") {
      editCart(index);
    } else {
      const cart = readCart()[index];
      const response = confirm(
        `Are you really sure you want to delete ${cart.productName} x ${cart.amount} from your cart?`
      );
      if (response) {
        deleteCart(index);
        updateTable();
      }
    }
  }
};

updateTable();

document.getElementById("saveCart").addEventListener("click", saveCart);

document
  .getElementById("cancelPurchase")
  .addEventListener("click", deleteCartI);

document
  .getElementById("finishPurchase")
  .addEventListener("click", finishPurchase);

document.querySelector("#cartTable").addEventListener("click", editDelete);

document.querySelector("select").addEventListener("change", calcInput);
document.getElementById("inputAmnt").addEventListener("change", calcInput);
formOrder.addEventListener("submit", (e) => {
  e.preventDefault();
});
