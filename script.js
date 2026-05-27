const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

const state = {
  activeView: "dashboard",
  orderFilter: "todos",
  dateFilter: "todos",
  dateStart: "",
  dateEnd: "",
  search: "",
  financeFilter: "todos",
  financeDateFilter: "todos",
  financeSort: "date",
  cityCache: {},
  settings: loadSettings(),
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
    { name: "Brindes Franca", docType: "CNPJ", doc: "12.440.221/0001-55", phone: "(16) 99911-2040", email: "compras@brindesfranca.com", state: "SP", city: "Franca", orders: 8 },
    { name: "Rodeio Store", docType: "CNPJ", doc: "44.912.558/0001-03", phone: "(16) 98820-4512", email: "atendimento@rodeiostore.com", state: "SP", city: "Barretos", orders: 4 },
    { name: "Auto Peças Avenida", docType: "CNPJ", doc: "29.320.441/0001-17", phone: "(16) 3720-7788", email: "financeiro@avenidaauto.com", state: "SP", city: "Ribeirão Preto", orders: 6 },
    { name: "Calçados Nova Era", docType: "CNPJ", doc: "08.221.703/0001-80", phone: "(16) 99118-6610", email: "producao@novaera.com", state: "SP", city: "Franca", orders: 12 },
    { name: "Boutique Prime", docType: "CNPJ", doc: "33.710.902/0001-99", phone: "(16) 99770-3004", email: "contato@boutiqueprime.com", state: "SP", city: "São Paulo", orders: 2 }
  ],
  products: [
    { name: "Chaveiro em borracha 3D", category: "Chaveiros", price: 5.7, lead: 7, material: "Tinta plastisol azul", matrix: "MTX-CHV-33", notes: "Embalagem individual e acabamento em alto relevo." },
    { name: "Patch personalizado", category: "Patches", price: 6.6, lead: 8, material: "Tinta plastisol preta", matrix: "MTX-PCH-09", notes: "Conferir cores antes de liberar produção." },
    { name: "Etiqueta emborrachada", category: "Etiquetas", price: 5.8, lead: 6, material: "Manta base", matrix: "MTX-ETQ-18", notes: "Boa opção para confecção e acessórios." },
    { name: "Logo em borracha", category: "Logos", price: 6.5, lead: 10, material: "Tinta plastisol branca", matrix: "MTX-LOG-42", notes: "Produto de maior volume para calçados e bolsas." },
    { name: "Tag personalizada", category: "Tags", price: 6.5, lead: 5, material: "Tinta plastisol vermelha", matrix: "MTX-TAG-07", notes: "Peça compacta para moda e brindes." }
  ],
  stock: [
    { item: "Fornecedor de tinta plastisol", type: "Pagar", category: "fornecedores", current: 2450, min: "2026-06-05", unit: "Aberto", arrival: "Boleto mensal do fornecedor" },
    { item: "Energia da fábrica", type: "Pagar", category: "contas", current: 1380, min: "2026-06-10", unit: "Aberto", arrival: "Conta operacional" },
    { item: "Folha da produção", type: "Pagar", category: "salarios", current: 8200, min: "2026-06-07", unit: "Aberto", arrival: "Salários da equipe operacional" },
    { item: "Pedido Brindes Franca", type: "Receber", category: "receber", current: 6840, min: "2026-06-03", unit: "Aberto", arrival: "Chaveiro em borracha 3D" },
    { item: "Pedido Calçados Nova Era", type: "Receber", category: "receber", current: 13650, min: "2026-06-12", unit: "Aberto", arrival: "Logo em borracha" },
    { item: "Manutenção máquina dosadora", type: "Pagar", category: "manutencao", current: 920, min: "2026-06-18", unit: "Pago", arrival: "Serviço finalizado" },
    { item: "Pedido Boutique Prime", type: "Receber", category: "receber", current: 3120, min: "2026-06-14", unit: "Recebido", arrival: "Tag personalizada" }
  ]
};

const titles = {
  dashboard: "Painel operacional",
  pedidos: "Gestão de pedidos",
  clientes: "Clientes",
  produtos: "Produtos",
  producao: "Quadro de produção",
  estoque: "Financeiro",
  expedicao: "Expedição",
  relatorios: "Relatórios",
  configuracoes: "Configurações"
};

const viewOrder = Object.keys(titles);

const navigationIcons = {
  dashboard: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="8" rx="1.5"></rect><rect x="14" y="3" width="7" height="5" rx="1.5"></rect><rect x="14" y="12" width="7" height="9" rx="1.5"></rect><rect x="3" y="15" width="7" height="6" rx="1.5"></rect></svg>`,
  pedidos: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4h8l1 2h2v14H5V6h2l1-2Z"></path><path d="M9 12h5"></path><path d="M9 16h3"></path><path d="m15 17 4-4"></path><path d="m18 12 1 1-1 1"></path></svg>`,
  clientes: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 11a4 4 0 1 0-8 0"></path><path d="M4 21a8 8 0 0 1 16 0"></path><path d="M18 8a3 3 0 0 1 3 3"></path><path d="M3 11a3 3 0 0 1 3-3"></path></svg>`,
  produtos: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 7 9-4 9 4-9 4-9-4Z"></path><path d="M3 7v10l9 4 9-4V7"></path><path d="M12 11v10"></path><path d="m7.5 9.5 9-4"></path></svg>`,
  producao: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21V9l5 3V9l5 3V6h8v15H3Z"></path><path d="M7 17h2"></path><path d="M12 17h2"></path><path d="M17 17h2"></path></svg>`,
  estoque: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16v12H4z"></path><path d="M16 7V5H6v2"></path><path d="M16 13h4"></path><path d="M7 11h5"></path><path d="M7 15h4"></path></svg>`,
  expedicao: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h11v9H3z"></path><path d="M14 10h4l3 3v3h-7z"></path><circle cx="7" cy="18" r="2"></circle><circle cx="18" cy="18" r="2"></circle></svg>`,
  relatorios: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19h16"></path><path d="M7 16V9"></path><path d="M12 16V5"></path><path d="M17 16v-4"></path><path d="m5 11 5-5 4 4 5-6"></path></svg>`,
  configuracoes: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"></path><path d="M19 13.5v-3l-2.1-.5-.8-1.9 1.1-1.9-2.1-2.1-1.9 1.1-2-.8L10.8 2h-3l-.5 2.4-1.9.8-1.9-1.1-2.1 2.1 1.1 1.9-.8 1.9-2.1.5v3l2.1.5.8 1.9-1.1 1.9 2.1 2.1 1.9-1.1 1.9.8.5 2.4h3l.5-2.4 2-.8 1.9 1.1 2.1-2.1-1.1-1.9.8-1.9 2.1-.5Z"></path></svg>`
};

const demoUser = {
  user: "demo",
  password: "demo123"
};

const brazilStates = [
  ["AC", "Acre"], ["AL", "Alagoas"], ["AP", "Amapá"], ["AM", "Amazonas"], ["BA", "Bahia"],
  ["CE", "Ceará"], ["DF", "Distrito Federal"], ["ES", "Espírito Santo"], ["GO", "Goiás"],
  ["MA", "Maranhão"], ["MT", "Mato Grosso"], ["MS", "Mato Grosso do Sul"], ["MG", "Minas Gerais"],
  ["PA", "Pará"], ["PB", "Paraíba"], ["PR", "Paraná"], ["PE", "Pernambuco"], ["PI", "Piauí"],
  ["RJ", "Rio de Janeiro"], ["RN", "Rio Grande do Norte"], ["RS", "Rio Grande do Sul"],
  ["RO", "Rondônia"], ["RR", "Roraima"], ["SC", "Santa Catarina"], ["SP", "São Paulo"],
  ["SE", "Sergipe"], ["TO", "Tocantins"]
];

