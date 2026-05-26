const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

const state = {
  activeView: "dashboard",
  orderFilter: "todos",
  search: "",
  orders: [
    {
      id: "PED-1024",
      client: "Brindes Franca",
      product: "Chaveiro em borracha 3D",
      quantity: 1200,
      date: "2026-06-03",
      status: "Produção",
      stage: "Dosadora",
      matrix: "MTX-CHV-33",
      material: "Tinta plastisol azul",
      revenue: 6840,
      notes: "Produção sob demanda com embalagem individual."
    },
    {
      id: "PED-1025",
      client: "Rodeio Store",
      product: "Patch personalizado",
      quantity: 650,
      date: "2026-06-06",
      status: "Novo",
      stage: "Administrativo",
      matrix: "MTX-PCH-09",
      material: "Tinta plastisol preta",
      revenue: 4290,
      notes: "Conferir cores antes de liberar romaneio."
    },
    {
      id: "PED-1026",
      client: "Auto Peças Avenida",
      product: "Etiqueta emborrachada",
      quantity: 900,
      date: "2026-06-08",
      status: "Expedição",
      stage: "Revisão",
      matrix: "MTX-ETQ-18",
      material: "Manta base",
      revenue: 5220,
      notes: "Pedido aguardando conferência final."
    },
    {
      id: "PED-1027",
      client: "Calçados Nova Era",
      product: "Logo em borracha",
      quantity: 2100,
      date: "2026-06-12",
      status: "Produção",
      stage: "Forno",
      matrix: "MTX-LOG-42",
      material: "Tinta plastisol branca",
      revenue: 13650,
      notes: "Prioridade alta para entrega programada."
    },
    {
      id: "PED-1028",
      client: "Boutique Prime",
      product: "Tag personalizada",
      quantity: 480,
      date: "2026-06-14",
      status: "Finalizado",
      stage: "Finalizado",
      matrix: "MTX-TAG-07",
      material: "Tinta plastisol vermelha",
      revenue: 3120,
      notes: "Entrega concluída e faturamento lançado."
    }
  ],
  clients: [
    { name: "Brindes Franca", doc: "12.440.221/0001-55", phone: "(16) 99911-2040", email: "compras@brindesfranca.com", orders: 8 },
    { name: "Rodeio Store", doc: "44.912.558/0001-03", phone: "(16) 98820-4512", email: "atendimento@rodeiostore.com", orders: 4 },
    { name: "Auto Peças Avenida", doc: "29.320.441/0001-17", phone: "(16) 3720-7788", email: "financeiro@avenidaauto.com", orders: 6 },
    { name: "Calçados Nova Era", doc: "08.221.703/0001-80", phone: "(16) 99118-6610", email: "producao@novaera.com", orders: 12 },
    { name: "Boutique Prime", doc: "33.710.902/0001-99", phone: "(16) 99770-3004", email: "contato@boutiqueprime.com", orders: 2 }
  ],
  stock: [
    { item: "Tinta plastisol azul", type: "Matéria-prima", current: 42, min: 25, unit: "kg", arrival: "Reposição em 18 dias" },
    { item: "Tinta plastisol preta", type: "Matéria-prima", current: 18, min: 30, unit: "kg", arrival: "Comprar esta semana" },
    { item: "Tinta plastisol branca", type: "Matéria-prima", current: 35, min: 28, unit: "kg", arrival: "Reposição em 22 dias" },
    { item: "Manta base", type: "Insumo", current: 120, min: 70, unit: "un", arrival: "Estoque confortável" },
    { item: "Matrizes ativas", type: "Ferramental", current: 64, min: 50, unit: "un", arrival: "Sem alerta" },
    { item: "Embalagem individual", type: "Expedição", current: 900, min: 1000, unit: "un", arrival: "Compra planejada" }
  ]
};

const titles = {
  dashboard: "Painel operacional",
  pedidos: "Gestão de pedidos",
  clientes: "Clientes",
  producao: "Quadro de produção",
  estoque: "Estoque",
  expedicao: "Expedição",
  relatorios: "Relatórios"
};

const moduleThemes = {
  dashboard: "#157a6e",
  pedidos: "#157a6e",
  clientes: "#5c8fb4",
  producao: "#b36b12",
  estoque: "#2f8f5b",
  expedicao: "#7d5fb2",
  relatorios: "#d94f30"
};

const demoUser = {
  user: "demo",
  password: "demo123"
};

const productionStages = ["Administrativo", "Dosadora", "Forno", "Revisão", "Finalizado"];
const stageStatus = {
  Administrativo: "Novo",
  Dosadora: "Produção",
  Forno: "Produção",
  Revisão: "Expedição",
  Finalizado: "Finalizado"
};

