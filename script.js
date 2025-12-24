let nameInput = document.getElementById("product-name-input");
let priceInput = document.getElementById("product-price-input");
let addBtn = document.getElementById("add-product-btn");
let updateBtn = document.getElementById("update-product-btn");
let tableBody = document.querySelector("#product-table tbody");
let currentEditRow = null;

function addProduct() {
  let name = nameInput.value.trim();
  let price = priceInput.value.trim();
  if (name === "" || price === "") {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  };

  let lastId =
    tableBody.rows.length > 0
      ? parseInt(tableBody.lastElementChild.getAttribute("data-id"))
      : 0;
  let newId = lastId + 1;

  let newRow = document.createElement("tr");
  newRow.setAttribute("data-id", newId);
  newRow.className = "hover:bg-gray-50";
  newRow.innerHTML = `
    <td class="border border-gray-300 p-2">${newId}</td>
    <td class="border border-gray-300 p-2 product-name">${name}</td>
    <td class="border border-gray-300 p-2 product-price">${Number(price).toLocaleString()}</td>
    <td class="border border-gray-300 p-2 text-center">
      <button class="edit-btn bg-yellow-400 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-500">Sửa</button>
      <button class="delete-btn bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Xóa</button>
    </td>
    `;

  tableBody.appendChild(newRow);
  clearInputs();
};

function prepareEdit(row) {
  currentEditRow = row;
  let name = row.querySelector(".product-name").innerText;
  let price = row.querySelector(".product-price").innerText.replace(/\./g, "");
  nameInput.value = name;
  priceInput.value = price;
  addBtn.style.display = "none";
  updateBtn.style.display = "inline-block";
  document.getElementById("form-title").innerText = "Cập nhật Sản phẩm";
};

function updateProduct() {
  if (!currentEditRow) return;
  currentEditRow.querySelector(".product-name").innerText = nameInput.value;
  currentEditRow.querySelector(".product-price").innerText = Number(priceInput.value).toLocaleString();
  clearInputs();
  addBtn.style.display = "inline-block";
  updateBtn.style.display = "none";
  document.getElementById("form-title").innerText = "Thêm Sản phẩm Mới";
  currentEditRow = null;
};

function deleteProduct(row) {
  if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
    row.remove();
  };
};

function clearInputs() {
  nameInput.value = "";
  priceInput.value = "";
};
addBtn.addEventListener("click", addProduct);
updateBtn.addEventListener("click", updateProduct);

tableBody.addEventListener("click", function (e) {
  let target = e.target;

  if (target.classList.contains("edit-btn")) {
    let row = target.closest("tr");
    prepareEdit(row);
  };

  if (target.classList.contains("delete-btn")) {
    let row = target.closest("tr");
    deleteProduct(row);
  };
});
