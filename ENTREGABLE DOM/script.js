const form = document.getElementById("productForm");
const list = document.getElementById("productList");
const empty = document.getElementById("emptyMessage");

const COUPON = "DESC50";
let editingCard = null;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const img = document.getElementById("image").value;
  const title = document.getElementById("title").value;
  const desc = document.getElementById("description").value;
  let price = parseFloat(document.getElementById("price").value);
  const coupon = document.getElementById("coupon").value;

  let final = price;
  let discount = false;

  if (coupon === COUPON) {
    final = price * 0.5;
    discount = true;
  }

  if (editingCard) {
    updateCard(editingCard, img, title, desc, price, final, discount);
    editingCard = null;
  } else {
    createCard(img, title, desc, price, final, discount);
  }

  form.reset();
  toggle();
});

function createCard(img, title, desc, price, final, discount) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = getCardHTML(img, title, desc, price, final, discount);
  addEvents(card);

  list.appendChild(card);
}

function updateCard(card, img, title, desc, price, final, discount) {
  card.innerHTML = getCardHTML(img, title, desc, price, final, discount);
  addEvents(card);
}

function getCardHTML(img, title, desc, price, final, discount) {
  return `
    <img src="${img}">
    <div class="card-body">
      <h3>${title}</h3>
      <p>${desc}</p>

      ${
        discount
        ? `<span class="old">$${price}</span>
           <div class="price">$${final}</div>`
        : `<div class="price">$${price}</div>`
      }

      <button class="edit">Editar</button>
      <button class="delete">Eliminar</button>
    </div>
  `;
}

function addEvents(card) {
  // ELIMINAR
  card.querySelector(".delete").onclick = () => {
    card.remove();
    toggle();
  };

  // EDITAR
  card.querySelector(".edit").onclick = () => {
    const img = card.querySelector("img").src;
    const title = card.querySelector("h3").textContent;
    const desc = card.querySelector("p").textContent;
    const priceText = card.querySelector(".price").textContent.replace("$", "");

    document.getElementById("image").value = img;
    document.getElementById("title").value = title;
    document.getElementById("description").value = desc;
    document.getElementById("price").value = priceText;

    editingCard = card;
  };
}

function toggle() {
  empty.style.display = list.children.length ? "none" : "block";
}

toggle();