function normalize(value) {
  return String(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function formatDate(value) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("pt-BR");
}

function statusClass(status) {
  return normalize(status).replace("ç", "c").replace(/\s+/g, "-");
}

function orderPriority(order) {
  if (order.quantity >= 1800 || order.revenue >= 10000) return "Alta";
  if (order.status === "Expedição") return "Conferência";
  if (order.status === "Novo") return "Nova";
  return "Normal";
}

function priorityClass(priority) {
  return normalize(priority);
}

function animateChildren(selector) {
  const element = document.querySelector(selector);
  if (!element) return;

  element.classList.remove("cards-animate");
  requestAnimationFrame(() => element.classList.add("cards-animate"));
}

function clientOrders(clientName) {
  return state.orders.filter((order) => order.client === clientName);
}

function clientStats(clientName) {
  const orders = clientOrders(clientName);
  const revenue = orders.reduce((sum, order) => sum + order.revenue, 0);
  const open = orders.filter((order) => order.status !== "Finalizado").length;
  const last = orders[0];
  return { orders, revenue, open, last };
}

function filteredOrders() {
  const query = normalize(state.search);
  return state.orders.filter((order) => {
    const matchesFilter = state.orderFilter === "todos" || order.status === state.orderFilter;
    const haystack = normalize(`${order.id} ${order.client} ${order.product} ${order.status}`);
    return matchesFilter && haystack.includes(query);
  });
}

function setView(view) {
  state.activeView = view;
  document.querySelectorAll(".view").forEach((item) => item.classList.toggle("active", item.id === view));
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  document.querySelectorAll(".mobile-tab").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  document.querySelector("#page-title").textContent = titles[view];
  updateQuickDock(view);
  updateModuleTabs(view);
  render();
}

function updateModuleTabs(view = state.activeView) {
  const tabs = document.querySelector("#moduleTabs");
  if (!tabs) return;

  const buttons = [...tabs.querySelectorAll(".module-tab")];
  const active = buttons.find((button) => button.dataset.view === view) || buttons[0];
  buttons.forEach((button) => button.classList.toggle("active", button === active));
  tabs.style.setProperty("--module-left", `${active.offsetLeft - tabs.scrollLeft}px`);
  tabs.style.setProperty("--module-width", `${active.offsetWidth}px`);
  tabs.style.setProperty("--module-color", moduleThemes[view] || moduleThemes.dashboard);
}

function updateQuickDock(view = state.activeView) {
  const dock = document.querySelector("#quickDock");
  if (!dock) return;

  const buttons = [...dock.querySelectorAll(".dock-btn")];
  const active = buttons.find((button) => button.dataset.view === view) || buttons[0];
  buttons.forEach((button) => button.classList.toggle("active", button === active));
  dock.style.setProperty("--dock-active-left", `${active.offsetLeft - dock.scrollLeft}px`);
  dock.style.setProperty("--dock-active-width", `${active.offsetWidth}px`);
}

function renderSidebarInfo() {
  const date = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
  const critical = state.stock.filter((item) => item.current < item.min).length;
  document.querySelector("#side-date").textContent = date;
  document.querySelector("#side-health").textContent = critical ? `${critical} alerta(s)` : "Estável";
}

function renderMetrics() {
  const openOrders = state.orders.filter((order) => order.status !== "Finalizado").length;
  const inProduction = state.orders.filter((order) => order.status === "Produção").length;
  const lowStock = state.stock.filter((item) => item.current < item.min).length;
  const revenue = state.orders.reduce((total, order) => total + order.revenue, 0);

  document.querySelector("#metric-open-orders").textContent = openOrders;
  document.querySelector("#metric-production").textContent = inProduction;
  document.querySelector("#metric-low-stock").textContent = lowStock;
  document.querySelector("#metric-revenue").textContent = currency.format(revenue);
  animateChildren(".metric-grid");
}

function renderRecentOrders() {
  document.querySelector("#recent-orders").innerHTML = state.orders.slice(0, 5).map((order) => `
    <tr>
      <td><strong>${order.id}</strong></td>
      <td>${order.client}</td>
      <td>${order.product}</td>
      <td><span class="pill ${statusClass(order.status)}">${order.status}</span></td>
      <td>${formatDate(order.date)}</td>
    </tr>
  `).join("");
}

function renderStageSummary() {
  document.querySelector("#stage-summary").innerHTML = productionStages.map((stage) => {
    const count = state.orders.filter((order) => order.stage === stage).length;
    return `
      <div class="stage-item">
        <span>${stage}</span>
        <strong>${count}</strong>
      </div>
    `;
  }).join("");
  animateChildren("#stage-summary");
}

function renderAlerts() {
  const alerts = state.stock
    .filter((item) => item.current < item.min)
    .map((item) => `${item.item}: ${item.current}${item.unit} disponíveis, mínimo ${item.min}${item.unit}.`);

  if (!alerts.length) {
    alerts.push("Nenhum insumo abaixo do mínimo no momento.");
  }

  alerts.push("Prazo médio de compra de matéria-prima: 30 dias.");

  document.querySelector("#alerts-list").innerHTML = alerts.map((alert) => `
    <div class="alert-item">${alert}</div>
  `).join("");
  animateChildren("#alerts-list");
}

function renderOrders() {
  const orders = filteredOrders();
  const grid = document.querySelector("#orders-grid");
  grid.innerHTML = orders.map((order) => `
    <article class="order-card modern-card">
      <header>
        <div>
          <h3>${order.id}</h3>
          <p>${order.client}</p>
        </div>
        <div class="card-badges">
          <span class="priority-chip ${priorityClass(orderPriority(order))}">${orderPriority(order)}</span>
          <span class="pill ${statusClass(order.status)}">${order.status}</span>
        </div>
      </header>
      <strong>${order.product}</strong>
      <p class="card-description">${order.notes}</p>
      <div class="order-meta">
        <span><b>${order.quantity.toLocaleString("pt-BR")}</b> peças</span>
        <span>Entrega <b>${formatDate(order.date)}</b></span>
        <span>${currency.format(order.revenue)}</span>
      </div>
      <div class="order-resource-grid">
        <span><small>Etapa</small>${order.stage}</span>
        <span><small>Matriz</small>${order.matrix}</span>
        <span><small>Material</small>${order.material}</span>
      </div>
      <div class="card-actions">
        <button class="action-btn" data-detail="${order.id}">Detalhes</button>
        <button class="action-btn" data-romaneio="${order.id}">Romaneio</button>
        <button class="primary-btn" data-advance="${order.id}">Avançar</button>
        <button class="danger-btn" data-delete-order="${order.id}">Remover</button>
      </div>
    </article>
  `).join("") || `<div class="panel">Nenhum pedido encontrado.</div>`;
  animateChildren("#orders-grid");
}

function renderClients() {
  const query = normalize(state.search);
  const clients = state.clients.filter((client) => normalize(`${client.name} ${client.doc} ${client.email}`).includes(query));
  document.querySelector("#clients-grid").innerHTML = clients.map((client) => `
    <article class="client-card modern-card">
      <header>
        <div>
          <h3>${client.name}</h3>
          <p>${client.doc}</p>
        </div>
        <span class="pill">${clientStats(client.name).open} ativos</span>
      </header>
      <div class="client-meta">
        <span>${client.phone}</span>
        <span>${client.email}</span>
      </div>
      <div class="client-stats-grid">
        <span><small>Histórico</small><strong>${client.orders}</strong></span>
        <span><small>Em aberto</small><strong>${clientStats(client.name).open}</strong></span>
        <span><small>Valor atual</small><strong>${currency.format(clientStats(client.name).revenue)}</strong></span>
      </div>
      <p class="client-last-order">${clientStats(client.name).last ? `Último pedido: ${clientStats(client.name).last.id} · ${clientStats(client.name).last.product}` : "Sem pedido registrado no protótipo."}</p>
      <div class="card-actions">
        <button class="action-btn" data-client-detail="${client.name}">Detalhar</button>
        <button class="primary-btn" data-client-order="${client.name}">Criar pedido</button>
        <button class="danger-btn" data-delete-client="${client.name}">Remover</button>
      </div>
    </article>
  `).join("") || `<div class="panel">Nenhum cliente encontrado.</div>`;
  animateChildren("#clients-grid");
}

function renderProduction() {
  document.querySelector("#production-board").innerHTML = productionStages.map((stage) => {
    const cards = state.orders.filter((order) => order.stage === stage).map((order) => `
      <article class="task-card" draggable="true" data-task-id="${order.id}">
        <strong>${order.id}</strong>
        <small>${order.client}</small>
        <small>${order.product}</small>
        <small>${order.quantity.toLocaleString("pt-BR")} peças</small>
        <button class="action-btn" data-detail="${order.id}">Abrir</button>
        <button class="danger-btn" data-delete-order="${order.id}">Remover</button>
      </article>
    `).join("");

    return `
      <section class="kanban-column" data-stage="${stage}">
        <header>
          <h3>${stage}</h3>
          <span class="pill">${state.orders.filter((order) => order.stage === stage).length}</span>
        </header>
        ${cards || `<p>Nenhum pedido nesta etapa.</p>`}
      </section>
    `;
  }).join("");
  animateChildren("#production-board");
}

function renderStock() {
  document.querySelector("#stock-grid").innerHTML = state.stock.map((item, index) => {
    const percent = Math.min(100, Math.round((item.current / Math.max(item.min * 1.6, item.current)) * 100));
    const critical = item.current < item.min;
    return `
      <article class="stock-card modern-card ${critical ? "critical" : ""}">
        <header>
          <div>
            <h3>${item.item}</h3>
            <p>${item.type}</p>
          </div>
          <span class="pill ${critical ? "producao" : "expedicao"}">${critical ? "Crítico" : "OK"}</span>
        </header>
        <div class="stock-meter"><span style="width:${percent}%"></span></div>
        <div class="stock-values">
          <span><small>Atual</small><strong>${item.current}${item.unit}</strong></span>
          <span><small>Mínimo</small><strong>${item.min}${item.unit}</strong></span>
        </div>
        <p>${item.arrival}</p>
        <div class="stock-stepper">
          <button class="action-btn" data-stock-adjust="${index}" data-stock-delta="-1">−</button>
          <button class="action-btn" data-stock-adjust="${index}" data-stock-delta="1">＋</button>
          <button class="action-btn" data-stock-restock="${index}">Repor</button>
        </div>
        <div class="card-actions">
          <button class="action-btn" data-edit-stock="${index}">Editar</button>
          <button class="danger-btn" data-delete-stock="${index}">Remover</button>
        </div>
      </article>
    `;
  }).join("");
  animateChildren("#stock-grid");
}

function renderExpedition() {
  const ready = state.orders.filter((order) => ["Expedição", "Finalizado"].includes(order.status));
  document.querySelector("#expedition-list").innerHTML = ready.map((order) => `
    <article class="expedition-card">
      <div>
        <h3>${order.id} · ${order.client}</h3>
        <p>${order.product} · ${order.quantity.toLocaleString("pt-BR")} peças · entrega ${formatDate(order.date)}</p>
      </div>
      <div class="card-actions">
        <button class="action-btn" data-romaneio="${order.id}">Conferir romaneio</button>
        <button class="primary-btn" data-finish="${order.id}">Finalizar</button>
      </div>
    </article>
  `).join("") || `<div class="panel">Nenhum pedido em expedição.</div>`;
  animateChildren("#expedition-list");
}

function renderReports() {
  const months = [
    { label: "Abr", value: 18400 },
    { label: "Mai", value: 24600 },
    { label: "Jun", value: state.orders.reduce((sum, order) => sum + order.revenue, 0) },
    { label: "Jul", value: 16800 }
  ];
  const max = Math.max(...months.map((month) => month.value));

  document.querySelector("#revenue-chart").innerHTML = months.map((month) => `
    <div class="bar-row">
      <strong>${month.label}</strong>
      <div class="bar-track"><span style="width:${Math.round((month.value / max) * 100)}%"></span></div>
      <span>${currency.format(month.value)}</span>
    </div>
  `).join("");
  animateChildren("#revenue-chart");

  const totalPieces = state.orders.reduce((sum, order) => sum + order.quantity, 0);
  document.querySelector("#pieces-donut span").textContent = totalPieces.toLocaleString("pt-BR");
  document.querySelector("#pieces-legend").innerHTML = [
    ["Produção", "62%"],
    ["Expedição", "20%"],
    ["Novos pedidos", "18%"]
  ].map(([label, value]) => `<div class="legend-item"><span>${label}</span><strong>${value}</strong></div>`).join("");
  animateChildren("#pieces-legend");

  document.querySelector("#executive-summary").innerHTML = [
    ["Pedidos registrados", state.orders.length],
    ["Clientes cadastrados", state.clients.length],
    ["Materiais controlados", state.stock.length],
    ["Tempo alvo de resposta", "até 2 segundos"]
  ].map(([label, value]) => `<div class="summary-item"><span>${label}</span><strong>${value}</strong></div>`).join("");
  animateChildren("#executive-summary");
}

function render() {
  renderSidebarInfo();
  renderMetrics();
  renderRecentOrders();
  renderStageSummary();
  renderAlerts();
  renderOrders();
  renderClients();
  renderProduction();
  renderStock();
  renderExpedition();
  renderReports();
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function showLoginError(message) {
  document.querySelector("#login-error").textContent = message;
}

function enterSystem() {
  document.body.classList.remove("login-active");
  showLoginError("");
  updateFilterGlider();
  updateQuickDock();
  updateModuleTabs();
  showToast("Login realizado com sucesso.");
}

function logout() {
  document.body.classList.add("login-active");
  document.querySelector("#login-password").value = "";
  closeDetails();
}

function handleLogin(event) {
  event.preventDefault();
  const user = document.querySelector("#login-user").value.trim();
  const password = document.querySelector("#login-password").value.trim();

  if (!user || !password) {
    showLoginError("Informe usuário e senha para acessar.");
    return;
  }

  if (user !== demoUser.user || password !== demoUser.password) {
    showLoginError("Usuário ou senha inválidos. Use o acesso de demonstração.");
    return;
  }

  enterSystem();
}

function fillDemoLogin() {
  document.querySelector("#login-user").value = demoUser.user;
  document.querySelector("#login-password").value = demoUser.password;
  enterSystem();
}

function togglePassword() {
  const input = document.querySelector("#login-password");
  const visible = input.type === "text";
  input.type = visible ? "password" : "text";
  document.querySelector("#toggle-password").textContent = visible ? "👁" : "×";
}

function syncResponsiveSidebar() {
  if (window.innerWidth <= 1100) {
    document.querySelector(".app-shell").classList.remove("sidebar-collapsed");
  }
}

function openOrderModal(clientName = "") {
  document.querySelector("#form-client").value = clientName;
  document.querySelector("#form-product").value = "";
  document.querySelector("#form-quantity").value = 500;
  document.querySelector("#form-date").valueAsDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  document.querySelector("#form-notes").value = "";
  document.querySelector("#order-modal").showModal();
}

function closeOrderModal() {
  document.querySelector("#order-modal").close();
}

function openStockModal(index = "") {
  const editing = index !== "";
  const item = editing ? state.stock[Number(index)] : null;
  document.querySelector("#stock-modal-title").textContent = editing ? "Editar item" : "Novo item";
  document.querySelector("#stock-index").value = editing ? String(index) : "";
  document.querySelector("#stock-item").value = item ? item.item : "";
  document.querySelector("#stock-type").value = item ? item.type : "";
  document.querySelector("#stock-current").value = item ? item.current : "";
  document.querySelector("#stock-min").value = item ? item.min : "";
  document.querySelector("#stock-unit").value = item ? item.unit : "kg";
  document.querySelector("#stock-arrival").value = item ? item.arrival : "";
  document.querySelector("#stock-modal").showModal();
}

function closeStockModal() {
  document.querySelector("#stock-modal").close();
}

function saveOrder(event) {
  event.preventDefault();
  const client = document.querySelector("#form-client").value.trim();
  const product = document.querySelector("#form-product").value.trim();
  const quantity = Number(document.querySelector("#form-quantity").value);
  const date = document.querySelector("#form-date").value;
  const notes = document.querySelector("#form-notes").value.trim();

  if (!client || !product || !quantity || !date) {
    showToast("Preencha os dados obrigatórios do pedido.");
    return;
  }

  const nextId = `PED-${1024 + state.orders.length}`;
  state.orders.unshift({
    id: nextId,
    client,
    product,
    quantity,
    date,
    status: "Novo",
    stage: "Administrativo",
    matrix: "A definir",
    material: "A validar",
    revenue: quantity * 5.7,
    notes: notes || "Pedido criado durante a apresentação."
  });

  if (!state.clients.some((item) => item.name === client)) {
    state.clients.unshift({
      name: client,
      doc: "Cadastro pendente",
      phone: "Contato pendente",
      email: "E-mail pendente",
      orders: 1
    });
  }

  document.querySelector("#order-modal").close();
  setView("pedidos");
  showToast(`${nextId} criado com sucesso.`);
}

function deleteOrder(id) {
  const order = state.orders.find((item) => item.id === id);
  if (!order) return;

  const ok = window.confirm(`Remover o pedido ${order.id} de ${order.client}?`);
  if (!ok) return;

  state.orders = state.orders.filter((item) => item.id !== id);
  closeDetails();
  render();
  showToast(`${order.id} removido.`);
}

function deleteClient(name) {
  const client = state.clients.find((item) => item.name === name);
  if (!client) return;

  const orders = clientOrders(name);
  const message = orders.length
    ? `Remover ${client.name} e ${orders.length} pedido(s) vinculados?`
    : `Remover o cliente ${client.name}?`;
  const ok = window.confirm(message);
  if (!ok) return;

  state.clients = state.clients.filter((item) => item.name !== name);
  state.orders = state.orders.filter((order) => order.client !== name);
  closeDetails();
  render();
  showToast(`${client.name} removido.`);
}

function saveStock(event) {
  event.preventDefault();
  const index = document.querySelector("#stock-index").value;
  const item = document.querySelector("#stock-item").value.trim();
  const type = document.querySelector("#stock-type").value.trim();
  const current = Number(document.querySelector("#stock-current").value);
  const min = Number(document.querySelector("#stock-min").value);
  const unit = document.querySelector("#stock-unit").value.trim();
  const arrival = document.querySelector("#stock-arrival").value.trim();

  if (!item || !type || Number.isNaN(current) || Number.isNaN(min) || !unit || !arrival) {
    showToast("Preencha os dados do item de estoque.");
    return;
  }

  const payload = { item, type, current, min, unit, arrival };
  if (index === "") {
    state.stock.unshift(payload);
    showToast(`${item} adicionado ao estoque.`);
  } else {
    state.stock[Number(index)] = payload;
    showToast(`${item} atualizado.`);
  }

  closeStockModal();
  render();
}

function adjustStock(index, delta) {
  const item = state.stock[Number(index)];
  if (!item) return;
  item.current = Math.max(0, item.current + Number(delta));
  render();
}

function restockItem(index) {
  const item = state.stock[Number(index)];
  if (!item) return;
  item.current = Math.max(item.current, item.min * 2);
  item.arrival = "Reposição registrada hoje";
  render();
  showToast(`${item.item} reposto.`);
}

function deleteStock(index) {
  const item = state.stock[Number(index)];
  if (!item) return;

  const ok = window.confirm(`Remover ${item.item} do estoque?`);
  if (!ok) return;

  state.stock.splice(Number(index), 1);
  render();
  showToast(`${item.item} removido.`);
}

function advanceOrder(id) {
  const order = state.orders.find((item) => item.id === id);
  if (!order) return;

  const flow = [
    { status: "Novo", stage: "Administrativo" },
    { status: "Produção", stage: "Dosadora" },
    { status: "Produção", stage: "Forno" },
    { status: "Expedição", stage: "Revisão" },
    { status: "Finalizado", stage: "Finalizado" }
  ];

  const currentIndex = flow.findIndex((step) => step.status === order.status && step.stage === order.stage);
  const next = flow[Math.min(currentIndex + 1, flow.length - 1)];
  order.status = next.status;
  order.stage = next.stage;
  render();
  showToast(`${order.id} avançou para ${order.stage}.`);
}

function finishOrder(id) {
  const order = state.orders.find((item) => item.id === id);
  if (!order) return;
  order.status = "Finalizado";
  order.stage = "Finalizado";
  render();
  showToast(`${order.id} finalizado na expedição.`);
}

function closeDetails() {
  document.body.classList.remove("drawer-open");
  document.querySelector("#details-drawer").setAttribute("aria-hidden", "true");
}

function orderTimeline(order) {
  const currentIndex = productionStages.indexOf(order.stage);
  return productionStages.map((stage, index) => `
    <div class="timeline-step ${index <= currentIndex ? "done" : ""}">
      <span class="timeline-dot">${index + 1}</span>
      <div>
        <strong>${stage}</strong>
        <p>${index <= currentIndex ? "Etapa liberada no fluxo" : "Aguardando avanço"}</p>
      </div>
    </div>
  `).join("");
}

function openDetails(id, romaneio = false) {
  const order = state.orders.find((item) => item.id === id);
  if (!order) return;

  document.querySelector("#details-content").innerHTML = romaneio ? `
    <p class="eyebrow">Documento operacional</p>
    <h2>Romaneio de produção</h2>
    <div class="modal-actions">
      <button class="ghost-btn" data-detail="${order.id}">Ver detalhes</button>
      <button class="primary-btn" data-print-romaneio="true">Imprimir</button>
    </div>
    <div class="romaneio-sheet">
      <div class="romaneio-head">
        <div>
          <strong>Yubor Flow</strong>
          <p>Sistema Integrado de Gestão</p>
        </div>
        <div>
          <strong>${order.id}</strong>
          <p>${formatDate(order.date)}</p>
        </div>
      </div>
      <div class="romaneio-grid">
        <div class="romaneio-field"><span>Cliente</span><strong>${order.client}</strong></div>
        <div class="romaneio-field"><span>Status</span><strong>${order.status}</strong></div>
        <div class="romaneio-field"><span>Produto</span><strong>${order.product}</strong></div>
        <div class="romaneio-field"><span>Quantidade</span><strong>${order.quantity.toLocaleString("pt-BR")} peças</strong></div>
        <div class="romaneio-field"><span>Matriz</span><strong>${order.matrix}</strong></div>
        <div class="romaneio-field"><span>Material principal</span><strong>${order.material}</strong></div>
      </div>
      <div class="romaneio-field">
        <span>Observações de produção</span>
        <strong>${order.notes}</strong>
      </div>
      <div class="romaneio-grid">
        <div class="romaneio-field"><span>Responsável produção</span><strong>__________________</strong></div>
        <div class="romaneio-field"><span>Conferência expedição</span><strong>__________________</strong></div>
      </div>
    </div>
  ` : `
    <p class="eyebrow">Detalhes do pedido</p>
    <h2>${order.id} · ${order.client}</h2>
    <div class="drawer-hero">
      <span class="pill ${statusClass(order.status)}">${order.status}</span>
      <h3>${order.product}</h3>
      <p>${order.quantity.toLocaleString("pt-BR")} peças com entrega em ${formatDate(order.date)}.</p>
    </div>
    <div class="executive-summary">
      <div class="summary-item"><span>Valor previsto</span><strong>${currency.format(order.revenue)}</strong></div>
      <div class="summary-item"><span>Matriz</span><strong>${order.matrix}</strong></div>
      <div class="summary-item"><span>Material</span><strong>${order.material}</strong></div>
      <div class="summary-item"><span>Observações</span><strong>${order.notes}</strong></div>
    </div>
    <h3 style="margin-top: 20px;">Timeline do pedido</h3>
    <div class="timeline">${orderTimeline(order)}</div>
    <div class="modal-actions" style="margin-top: 20px;">
      <button class="ghost-btn" data-romaneio="${order.id}">Gerar romaneio</button>
      <button class="primary-btn" data-advance="${order.id}">Avançar etapa</button>
    </div>
  `;

  document.querySelector("#details-drawer").setAttribute("aria-hidden", "false");
  document.body.classList.add("drawer-open");
}

function openClientDetails(clientName) {
  const client = state.clients.find((item) => item.name === clientName);
  if (!client) return;

  const stats = clientStats(client.name);
  const rows = stats.orders.map((order) => `
    <div class="summary-item">
      <span>${order.id} · ${order.product}</span>
      <strong>${order.status}</strong>
    </div>
  `).join("") || `<p>Nenhum pedido cadastrado para este cliente no protótipo.</p>`;

  document.querySelector("#details-content").innerHTML = `
    <p class="eyebrow">Perfil do cliente</p>
    <h2>${client.name}</h2>
    <div class="drawer-hero">
      <span class="pill">${client.orders} pedidos no histórico</span>
      <h3>${client.doc}</h3>
      <p>${client.phone} · ${client.email}</p>
    </div>
    <div class="client-stats-grid drawer-stats">
      <span><small>Pedidos ativos</small><strong>${stats.open}</strong></span>
      <span><small>Valor em carteira</small><strong>${currency.format(stats.revenue)}</strong></span>
      <span><small>Última demanda</small><strong>${stats.last ? stats.last.id : "N/A"}</strong></span>
    </div>
    <h3 style="margin-top: 20px;">Histórico operacional</h3>
    <div class="executive-summary">${rows}</div>
    <div class="modal-actions" style="margin-top: 20px;">
      <button class="ghost-btn" data-view-target="pedidos">Ver pedidos</button>
      <button class="primary-btn" data-client-order="${client.name}">Novo pedido</button>
    </div>
  `;

  document.querySelector("#details-drawer").setAttribute("aria-hidden", "false");
  document.body.classList.add("drawer-open");
}

function moveOrderToStage(id, stage) {
  const order = state.orders.find((item) => item.id === id);
  if (!order || !stageStatus[stage]) return;

  order.stage = stage;
  order.status = stageStatus[stage];
  render();
  showToast(`${order.id} movido para ${stage}.`);
}

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

document.querySelectorAll(".dock-btn").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

document.querySelectorAll(".module-tab").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

document.querySelectorAll(".mobile-tab").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

document.querySelectorAll("[data-view-target]").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.viewTarget));
});

