let pizzas = 0;
let money = 0;
let pizzaPerSecond = 0;
let prestigeMultiplier = 1; // Multiplier for prestige (default: 1)
let currentOrder = null;
let orderTimer = null;

// Interação com o clique da pizza
document.getElementById('pizza').addEventListener('click', () => {
  pizzas += prestigeMultiplier;
  updateScore();
});

// Atualizar o placar
function updateScore() {
  document.getElementById('score').innerText = `Pizzas: ${pizzas}`;
  document.getElementById('money').innerText = `Dinheiro: $${money}`;
}

// Comprar itens na loja
function buyItem(cost, rate) {
  if (pizzas >= cost) {
    pizzas -= cost;
    pizzaPerSecond += rate;
    alert(`Você comprou um item que gera ${rate} pizzas por segundo!`);
    updateScore();
  } else {
    alert('Pizzas insuficientes!');
  }
}

// Funcionalidade de prestigio
function prestige() {
  if (pizzas >= 1000) {
    pizzas -= 1000;
    prestigeMultiplier = 2;
    alert('Prestígio ativado! Você ganha 2x mais pizzas ao clicar.');
    updateScore();
  } else {
    alert('Você precisa de pelo menos 1000 pizzas para prestigiar!');
  }
}

// Empresa: entregar pedido
function generateOrder() {
  const orderTypes = [
    { pizzas: 100, payment: 1000, timeLimit: 10 },
    { pizzas: 200, payment: 5000, timeLimit: 20 },
    { pizzas: 500, payment: 15000, timeLimit: 30 },
    { pizzas: 1000, payment: 50000, timeLimit: 40 },
    { pizzas: 1500, payment: 75000, timeLimit: 50 },
    { pizzas: 2000, payment: 100000, timeLimit: 60 },
    { pizzas: 2500, payment: 125000, timeLimit: 70 },
    { pizzas: 3000, payment: 150000, timeLimit: 80 },
    { pizzas: 5000, payment: 250000, timeLimit: 90 },
    { pizzas: 8000, payment: 400000, timeLimit: 120 }
  ];

  const randomOrder = orderTypes[Math.floor(Math.random() * orderTypes.length)];

  currentOrder = {
    orderAmount: randomOrder.pizzas,
    payment: randomOrder.payment,
    timeLimit: randomOrder.timeLimit,
    remainingTime: randomOrder.timeLimit
  };

  document.getElementById('company-orders').innerHTML = `
    <div class="company-item">
      <span>Entregar ${randomOrder.pizzas} pizzas</span>
      <span class="timer" id="order-timer">Tempo: ${randomOrder.timeLimit}s</span>
      <button onclick="deliverOrder()" id="order-btn">Entregar Pedido</button>
    </div>
  `;
  
  // Iniciar o temporizador para o pedido
  clearInterval(orderTimer);
  orderTimer = setInterval(updateOrderTimer, 1000);
}

function updateOrderTimer() {
  if (currentOrder.remainingTime > 0) {
    currentOrder.remainingTime--;
    document.getElementById('order-timer').innerText = `Tempo: ${currentOrder.remainingTime}s`;
  } else {
    clearInterval(orderTimer);
    alert('Tempo esgotado! Novo pedido será gerado.');
    generateOrder(); // Gerar novo pedido após o tempo expirar
  }
}

function deliverOrder() {
  if (pizzas >= currentOrder.orderAmount) {
    pizzas -= currentOrder.orderAmount;
    money += currentOrder.payment;
    alert(`Pedido entregue! Você ganhou $${currentOrder.payment}`);
    updateScore();
    generateOrder(); // Gerar novo pedido após entrega
  } else {
    alert('Você não tem pizzas suficientes para entregar o pedido!');
  }
}

// Aumentar produção com dinheiro
function upgradeProduction(cost) {
  if (money >= cost) {
    money -= cost;
    pizzaPerSecond += cost / 1000;
    alert('Produção aumentada!');
    updateScore();
  } else {
    alert('Dinheiro insuficiente!');
  }
}

// Abas
function openStore() {
  closeAllWindows();
  document.getElementById('store').style.display = 'block';
}

function closeStore() {
  document.getElementById('store').style.display = 'none';
}

function openCompany() {
  closeAllWindows();
  generateOrder();
  document.getElementById('company-page').style.display = 'block';
}

function closeCompany() {
  clearInterval(orderTimer); // Parar o temporizador ao fechar a aba
  document.getElementById('company-page').style.display = 'none';
}

function openMoneyUsePage() {
  closeAllWindows();
  document.getElementById('money-use-page').style.display = 'block';
}

function closeMoneyUsePage() {
  document.getElementById('money-use-page').style.display = 'none';
}

function closeAllWindows() {
  document.getElementById('store').style.display = 'none';
  document.getElementById('company-page').style.display = 'none';
  document.getElementById('money-use-page').style.display = 'none';
}

// Geração de pizzas por segundo
setInterval(() => {
  pizzas += pizzaPerSecond;
  updateScore();
}, 1000);