const citiesByState = {
  SP: ["São Paulo", "Franca", "Ribeirão Preto", "Barretos", "Campinas", "Santos", "Sorocaba", "São José dos Campos", "Bauru", "São José do Rio Preto", "Araraquara", "São Carlos", "Piracicaba", "Jundiaí", "Osasco", "Guarulhos", "Santo André", "São Bernardo do Campo", "Diadema", "Marília", "Presidente Prudente", "Limeira", "Americana", "Mococa", "Batatais", "Ituverava", "Jaboticabal", "Sertãozinho", "Matão", "Catanduva"],
  MG: ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora", "Betim", "Montes Claros", "Ribeirão das Neves", "Uberaba", "Governador Valadares", "Ipatinga"],
  RJ: ["Rio de Janeiro", "Niterói", "Duque de Caxias", "Nova Iguaçu", "Petrópolis", "Volta Redonda", "Campos dos Goytacazes", "Macaé"],
  PR: ["Curitiba", "Londrina", "Maringá", "Ponta Grossa", "Cascavel", "Foz do Iguaçu", "São José dos Pinhais"],
  SC: ["Florianópolis", "Joinville", "Blumenau", "São José", "Chapecó", "Itajaí", "Criciúma"],
  RS: ["Porto Alegre", "Caxias do Sul", "Pelotas", "Canoas", "Santa Maria", "Gravataí", "Novo Hamburgo"],
  BA: ["Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari", "Itabuna", "Juazeiro", "Lauro de Freitas"],
  GO: ["Goiânia", "Aparecida de Goiânia", "Anápolis", "Rio Verde", "Luziânia", "Águas Lindas de Goiás"],
  DF: ["Brasília", "Taguatinga", "Ceilândia", "Samambaia", "Gama", "Sobradinho"],
  PE: ["Recife", "Jaboatão dos Guararapes", "Olinda", "Caruaru", "Petrolina", "Paulista"],
  CE: ["Fortaleza", "Caucaia", "Juazeiro do Norte", "Maracanaú", "Sobral", "Crato"],
  ES: ["Vitória", "Vila Velha", "Serra", "Cariacica", "Linhares", "Cachoeiro de Itapemirim"],
  MT: ["Cuiabá", "Várzea Grande", "Rondonópolis", "Sinop", "Tangará da Serra"],
  MS: ["Campo Grande", "Dourados", "Três Lagoas", "Corumbá", "Ponta Porã"],
  PA: ["Belém", "Ananindeua", "Santarém", "Marabá", "Castanhal"],
  AM: ["Manaus", "Parintins", "Itacoatiara", "Manacapuru", "Coari"]
};

const productionStages = ["Administrativo", "Dosadora", "Forno", "Revisão", "Finalizado"];
const stageStatus = {
  Administrativo: "Novo",
  Dosadora: "Produção",
  Forno: "Produção",
  Revisão: "Expedição",
  Finalizado: "Finalizado"
};

const defaultSettings = {
  theme: "dark",
  fontSize: "normal",
  fontFamily: "hanken"
};

function loadSettings() {
  try {
    const stored = JSON.parse(localStorage.getItem("yubor-flow-settings") || "{}");
    const settings = { theme: "dark", fontSize: "normal", fontFamily: "hanken", ...stored };
    if (["inter", "system", "serif"].includes(settings.fontFamily)) settings.fontFamily = "hanken";
    return settings;
  } catch {
    return { theme: "dark", fontSize: "normal", fontFamily: "hanken" };
  }
}

function saveSettings() {
  localStorage.setItem("yubor-flow-settings", JSON.stringify(state.settings));
}