document.querySelector("#global-search").addEventListener("input", (event) => {
  state.search = event.target.value;
  render();
});

document.querySelector("#sidebar-toggle").addEventListener("click", () => {
  if (window.innerWidth <= 1100) return;
  const shell = document.querySelector(".app-shell");
  const collapsed = shell.classList.toggle("sidebar-collapsed");
  document.querySelector("#sidebar-toggle").setAttribute("aria-label", collapsed ? "Expandir menu" : "Recolher menu");
  document.querySelector("#sidebar-toggle").setAttribute("title", collapsed ? "Expandir menu" : "Recolher menu");
});

document.querySelector("#new-order-btn").addEventListener("click", () => openOrderModal());
document.querySelector("#login-form").addEventListener("submit", handleLogin);
document.querySelector("#demo-login").addEventListener("click", fillDemoLogin);
document.querySelector("#toggle-password").addEventListener("click", togglePassword);
document.querySelector("#logout-btn").addEventListener("click", logout);
document.querySelector("#order-form").addEventListener("submit", saveOrder);
document.querySelector("#cancel-order-btn").addEventListener("click", closeOrderModal);
document.querySelector("#cancel-order-x").addEventListener("click", closeOrderModal);
document.querySelector("#new-stock-btn").addEventListener("click", () => openStockModal());
document.querySelector("#stock-form").addEventListener("submit", saveStock);
document.querySelector("#cancel-stock-btn").addEventListener("click", closeStockModal);
document.querySelector("#cancel-stock-x").addEventListener("click", closeStockModal);
document.querySelector("#close-details").addEventListener("click", closeDetails);
document.querySelector("#drawer-backdrop").addEventListener("click", closeDetails);

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const detailId = target.dataset.detail;
  const romaneioId = target.dataset.romaneio;
  const advanceId = target.dataset.advance;
  const finishId = target.dataset.finish;
  const clientName = target.dataset.clientOrder;
  const clientDetail = target.dataset.clientDetail;
  const printRomaneio = target.dataset.printRomaneio;
  const viewTarget = target.dataset.viewTarget;
  const deleteOrderId = target.dataset.deleteOrder;
  const deleteClientName = target.dataset.deleteClient;
  const editStockIndex = target.dataset.editStock;
  const deleteStockIndex = target.dataset.deleteStock;
  const stockAdjustIndex = target.dataset.stockAdjust;
  const stockDelta = target.dataset.stockDelta;
  const restockIndex = target.dataset.stockRestock;

  if (detailId) openDetails(detailId);
  if (romaneioId) openDetails(romaneioId, true);
  if (advanceId) advanceOrder(advanceId);
  if (finishId) finishOrder(finishId);
  if (clientName) openOrderModal(clientName);
  if (clientDetail) openClientDetails(clientDetail);
  if (printRomaneio) window.print();
  if (deleteOrderId) deleteOrder(deleteOrderId);
  if (deleteClientName) deleteClient(deleteClientName);
  if (editStockIndex) openStockModal(editStockIndex);
  if (deleteStockIndex) deleteStock(deleteStockIndex);
  if (stockAdjustIndex) adjustStock(stockAdjustIndex, stockDelta);
  if (restockIndex) restockItem(restockIndex);
  if (viewTarget) {
    closeDetails();
    setView(viewTarget);
  }
});

