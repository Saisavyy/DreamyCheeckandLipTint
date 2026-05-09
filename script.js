const buyNowButton = document.getElementById('buyNow');
const checkoutButton = document.getElementById('checkout');
const contactUsButton = document.getElementById('contactUs');
const learnMoreButton = document.getElementById('learnMore');
const cardAddButtons = document.querySelectorAll('.card-add');
const orderList = document.getElementById('orderList');
const orderTotal = document.getElementById('orderTotal');

let cart = [];
const PRICE = 65;

function renderOrder() {
  orderList.innerHTML = '';
  if (cart.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.className = 'empty';
    emptyItem.textContent = 'No items yet. Add a shade to your order.';
    orderList.appendChild(emptyItem);
  } else {
    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `<span>${item.name}</span><strong>₱${item.price}</strong>`;
      orderList.appendChild(li);
    });
  }
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  orderTotal.textContent = `₱${total}`;
}

function addOrder(product) {
  cart.push({ name: product, price: PRICE });
  renderOrder();
}

buyNowButton.addEventListener('click', () => {
  alert('Thanks for choosing Dreamy Cheeck and Lip Tint! Your order is being prepared.');
});

checkoutButton.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty. Add a shade to your order first.');
    return;
  }
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  alert(`Checkout ready! Total: ₱${total}. Please choose GCash or Cash on Delivery to complete your order.`);
});

cardAddButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const product = button.dataset.product;
    addOrder(product);
    alert(`${product} has been added to your cart for ₱${PRICE}. Choose GCash or Cash on Delivery at checkout.`);
  });
});

contactUsButton.addEventListener('click', () => {
  alert('Need help? Email altheamoquia@gmail.com or call 09651050850 for order support.');
});

learnMoreButton.addEventListener('click', () => {
  document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
});

const sliderTrack = document.getElementById('sliderTrack');
const sliderPrev = document.getElementById('sliderPrev');
const sliderNext = document.getElementById('sliderNext');
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function updateSlider() {
  sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
}

sliderPrev.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlider();
});

sliderNext.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlider();
});

renderOrder();
