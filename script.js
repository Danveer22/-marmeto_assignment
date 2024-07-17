document.addEventListener("DOMContentLoaded", async function () {
  const allBtn = document.querySelectorAll(".btn");
  const btnMen = document.getElementById("men");
  const btnWomen = document.getElementById("women");
  const btnKids = document.getElementById("kids");
  const productContainer = document.getElementById("product-container");

  async function getData() {
    const res = await fetch(
      "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
    );
    const data = await res.json();
    return data;
  }
  const data = await getData();

  const products = {
    men: data.categories.find((category) => category.category_name === "Men")
      .category_products,
    women: data.categories.find(
      (category) => category.category_name === "Women"
    ).category_products,
    kids: data.categories.find((category) => category.category_name === "Kids")
      .category_products,
  };

  function formatCurrency(price, currency) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  }

  function calculateDiscount(price, compareAtPrice) {
    return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
  }

  function displayProducts(category) {
    productContainer.innerHTML = "";
    products[category].forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add("product");
      const discount = calculateDiscount(
        product.price,
        product.compare_at_price
      );
      productElement.innerHTML = ` <img src="${product.image}" alt="${
        product.title
      }">
      <div class="title">
        <h4 class="product-title">${product.title} </h4>
        <span class="vendor">${product.vendor}</span>
        </div>
        <div class="price">
        <p class="product-price">${formatCurrency(product.price, "INR")}</p>
        <p class="compare-price">${formatCurrency(
          product.compare_at_price,
          "INR"
        )} </p>
        <p class="product-discount">${discount}%Off</p>
        </div>
        <button class="add-to-cart">Add to Cart</button>`;
      productContainer.appendChild(productElement);
    });
  }

  btnMen.addEventListener("click", () => {
    displayProducts("men");
    allBtn.forEach((btn) => btn.classList.remove("btn-active"));
    btnMen.classList.add("btn-active");
  });

  btnWomen.addEventListener("click", () => {
    displayProducts("women");
    allBtn.forEach((btn) => btn.classList.remove("btn-active"));
    btnWomen.classList.add("btn-active");
  });
  btnKids.addEventListener("click", () => {
    allBtn.forEach((btn) => btn.classList.remove("btn-active"));
    displayProducts("kids");
    btnKids.classList.add("btn-active");
  });

  displayProducts("men");
});