document.addEventListener("dragstart", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement) || !target.classList.contains("task-card")) return;
  target.classList.add("dragging");
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", target.dataset.taskId);
});

document.addEventListener("dragend", (event) => {
  const target = event.target;
  if (target instanceof HTMLElement) target.classList.remove("dragging");
  document.querySelectorAll(".kanban-column").forEach((column) => column.classList.remove("drag-over"));
});

document.addEventListener("dragover", (event) => {
  const column = event.target instanceof HTMLElement ? event.target.closest(".kanban-column") : null;
  if (!column) return;
  event.preventDefault();
  document.querySelectorAll(".kanban-column").forEach((item) => item.classList.toggle("drag-over", item === column));
});

document.addEventListener("drop", (event) => {
  const column = event.target instanceof HTMLElement ? event.target.closest(".kanban-column") : null;
  if (!column) return;
  event.preventDefault();
  const id = event.dataTransfer.getData("text/plain");
  moveOrderToStage(id, column.dataset.stage);
});

function updateFilterGlider() {
  const scope = document.querySelector("#orderFilterScope");
  const active = scope.querySelector(".filter-btn.active");
  if (!active) return;

  scope.dataset.active = active.dataset.filter;
  scope.style.setProperty("--glider-left", `${active.offsetLeft}px`);
  scope.style.setProperty("--glider-width", `${active.offsetWidth}px`);
}

function setOrderFilter(button) {
  const scope = document.querySelector("#orderFilterScope");
  const activeButton = scope.querySelector(".filter-btn.active");
  if (button === activeButton) return;

  const buttons = [...scope.querySelectorAll(".filter-btn")];
  const oldIndex = buttons.indexOf(activeButton);
  const newIndex = buttons.indexOf(button);
  const direction = newIndex > oldIndex ? "slide-right" : "slide-left";

  const updateDOM = () => {
    state.orderFilter = button.dataset.filter;
    buttons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    updateFilterGlider();
    renderOrders();
  };

  if (scope.startViewTransition) {
    scope.startViewTransition({ update: updateDOM, types: [direction] });
  } else if (document.startViewTransition) {
    document.startViewTransition({ update: updateDOM, types: [direction] });
  } else {
    updateDOM();
  }
}

document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", () => {
    setOrderFilter(button);
  });
});

render();
syncResponsiveSidebar();
updateFilterGlider();
updateQuickDock();
updateModuleTabs();
window.addEventListener("resize", () => {
  syncResponsiveSidebar();
  updateFilterGlider();
  updateQuickDock();
  updateModuleTabs();
});
const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

