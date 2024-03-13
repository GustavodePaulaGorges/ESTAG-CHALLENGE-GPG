const urlGet = "http://localhost/routers/products.php?op=GET";
const urlPost = "http://localhost/routers/products.php?op=POST";
const urlPut = "http://localhost/routers/products.php?op=PUT";
const urlDelete = "http://localhost/routers/products.php?op=DELETE";
const urlCate = "http://localhost/routers/categories.php?op=GET";

const select = document.querySelector("select");
const form = document.getElementById("prodForm");
const inpName = document.getElementById("prodName");
const inpAmnt = document.getElementById("prodAmnt");
const inpPrice = document.getElementById("uniPrice");
const inpCat = document.getElementById("prodCat");

const postProduct = () => {
  form.addEventListener("submit", async (event) => {
    const data = new FormData(form);
    try {
      const res = await fetch(urlPost, {
        method: "POST",
        body: data,
      });

      console.log(resData);
    } catch (error) {
      console.log(error.message);
    }
  });
};

const updateProduct = () => {
  const data = {
    code: inpName.dataset.index,
    name: inpName.value,
    amnt: inpAmnt.value,
    price: inpPrice.value,
    catcode: inpCat.value,
  };
  const f_data = objectToFormData(data);
  form.addEventListener("submit", async (event) => {
    const data = new FormData(form);
    try {
      const res = await fetch(urlPut, {
        method: "POST",
        body: f_data,
      });

      console.log(resData);
    } catch (error) {
      console.log(error.message);
    }
  });
};

const deleteProduct = async (code) => {
  const data = {
    code: parseInt(code),
  };
  const f_data = objectToFormData(data);
  try {
    const res = await fetch(urlDelete, {
      method: "POST",
      body: f_data,
    });
  } catch (error) {
    alert(error.message);
  }
};

const clearFields = () => {
  const fields = document.querySelectorAll(".formInput");
  fields.forEach((field) => (field.value = ""));
};

const getCategories = fetch(urlCate).then((res) => {
  return res.json();
});

const getProducts = fetch(urlGet).then((res) => {
  return res.json();
});

const createOptions = async () => {
  let categories = await getCategories;
  for (const i of categories) {
    const option = document.createElement("option");
    option.textContent = i.name;
    option.value = parseInt(i.code);
    select.appendChild(option);
  }
};

function objectToFormData(obj) {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
}

createOptions();

const isValidFields = () => {
  return document.getElementById("prodForm").reportValidity();
};
const updateTable = async () => {
  clearTable();
  let products = await getProducts;
  products.forEach(createRow);
};

const saveProduct = () => {
  if (isValidFields()) {
    const index = document.getElementById("prodName").dataset.index;
    if (index == "new") {
      postProduct();
      updateTable();
    } else {
      updateProduct();
      document.getElementById("prodName").dataset.index = "new";
    }
  }
};

const createRow = async (data) => {
  const newRow = document.createElement("tr");
  let categories = await getCategories;
  selectedCategory = categories.find(
    (item) => item.code === data.category_code
  );

  newRow.innerHTML = `
    <td id="content">${data.code}</td>
    <td id="content">${data.name}</td>
    <td id="content">${data.amount}</td>
    <td id="content">$${data.price}</td>
    <td id="content">${selectedCategory.name} </td>
    <td id="content">$${data.taxed_price}</td>
    <td> 
        <button class="secBtn" id='edit-${data.code}'>Edit</button>
        <button class="mainBtn" id='delete-${data.code}' >Delete</button>
    </td>
    `;

  document
    .querySelector("#productTable>tbody")
    .appendChild(newRow)
    .classList.add("othRow");
};

const clearTable = () => {
  const rows = document.querySelectorAll("#productTable>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

const fillFields = async (product) => {
  const listCategories = await getCategories;
  let selectedCategory = listCategories.find(
    (obj) => obj.code == product.category_code
  );
  document.getElementById("prodName").value = product.name;
  document.getElementById("prodAmnt").value = product.amount;
  document.getElementById("uniPrice").value = product.price;
  document.getElementById("prodName").dataset.index = product.code;
  document.getElementById("prodCat").value = selectedCategory.code;
};

const editProduct = async (index) => {
  const listProducts = await getProducts;
  const product = listProducts.find((item) => item.code == index);
  product.index = index;
  fillFields(product);
};

const editDelete = async (event) => {
  if (event.target.type == "submit") {
    const [action, index] = event.target.id.split("-");

    if (action == "edit") {
      editProduct(index);
    } else {
      const listProducts = await getProducts;
      const product = listProducts.find((item) => item.code == index);
      const response = confirm(
        `Are you really sure you want to delete ${product.name} from the products table?`
      );
      if (response) {
        deleteProduct(product.code);
        window.location.reload();
      }
    }
  }
};

updateTable();

document.getElementById("saveProd").addEventListener("click", saveProduct);

document.querySelector("#productTable").addEventListener("click", editDelete);
