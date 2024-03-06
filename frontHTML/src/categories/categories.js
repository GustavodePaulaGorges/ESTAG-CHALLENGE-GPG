const urlPost = "http://localhost/routers/categories.php?op=POST";
const urlGet = "http://localhost/routers/categories.php?op=GET";
const urlPut = "http://localhost/routers/categories.php?op=PUT";
const urlDelete = "http://localhost/routers/categories.php?op=DELETE";

const form = document.getElementById("catForm");
const InpName = document.getElementById("catName");
const InpTax = document.getElementById("catTax");

const clearFields = () => {
  const fields = document.querySelectorAll(".formInput");
  fields.forEach((field) => (field.value = ""));
};

const isValidFields = () => {
  return document.getElementById("catForm").reportValidity();
};

const getCategories = fetch(urlGet).then((res) => {
  return res.json();
});

function objectToFormData(obj) {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
}

const postCategory = () => {
  form.addEventListener("submit", async (event) => {
    const data = new FormData(form);
    console.log(data);
    try {
      const res = await fetch(urlPost, {
        method: "POST",
        body: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  });
};

const deleteCategory = async (code) => {
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
    console.log(error.message);
  }
  
};

const updateCategory = () => {
  const data = {
    name: InpName.value,
    tax: InpTax.value,
    code: InpName.dataset.index,
  };
  const f_data = objectToFormData(data);
  form.addEventListener("submit", async (event) => {
    try {
      const res = await fetch(urlPut, {
        method: "POST",
        body: f_data,
      });
    } catch (error) {
      console.log(error.message);
    }
  });
};

const saveCategory = async () => {
  if (isValidFields()) {
    const category = {
      name: document.getElementById("catName").value,
      tax: document.getElementById("catTax").value,
    };
    const index = document.getElementById("catName").dataset.index;

    if (index == "new") {
      validateInput(category);
      postCategory();
      updateTable();
    } else {
      updateCategory();
      document.getElementById("catName").dataset.index = "new";
    }
  }
};

const validateInput = (category) => {
  let inputs = Object.values(category);
  const spcChars = `/()<>{}[]`;
  for (let input of inputs) {
    const result = spcChars.split("").some((char) => {
      if (input.includes(char)) {
        alert("this is not a valid input");
        throw new Error("PEPE VOCÊ NÃO É BEM VINDO");
        stop;
      }
    });
  }
};

const createRow = (data) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td id="content">${data.code}</td>
    <td id="content">${data.name
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")}</td>
    <td id="content">${data.tax
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")} %</td>
    <td> 
      <button class="secBtn" id='edit-${data.code}'>Edit</button>
      <button class="mainBtn" id='delete-${data.code}' >Delete</button>
    </td>
    
    

    `;
  document
    .querySelector("#categoryTable>tbody")
    .appendChild(newRow)
    .classList.add("othRow");
};

const clearTable = () => {
  const rows = document.querySelectorAll("#categoryTable>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

const updateTable = async () => {
  clearTable();
  let categories = await getCategories;
  categories.forEach(createRow);
};

const fillFields = (category) => {
  document.getElementById("catName").value = category.name;
  document.getElementById("catTax").value = category.tax;
  document.getElementById("catName").dataset.index = category.code;
};

const editCategory = async (index) => {
  const listCategories = await getCategories;
  const category = listCategories.find((item) => item.code == index);
  fillFields(category);
};

const editDelete = async (event) => {
  if (event.target.type == "submit") {
    const [action, index] = event.target.id.split("-");
    if (action == "edit") {
      editCategory(index);
    } else {
      const listCategories = await getCategories;
      const category = listCategories.find((item) => item.code == index);
      const response = confirm(
        `Are you really sure you want to delete ${category.name} from the categories table?`
      );
      if (response) {
        deleteCategory(category.code);
        window.location.reload()
      }
    }
  }
};

updateTable();

//Events
document.getElementById("saveCat").addEventListener("click", saveCategory);

document.querySelector("#categoryTable").addEventListener("click", editDelete);