const state = {
  activeView: "dashboard",
  orderFilter: "todos",
  search: "",
  orders: [
    {
      id: "PED-1024",
      client: "Brindes Franca",
      product: "Chaveiro em borracha 3D",
      quantity: 1200,
      date: "2026-06-03",
      status: "Produção",
      stage: "Dosadora",
      matrix: "MTX-CHV-33",
      material: "Tinta plastisol azul",
      revenue: 6840,
      notes: "Produção sob demanda com embalagem individual."
    },
    {
      id: "PED-1025",
      client: "Rodeio Store",
      product: "Patch personalizado",
      quantity: 650,
      date: "2026-06-06",
      status: "Novo",
      stage: "Administrativo",
      matrix: "MTX-PCH-09",
      material: "Tinta plastisol preta",
      revenue: 4290,
      notes: "Conferir cores antes de liberar romaneio."
    },
    {
      id: "PED-1026",
      client: "Auto Peças Avenida",
      product: "Etiqueta emborrachada",
      quantity: 900,
      date: "2026-06-08",
      status: "Expedição",
      stage: "Revisão",
      matrix: "MTX-ETQ-18",
      material: "Manta base",
      revenue: 5220,
      notes: "Pedido aguardando conferência final."
    },
    {
      id: "PED-1027",
      client: "Calçados Nova Era",
      product: "Logo em borracha",
      quantity: 2100,
      date: "2026-06-12",
      status: "Produção",
      stage: "Forno",
      matrix: "MTX-LOG-42",
      material: "Tinta plastisol branca",
      revenue: 13650,
      notes: "Prioridade alta para entrega programada."
    },
    {
      id: "PED-1028",
      client: "Boutique Prime",
      product: "Tag personalizada",
      quantity: 480,
      date: "2026-06-14",
      status: "Finalizado",
      stage: "Finalizado",
      matrix: "MTX-TAG-07",
      material: "Tinta plastisol vermelha",
      revenue: 3120,
      notes: "Entrega concluída e faturamento lançado."
    }
  ],
  clients: [
    { name: "Brindes Franca", doc: "12.440.221/0001-55", phone: "(16) 99911-2040", email: "compras@brindesfranca.com", orders: 8 },
    { name: "Rodeio Store", doc: "44.912.558/0001-03", phone: "(16) 98820-4512", email: "atendimento@rodeiostore.com", orders: 4 },
    { name: "Auto Peças Avenida", doc: "29.320.441/0001-17", phone: "(16) 3720-7788", email: "financeiro@avenidaauto.com", orders: 6 },
    { name: "Calçados Nova Era", doc: "08.221.703/0001-80", phone: "(16) 99118-6610", email: "producao@novaera.com", orders: 12 },
    { name: "Boutique Prime", doc: "33.710.902/0001-99", phone: "(16) 99770-3004", email: "contato@boutiqueprime.com", orders: 2 }
  ],
  stock: [
    { item: "Tinta plastisol azul", type: "Matéria-prima", current: 42, min: 25, unit: "kg", arrival: "Reposição em 18 dias" },
    { item: "Tinta plastisol preta", type: "Matéria-prima", current: 18, min: 30, unit: "kg", arrival: "Comprar esta semana" },
    { item: "Tinta plastisol branca", type: "Matéria-prima", current: 35, min: 28, unit: "kg", arrival: "Reposição em 22 dias" },
    { item: "Manta base", type: "Insumo", current: 120, min: 70, unit: "un", arrival: "Estoque confortável" },
    { item: "Matrizes ativas", type: "Ferramental", current: 64, min: 50, unit: "un", arrival: "Sem alerta" },
    { item: "Embalagem individual", type: "Expedição", current: 900, min: 1000, unit: "un", arrival: "Compra planejada" }
  ]
};

const titles = {
  dashboard: "Painel operacional",
  pedidos: "Gestão de pedidos",
  clientes: "Clientes",
  producao: "Quadro de produção",
  estoque: "Estoque",
  expedicao: "Expedição",
  relatorios: "Relatórios"
};

const moduleThemes = {
  dashboard: "#157a6e",
  pedidos: "#157a6e",
  clientes: "#5c8fb4",
  producao: "#b36b12",
  estoque: "#2f8f5b",
  expedicao: "#7d5fb2",
  relatorios: "#d94f30"
};

const demoUser = {
  user: "demo",
  password: "demo123"
};

const productionStages = ["Administrativo", "Dosadora", "Forno", "Revisão", "Finalizado"];
const stageStatus = {
  Administrativo: "Novo",
  Dosadora: "Produção",
  Forno: "Produção",
  Revisão: "Expedição",
  Finalizado: "Finalizado"
};

