const buyNowButton = document.getElementById('buyNow');
const checkoutButton = document.getElementById('checkout');
const contactUsButton = document.getElementById('contactUs');
const learnMoreButton = document.getElementById('learnMore');
const cardAddButtons = document.querySelectorAll('.card-add');
const orderList = document.getElementById('orderList');
const orderTotal = document.getElementById('orderTotal');
const buyerNameInput = document.getElementById('buyerName');
const buyerGcashInput = document.getElementById('buyerGcashNumber');
const buyerNameDisplay = document.getElementById('buyerNameDisplay');
const buyerGcashDisplay = document.getElementById('buyerGcashDisplay');
const paymentMethodDisplay = document.getElementById('paymentMethodDisplay');
const paymentInputs = document.querySelectorAll('input[name="paymentMethod"]');

let cart = [];
const PRICE = 65;

function renderOrder() {
  orderList.innerHTML = '';
  const name = buyerNameInput.value.trim();
  const gcashNumber = buyerGcashInput.value.trim();
  buyerNameDisplay.textContent = name ? name : 'Not specified';
  const selectedPayment = Array.from(paymentInputs).find((input) => input.checked)?.value || 'None selected';
  paymentMethodDisplay.textContent = selectedPayment;
  buyerGcashDisplay.textContent = selectedPayment === 'GCash'
    ? gcashNumber || 'Not provided'
    : 'N/A';
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
  document.getElementById('showcase').scrollIntoView({ behavior: 'smooth' });
});

checkoutButton.addEventListener('click', () => {
  const buyerName = buyerNameInput.value.trim();
  if (!buyerName) {
    alert('Please enter the buyer name before checking out.');
    buyerNameInput.focus();
    return;
  }
  if (cart.length === 0) {
    alert('Your cart is empty. Add a shade to your order first.');
    return;
  }
  const selectedPayment = Array.from(paymentInputs).find((input) => input.checked)?.value;
  if (!selectedPayment) {
    alert('Please choose a payment method before checking out.');
    return;
  }
  if (selectedPayment === 'GCash' && !buyerGcashInput.value.trim()) {
    alert('Please enter your GCash number for GCash payment.');
    buyerGcashInput.focus();
    return;
  }
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const gcashInfo = selectedPayment === 'GCash' ? `; GCash: ${buyerGcashInput.value.trim()}` : '';
  alert(`Checkout ready! Buyer: ${buyerName}. Total: ₱${total}. Payment method: ${selectedPayment}${gcashInfo}. Thank you for shopping!`);
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

buyerNameInput.addEventListener('input', () => {
  renderOrder();
});

buyerGcashInput.addEventListener('input', () => {
  renderOrder();
});

paymentInputs.forEach((input) => {
  input.addEventListener('change', () => {
    renderOrder();
  });
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
