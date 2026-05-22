const plans = {
  A: {
    name: "A 基础款",
    price: 20000,
  },
  B: {
    name: "B 升级款",
    price: 23000,
  },
  C: {
    name: "C 尊享款",
    price: 30000,
  },
  D: {
    name: "D 尊荣款",
    price: 35000,
  },
};

const paymentCopy = {
  alipay: {
    title: "支付宝支付",
    description: "请使用支付宝扫码完成付款。",
    image: "assets/alipay.jpg",
    alt: "支付宝付款码",
  },
  wechat: {
    title: "微信支付",
    description: "请使用微信扫码完成付款。",
    image: "assets/wechat.jpg",
    alt: "微信付款码",
  },
};

let selectedPlan = "A";
let selectedPay = "alipay";
let toastTimer;

const formatCurrency = (value) => `¥${value.toLocaleString("zh-CN")}`;

const planCards = document.querySelectorAll(".plan-card");
const payMethods = document.querySelectorAll(".pay-method");
const selectedName = document.getElementById("selectedName");
const selectedPrice = document.getElementById("selectedPrice");
const payTitle = document.getElementById("payTitle");
const payDescription = document.getElementById("payDescription");
const payQrImage = document.getElementById("payQrImage");
const toast = document.getElementById("toast");

function updateCheckout() {
  const plan = plans[selectedPlan];
  const payment = paymentCopy[selectedPay];
  const price = formatCurrency(plan.price);

  selectedName.textContent = plan.name;
  selectedPrice.textContent = price;
  payTitle.textContent = payment.title;
  payDescription.textContent = payment.description;
  payQrImage.src = payment.image;
  payQrImage.alt = payment.alt;
}

function updatePlanCards() {
  planCards.forEach((card) => {
    const isSelected = card.dataset.plan === selectedPlan;
    card.classList.toggle("selected", isSelected);
    card.querySelector(".select-plan").textContent = isSelected ? "已选择" : "选择套餐";
  });
}

function updatePaymentButtons() {
  payMethods.forEach((button) => {
    const isSelected = button.dataset.pay === selectedPay;
    button.classList.toggle("active", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

function selectPlan(planCode) {
  selectedPlan = planCode;
  updatePlanCards();
  updateCheckout();
}

planCards.forEach((card) => {
  card.addEventListener("click", () => selectPlan(card.dataset.plan));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectPlan(card.dataset.plan);
    }
  });
});

payMethods.forEach((button) => {
  button.addEventListener("click", () => {
    selectedPay = button.dataset.pay;
    updatePaymentButtons();
    updateCheckout();
  });
});

updateCheckout();