function normalize(value) {
  return String(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function formatDate(value) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("pt-BR");
}

function statusClass(status) {
  return normalize(status).replace("ç", "c").replace(/\s+/g, "-");
}

function orderPriority(order) {
  if (order.quantity >= 1800 || order.revenue >= 10000) return "Alta";
  if (order.status === "Expedição") return "Conferência";
  if (order.status === "Novo") return "Nova";
  return "Normal";
}

function priorityClass(priority) {
  return normalize(priority);
}

function animateChildren(selector) {
  const element = document.querySelector(selector);
  if (!element) return;

  element.classList.remove("cards-animate");
  requestAnimationFrame(() => element.classList.add("cards-animate"));
}

function clientOrders(clientName) {
  return state.orders.filter((order) => order.client === clientName);
}

function clientStats(clientName) {
  const orders = clientOrders(clientName);
  const revenue = orders.reduce((sum, order) => sum + order.revenue, 0);
  const open = orders.filter((order) => order.status !== "Finalizado").length;
  const last = orders[0];
  return { orders, revenue, open, last };
}

function filteredOrders() {
  const query = normalize(state.search);
  return state.orders.filter((order) => {
    const matchesFilter = state.orderFilter === "todos" || order.status === state.orderFilter;
    const haystack = normalize(`${order.id} ${order.client} ${order.product} ${order.status}`);
    return matchesFilter && haystack.includes(query);
  });
}

function setView(view) {
  state.activeView = view;
  document.querySelectorAll(".view").forEach((item) => item.classList.toggle("active", item.id === view));
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  document.querySelectorAll(".mobile-tab").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  document.querySelector("#page-title").textContent = titles[view];
  updateQuickDock(view);
  updateModuleTabs(view);
  render();
}

function updateModuleTabs(view = state.activeView) {
  const tabs = document.querySelector("#moduleTabs");
  if (!tabs) return;

  const buttons = [...tabs.querySelectorAll(".module-tab")];
  const active = buttons.find((button) => button.dataset.view === view) || buttons[0];
  buttons.forEach((button) => button.classList.toggle("active", button === active));
  tabs.style.setProperty("--module-left", `${active.offsetLeft - tabs.scrollLeft}px`);
  tabs.style.setProperty("--module-width", `${active.offsetWidth}px`);
  tabs.style.setProperty("--module-color", moduleThemes[view] || moduleThemes.dashboard);
}

function updateQuickDock(view = state.activeView) {
  const dock = document.querySelector("#quickDock");
  if (!dock) return;

  const buttons = [...dock.querySelectorAll(".dock-btn")];
  const active = buttons.find((button) => button.dataset.view === view) || buttons[0];
  buttons.forEach((button) => button.classList.toggle("active", button === active));
  dock.style.setProperty("--dock-active-left", `${active.offsetLeft - dock.scrollLeft}px`);
  dock.style.setProperty("--dock-active-width", `${active.offsetWidth}px`);
}

function renderSidebarInfo() {
  const date = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
  const critical = state.stock.filter((item) => item.current < item.min).length;
  document.querySelector("#side-date").textContent = date;
  document.querySelector("#side-health").textContent = critical ? `${critical} alerta(s)` : "Estável";
}

function renderMetrics() {
  const openOrders = state.orders.filter((order) => order.status !== "Finalizado").length;
  const inProduction = state.orders.filter((order) => order.status === "Produção").length;
  const lowStock = state.stock.filter((item) => item.current < item.min).length;
  const revenue = state.orders.reduce((total, order) => total + order.revenue, 0);

  document.querySelector("#metric-open-orders").textContent = openOrders;
  document.querySelector("#metric-production").textContent = inProduction;
  document.querySelector("#metric-low-stock").textContent = lowStock;
  document.querySelector("#metric-revenue").textContent = currency.format(revenue);
  animateChildren(".metric-grid");
}

function renderRecentOrders() {
  document.querySelector("#recent-orders").innerHTML = state.orders.slice(0, 5).map((order) => `
    <tr>
      <td><strong>${order.id}</strong></td>
      <td>${order.client}</td>
      <td>${order.product}</td>
      <td><span class="pill ${statusClass(order.status)}">${order.status}</span></td>
      <td>${formatDate(order.date)}</td>
    </tr>
  `).join("");
}

function renderStageSummary() {
  document.querySelector("#stage-summary").innerHTML = productionStages.map((stage) => {
    const count = state.orders.filter((order) => order.stage === stage).length;
    return `
      <div class="stage-item">
        <span>${stage}</span>
        <strong>${count}</strong>
      </div>
    `;
  }).join("");
  animateChildren("#stage-summary");
}

function renderAlerts() {
  const alerts = state.stock
    .filter((item) => item.current < item.min)
    .map((item) => `${item.item}: ${item.current}${item.unit} disponíveis, mínimo ${item.min}${item.unit}.`);

  if (!alerts.length) {
    alerts.push("Nenhum insumo abaixo do mínimo no momento.");
  }

  alerts.push("Prazo médio de compra de matéria-prima: 30 dias.");

  document.querySelector("#alerts-list").innerHTML = alerts.map((alert) => `
    <div class="alert-item">${alert}</div>
  `).join("");
  animateChildren("#alerts-list");
}

function renderOrders() {
  const orders = filteredOrders();
  const grid = document.querySelector("#orders-grid");
  grid.innerHTML = orders.map((order) => `
    <article class="order-card modern-card">
      <header>
        <div>
          <h3>${order.id}</h3>
          <p>${order.client}</p>
        </div>
        <div class="card-badges">
          <span class="priority-chip ${priorityClass(orderPriority(order))}">${orderPriority(order)}</span>
          <span class="pill ${statusClass(order.status)}">${order.status}</span>
        </div>
      </header>
      <strong>${order.product}</strong>
      <p class="card-description">${order.notes}</p>
      <div class="order-meta">
        <span><b>${order.quantity.toLocaleString("pt-BR")}</b> peças</span>
        <span>Entrega <b>${formatDate(order.date)}</b></span>
        <span>${currency.format(order.revenue)}</span>
      </div>
      <div class="order-resource-grid">
        <span><small>Etapa</small>${order.stage}</span>
        <span><small>Matriz</small>${order.matrix}</span>
        <span><small>Material</small>${order.material}</span>
      </div>
      <div class="card-actions">
        <button class="action-btn" data-detail="${order.id}">Detalhes</button>
        <button class="action-btn" data-romaneio="${order.id}">Romaneio</button>
        <button class="primary-btn" data-advance="${order.id}">Avançar</button>
        <button class="danger-btn" data-delete-order="${order.id}">Remover</button>
      </div>
    </article>
  `).join("") || `<div class="panel">Nenhum pedido encontrado.</div>`;
  animateChildren("#orders-grid");
}

function renderClients() {
  const query = normalize(state.search);
  const clients = state.clients.filter((client) => normalize(`${client.name} ${client.doc} ${client.email}`).includes(query));
  document.querySelector("#clients-grid").innerHTML = clients.map((client) => `
    <article class="client-card modern-card">
      <header>
        <div>
          <h3>${client.name}</h3>
          <p>${client.doc}</p>
        </div>
        <span class="pill">${clientStats(client.name).open} ativos</span>
      </header>
      <div class="client-meta">
        <span>${client.phone}</span>
        <span>${client.email}</span>
      </div>
      <div class="client-stats-grid">
        <span><small>Histórico</small><strong>${client.orders}</strong></span>
        <span><small>Em aberto</small><strong>${clientStats(client.name).open}</strong></span>
        <span><small>Valor atual</small><strong>${currency.format(clientStats(client.name).revenue)}</strong></span>
      </div>
      <p class="client-last-order">${clientStats(client.name).last ? `Último pedido: ${clientStats(client.name).last.id} · ${clientStats(client.name).last.product}` : "Sem pedido registrado no protótipo."}</p>
      <div class="card-actions">
        <button class="action-btn" data-client-detail="${client.name}">Detalhar</button>
        <button class="primary-btn" data-client-order="${client.name}">Criar pedido</button>
        <button class="danger-btn" data-delete-client="${client.name}">Remover</button>
      </div>
    </article>
  `).join("") || `<div class="panel">Nenhum cliente encontrado.</div>`;
  animateChildren("#clients-grid");
}

function renderProduction() {
  document.querySelector("#production-board").innerHTML = productionStages.map((stage) => {
    const cards = state.orders.filter((order) => order.stage === stage).map((order) => `
      <article class="task-card" draggable="true" data-task-id="${order.id}">
        <strong>${order.id}</strong>
        <small>${order.client}</small>
        <small>${order.product}</small>
        <small>${order.quantity.toLocaleString("pt-BR")} peças</small>
        <button class="action-btn" data-detail="${order.id}">Abrir</button>
        <button class="danger-btn" data-delete-order="${order.id}">Remover</button>
      </article>
    `).join("");

    return `
      <section class="kanban-column" data-stage="${stage}">
        <header>
          <h3>${stage}</h3>
          <span class="pill">${state.orders.filter((order) => order.stage === stage).length}</span>
        </header>
        ${cards || `<p>Nenhum pedido nesta etapa.</p>`}
      </section>
    `;
  }).join("");
  animateChildren("#production-board");
}

function renderStock() {
  document.querySelector("#stock-grid").innerHTML = state.stock.map((item, index) => {
    const percent = Math.min(100, Math.round((item.current / Math.max(item.min * 1.6, item.current)) * 100));
    const critical = item.current < item.min;
    return `
      <article class="stock-card modern-card ${critical ? "critical" : ""}">
        <header>
          <div>
            <h3>${item.item}</h3>
            <p>${item.type}</p>
          </div>
          <span class="pill ${critical ? "producao" : "expedicao"}">${critical ? "Crítico" : "OK"}</span>
        </header>
        <div class="stock-meter"><span style="width:${percent}%"></span></div>
        <div class="stock-values">
          <span><small>Atual</small><strong>${item.current}${item.unit}</strong></span>
          <span><small>Mínimo</small><strong>${item.min}${item.unit}</strong></span>
        </div>
        <p>${item.arrival}</p>
        <div class="stock-stepper">
          <button class="action-btn" data-stock-adjust="${index}" data-stock-delta="-1">−</button>
          <button class="action-btn" data-stock-adjust="${index}" data-stock-delta="1">＋</button>
          <button class="action-btn" data-stock-restock="${index}">Repor</button>
        </div>
        <div class="card-actions">
          <button class="action-btn" data-edit-stock="${index}">Editar</button>
          <button class="danger-btn" data-delete-stock="${index}">Remover</button>
        </div>
      </article>
    `;
  }).join("");
  animateChildren("#stock-grid");
}

function renderExpedition() {
  const ready = state.orders.filter((order) => ["Expedição", "Finalizado"].includes(order.status));
  document.querySelector("#expedition-list").innerHTML = ready.map((order) => `
    <article class="expedition-card">
      <div>
        <h3>${order.id} · ${order.client}</h3>
        <p>${order.product} · ${order.quantity.toLocaleString("pt-BR")} peças · entrega ${formatDate(order.date)}</p>
      </div>
      <div class="card-actions">
        <button class="action-btn" data-romaneio="${order.id}">Conferir romaneio</button>
        <button class="primary-btn" data-finish="${order.id}">Finalizar</button>
      </div>
    </article>
  `).join("") || `<div class="panel">Nenhum pedido em expedição.</div>`;
  animateChildren("#expedition-list");
}

function renderReports() {
  const months = [
    { label: "Abr", value: 18400 },
    { label: "Mai", value: 24600 },
    { label: "Jun", value: state.orders.reduce((sum, order) => sum + order.revenue, 0) },
    { label: "Jul", value: 16800 }
  ];
  const max = Math.max(...months.map((month) => month.value));

  document.querySelector("#revenue-chart").innerHTML = months.map((month) => `
    <div class="bar-row">
      <strong>${month.label}</strong>
      <div class="bar-track"><span style="width:${Math.round((month.value / max) * 100)}%"></span></div>
      <span>${currency.format(month.value)}</span>
    </div>
  `).join("");
  animateChildren("#revenue-chart");

  const totalPieces = state.orders.reduce((sum, order) => sum + order.quantity, 0);
  document.querySelector("#pieces-donut span").textContent = totalPieces.toLocaleString("pt-BR");
  document.querySelector("#pieces-legend").innerHTML = [
    ["Produção", "62%"],
    ["Expedição", "20%"],
    ["Novos pedidos", "18%"]
  ].map(([label, value]) => `<div class="legend-item"><span>${label}</span><strong>${value}</strong></div>`).join("");
  animateChildren("#pieces-legend");

  document.querySelector("#executive-summary").innerHTML = [
    ["Pedidos registrados", state.orders.length],
    ["Clientes cadastrados", state.clients.length],
    ["Materiais controlados", state.stock.length],
    ["Tempo alvo de resposta", "até 2 segundos"]
  ].map(([label, value]) => `<div class="summary-item"><span>${label}</span><strong>${value}</strong></div>`).join("");
  animateChildren("#executive-summary");
}

function render() {
  renderSidebarInfo();
  renderMetrics();
  renderRecentOrders();
  renderStageSummary();
  renderAlerts();
  renderOrders();
  renderClients();
  renderProduction();
  renderStock();
  renderExpedition();
  renderReports();
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function showLoginError(message) {
  document.querySelector("#login-error").textContent = message;
}

function enterSystem() {
  document.body.classList.remove("login-active");
  showLoginError("");
  updateFilterGlider();
  updateQuickDock();
  updateModuleTabs();
  showToast("Login realizado com sucesso.");
}

function logout() {
  document.body.classList.add("login-active");
  document.querySelector("#login-password").value = "";
  closeDetails();
}

function handleLogin(event) {
  event.preventDefault();
  const user = document.querySelector("#login-user").value.trim();
  const password = document.querySelector("#login-password").value.trim();

  if (!user || !password) {
    showLoginError("Informe usuário e senha para acessar.");
    return;
  }

  if (user !== demoUser.user || password !== demoUser.password) {
    showLoginError("Usuário ou senha inválidos. Use o acesso de demonstração.");
    return;
  }

  enterSystem();
}

function fillDemoLogin() {
  document.querySelector("#login-user").value = demoUser.user;
  document.querySelector("#login-password").value = demoUser.password;
  enterSystem();
}

function togglePassword() {
  const input = document.querySelector("#login-password");
  const visible = input.type === "text";
  input.type = visible ? "password" : "text";
  document.querySelector("#toggle-password").textContent = visible ? "👁" : "×";
}

function syncResponsiveSidebar() {
  if (window.innerWidth <= 1100) {
    document.querySelector(".app-shell").classList.remove("sidebar-collapsed");
  }
}

function openOrderModal(clientName = "") {
  document.querySelector("#form-client").value = clientName;
  document.querySelector("#form-product").value = "";
  document.querySelector("#form-quantity").value = 500;
  document.querySelector("#form-date").valueAsDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  document.querySelector("#form-notes").value = "";
  document.querySelector("#order-modal").showModal();
}

function closeOrderModal() {
  document.querySelector("#order-modal").close();
}

function openStockModal(index = "") {
  const editing = index !== "";
  const item = editing ? state.stock[Number(index)] : null;
  document.querySelector("#stock-modal-title").textContent = editing ? "Editar item" : "Novo item";
  document.querySelector("#stock-index").value = editing ? String(index) : "";
  document.querySelector("#stock-item").value = item ? item.item : "";
  document.querySelector("#stock-type").value = item ? item.type : "";
  document.querySelector("#stock-current").value = item ? item.current : "";
  document.querySelector("#stock-min").value = item ? item.min : "";
  document.querySelector("#stock-unit").value = item ? item.unit : "kg";
  document.querySelector("#stock-arrival").value = item ? item.arrival : "";
  document.querySelector("#stock-modal").showModal();
}

function closeStockModal() {
  document.querySelector("#stock-modal").close();
}

function saveOrder(event) {
  event.preventDefault();
  const client = document.querySelector("#form-client").value.trim();
  const product = document.querySelector("#form-product").value.trim();
  const quantity = Number(document.querySelector("#form-quantity").value);
  const date = document.querySelector("#form-date").value;
  const notes = document.querySelector("#form-notes").value.trim();

  if (!client || !product || !quantity || !date) {
    showToast("Preencha os dados obrigatórios do pedido.");
    return;
  }

  const nextId = `PED-${1024 + state.orders.length}`;
  state.orders.unshift({
    id: nextId,
    client,
    product,
    quantity,
    date,
    status: "Novo",
    stage: "Administrativo",
    matrix: "A definir",
    material: "A validar",
    revenue: quantity * 5.7,
    notes: notes || "Pedido criado durante a apresentação."
  });

  if (!state.clients.some((item) => item.name === client)) {
    state.clients.unshift({
      name: client,
      doc: "Cadastro pendente",
      phone: "Contato pendente",
      email: "E-mail pendente",
      orders: 1
    });
  }

  document.querySelector("#order-modal").close();
  setView("pedidos");
  showToast(`${nextId} criado com sucesso.`);
}

function deleteOrder(id) {
  const order = state.orders.find((item) => item.id === id);
  if (!order) return;

  const ok = window.confirm(`Remover o pedido ${order.id} de ${order.client}?`);
  if (!ok) return;

  state.orders = state.orders.filter((item) => item.id !== id);
  closeDetails();
  render();
  showToast(`${order.id} removido.`);
}

function deleteClient(name) {
  const client = state.clients.find((item) => item.name === name);
  if (!client) return;

  const orders = clientOrders(name);
  const message = orders.length
    ? `Remover ${client.name} e ${orders.length} pedido(s) vinculados?`
    : `Remover o cliente ${client.name}?`;
  const ok = window.confirm(message);
  if (!ok) return;

  state.clients = state.clients.filter((item) => item.name !== name);
  state.orders = state.orders.filter((order) => order.client !== name);
  closeDetails();
  render();
  showToast(`${client.name} removido.`);
}

function saveStock(event) {
  event.preventDefault();
  const index = document.querySelector("#stock-index").value;
  const item = document.querySelector("#stock-item").value.trim();
  const type = document.querySelector("#stock-type").value.trim();
  const current = Number(document.querySelector("#stock-current").value);
  const min = Number(document.querySelector("#stock-min").value);
  const unit = document.querySelector("#stock-unit").value.trim();
  const arrival = document.querySelector("#stock-arrival").value.trim();

  if (!item || !type || Number.isNaN(current) || Number.isNaN(min) || !unit || !arrival) {
    showToast("Preencha os dados do item de estoque.");
    return;
  }

  const payload = { item, type, current, min, unit, arrival };
  if (index === "") {
    state.stock.unshift(payload);
    showToast(`${item} adicionado ao estoque.`);
  } else {
    state.stock[Number(index)] = payload;
    showToast(`${item} atualizado.`);
  }

  closeStockModal();
  render();
}

function adjustStock(index, delta) {
  const item = state.stock[Number(index)];
  if (!item) return;
  item.current = Math.max(0, item.current + Number(delta));
  render();
}

function restockItem(index) {
  const item = state.stock[Number(index)];
  if (!item) return;
  item.current = Math.max(item.current, item.min * 2);
  item.arrival = "Reposição registrada hoje";
  render();
  showToast(`${item.item} reposto.`);
}

function deleteStock(index) {
  const item = state.stock[Number(index)];
  if (!item) return;

  const ok = window.confirm(`Remover ${item.item} do estoque?`);
  if (!ok) return;

  state.stock.splice(Number(index), 1);
  render();
  showToast(`${item.item} removido.`);
}

function advanceOrder(id) {
  const order = state.orders.find((item) => item.id === id);
  if (!order) return;

  const flow = [
    { status: "Novo", stage: "Administrativo" },
    { status: "Produção", stage: "Dosadora" },
    { status: "Produção", stage: "Forno" },
    { status: "Expedição", stage: "Revisão" },
    { status: "Finalizado", stage: "Finalizado" }
  ];

  const currentIndex = flow.findIndex((step) => step.status === order.status && step.stage === order.stage);
  const next = flow[Math.min(currentIndex + 1, flow.length - 1)];
  order.status = next.status;
  order.stage = next.stage;
  render();
  showToast(`${order.id} avançou para ${order.stage}.`);
}

function finishOrder(id) {
  const order = state.orders.find((item) => item.id === id);
  if (!order) return;
  order.status = "Finalizado";
  order.stage = "Finalizado";
  render();
  showToast(`${order.id} finalizado na expedição.`);
}

function closeDetails() {
  document.body.classList.remove("drawer-open");
  document.querySelector("#details-drawer").setAttribute("aria-hidden", "true");
}

function orderTimeline(order) {
  const currentIndex = productionStages.indexOf(order.stage);
  return productionStages.map((stage, index) => `
    <div class="timeline-step ${index <= currentIndex ? "done" : ""}">
      <span class="timeline-dot">${index + 1}</span>
      <div>
        <strong>${stage}</strong>
        <p>${index <= currentIndex ? "Etapa liberada no fluxo" : "Aguardando avanço"}</p>
      </div>
    </div>
  `).join("");
}

function openDetails(id, romaneio = false) {
  const order = state.orders.find((item) => item.id === id);
  if (!order) return;

  document.querySelector("#details-content").innerHTML = romaneio ? `
    <p class="eyebrow">Documento operacional</p>
    <h2>Romaneio de produção</h2>
    <div class="modal-actions">
      <button class="ghost-btn" data-detail="${order.id}">Ver detalhes</button>
      <button class="primary-btn" data-print-romaneio="true">Imprimir</button>
    </div>
    <div class="romaneio-sheet">
      <div class="romaneio-head">
        <div>
          <strong>Yubor Flow</strong>
          <p>Sistema Integrado de Gestão</p>
        </div>
        <div>
          <strong>${order.id}</strong>
          <p>${formatDate(order.date)}</p>
        </div>
      </div>
      <div class="romaneio-grid">
        <div class="romaneio-field"><span>Cliente</span><strong>${order.client}</strong></div>
        <div class="romaneio-field"><span>Status</span><strong>${order.status}</strong></div>
        <div class="romaneio-field"><span>Produto</span><strong>${order.product}</strong></div>
        <div class="romaneio-field"><span>Quantidade</span><strong>${order.quantity.toLocaleString("pt-BR")} peças</strong></div>
        <div class="romaneio-field"><span>Matriz</span><strong>${order.matrix}</strong></div>
        <div class="romaneio-field"><span>Material principal</span><strong>${order.material}</strong></div>
      </div>
      <div class="romaneio-field">
        <span>Observações de produção</span>
        <strong>${order.notes}</strong>
      </div>
      <div class="romaneio-grid">
        <div class="romaneio-field"><span>Responsável produção</span><strong>__________________</strong></div>
        <div class="romaneio-field"><span>Conferência expedição</span><strong>__________________</strong></div>
      </div>
    </div>
  ` : `
    <p class="eyebrow">Detalhes do pedido</p>
    <h2>${order.id} · ${order.client}</h2>
    <div class="drawer-hero">
      <span class="pill ${statusClass(order.status)}">${order.status}</span>
      <h3>${order.product}</h3>
      <p>${order.quantity.toLocaleString("pt-BR")} peças com entrega em ${formatDate(order.date)}.</p>
    </div>
    <div class="executive-summary">
      <div class="summary-item"><span>Valor previsto</span><strong>${currency.format(order.revenue)}</strong></div>
      <div class="summary-item"><span>Matriz</span><strong>${order.matrix}</strong></div>
      <div class="summary-item"><span>Material</span><strong>${order.material}</strong></div>
      <div class="summary-item"><span>Observações</span><strong>${order.notes}</strong></div>
    </div>
    <h3 style="margin-top: 20px;">Timeline do pedido</h3>
    <div class="timeline">${orderTimeline(order)}</div>
    <div class="modal-actions" style="margin-top: 20px;">
      <button class="ghost-btn" data-romaneio="${order.id}">Gerar romaneio</button>
      <button class="primary-btn" data-advance="${order.id}">Avançar etapa</button>
    </div>
  `;

  document.querySelector("#details-drawer").setAttribute("aria-hidden", "false");
  document.body.classList.add("drawer-open");
}

function openClientDetails(clientName) {
  const client = state.clients.find((item) => item.name === clientName);
  if (!client) return;

  const stats = clientStats(client.name);
  const rows = stats.orders.map((order) => `
    <div class="summary-item">
      <span>${order.id} · ${order.product}</span>
      <strong>${order.status}</strong>
    </div>
  `).join("") || `<p>Nenhum pedido cadastrado para este cliente no protótipo.</p>`;

  document.querySelector("#details-content").innerHTML = `
    <p class="eyebrow">Perfil do cliente</p>
    <h2>${client.name}</h2>
    <div class="drawer-hero">
      <span class="pill">${client.orders} pedidos no histórico</span>
      <h3>${client.doc}</h3>
      <p>${client.phone} · ${client.email}</p>
    </div>
    <div class="client-stats-grid drawer-stats">
      <span><small>Pedidos ativos</small><strong>${stats.open}</strong></span>
      <span><small>Valor em carteira</small><strong>${currency.format(stats.revenue)}</strong></span>
      <span><small>Última demanda</small><strong>${stats.last ? stats.last.id : "N/A"}</strong></span>
    </div>
    <h3 style="margin-top: 20px;">Histórico operacional</h3>
    <div class="executive-summary">${rows}</div>
    <div class="modal-actions" style="margin-top: 20px;">
      <button class="ghost-btn" data-view-target="pedidos">Ver pedidos</button>
      <button class="primary-btn" data-client-order="${client.name}">Novo pedido</button>
    </div>
  `;

  document.querySelector("#details-drawer").setAttribute("aria-hidden", "false");
  document.body.classList.add("drawer-open");
}

function moveOrderToStage(id, stage) {
  const order = state.orders.find((item) => item.id === id);
  if (!order || !stageStatus[stage]) return;

  order.stage = stage;
  order.status = stageStatus[stage];
  render();
  showToast(`${order.id} movido para ${stage}.`);
}

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

document.querySelectorAll(".dock-btn").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

document.querySelectorAll(".module-tab").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

document.querySelectorAll(".mobile-tab").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

document.querySelectorAll("[data-view-target]").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.viewTarget));
});

