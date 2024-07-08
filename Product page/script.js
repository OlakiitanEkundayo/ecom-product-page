"use script";
// Selecting Elements
const menuIcon = document.querySelector(".menu-icon");
const backDrop = document.querySelector(".backdrop");
const active = document.querySelector(".active");
const cartIcon = document.querySelector(".cart-icon");
const closeIcon = document.querySelector(".close-icon");
const navLinks = document.querySelector(".nav-links");

const mainImages = document.querySelectorAll(".default .main-img img");
const thumbnails = document.querySelectorAll(".default .thumb-list div");

const lightboxMainImages = document.querySelectorAll(".lightbox .main-img img");
const lightboxThumbnails = document.querySelectorAll(
  ".lightbox .thumb-list div"
);
const lightbox = document.querySelector(".lightbox");
const iconClose = document.querySelector(".icon-close");

const iconPrev = document.querySelector(".icon-prev");
const iconNext = document.querySelector(".icon-next");

// Selecting Cart items
const countEl = document.querySelector(".count");
const minus = document.querySelector(".minus");
const plus = document.querySelector(".plus");
const cartContainer = document.querySelector(".cart-container");
const cartCount = document.querySelector(".cart-count");
const addToCartBtn = document.querySelector(".add-to-cart");
const cartItems = document.querySelector(".cart-items");
const checkout = document.querySelector(".checkout");

// Selecting Elements

let currentIndex = 0;
const removeActive = function () {
  navLinks.classList.remove("active");
  backDrop.classList.remove("active");
};
menuIcon.addEventListener("click", function () {
  navLinks.classList.add("active");
  backDrop.classList.add("active");
});

closeIcon.addEventListener("click", removeActive);
backDrop.addEventListener("click", removeActive);

const changeImages = (index, mainImages, thumbnails) => {
  mainImages.forEach((img) => {
    img.classList.remove("active");
  });

  thumbnails.forEach((thumb) => {
    thumb.classList.remove("active");
  });

  mainImages[index].classList.add("active");
  thumbnails[index].classList.add("active");
  currentIndex = index;
};

thumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    changeImages(index, mainImages, thumbnails);
  });
});

lightboxThumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    changeImages(index, lightboxMainImages, lightboxThumbnails);
  });
});

mainImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    lightbox.classList.add("active");
    changeImages(index, lightboxMainImages, lightboxThumbnails);
  });
});

iconClose.addEventListener("click", function () {
  lightbox.classList.remove("active");
});

// Previous button
iconPrev.addEventListener("click", function () {
  if (currentIndex <= 0) {
    changeImages(mainImages.length - 1, lightboxMainImages, lightboxThumbnails);
  } else {
    changeImages(currentIndex - 1, lightboxMainImages, lightboxThumbnails);
  }
});

// Next button
iconNext.addEventListener("click", function () {
  if (currentIndex >= mainImages.length - 1) {
    changeImages(0, lightboxMainImages, lightboxThumbnails);
  } else {
    changeImages(currentIndex + 1, lightboxMainImages, lightboxThumbnails);
  }
});

//Cart functionality
let count = 0;
let totalQty = 0;

const updateCount = (newCount) => {
  count = newCount;
  countEl.textContent = count;
};

minus.addEventListener("click", () => {
  if (count > 0) {
    updateCount(count - 1);
  }
});

plus.addEventListener("click", () => {
  updateCount(count + 1);
});

cartIcon.addEventListener("click", () => {
  cartContainer.classList.toggle("active");
});
cartCount.addEventListener("click", () => {
  cartContainer.classList.toggle("active");
});

//Update cart quantity
const updateTotalQty = () => {
  const cartItemsList = document.querySelectorAll(".cart-item");
  totalQty = 0;

  cartItemsList.forEach((item) => {
    totalQty += parseInt(item.dataset.quantity);
  });

  cartCount.innerHTML = `<span class="qty">${totalQty}</span>`;
  // cartCount.innerHTML = 0;
};

//Remove items from cart
const removeItemFromCart = (cartItem) => {
  cartItem.remove();
  updateTotalQty();

  if (cartItems.children.length === 1) {
    cartItems.classList.add("empty");
    checkout.classList.add("empty");
  }
};

//Add items to cart
const addItemtoCart = (name, price, imgSrc) => {
  const totalPrice = price * count;

  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");
  cartItem.dataset.quantity = count;
  cartItem.innerHTML = `
    <img src="${imgSrc}" alt="${name}"/>
    <div class="item-details">
        <div>${name}</div>
     <div>
        <p>$${price.toFixed(2)} x ${count}
            <span class="total-price">$${totalPrice.toFixed(2)}</span>
        </p>
     </div>
    </div>

    <button class="delete-item"><svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg></button>


`;

  cartItems.appendChild(cartItem);
  updateTotalQty();

  if (cartItems.classList.contains("empty")) {
    cartItems.classList.remove("empty");
    checkout.classList.remove("empty");
  }

  //Attach an event listener to the button to remove an item from the cart

  const deleteButton = cartItem.querySelector(".delete-item");
  deleteButton.addEventListener("click", (e) => {
    const cartItem = e.target.closest(".cart-item");
    removeItemFromCart(cartItem);
  });
};

addToCartBtn.addEventListener("click", () => {
  if (count === 0) return;

  const productName = document.querySelector(".main .product-name").textContent;
  const productPriceEl = document.querySelector(".main .current-price");
  const productPrice = parseFloat(productPriceEl.textContent.replace("$", ""));
  const productImg = document
    .querySelector(".default.gallery .main-img img")
    .getAttribute("src");

  addItemtoCart(productName, productPrice, productImg);
  cartContainer.classList.add("active");
  updateCount(0);
});