function normalize(value) {
  return String(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function applySystemSettings() {
  document.body.classList.toggle("theme-light", state.settings.theme === "light");
  document.body.classList.toggle("theme-dark", state.settings.theme === "dark");
  document.body.classList.remove("font-compact", "font-normal", "font-large");
  document.body.classList.add(`font-${state.settings.fontSize}`);
  document.body.classList.remove("font-inter", "font-system", "font-serif", "font-hanken", "font-comfortaa", "font-dongle");
  document.body.classList.add(`font-${state.settings.fontFamily}`);

  document.querySelectorAll("[data-theme-option]").forEach((button) => {
    button.classList.toggle("active", button.dataset.themeOption === state.settings.theme);
  });
  document.querySelectorAll("[data-font-size-option]").forEach((button) => {
    button.classList.toggle("active", button.dataset.fontSizeOption === state.settings.fontSize);
  });
  document.querySelectorAll("[data-font-family-option]").forEach((button) => {
    button.classList.toggle("active", button.dataset.fontFamilyOption === state.settings.fontFamily);
  });
}

function applyNavigationIcons() {
  document.querySelectorAll(".nav-item, .mobile-tab").forEach((button) => {
    const icon = navigationIcons[button.dataset.view];
    const slot = button.querySelector(".nav-icon") || button.querySelector("span");
    if (icon && slot) slot.innerHTML = icon;
  });
}

function updateSystemSetting(key, value) {
  state.settings[key] = value;
  saveSettings();
  applySystemSettings();
  showToast("Preferência visual atualizada.");
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

function financeStats() {
  const open = state.stock.filter((item) => item.unit === "Aberto");
  const payable = open.filter((item) => item.type === "Pagar").reduce((sum, item) => sum + item.current, 0);
  const receivable = open.filter((item) => item.type === "Receber").reduce((sum, item) => sum + item.current, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const overdue = open.filter((item) => new Date(`${item.min}T12:00:00`) < today).length;
  return { open, payable, receivable, balance: receivable - payable, overdue };
}

const financeCategories = {
  receber: "A receber",
  fornecedores: "Fornecedores",
  salarios: "Salários",
  contas: "Contas fixas",
  manutencao: "Manutenção"
};

function productByName(name) {
  return state.products.find((product) => product.name === name);
}

function accountCategory(item) {
  if (item.category) return item.category;
  if (item.type === "Receber") return "receber";
  const text = normalize(`${item.item} ${item.arrival}`);
  if (text.includes("salario") || text.includes("folha")) return "salarios";
  if (text.includes("manutencao") || text.includes("maquina")) return "manutencao";
  if (text.includes("energia") || text.includes("aluguel") || text.includes("internet")) return "contas";
  return "fornecedores";
}

function filteredAccounts() {
  const query = normalize(state.search);
  return state.stock
    .map((item, index) => ({ ...item, index, category: accountCategory(item) }))
    .filter((item) => state.financeFilter === "todos" || item.category === state.financeFilter)
    .filter((item) => accountMatchesFinanceDate(item))
    .filter((item) => normalize(`${item.item} ${item.type} ${item.unit} ${item.arrival} ${financeCategories[item.category]}`).includes(query));
}

function accountMatchesFinanceDate(item) {
  if (state.financeDateFilter === "todos") return true;
  const dueDate = parseLocalDate(item.min);
  if (!dueDate) return true;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const week = new Date(today);
  week.setDate(today.getDate() + 7);

  if (state.financeDateFilter === "vencidas") return dueDate < today && item.unit === "Aberto";
  if (state.financeDateFilter === "semana") return dueDate >= today && dueDate <= week;
  if (state.financeDateFilter === "mes") return dueDate.getMonth() === today.getMonth() && dueDate.getFullYear() === today.getFullYear();
  return true;
}

function sortAccounts(accounts) {
  return [...accounts].sort((a, b) => {
    if (state.financeSort === "value") return b.current - a.current;
    if (state.financeSort === "status") return a.unit.localeCompare(b.unit, "pt-BR") || parseLocalDate(a.min) - parseLocalDate(b.min);
    return parseLocalDate(a.min) - parseLocalDate(b.min);
  });
}

function sumAccounts(accounts, predicate = () => true) {
  return accounts.filter(predicate).reduce((sum, item) => sum + item.current, 0);
}

function nextAccountDate(accounts) {
  const sorted = sortAccounts(accounts.filter((item) => item.unit === "Aberto"));
  return sorted[0] ? formatDate(sorted[0].min) : "Sem vencimento";
}

function filteredOrders() {
  const query = normalize(state.search);
  return state.orders.filter((order) => {
    const matchesFilter = state.orderFilter === "todos" || order.status === state.orderFilter;
    const matchesDate = orderMatchesDateFilter(order);
    const haystack = normalize(`${order.id} ${order.client} ${order.product} ${order.status}`);
    return matchesFilter && matchesDate && haystack.includes(query);
  });
}

function parseLocalDate(value) {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
}

function orderMatchesDateFilter(order) {
  const orderDate = parseLocalDate(order.date);
  if (!orderDate) return true;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endWeek = new Date(today);
  endWeek.setDate(today.getDate() + 7);

  if (state.dateFilter === "hoje") return sameDay(orderDate, today);
  if (state.dateFilter === "semana") return orderDate >= today && orderDate <= endWeek;
  if (state.dateFilter === "mes") {
    return orderDate.getMonth() === today.getMonth() && orderDate.getFullYear() === today.getFullYear();
  }
  if (state.dateFilter === "atrasados") return orderDate < today && order.status !== "Finalizado";

  const start = parseLocalDate(state.dateStart);
  const end = parseLocalDate(state.dateEnd);
  if (start && orderDate < start) return false;
  if (end && orderDate > end) return false;
  return true;
}

function setView(view) {
  if (!titles[view]) return;
  if (view === state.activeView) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const currentIndex = viewOrder.indexOf(state.activeView);
  const nextIndex = viewOrder.indexOf(view);
  document.body.classList.remove("view-forward", "view-backward", "tab-opening");
  void document.body.offsetWidth;
  document.body.classList.add(nextIndex >= currentIndex ? "view-forward" : "view-backward");
  document.body.classList.add("tab-opening");

  const updateDOM = () => {
    state.activeView = view;
    document.querySelectorAll(".view").forEach((item) => item.classList.toggle("active", item.id === view));
    document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
    document.querySelectorAll(".mobile-tab").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
    document.querySelector("#page-title").textContent = titles[view];
    updateQuickDock(view);
    updateTopbarActions(view);
    render();
  };

  if (document.startViewTransition) {
    document.startViewTransition(updateDOM);
  } else {
    updateDOM();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
  window.setTimeout(() => document.body.classList.remove("tab-opening"), 520);
}

function updateTopbarActions(view = state.activeView) {
  const searchBox = document.querySelector(".search-box");
  const newOrderButton = document.querySelector("#new-order-btn");
  const searchableViews = ["pedidos", "clientes", "produtos", "estoque"];

  if (searchBox) {
    searchBox.classList.toggle("top-action-hidden", !searchableViews.includes(view));
  }

  if (newOrderButton) {
    newOrderButton.classList.toggle("top-action-hidden", view !== "pedidos");
  }
}

function updateScrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
  document.documentElement.style.setProperty("--scroll-progress", `${progress}%`);
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
  const finance = financeStats();
  const critical = finance.overdue;
  document.querySelector("#side-date").textContent = date;
  document.querySelector("#side-health").textContent = critical ? `${critical} vencida(s)` : "Em dia";
  document.querySelector("#side-balance").textContent = currency.format(finance.balance);
  document.querySelector("#side-receivable").textContent = currency.format(finance.receivable);
  document.querySelector("#side-payable").textContent = currency.format(finance.payable);
  document.querySelector("#side-finance-text").textContent = finance.balance >= 0
    ? "Recebimentos cobrem as contas abertas."
    : "Saídas abertas acima dos recebimentos.";
}

function renderMetrics() {
  const openOrders = state.orders.filter((order) => order.status !== "Finalizado").length;
  const inProduction = state.orders.filter((order) => order.status === "Produção").length;
  const lowStock = financeStats().open.length;
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
  const alerts = financeStats().open
    .filter((item) => new Date(`${item.min}T12:00:00`) <= new Date(Date.now() + 5 * 24 * 60 * 60 * 1000))
    .map((item) => `${item.type}: ${item.item} vence em ${formatDate(item.min)} (${currency.format(item.current)}).`);

  if (!alerts.length) {
    alerts.push("Nenhuma conta próxima do vencimento.");
  }

  alerts.push(`Saldo financeiro previsto: ${currency.format(financeStats().balance)}.`);

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
        <button class="action-btn" data-edit-order="${order.id}">Editar</button>
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
        <span>${client.city || "Cidade não informada"} - ${client.state || "UF"}</span>
      </div>
      <div class="client-stats-grid">
        <span><small>Histórico</small><strong>${client.orders}</strong></span>
        <span><small>Em aberto</small><strong>${clientStats(client.name).open}</strong></span>
        <span><small>Valor atual</small><strong>${currency.format(clientStats(client.name).revenue)}</strong></span>
      </div>
      <p class="client-last-order">${clientStats(client.name).last ? `Último pedido: ${clientStats(client.name).last.id} · ${clientStats(client.name).last.product}` : "Sem pedido registrado no protótipo."}</p>
      <div class="card-actions">
        <button class="action-btn" data-client-detail="${client.name}">Detalhar</button>
        <button class="action-btn" data-edit-client="${client.name}">Editar</button>
        <button class="primary-btn" data-client-order="${client.name}">Criar pedido</button>
        <button class="danger-btn" data-delete-client="${client.name}">Remover</button>
      </div>
    </article>
  `).join("") || `<div class="panel">Nenhum cliente encontrado.</div>`;
  animateChildren("#clients-grid");
}

function renderProducts() {
  const query = normalize(state.search);
  const products = state.products
    .map((product, index) => ({ ...product, index }))
    .filter((product) => normalize(`${product.name} ${product.category} ${product.material} ${product.matrix}`).includes(query));

  document.querySelector("#products-grid").innerHTML = products.map((product) => `
    <article class="product-card modern-card">
      <header>
        <div>
          <h3>${product.name}</h3>
          <p>${product.category}</p>
        </div>
        <span class="pill expedicao">${currency.format(product.price)} / peça</span>
      </header>
      <p class="card-description">${product.notes || "Produto cadastrado para uso rápido nos pedidos."}</p>
      <div class="product-meta">
        <span><small>Material</small><strong>${product.material}</strong></span>
        <span><small>Matriz</small><strong>${product.matrix}</strong></span>
        <span><small>Prazo</small><strong>${product.lead} dias</strong></span>
      </div>
      <div class="card-actions">
        <button class="action-btn" data-edit-product="${product.index}">Editar</button>
        <button class="primary-btn" data-product-order="${product.name}">Criar pedido</button>
        <button class="danger-btn" data-delete-product="${product.index}">Remover</button>
      </div>
    </article>
  `).join("") || `<div class="panel">Nenhum produto encontrado.</div>`;
  animateChildren("#products-grid");
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
  const finance = financeStats();
  const accounts = sortAccounts(filteredAccounts());
  const allOpen = state.stock.map((item, index) => ({ ...item, index, category: accountCategory(item) })).filter((item) => item.unit === "Aberto");
  const selectedOpen = accounts.filter((item) => item.unit === "Aberto");
  const selectedPaid = accounts.filter((item) => ["Pago", "Recebido"].includes(item.unit));
  const overdue = selectedOpen.filter((item) => accountMatchesFinanceDate({ ...item, min: item.min }) && parseLocalDate(item.min) < new Date(new Date().setHours(0, 0, 0, 0)));

  let overview;
  if (state.financeFilter === "todos") {
    overview = [
      ["A receber", finance.receivable, "Entradas abertas"],
      ["A pagar", finance.payable, "Saídas abertas"],
      ["Saldo previsto", finance.balance, finance.balance >= 0 ? "Positivo" : "Atenção"],
      ["Vencidas", finance.overdue, "conta(s) em atraso"]
    ];
  } else if (state.financeFilter === "receber") {
    overview = [
      ["A receber aberto", sumAccounts(selectedOpen), "Entradas filtradas"],
      ["Recebido", sumAccounts(selectedPaid), "Já baixado"],
      ["Próximo recebimento", nextAccountDate(selectedOpen), "vencimento"],
      ["Títulos", accounts.length, "registro(s)"]
    ];
  } else {
    const label = financeCategories[state.financeFilter];
    const allCategoryOpen = allOpen.filter((item) => item.category === state.financeFilter);
    overview = [
      [label, sumAccounts(selectedOpen), "em aberto"],
      ["Pago", sumAccounts(selectedPaid), "já baixado"],
      ["Próximo vencimento", nextAccountDate(selectedOpen), "data"],
      ["Vencidas", overdue.length, "conta(s)"]
    ];
    if (!selectedOpen.length && allCategoryOpen.length) {
      overview[0] = [label, sumAccounts(allCategoryOpen), "aberto fora do filtro"];
    }
  }

  document.querySelector("#finance-overview").innerHTML = overview.map(([label, value, detail]) => `
    <article>
      <span>${label}</span>
      <strong>${typeof value === "number" && label !== "Títulos" && label !== "Vencidas" ? currency.format(value) : value}</strong>
      <small>${detail}</small>
    </article>
  `).join("");
  animateChildren("#finance-overview");

  document.querySelector("#stock-grid").innerHTML = accounts.map((item) => {
    const isPayable = item.type === "Pagar";
    const isOpen = item.unit === "Aberto";
    return `
      <article class="stock-card modern-card ${isPayable ? "critical" : ""}">
        <header>
          <div>
            <h3>${item.item}</h3>
            <p>${item.type}</p>
          </div>
          <span class="pill ${isOpen ? "producao" : "expedicao"}">${item.unit}</span>
        </header>
        <span class="finance-category">${financeCategories[item.category] || item.type}</span>
        <div class="stock-values">
          <span><small>Valor</small><strong>${currency.format(item.current)}</strong></span>
          <span><small>Vencimento</small><strong>${formatDate(item.min)}</strong></span>
        </div>
        <p>${item.arrival}</p>
        <div class="card-actions">
          <button class="action-btn" data-edit-stock="${item.index}">Editar</button>
          <button class="action-btn" data-stock-restock="${item.index}">${isPayable ? "Marcar pago" : "Marcar recebido"}</button>
          <button class="danger-btn" data-delete-stock="${item.index}">Remover</button>
        </div>
      </article>
    `;
  }).join("") || `<div class="panel">Nenhuma conta encontrada.</div>`;
  animateChildren("#stock-grid");
}

function renderExpedition() {
  const ready = state.orders.filter((order) => ["Expedição", "Finalizado"].includes(order.status));
  document.querySelector("#expedition-list").innerHTML = ready.map((order) => `
    <article class="expedition-card">
      <div>
        <div class="expedition-headline">
          <span class="pill ${statusClass(order.status)}">${expeditionStatus(order)}</span>
          <h3>${order.id} · ${order.client}</h3>
        </div>
        <p>${order.product} · ${order.quantity.toLocaleString("pt-BR")} peças · entrega ${formatDate(order.date)}</p>
        <div class="expedition-meta">
          <span><small>Entrega</small>${order.shippingType || "Retirada no balcão"}</span>
          <span><small>Volumes</small>${order.volumes || 1}</span>
          <span><small>Responsável</small>${order.shippingResponsible || "A definir"}</span>
        </div>
      </div>
      <div class="card-actions">
        <button class="action-btn" data-shipping-step="${order.id}">Avançar entrega</button>
        <button class="action-btn" data-romaneio="${order.id}">Conferir romaneio</button>
        <button class="primary-btn" data-finish="${order.id}">Finalizar</button>
      </div>
    </article>
  `).join("") || `<div class="panel">Nenhum pedido em expedição.</div>`;
  animateChildren("#expedition-list");
}

function expeditionStatus(order) {
  if (order.status === "Finalizado") return "Entregue";
  return order.shippingStatus || "Aguardando separação";
}

function renderReports() {
  const finance = financeStats();
  const totalRevenue = state.orders.reduce((sum, order) => sum + order.revenue, 0);
  const openOrders = state.orders.filter((order) => order.status !== "Finalizado").length;
  const completedOrders = state.orders.filter((order) => order.status === "Finalizado").length;
  const inProduction = state.orders.filter((order) => order.status === "Produção").length;
  const completion = state.orders.length ? Math.round((completedOrders / state.orders.length) * 100) : 0;

  document.querySelector("#report-score").textContent = `${completion}%`;
  document.querySelector("#report-kpis").innerHTML = [
    ["A receber", currency.format(finance.receivable), "Entradas em aberto"],
    ["A pagar", currency.format(finance.payable), "Saídas em aberto"],
    ["Saldo previsto", currency.format(finance.balance), finance.balance >= 0 ? "Operação positiva" : "Revisar pagamentos"],
    ["Pedidos ativos", openOrders, `${inProduction} em produção`]
  ].map(([label, value, detail], index) => `
    <article class="report-kpi ${index === 2 ? "highlight" : ""}">
      <span>${label}</span>
      <strong>${value}</strong>
      <small>${detail}</small>
    </article>
  `).join("");
  animateChildren("#report-kpis");

  const months = [
    { label: "Abr", value: 18400 },
    { label: "Mai", value: 24600 },
    { label: "Jun", value: totalRevenue },
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

  const financeMax = Math.max(finance.receivable, finance.payable, 1);
  document.querySelector("#finance-bars").innerHTML = [
    ["Receber", finance.receivable, "receivable"],
    ["Pagar", finance.payable, "payable"]
  ].map(([label, value, type]) => `
    <div class="finance-row ${type}">
      <div>
        <span>${label}</span>
        <strong>${currency.format(value)}</strong>
      </div>
      <div class="bar-track"><span style="width:${Math.round((value / financeMax) * 100)}%"></span></div>
    </div>
  `).join("");
  animateChildren("#finance-bars");

  const totalPieces = state.orders.reduce((sum, order) => sum + order.quantity, 0);
  document.querySelector("#pieces-donut span").textContent = totalPieces.toLocaleString("pt-BR");
  document.querySelector("#pieces-legend").innerHTML = [
    ["Produção", "62%"],
    ["Expedição", "20%"],
    ["Novos pedidos", "18%"]
  ].map(([label, value]) => `<div class="legend-item"><span>${label}</span><strong>${value}</strong></div>`).join("");
  animateChildren("#pieces-legend");

  document.querySelector("#report-accounts").innerHTML = finance.open.map((item) => `
    <div class="report-row">
      <span class="report-status ${item.type === "Receber" ? "positive" : "negative"}">${item.type}</span>
      <strong>${item.item}</strong>
      <span>${formatDate(item.min)}</span>
      <b>${currency.format(item.current)}</b>
    </div>
  `).join("") || `<div class="summary-item"><span>Nenhuma conta aberta</span><strong>Em dia</strong></div>`;
  animateChildren("#report-accounts");

  document.querySelector("#executive-summary").innerHTML = [
    ["Pedidos registrados", state.orders.length],
    ["Clientes cadastrados", state.clients.length],
    ["Contas abertas", finance.open.length],
    ["Saldo previsto", currency.format(finance.balance)]
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
  renderProducts();
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

function populateClientOptions() {
  const list = document.querySelector("#client-options");
  if (!list) return;
  list.innerHTML = state.clients.map((client) => `
    <option value="${client.name}">${client.doc} · ${client.phone}</option>
  `).join("");
}

function renderClientPicker() {
  const panel = document.querySelector("#client-picker-panel");
  if (!panel) return;
  const query = normalize(document.querySelector("#form-client").value);
  const clients = state.clients.filter((client) => normalize(`${client.name} ${client.doc} ${client.phone} ${client.email}`).includes(query));
  panel.innerHTML = `
    <div class="client-picker-head">
      <strong>Clientes cadastrados</strong>
      <span>${clients.length} encontrado(s)</span>
    </div>
    <div class="client-picker-list">
      ${clients.map((client) => `
        <button class="client-picker-option" type="button" data-select-client="${client.name}">
          <strong>${client.name}</strong>
          <span>${client.doc} · ${client.phone}</span>
        </button>
      `).join("") || `<p>Nenhum cliente encontrado. Você ainda pode digitar manualmente.</p>`}
    </div>
  `;
}

function toggleClientPicker(forceOpen = null) {
  const panel = document.querySelector("#client-picker-panel");
  if (!panel) return;
  const shouldOpen = forceOpen === null ? panel.hidden : forceOpen;
  panel.hidden = !shouldOpen;
  if (shouldOpen) renderClientPicker();
}

function populateProductOptions() {
  const list = document.querySelector("#product-options");
  if (!list) return;
  list.innerHTML = state.products.map((product) => `
    <option value="${product.name}">${product.category} · ${currency.format(product.price)} / peça</option>
  `).join("");
}

function digitsOnly(value) {
  return String(value).replace(/\D/g, "");
}

function formatPhone(value) {
  const digits = digitsOnly(value).slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function formatCnpj(value) {
  const digits = digitsOnly(value).slice(0, 14);
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
}

function formatCpf(value) {
  const digits = digitsOnly(value).slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

function formatDocument(value, type = document.querySelector("#client-doc-type")?.value || "CNPJ") {
  return type === "CPF" ? formatCpf(value) : formatCnpj(value);
}

function detectDocumentType(value) {
  const digits = digitsOnly(value);
  return digits.length <= 11 ? "CPF" : "CNPJ";
}

function currentStateCities() {
  const uf = document.querySelector("#client-state")?.value || "SP";
  return state.cityCache[uf] || citiesByState[uf] || [];
}

function cityListForState(uf) {
  return state.cityCache[uf] || citiesByState[uf] || [];
}

function updateCityDatalist(uf) {
  const cityList = document.querySelector("#city-options");
  if (!cityList) return;
  cityList.innerHTML = cityListForState(uf).map((city) => `<option value="${city}"></option>`).join("");
}

async function loadCitiesForState(uf) {
  if (state.cityCache[uf]) return state.cityCache[uf];
  try {
    const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
    if (!response.ok) throw new Error("IBGE indisponível");
    const cities = (await response.json())
      .map((city) => city.nome)
      .sort((a, b) => a.localeCompare(b, "pt-BR"));
    if (cities.length) {
      state.cityCache[uf] = cities;
      updateCityDatalist(uf);
      const panel = document.querySelector("#city-picker-panel");
      if (panel && !panel.hidden) renderCityPicker();
      return cities;
    }
  } catch {
    state.cityCache[uf] = citiesByState[uf] || [];
  }
  updateCityDatalist(uf);
  return state.cityCache[uf];
}

function populateStateAndCityOptions(selectedState = "SP", selectedCity = "") {
  const stateSelect = document.querySelector("#client-state");
  if (stateSelect) {
    stateSelect.innerHTML = brazilStates.map(([uf, name]) => `
      <option value="${uf}" ${uf === selectedState ? "selected" : ""}>${uf} - ${name}</option>
    `).join("");
  }
  updateCityDatalist(selectedState);
  document.querySelector("#client-city").value = selectedCity || "";
  loadCitiesForState(selectedState);
}

function renderCityPicker() {
  const panel = document.querySelector("#city-picker-panel");
  if (!panel) return;
  const query = normalize(document.querySelector("#client-city").value);
  const cities = currentStateCities().filter((city) => normalize(city).includes(query));
  panel.innerHTML = `
    <div class="client-picker-head">
      <strong>Cidades do estado selecionado</strong>
      <span>${cities.length} encontrada(s)</span>
    </div>
    <div class="client-picker-list">
      ${cities.map((city) => `
        <button class="client-picker-option" type="button" data-select-city="${city}">
          <strong>${city}</strong>
          <span>${document.querySelector("#client-state").value}</span>
        </button>
      `).join("") || `<p>Nenhuma cidade encontrada. Você ainda pode digitar manualmente.</p>`}
    </div>
  `;
}

function toggleCityPicker(forceOpen = null) {
  const panel = document.querySelector("#city-picker-panel");
  if (!panel) return;
  const shouldOpen = forceOpen === null ? panel.hidden : forceOpen;
  panel.hidden = !shouldOpen;
  if (shouldOpen) renderCityPicker();
}

function renderProductPicker() {
  const panel = document.querySelector("#product-picker-panel");
  if (!panel) return;
  const query = normalize(document.querySelector("#form-product").value);
  const products = state.products.filter((product) => normalize(`${product.name} ${product.category} ${product.material} ${product.matrix}`).includes(query));
  panel.innerHTML = `
    <div class="client-picker-head">
      <strong>Produtos cadastrados</strong>
      <span>${products.length} encontrado(s)</span>
    </div>
    <div class="client-picker-list">
      ${products.map((product) => `
        <button class="client-picker-option" type="button" data-select-product="${product.name}">
          <strong>${product.name}</strong>
          <span>${product.category} · ${currency.format(product.price)} / peça · ${product.material}</span>
        </button>
      `).join("") || `<p>Nenhum produto encontrado. Você ainda pode digitar manualmente.</p>`}
    </div>
  `;
}

function toggleProductPicker(forceOpen = null) {
  const panel = document.querySelector("#product-picker-panel");
  if (!panel) return;
  const shouldOpen = forceOpen === null ? panel.hidden : forceOpen;
  panel.hidden = !shouldOpen;
  if (shouldOpen) renderProductPicker();
}

function openOrderModal(clientName = "", orderId = "") {
  const order = orderId ? state.orders.find((item) => item.id === orderId) : null;
  populateClientOptions();
  populateProductOptions();
  toggleClientPicker(false);
  toggleProductPicker(false);
  document.querySelector("#order-modal-title").textContent = order ? `Editar ${order.id}` : "Novo pedido";
  document.querySelector("#save-order-btn").textContent = order ? "Salvar alterações" : "Salvar pedido";
  document.querySelector("#form-order-id").value = order ? order.id : "";
  document.querySelector("#form-client").value = order ? order.client : clientName;
  document.querySelector("#form-product").value = order ? order.product : "";
  document.querySelector("#form-quantity").value = order ? order.quantity : 500;
  document.querySelector("#form-date").value = order ? order.date : "";
  if (!order) document.querySelector("#form-date").valueAsDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  document.querySelector("#form-notes").value = order ? order.notes : "";
  document.querySelector("#order-modal").showModal();
}

function openOrderForProduct(productName) {
  openOrderModal();
  document.querySelector("#form-product").value = productName;
  const product = productByName(productName);
  if (product) {
    const date = new Date(Date.now() + product.lead * 24 * 60 * 60 * 1000);
    document.querySelector("#form-date").valueAsDate = date;
    document.querySelector("#form-notes").value = product.notes || "";
  }
}

function closeOrderModal() {
  document.querySelector("#order-modal").close();
}

function openClientModal(clientName = "") {
  const client = clientName ? state.clients.find((item) => item.name === clientName) : null;
  populateStateAndCityOptions(client ? client.state || "SP" : "SP", client ? client.city || "" : "");
  toggleCityPicker(false);
  const docType = client ? client.docType || detectDocumentType(client.doc) : "CNPJ";
  document.querySelector("#client-modal-title").textContent = client ? "Editar cliente" : "Novo cliente";
  document.querySelector("#client-original-name").value = client ? client.name : "";
  document.querySelector("#client-name").value = client ? client.name : "";
  document.querySelector("#client-doc-type").value = docType;
  document.querySelector("#client-doc").value = client && client.doc !== "Cadastro pendente" ? client.doc : "";
  document.querySelector("#client-phone").value = client ? client.phone : "";
  document.querySelector("#client-email").value = client && client.email !== "E-mail pendente" ? client.email : "";
  document.querySelector("#client-modal").showModal();
}

function closeClientModal() {
  document.querySelector("#client-modal").close();
}

function openProductModal(index = "") {
  const editing = index !== "";
  const product = editing ? state.products[Number(index)] : null;
  document.querySelector("#product-modal-title").textContent = editing ? "Editar produto" : "Novo produto";
  document.querySelector("#product-index").value = editing ? String(index) : "";
  document.querySelector("#product-name").value = product ? product.name : "";
  document.querySelector("#product-category").value = product ? product.category : "Chaveiros";
  document.querySelector("#product-price").value = product ? product.price : "";
  document.querySelector("#product-lead").value = product ? product.lead : 7;
  document.querySelector("#product-material").value = product ? product.material : "";
  document.querySelector("#product-matrix").value = product ? product.matrix : "";
  document.querySelector("#product-notes").value = product ? product.notes : "";
  document.querySelector("#product-modal").showModal();
}

function closeProductModal() {
  document.querySelector("#product-modal").close();
}

function openStockModal(index = "") {
  const editing = index !== "";
  const item = editing ? state.stock[Number(index)] : null;
  document.querySelector("#stock-modal-title").textContent = editing ? "Editar conta" : "Nova conta";
  document.querySelector("#stock-index").value = editing ? String(index) : "";
  document.querySelector("#stock-item").value = item ? item.item : "";
  document.querySelector("#stock-type").value = item ? item.type : state.financeFilter === "receber" ? "Receber" : "Pagar";
  document.querySelector("#stock-category").value = item ? accountCategory(item) : state.financeFilter === "todos" ? "fornecedores" : state.financeFilter;
  document.querySelector("#stock-current").value = item ? item.current : "";
  document.querySelector("#stock-min").value = item ? item.min : "";
  document.querySelector("#stock-unit").value = item ? item.unit : "Aberto";
  document.querySelector("#stock-arrival").value = item ? item.arrival : "";
  document.querySelector("#stock-modal").showModal();
}

function closeStockModal() {
  document.querySelector("#stock-modal").close();
}

function saveOrder(event) {
  event.preventDefault();
  const editingId = document.querySelector("#form-order-id").value;
  const client = document.querySelector("#form-client").value.trim();
  const product = document.querySelector("#form-product").value.trim();
  const quantity = Number(document.querySelector("#form-quantity").value);
  const date = document.querySelector("#form-date").value;
  const notes = document.querySelector("#form-notes").value.trim();
  const productInfo = productByName(product);
  const unitPrice = productInfo ? productInfo.price : 5.7;

  if (!client || !product || !quantity || !date) {
    showToast("Preencha os dados obrigatórios do pedido.");
    return;
  }

  if (editingId) {
    const order = state.orders.find((item) => item.id === editingId);
    if (!order) return;
    Object.assign(order, {
      client,
      product,
      quantity,
      date,
      revenue: quantity * unitPrice,
      matrix: productInfo ? productInfo.matrix : order.matrix,
      material: productInfo ? productInfo.material : order.material,
      notes: notes || "Pedido atualizado durante a apresentação."
    });
    document.querySelector("#order-modal").close();
    render();
    showToast(`${editingId} atualizado.`);
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
    matrix: productInfo ? productInfo.matrix : "A definir",
    material: productInfo ? productInfo.material : "A validar",
    revenue: quantity * unitPrice,
    notes: notes || (productInfo ? productInfo.notes : "Pedido criado durante a apresentação.")
  });

  if (!state.clients.some((item) => item.name === client)) {
    state.clients.unshift({
      name: client,
      doc: "Cadastro pendente",
      docType: "CNPJ",
      phone: "Contato pendente",
      email: "E-mail pendente",
      state: "SP",
      city: "Não informada",
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

function saveClient(event) {
  event.preventDefault();
  const originalName = document.querySelector("#client-original-name").value;
  const name = document.querySelector("#client-name").value.trim();
  const docType = document.querySelector("#client-doc-type").value;
  const doc = document.querySelector("#client-doc").value.trim();
  const phone = document.querySelector("#client-phone").value.trim();
  const email = document.querySelector("#client-email").value.trim();
  const stateUf = document.querySelector("#client-state").value;
  const city = document.querySelector("#client-city").value.trim();

  if (!name || !phone) {
    showToast("Informe pelo menos nome da empresa e telefone.");
    return;
  }

  const duplicated = state.clients.some((client) => client.name === name && client.name !== originalName);
  if (duplicated) {
    showToast("Já existe um cliente com esse nome.");
    return;
  }

  if (originalName) {
    const client = state.clients.find((item) => item.name === originalName);
    if (!client) return;
    Object.assign(client, {
      name,
      docType,
      doc: doc || "Não informado",
      phone,
      email: email || "Não informado",
      state: stateUf,
      city: city || "Não informada"
    });
    if (name !== originalName) {
      state.orders.forEach((order) => {
        if (order.client === originalName) order.client = name;
      });
    }
    showToast(`${name} atualizado.`);
  } else {
    state.clients.unshift({
      name,
      docType,
      doc: doc || "Não informado",
      phone,
      email: email || "Não informado",
      state: stateUf,
      city: city || "Não informada",
      orders: 0
    });
    showToast(`${name} cadastrado.`);
  }

  closeClientModal();
  populateClientOptions();
  render();
}

function saveProduct(event) {
  event.preventDefault();
  const index = document.querySelector("#product-index").value;
  const name = document.querySelector("#product-name").value.trim();
  const category = document.querySelector("#product-category").value;
  const price = Number(document.querySelector("#product-price").value);
  const lead = Number(document.querySelector("#product-lead").value);
  const material = document.querySelector("#product-material").value.trim();
  const matrix = document.querySelector("#product-matrix").value.trim();
  const notes = document.querySelector("#product-notes").value.trim();

  if (!name || !category || Number.isNaN(price) || !lead || !material || !matrix) {
    showToast("Preencha os dados obrigatórios do produto.");
    return;
  }

  const payload = {
    name,
    category,
    price,
    lead,
    material,
    matrix,
    notes: notes || "Produto cadastrado para pedidos recorrentes."
  };

  if (index === "") {
    state.products.unshift(payload);
    showToast(`${name} cadastrado.`);
  } else {
    state.products[Number(index)] = payload;
    showToast(`${name} atualizado.`);
  }

  closeProductModal();
  render();
}

function deleteProduct(index) {
  const product = state.products[Number(index)];
  if (!product) return;
  const used = state.orders.some((order) => order.product === product.name);
  const message = used
    ? `${product.name} já aparece em pedidos. Remover mesmo assim do cadastro?`
    : `Remover ${product.name} do cadastro?`;
  const ok = window.confirm(message);
  if (!ok) return;
  state.products.splice(Number(index), 1);
  render();
  showToast(`${product.name} removido.`);
}

function saveStock(event) {
  event.preventDefault();
  const index = document.querySelector("#stock-index").value;
  const item = document.querySelector("#stock-item").value.trim();
  const rawType = document.querySelector("#stock-type").value.trim();
  const category = document.querySelector("#stock-category").value;
  const current = Number(document.querySelector("#stock-current").value);
  const min = document.querySelector("#stock-min").value;
  const unit = document.querySelector("#stock-unit").value.trim();
  const arrival = document.querySelector("#stock-arrival").value.trim();

  if (!item || !rawType || Number.isNaN(current) || !min || !unit || !arrival) {
    showToast("Preencha os dados da conta.");
    return;
  }

  const type = normalize(rawType).includes("receb") ? "Receber" : "Pagar";
  const payload = { item, type, category, current, min, unit, arrival };
  if (index === "") {
    state.stock.unshift(payload);
    showToast(`${item} adicionado ao financeiro.`);
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
  item.unit = item.type === "Pagar" ? "Pago" : "Recebido";
  render();
  showToast(`${item.item} atualizado.`);
}

function deleteStock(index) {
  const item = state.stock[Number(index)];
  if (!item) return;

  const ok = window.confirm(`Remover ${item.item} do financeiro?`);
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
  order.shippingStatus = "Entregue";
  render();
  showToast(`${order.id} finalizado na expedição.`);
}

function advanceShipping(id) {
  const order = state.orders.find((item) => item.id === id);
  if (!order) return;
  const flow = ["Aguardando separação", "Separado", "Enviado", "Entregue"];
  const current = flow.indexOf(order.shippingStatus || flow[0]);
  const next = flow[Math.min(current + 1, flow.length - 1)];
  order.shippingStatus = next;
  order.shippingType ||= "Retirada no balcão";
  order.volumes ||= Math.max(1, Math.ceil(order.quantity / 500));
  order.shippingResponsible ||= "Equipe de expedição";
  if (next === "Entregue") {
    order.status = "Finalizado";
    order.stage = "Finalizado";
  }
  render();
  showToast(`${order.id}: entrega marcada como ${next}.`);
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

function romaneioChecklist(currentStage) {
  const checks = [
    ["Pedido conferido", "Conferência administrativa"],
    ["Produção liberada", "Material e matriz preparados"],
    ["Revisão de qualidade", "Peças revisadas antes da embalagem"],
    ["Embalagem final", "Quantidade e identificação conferidas"],
    ["Expedição autorizada", "Pronto para entrega/retirada"]
  ];
  const currentIndex = productionStages.indexOf(currentStage);

  return checks.map(([title, detail], index) => `
    <div class="romaneio-check ${index <= currentIndex ? "done" : ""}">
      <span>${index <= currentIndex ? "✓" : ""}</span>
      <div>
        <strong>${title}</strong>
        <small>${detail}</small>
      </div>
    </div>
  `).join("");
}

function printCleanRomaneio() {
  const sheet = document.querySelector(".print-document");
  if (!sheet) {
    window.print();
    return;
  }

  const orderId = sheet.querySelector(".romaneio-head strong")?.textContent || "Romaneio";
  const styles = [...document.querySelectorAll('link[rel="stylesheet"]')]
    .map((link) => `<link rel="stylesheet" href="${link.href}">`)
    .join("");
  const printWindow = window.open("", "_blank", "width=900,height=1200");

  if (!printWindow) {
    window.print();
    return;
  }

  printWindow.document.write(`
    <!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <title>Romaneio ${orderId}</title>
        ${styles}
        <style>
          @page { size: A4; margin: 12mm; }
          html, body { margin: 0; background: #fff !important; color: #101820 !important; }
          body { padding: 0; }
          .print-document { margin: 0; padding: 0; border: 0; box-shadow: none; background: #fff !important; color: #101820 !important; }
          .romaneio-sheet { font-size: 11px; }
          .romaneio-head { padding-bottom: 8px; margin-bottom: 10px; }
          .romaneio-head h2 { font-size: 20px; }
          .romaneio-head p,
          .romaneio-order-hero,
          .romaneio-section,
          .romaneio-footer,
          .no-print { display: none !important; }
          .romaneio-print-compact { display: grid !important; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 10px; }
          .compact-row { display: block !important; min-height: 44px; padding: 8px; border: 1px solid #c7d0d6; border-radius: 4px; }
          .compact-row.full { grid-column: 1 / -1; }
          .compact-row span { display: block !important; margin-bottom: 3px; color: #53616a !important; font-size: 9px; font-weight: 800; text-transform: uppercase; }
          .compact-row strong { display: block !important; font-size: 12px; color: #101820 !important; }
          .romaneio-signatures { display: grid !important; grid-template-columns: repeat(3, 1fr) !important; gap: 14px; margin-top: 34px; }
          .romaneio-signatures div { min-height: 44px; font-size: 10px; border-color: #c7d0d6 !important; color: #53616a !important; }
          * { box-shadow: none !important; }
        </style>
      </head>
      <body>${sheet.outerHTML}</body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  window.setTimeout(() => printWindow.print(), 350);
}

function openDetails(id, romaneio = false) {
  const order = state.orders.find((item) => item.id === id);
  if (!order) return;
  const client = state.clients.find((item) => item.name === order.client);
  const printedAt = new Date().toLocaleDateString("pt-BR");

  document.querySelector("#details-content").innerHTML = romaneio ? `
    <div class="modal-actions no-print">
      <button class="ghost-btn" data-detail="${order.id}">Ver detalhes</button>
      <button class="primary-btn" data-print-romaneio="true">Imprimir</button>
    </div>
    <div class="romaneio-sheet print-document">
      <div class="romaneio-head">
        <div>
          <span class="romaneio-brand">Yubor Flow</span>
          <h2>Romaneio do pedido</h2>
          <p>${order.product} para ${order.client}</p>
        </div>
        <div>
          <span>Pedido</span>
          <strong>${order.id}</strong>
          <p>Emitido em ${printedAt}</p>
        </div>
      </div>

      <div class="romaneio-print-compact">
        <div class="compact-row">
          <span>Pedido</span>
          <strong>${order.id}</strong>
        </div>
        <div class="compact-row">
          <span>Data de entrega</span>
          <strong>${formatDate(order.date)}</strong>
        </div>
        <div class="compact-row">
          <span>Cliente</span>
          <strong>${order.client}</strong>
        </div>
        <div class="compact-row">
          <span>Documento</span>
          <strong>${client ? client.doc : "Não informado"}</strong>
        </div>
        <div class="compact-row">
          <span>Telefone</span>
          <strong>${client ? client.phone : "Não informado"}</strong>
        </div>
        <div class="compact-row">
          <span>E-mail</span>
          <strong>${client ? client.email : "Não informado"}</strong>
        </div>
        <div class="compact-row full">
          <span>Produto</span>
          <strong>${order.product}</strong>
        </div>
        <div class="compact-row">
          <span>Quantidade</span>
          <strong>${order.quantity.toLocaleString("pt-BR")} peças</strong>
        </div>
        <div class="compact-row">
          <span>Tinta / material</span>
          <strong>${order.material}</strong>
        </div>
      </div>

      <div class="romaneio-order-hero">
        <div>
          <span class="pill ${statusClass(order.status)}">${order.status}</span>
          <h3>${order.product}</h3>
          <p>${order.quantity.toLocaleString("pt-BR")} peças com entrega em ${formatDate(order.date)}.</p>
        </div>
        <div>
          <span>Valor previsto</span>
          <strong>${currency.format(order.revenue)}</strong>
        </div>
      </div>

      <div class="romaneio-section">
        <h3>Detalhes do pedido</h3>
        <div class="romaneio-grid">
          <div class="romaneio-field"><span>Pedido</span><strong>${order.id}</strong></div>
          <div class="romaneio-field"><span>Status</span><strong>${order.status}</strong></div>
          <div class="romaneio-field"><span>Etapa atual</span><strong>${order.stage}</strong></div>
          <div class="romaneio-field"><span>Entrega prevista</span><strong>${formatDate(order.date)}</strong></div>
        </div>
      </div>

      <div class="romaneio-section">
        <h3>Dados do cliente</h3>
        <div class="romaneio-grid">
          <div class="romaneio-field"><span>Cliente</span><strong>${order.client}</strong></div>
          <div class="romaneio-field"><span>Documento</span><strong>${client ? client.doc : "Não informado"}</strong></div>
          <div class="romaneio-field"><span>Telefone</span><strong>${client ? client.phone : "Não informado"}</strong></div>
          <div class="romaneio-field"><span>E-mail</span><strong>${client ? client.email : "Não informado"}</strong></div>
        </div>
      </div>

      <div class="romaneio-section">
        <h3>Produção e materiais</h3>
        <table class="romaneio-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Material</th>
              <th>Matriz</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${order.product}</td>
              <td>${order.material}</td>
              <td>${order.matrix}</td>
              <td>${order.quantity.toLocaleString("pt-BR")} peças</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="romaneio-section">
        <h3>Timeline do pedido</h3>
        <div class="romaneio-flow">${orderTimeline(order)}</div>
      </div>

      <div class="romaneio-section">
        <h3>Checklist</h3>
        <div class="romaneio-checklist">${romaneioChecklist(order.stage)}</div>
      </div>

      <div class="romaneio-section">
        <h3>Observações</h3>
        <div class="romaneio-note">${order.notes}</div>
      </div>

      <div class="romaneio-signatures">
        <div><span>Responsável interno</span></div>
        <div><span>Conferência expedição</span></div>
        <div><span>Recebido por / data</span></div>
      </div>

      <div class="romaneio-footer">
        <span>Yubor Flow · Sistema Integrado de Gestão</span>
        <span>${order.id}</span>
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
      <p>${client.phone} · ${client.email} · ${client.city || "Cidade não informada"} - ${client.state || "UF"}</p>
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

document.querySelectorAll(".mobile-tab").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

document.querySelectorAll("[data-view-target]").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("settings-icon-btn")) {
      button.classList.remove("is-spinning");
      void button.offsetWidth;
      button.classList.add("is-spinning");
      window.setTimeout(() => button.classList.remove("is-spinning"), 620);
    }
    setView(button.dataset.viewTarget);
  });
});

document.querySelector("#global-search").addEventListener("input", (event) => {
  state.search = event.target.value;
  render();
});

document.querySelector("#order-date-filter").addEventListener("change", (event) => {
  state.dateFilter = event.target.value;
  if (state.dateFilter !== "personalizado") {
    state.dateStart = "";
    state.dateEnd = "";
    document.querySelector("#order-date-start").value = "";
    document.querySelector("#order-date-end").value = "";
  }
  renderOrders();
});

document.querySelector("#order-date-start").addEventListener("change", (event) => {
  state.dateStart = event.target.value;
  state.dateFilter = "personalizado";
  document.querySelector("#order-date-filter").value = "personalizado";
  renderOrders();
});

document.querySelector("#order-date-end").addEventListener("change", (event) => {
  state.dateEnd = event.target.value;
  state.dateFilter = "personalizado";
  document.querySelector("#order-date-filter").value = "personalizado";
  renderOrders();
});

document.querySelector("#clear-date-filter").addEventListener("click", () => {
  state.dateFilter = "todos";
  state.dateStart = "";
  state.dateEnd = "";
  document.querySelector("#order-date-filter").value = "todos";
  document.querySelector("#order-date-start").value = "";
  document.querySelector("#order-date-end").value = "";
  renderOrders();
});

const sidebarToggle = document.querySelector("#sidebar-toggle");
if (sidebarToggle) {
  sidebarToggle.addEventListener("click", () => {
    if (window.innerWidth <= 1100) return;
    const shell = document.querySelector(".app-shell");
    const collapsed = shell.classList.toggle("sidebar-collapsed");
    sidebarToggle.setAttribute("aria-label", collapsed ? "Expandir menu" : "Recolher menu");
    sidebarToggle.setAttribute("title", collapsed ? "Expandir menu" : "Recolher menu");
  });
}

document.querySelector("#new-order-btn").addEventListener("click", () => openOrderModal());
document.querySelector("#login-form").addEventListener("submit", handleLogin);
document.querySelector("#demo-login").addEventListener("click", fillDemoLogin);
document.querySelector("#toggle-password").addEventListener("click", togglePassword);
document.querySelector("#settings-logout-btn").addEventListener("click", logout);
document.querySelector("#reset-settings-btn").addEventListener("click", () => {
  state.settings = { ...defaultSettings };
  saveSettings();
  applySystemSettings();
  showToast("Configurações restauradas.");
});
document.querySelector("#order-form").addEventListener("submit", saveOrder);
document.querySelector("#cancel-order-btn").addEventListener("click", closeOrderModal);
document.querySelector("#cancel-order-x").addEventListener("click", closeOrderModal);
document.querySelector("#toggle-client-picker").addEventListener("click", () => toggleClientPicker());
document.querySelector("#form-client").addEventListener("input", () => {
  const panel = document.querySelector("#client-picker-panel");
  if (panel && !panel.hidden) renderClientPicker();
});
document.querySelector("#toggle-product-picker").addEventListener("click", () => toggleProductPicker());
document.querySelector("#form-product").addEventListener("input", () => {
  const panel = document.querySelector("#product-picker-panel");
  if (panel && !panel.hidden) renderProductPicker();
});
document.querySelector("#new-client-btn").addEventListener("click", () => openClientModal());
document.querySelector("#client-form").addEventListener("submit", saveClient);
document.querySelector("#client-phone").addEventListener("input", (event) => {
  event.target.value = formatPhone(event.target.value);
});
document.querySelector("#client-doc").addEventListener("input", (event) => {
  event.target.value = formatDocument(event.target.value);
});
document.querySelector("#client-doc-type").addEventListener("change", () => {
  const input = document.querySelector("#client-doc");
  input.value = formatDocument(input.value);
});
document.querySelector("#client-state").addEventListener("change", (event) => {
  populateStateAndCityOptions(event.target.value, "");
  loadCitiesForState(event.target.value).then(() => renderCityPicker());
});
document.querySelector("#client-city").addEventListener("input", () => {
  const panel = document.querySelector("#city-picker-panel");
  if (panel && !panel.hidden) renderCityPicker();
});
document.querySelector("#toggle-city-picker").addEventListener("click", () => toggleCityPicker());
document.querySelector("#cancel-client-btn").addEventListener("click", closeClientModal);
document.querySelector("#cancel-client-x").addEventListener("click", closeClientModal);
document.querySelector("#new-product-btn").addEventListener("click", () => openProductModal());
document.querySelector("#product-form").addEventListener("submit", saveProduct);
document.querySelector("#cancel-product-btn").addEventListener("click", closeProductModal);
document.querySelector("#cancel-product-x").addEventListener("click", closeProductModal);
document.querySelector("#new-stock-btn").addEventListener("click", () => openStockModal());
document.querySelector("#stock-form").addEventListener("submit", saveStock);
document.querySelector("#stock-category").addEventListener("change", (event) => {
  document.querySelector("#stock-type").value = event.target.value === "receber" ? "Receber" : "Pagar";
  document.querySelector("#stock-unit").value = event.target.value === "receber" ? "Aberto" : document.querySelector("#stock-unit").value;
});
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
  const selectClient = target.dataset.selectClient;
  const selectProduct = target.dataset.selectProduct;
  const selectCity = target.dataset.selectCity;
  const printRomaneio = target.dataset.printRomaneio;
  const viewTarget = target.dataset.viewTarget;
  const editOrderId = target.dataset.editOrder;
  const shippingStepId = target.dataset.shippingStep;
  const deleteOrderId = target.dataset.deleteOrder;
  const deleteClientName = target.dataset.deleteClient;
  const editClientName = target.dataset.editClient;
  const editProductIndex = target.dataset.editProduct;
  const deleteProductIndex = target.dataset.deleteProduct;
  const productOrder = target.dataset.productOrder;
  const editStockIndex = target.dataset.editStock;
  const deleteStockIndex = target.dataset.deleteStock;
  const stockAdjustIndex = target.dataset.stockAdjust;
  const stockDelta = target.dataset.stockDelta;
  const restockIndex = target.dataset.stockRestock;

  if (detailId) openDetails(detailId);
  if (editOrderId) openOrderModal("", editOrderId);
  if (romaneioId) openDetails(romaneioId, true);
  if (advanceId) advanceOrder(advanceId);
  if (finishId) finishOrder(finishId);
  if (shippingStepId) advanceShipping(shippingStepId);
  if (clientName) openOrderModal(clientName);
  if (selectClient) {
    document.querySelector("#form-client").value = selectClient;
    toggleClientPicker(false);
  }
  if (selectProduct) {
    const product = productByName(selectProduct);
    document.querySelector("#form-product").value = selectProduct;
    if (product && !document.querySelector("#form-notes").value.trim()) {
      document.querySelector("#form-notes").value = product.notes || "";
    }
    toggleProductPicker(false);
  }
  if (selectCity) {
    document.querySelector("#client-city").value = selectCity;
    toggleCityPicker(false);
  }
  if (clientDetail) openClientDetails(clientDetail);
  if (printRomaneio) printCleanRomaneio();
  if (deleteOrderId) deleteOrder(deleteOrderId);
  if (editClientName) openClientModal(editClientName);
  if (deleteClientName) deleteClient(deleteClientName);
  if (editProductIndex) openProductModal(editProductIndex);
  if (deleteProductIndex) deleteProduct(deleteProductIndex);
  if (productOrder) openOrderForProduct(productOrder);
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

document.querySelectorAll(".finance-tab").forEach((button) => {
  button.addEventListener("click", () => {
    state.financeFilter = button.dataset.financeFilter;
    document.querySelectorAll(".finance-tab").forEach((item) => item.classList.toggle("active", item === button));
    renderStock();
  });
});

document.querySelector("#finance-date-filter").addEventListener("change", (event) => {
  state.financeDateFilter = event.target.value;
  renderStock();
});

document.querySelector("#finance-sort").addEventListener("change", (event) => {
  state.financeSort = event.target.value;
  renderStock();
});

document.querySelectorAll("[data-theme-option]").forEach((button) => {
  button.addEventListener("click", () => updateSystemSetting("theme", button.dataset.themeOption));
});

document.querySelectorAll("[data-font-size-option]").forEach((button) => {
  button.addEventListener("click", () => updateSystemSetting("fontSize", button.dataset.fontSizeOption));
});

document.querySelectorAll("[data-font-family-option]").forEach((button) => {
  button.addEventListener("click", () => updateSystemSetting("fontFamily", button.dataset.fontFamilyOption));
});

applySystemSettings();
applyNavigationIcons();
populateClientOptions();
populateProductOptions();
updateTopbarActions();
render();
syncResponsiveSidebar();
updateFilterGlider();
updateQuickDock();
updateScrollProgress();
window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", () => {
  syncResponsiveSidebar();
  updateFilterGlider();
  updateQuickDock();
  updateScrollProgress();
});