document.querySelector("#global-search").addEventListener("input", (event) => {
  state.search = event.target.value;
  render();
});

document.querySelector("#sidebar-toggle").addEventListener("click", () => {
  if (window.innerWidth <= 1100) return;
  const shell = document.querySelector(".app-shell");
  const collapsed = shell.classList.toggle("sidebar-collapsed");
  document.querySelector("#sidebar-toggle").setAttribute("aria-label", collapsed ? "Expandir menu" : "Recolher menu");
  document.querySelector("#sidebar-toggle").setAttribute("title", collapsed ? "Expandir menu" : "Recolher menu");
});

document.querySelector("#new-order-btn").addEventListener("click", () => openOrderModal());
document.querySelector("#login-form").addEventListener("submit", handleLogin);
document.querySelector("#demo-login").addEventListener("click", fillDemoLogin);
document.querySelector("#toggle-password").addEventListener("click", togglePassword);
document.querySelector("#logout-btn").addEventListener("click", logout);
document.querySelector("#order-form").addEventListener("submit", saveOrder);
document.querySelector("#cancel-order-btn").addEventListener("click", closeOrderModal);
document.querySelector("#cancel-order-x").addEventListener("click", closeOrderModal);
document.querySelector("#new-stock-btn").addEventListener("click", () => openStockModal());
document.querySelector("#stock-form").addEventListener("submit", saveStock);
document.querySelector("#cancel-stock-btn").addEventListener("click", closeStockModal);
document.querySelector("#cancel-stock-x").addEventListener("click", closeStockModal);
document.querySelector("#close-details").addEventListener("click", closeDetails);
document.querySelector("#drawer-backdrop").addEventListener("click", closeDetails);

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const detailId = target.dataset.detail;
  const romaneioId = target.dataset.romaneio;
  const advanceId = target.dataset.advance;
  const finishId = target.dataset.finish;
  const clientName = target.dataset.clientOrder;
  const clientDetail = target.dataset.clientDetail;
  const printRomaneio = target.dataset.printRomaneio;
  const viewTarget = target.dataset.viewTarget;
  const deleteOrderId = target.dataset.deleteOrder;
  const deleteClientName = target.dataset.deleteClient;
  const editStockIndex = target.dataset.editStock;
  const deleteStockIndex = target.dataset.deleteStock;
  const stockAdjustIndex = target.dataset.stockAdjust;
  const stockDelta = target.dataset.stockDelta;
  const restockIndex = target.dataset.stockRestock;

  if (detailId) openDetails(detailId);
  if (romaneioId) openDetails(romaneioId, true);
  if (advanceId) advanceOrder(advanceId);
  if (finishId) finishOrder(finishId);
  if (clientName) openOrderModal(clientName);
  if (clientDetail) openClientDetails(clientDetail);
  if (printRomaneio) window.print();
  if (deleteOrderId) deleteOrder(deleteOrderId);
  if (deleteClientName) deleteClient(deleteClientName);
  if (editStockIndex) openStockModal(editStockIndex);
  if (deleteStockIndex) deleteStock(deleteStockIndex);
  if (stockAdjustIndex) adjustStock(stockAdjustIndex, stockDelta);
  if (restockIndex) restockItem(restockIndex);
  if (viewTarget) {
    closeDetails();
    setView(viewTarget);
  }
});

document.addEventListener("dragstart", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement) || !target.classList.contains("task-card")) return;
  target.classList.add("dragging");
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", target.dataset.taskId);
});

document.addEventListener("dragend", (event) => {
  const target = event.target;
  if (target instanceof HTMLElement) target.classList.remove("dragging");
  document.querySelectorAll(".kanban-column").forEach((column) => column.classList.remove("drag-over"));
});

document.addEventListener("dragover", (event) => {
  const column = event.target instanceof HTMLElement ? event.target.closest(".kanban-column") : null;
  if (!column) return;
  event.preventDefault();
  document.querySelectorAll(".kanban-column").forEach((item) => item.classList.toggle("drag-over", item === column));
});

document.addEventListener("drop", (event) => {
  const column = event.target instanceof HTMLElement ? event.target.closest(".kanban-column") : null;
  if (!column) return;
  event.preventDefault();
  const id = event.dataTransfer.getData("text/plain");
  moveOrderToStage(id, column.dataset.stage);
});

function updateFilterGlider() {
  const scope = document.querySelector("#orderFilterScope");
  const active = scope.querySelector(".filter-btn.active");
  if (!active) return;

  scope.dataset.active = active.dataset.filter;
  scope.style.setProperty("--glider-left", `${active.offsetLeft}px`);
  scope.style.setProperty("--glider-width", `${active.offsetWidth}px`);
}

function setOrderFilter(button) {
  const scope = document.querySelector("#orderFilterScope");
  const activeButton = scope.querySelector(".filter-btn.active");
  if (button === activeButton) return;

  const buttons = [...scope.querySelectorAll(".filter-btn")];
  const oldIndex = buttons.indexOf(activeButton);
  const newIndex = buttons.indexOf(button);
  const direction = newIndex > oldIndex ? "slide-right" : "slide-left";

  const updateDOM = () => {
    state.orderFilter = button.dataset.filter;
    buttons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    updateFilterGlider();
    renderOrders();
  };

  if (scope.startViewTransition) {
    scope.startViewTransition({ update: updateDOM, types: [direction] });
  } else if (document.startViewTransition) {
    document.startViewTransition({ update: updateDOM, types: [direction] });
  } else {
    updateDOM();
  }
}

document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", () => {
    setOrderFilter(button);
  });
});

render();
syncResponsiveSidebar();
updateFilterGlider();
updateQuickDock();
updateModuleTabs();
window.addEventListener("resize", () => {
  syncResponsiveSidebar();
  updateFilterGlider();
  updateQuickDock();
  updateModuleTabs();
});
