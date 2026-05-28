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
  financeDateStart: "",
  financeDateEnd: "",
  financeSort: "date",
  catalogMode: "produtos",
  cityCache: {},
  profile: loadProfile(),
  profilePhoto: loadProfilePhoto(),
  settings: loadSettings(),
  orders: [
    {
      id: "PED-2041",
      client: "Prime Shoes Industria",
      product: "Etiqueta resinada para calcado",
      quantity: 1800,
      date: "2026-06-04",
      status: "Produção",
      stage: "Forno",
      matrix: "MTX-ETQ-336",
      material: "Resina flexivel transparente",
      responsible: "Produção",
      priority: "Alta",
      history: ["Pedido registrado", "Arte aprovada", "Produção liberada", "Em forno"],
      revenue: 8640,
      notes: "Pedido de apresentação com acabamento resinado e conferência de embalagem."
    },
    {
      id: "PED-2042",
      client: "Studio Brindes Criativos",
      product: "Chaveiro emborrachado 3D",
      quantity: 950,
      date: "2026-06-06",
      status: "Novo",
      stage: "Administrativo",
      matrix: "MTX-CHV-204",
      material: "Tinta plastisol azul e branca",
      responsible: "Comercial",
      priority: "Normal",
      history: ["Pedido registrado", "Aguardando conferencia administrativa"],
      revenue: 5605,
      notes: "Validar arte final antes de liberar a matriz para produção."
    },
    {
      id: "PED-2043",
      client: "Rodeio Prime Store",
      product: "Patch emborrachado premium",
      quantity: 700,
      date: "2026-06-09",
      status: "Expedição",
      stage: "Revisão",
      matrix: "MTX-PCH-118",
      material: "Tinta plastisol preta e dourada",
      responsible: "Expedição",
      priority: "Conferencia",
      shippingStatus: "Separado",
      shippingType: "Transportadora",
      shippingResponsible: "Equipe de expedição",
      volumes: 2,
      history: ["Pedido registrado", "Produção concluída", "Separado para expedição"],
      revenue: 5040,
      notes: "Romaneio pronto para conferência final e coleta da transportadora."
    },
    {
      id: "PED-2044",
      client: "Urban Label Confeccoes",
      product: "Tag personalizada para moda",
      quantity: 1200,
      date: "2026-06-12",
      status: "Produção",
      stage: "Dosadora",
      matrix: "MTX-TAG-077",
      material: "Tinta plastisol vermelho fosco",
      responsible: "Dosadora",
      priority: "Alta",
      history: ["Pedido registrado", "Arte aprovada", "Dosadora iniciada"],
      revenue: 6480,
      notes: "Cliente pediu lote com visual fosco para coleção de inverno."
    },
    {
      id: "PED-2045",
      client: "Auto Center Avenida",
      product: "Logo tecnico em borracha",
      quantity: 600,
      date: "2026-06-14",
      status: "Finalizado",
      stage: "Finalizado",
      matrix: "MTX-LOG-421",
      material: "Borracha PVC preta",
      responsible: "Expedição",
      priority: "Normal",
      shippingStatus: "Entregue",
      shippingType: "Retirada no balcao",
      shippingResponsible: "Equipe de expedição",
      volumes: 2,
      history: ["Pedido registrado", "Produção concluída", "Finalizado na expedição"],
      revenue: 4140,
      notes: "Pedido entregue e liberado para cobrança final."
    }
  ],
  clients: [
    { name: "Prime Shoes Industria", docType: "CNPJ", doc: "48.219.730/0001-18", phone: "(16) 99142-5080", email: "compras@primeshoes.com.br", cep: "14403-000", address: "Avenida Brasil", number: "1580", district: "Distrito Industrial", state: "SP", city: "Franca", orders: 14 },
    { name: "Studio Brindes Criativos", docType: "CNPJ", doc: "31.840.552/0001-90", phone: "(16) 98124-1188", email: "atendimento@studiobrindes.com.br", cep: "14020-260", address: "Rua Joao Penteado", number: "420", district: "Jardim Sumare", state: "SP", city: "Ribeirao Preto", orders: 7 },
    { name: "Rodeio Prime Store", docType: "CNPJ", doc: "22.706.118/0001-44", phone: "(17) 99640-2201", email: "pedidos@rodeioprime.com.br", cep: "14780-000", address: "Avenida 43", number: "915", district: "Centro", state: "SP", city: "Barretos", orders: 5 },
    { name: "Urban Label Confeccoes", docType: "CNPJ", doc: "19.554.882/0001-67", phone: "(11) 98740-3320", email: "producao@urbanlabel.com.br", cep: "01001-000", address: "Praca da Se", number: "52", district: "Se", state: "SP", city: "Sao Paulo", orders: 9 },
    { name: "Auto Center Avenida", docType: "CNPJ", doc: "54.920.316/0001-09", phone: "(16) 3722-4180", email: "financeiro@autocenteravenida.com.br", cep: "14401-135", address: "Avenida Champagnat", number: "640", district: "Centro", state: "SP", city: "Franca", orders: 6 }
  ],
  products: [
    { name: "Chaveiro emborrachado 3D", category: "Chaveiros", price: 5.9, lead: 7, finish: "Alto relevo", minQuantity: 100, material: "Tinta plastisol azul e branca", matrix: "MTX-CHV-204", photo: "", notes: "Acabamento em alto relevo com embalagem individual." },
    { name: "Patch emborrachado premium", category: "Patches", price: 7.2, lead: 8, finish: "Emborrachado", minQuantity: 100, material: "Tinta plastisol preta e dourada", matrix: "MTX-PCH-118", photo: "", notes: "Ideal para bones, mochilas e pecas promocionais." },
    { name: "Etiqueta resinada para calcado", category: "Etiquetas", price: 4.8, lead: 6, finish: "Resinado", minQuantity: 200, material: "Resina flexivel transparente", matrix: "MTX-ETQ-336", photo: "", notes: "Aplicacao em calcados, bolsas e acessorios." },
    { name: "Logo tecnico em borracha", category: "Logos", price: 6.9, lead: 10, finish: "Baixo relevo", minQuantity: 150, material: "Borracha PVC preta", matrix: "MTX-LOG-421", photo: "", notes: "Logo com boa leitura para linhas industriais." },
    { name: "Tag personalizada para moda", category: "Tags", price: 5.4, lead: 5, finish: "Personalizado", minQuantity: 100, material: "Tinta plastisol vermelho fosco", matrix: "MTX-TAG-077", photo: "", notes: "Tag compacta para vestuario e embalagens." }
  ],
  stock: [
    { item: "Pedido Prime Shoes Industria", type: "Receber", category: "receber", current: 8640, min: "2026-06-04", unit: "Aberto", arrival: "Parcela unica - etiqueta resinada" },
    { item: "Pedido Rodeio Prime Store", type: "Receber", category: "receber", current: 5040, min: "2026-06-09", unit: "Aberto", arrival: "Faturamento apos expedicao" },
    { item: "Pedido Auto Center Avenida", type: "Receber", category: "receber", current: 4140, min: "2026-06-14", unit: "Recebido", arrival: "Pedido finalizado" },
    { item: "Fornecedor PVC e plastisol", type: "Pagar", category: "fornecedores", current: 3120, min: "2026-06-05", unit: "Aberto", arrival: "Compra de materia-prima" },
    { item: "Folha equipe producao", type: "Pagar", category: "salarios", current: 9800, min: "2026-06-07", unit: "Aberto", arrival: "Salarios e adiantamentos" },
    { item: "Energia fabrica", type: "Pagar", category: "contas", current: 1680, min: "2026-06-10", unit: "Aberto", arrival: "Conta operacional" },
    { item: "Manutencao forno", type: "Pagar", category: "manutencao", current: 1250, min: "2026-06-18", unit: "Pago", arrival: "Revisao preventiva" }
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
  perfil: "Perfil",
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
  perfil: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"></circle><path d="M4 21a8 8 0 0 1 16 0"></path></svg>`,
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

function loadProfilePhoto() {
  return localStorage.getItem("yubor-flow-profile-photo") || "";
}

function loadProfile() {
  try {
    return {
      name: "Usuário do sistema",
      role: "Gestor operacional",
      company: "Yubor",
      phone: "",
      email: "",
      ...JSON.parse(localStorage.getItem("yubor-flow-profile") || "{}")
    };
  } catch {
    return {
      name: "Usuário do sistema",
      role: "Gestor operacional",
      company: "Yubor",
      phone: "",
      email: ""
    };
  }
}

function saveProfile() {
  localStorage.setItem("yubor-flow-profile", JSON.stringify(state.profile));
}

function defaultProfilePhoto() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
      <rect width="96" height="96" rx="28" fill="#157a6e"/>
      <circle cx="48" cy="35" r="16" fill="#dff8f1"/>
      <path d="M21 82c4-18 18-28 27-28s23 10 27 28" fill="#dff8f1"/>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function productPlaceholderImage(product = {}) {
  const initials = String(product.name || "Produto")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120">
      <rect width="160" height="120" rx="16" fill="#203036"/>
      <circle cx="126" cy="26" r="22" fill="#31b99d" opacity=".25"/>
      <path d="M36 75 80 36l44 39-44 23-44-23Z" fill="#31b99d"/>
      <text x="80" y="71" text-anchor="middle" font-family="Arial" font-size="24" font-weight="700" fill="#fff">${initials}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function applyProfilePhoto() {
  const photo = state.profilePhoto || defaultProfilePhoto();
  document.querySelectorAll("#top-profile-photo, #settings-profile-photo").forEach((img) => {
    img.src = photo;
  });
}

function applyProfileData() {
  const profile = state.profile;
  const fields = {
    "#top-profile-name": profile.name || "Perfil",
    "#profile-preview-name": profile.name || "Usuário do sistema",
    "#profile-preview-role": profile.role || "Gestor operacional",
    "#profile-summary-company": profile.company || "Yubor",
    "#profile-summary-name": profile.name || "Usuário do sistema",
    "#profile-summary-role": profile.role || "Gestor operacional",
    "#profile-summary-phone": profile.phone || "Não informado",
    "#profile-summary-email": profile.email || "Não informado"
  };

  Object.entries(fields).forEach(([selector, value]) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  });

  const inputs = {
    "#profile-name": profile.name,
    "#profile-role": profile.role,
    "#profile-company": profile.company,
    "#profile-phone": profile.phone,
    "#profile-email": profile.email
  };

  Object.entries(inputs).forEach(([selector, value]) => {
    const input = document.querySelector(selector);
    if (input && input.value !== value) input.value = value || "";
  });
}

function saveProfilePhoto(file) {
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    showToast("Escolha um arquivo de imagem.");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    state.profilePhoto = String(reader.result);
    localStorage.setItem("yubor-flow-profile-photo", state.profilePhoto);
    applyProfilePhoto();
    showToast("Foto de perfil atualizada.");
  };
  reader.readAsDataURL(file);
}

function saveProfileForm(event) {
  event.preventDefault();
  state.profile = {
    name: document.querySelector("#profile-name").value.trim() || "Usuário do sistema",
    role: document.querySelector("#profile-role").value.trim() || "Gestor operacional",
    company: document.querySelector("#profile-company").value.trim() || "Yubor",
    phone: document.querySelector("#profile-phone").value.trim(),
    email: document.querySelector("#profile-email").value.trim()
  };
  saveProfile();
  applyProfileData();
  showToast("Perfil atualizado.");
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

function toDateInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function setDateInputValue(selector, date) {
  const input = typeof selector === "string" ? document.querySelector(selector) : selector;
  if (!input) return;
  input.value = date instanceof Date ? toDateInputValue(date) : date || "";
}

const datePicker = {
  input: null,
  visibleDate: new Date()
};

function ensureDatePicker() {
  let picker = document.querySelector("#custom-date-picker");
  if (picker) return picker;
  picker = document.createElement("div");
  picker.id = "custom-date-picker";
  picker.className = "custom-date-picker";
  picker.hidden = true;
  document.body.appendChild(picker);
  return picker;
}

function openDatePicker(input) {
  const picker = ensureDatePicker();
  datePicker.input = input;
  datePicker.visibleDate = parseLocalDate(input.value) || new Date();
  renderDatePicker();
  const rect = input.getBoundingClientRect();
  picker.style.left = `${Math.min(rect.left, window.innerWidth - 330)}px`;
  picker.style.top = `${rect.bottom + 8}px`;
  picker.hidden = false;
}

function closeDatePicker() {
  const picker = ensureDatePicker();
  picker.hidden = true;
  datePicker.input = null;
}

function renderDatePicker() {
  const picker = ensureDatePicker();
  const current = datePicker.visibleDate;
  const year = current.getFullYear();
  const month = current.getMonth();
  const selected = datePicker.input ? parseLocalDate(datePicker.input.value) : null;
  const first = new Date(year, month, 1);
  const start = new Date(first);
  start.setDate(first.getDate() - first.getDay());
  const monthLabel = current.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

  const days = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const iso = toDateInputValue(date);
    const isCurrentMonth = date.getMonth() === month;
    const isSelected = selected && sameDay(date, selected);
    const isToday = sameDay(date, new Date());
    return `
      <button class="date-picker-day ${isCurrentMonth ? "" : "muted"} ${isSelected ? "selected" : ""} ${isToday ? "today" : ""}" type="button" data-pick-date="${iso}">
        ${date.getDate()}
      </button>
    `;
  }).join("");

  picker.innerHTML = `
    <div class="date-picker-head">
      <button type="button" data-date-nav="-1" aria-label="Mês anterior">‹</button>
      <strong>${monthLabel}</strong>
      <button type="button" data-date-nav="1" aria-label="Próximo mês">›</button>
    </div>
    <div class="date-picker-week">
      <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
    </div>
    <div class="date-picker-grid">${days}</div>
    <div class="date-picker-actions">
      <button type="button" data-date-clear>Limpar</button>
      <button type="button" data-date-today>Hoje</button>
    </div>
  `;
}

function enhanceDateInputs() {
  document.querySelectorAll('input[type="date"]').forEach((input) => {
    input.type = "text";
    input.readOnly = true;
    input.placeholder = "Selecionar data";
    input.classList.add("date-input-custom");
    input.addEventListener("click", () => openDatePicker(input));
    input.addEventListener("keydown", (event) => {
      if (["Enter", " "].includes(event.key)) {
        event.preventDefault();
        openDatePicker(input);
      }
    });
  });
}

function statusClass(status) {
  return normalize(status).replace("ç", "c").replace(/\s+/g, "-");
}

function orderPriority(order) {
  if (order.priority) return order.priority;
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
  const paid = state.stock.filter((item) => item.type === "Pagar" && item.unit === "Pago").reduce((sum, item) => sum + item.current, 0);
  const received = state.stock.filter((item) => item.type === "Receber" && item.unit === "Recebido").reduce((sum, item) => sum + item.current, 0);
  const projectedBalance = received + receivable - paid - payable;
  const balance = received - paid;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const overdue = open.filter((item) => new Date(`${item.min}T12:00:00`) < today).length;
  return {
    open,
    payable,
    receivable,
    paid,
    received,
    balance,
    projectedBalance,
    overdue
  };
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

function productByMatrix(matrix) {
  return state.products.find((product) => product.matrix === matrix);
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
  if (state.financeDateFilter === "personalizado") {
    const start = parseLocalDate(state.financeDateStart);
    const end = parseLocalDate(state.financeDateEnd);
    if (start && dueDate < start) return false;
    if (end && dueDate > end) return false;
    return true;
  }
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
    ? "Recebidos somam no saldo do sistema."
    : "Pagamentos baixados reduziram o saldo.";
}

function renderMetrics() {
  const openOrders = state.orders.filter((order) => order.status !== "Finalizado").length;
  const inProduction = state.orders.filter((order) => order.status === "Produção").length;
  const finance = financeStats();
  const lowStock = finance.open.length;
  const revenue = state.orders.reduce((total, order) => total + order.revenue, 0);
  const nextOrder = state.orders
    .filter((order) => order.status !== "Finalizado")
    .sort((a, b) => parseLocalDate(a.date) - parseLocalDate(b.date))[0];
  const busiestStage = productionStages
    .map((stage) => ({ stage, count: state.orders.filter((order) => order.stage === stage).length }))
    .sort((a, b) => b.count - a.count)[0];

  document.querySelector("#metric-open-orders").textContent = openOrders;
  document.querySelector("#metric-production").textContent = inProduction;
  document.querySelector("#metric-low-stock").textContent = lowStock;
  document.querySelector("#metric-revenue").textContent = currency.format(revenue);
  document.querySelector("#metric-open-orders-detail").textContent = nextOrder
    ? `próxima entrega: ${nextOrder.id} em ${formatDate(nextOrder.date)}`
    : "nenhum pedido pendente";
  document.querySelector("#metric-open-orders-summary").textContent = nextOrder
    ? `${nextOrder.client} · ${nextOrder.product}`
    : "Todos os pedidos estão finalizados no momento.";
  document.querySelector("#metric-production-detail").textContent = busiestStage && busiestStage.count
    ? `${busiestStage.count} em ${busiestStage.stage}`
    : "sem ordens em produção";
  document.querySelector("#metric-production-summary").textContent = `${state.orders.filter((order) => order.status === "Expedição").length} pedido(s) prontos para expedição.`;
  document.querySelector("#metric-finance-detail").textContent = `${currency.format(finance.receivable)} a receber · ${currency.format(finance.payable)} a pagar`;
  document.querySelector("#metric-finance-summary").textContent = finance.overdue
    ? `${finance.overdue} conta(s) vencida(s) precisam de atenção.`
    : "Contas abertas sem vencimento atrasado.";
  document.querySelector("#metric-revenue-detail").textContent = `${state.clients.length} clientes · ${state.products.length} produtos`;
  document.querySelector("#metric-revenue-summary").textContent = `Saldo realizado: ${currency.format(finance.balance)}.`;
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

  alerts.push(`Saldo realizado: ${currency.format(financeStats().balance)}.`);

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
        <span><small>Responsável</small>${order.responsible || "Equipe interna"}</span>
      </div>
      <div class="card-actions">
        <button class="action-btn" data-detail="${order.id}">Detalhes</button>
        <button class="action-btn" data-edit-order="${order.id}">Editar</button>
        <button class="action-btn" data-romaneio="${order.id}">Romaneio expedição</button>
        <button class="action-btn" data-romaneio-client="${order.id}">Romaneio cliente</button>
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

  if (state.catalogMode === "matrizes") {
    document.querySelector("#products-grid").innerHTML = products.map((product) => `
      <article class="product-card matrix-card modern-card">
        <header>
          <div>
            <h3>${product.matrix}</h3>
            <p>${product.name}</p>
          </div>
          <span class="pill expedicao">${product.category}</span>
        </header>
        <div class="product-meta">
          <span><small>Material</small><strong>${product.material}</strong></span>
          <span><small>Acabamento</small><strong>${product.finish || "A definir"}</strong></span>
          <span><small>Produto</small><strong>${product.name}</strong></span>
          <span><small>Prazo</small><strong>${product.lead} dias</strong></span>
          <span><small>Mínimo</small><strong>${(product.minQuantity || 1).toLocaleString("pt-BR")} peças</strong></span>
          <span><small>Preço base</small><strong>${currency.format(product.price)}</strong></span>
        </div>
        <p class="card-description">${product.notes || "Matriz vinculada ao produto cadastrado."}</p>
        <div class="card-actions">
          <button class="action-btn" data-edit-product="${product.index}">Editar matriz</button>
          <button class="primary-btn" data-product-order="${product.name}">Criar pedido</button>
        </div>
      </article>
    `).join("") || `<div class="panel">Nenhuma matriz encontrada.</div>`;
    animateChildren("#products-grid");
    return;
  }

  document.querySelector("#products-grid").innerHTML = products.map((product) => `
    <article class="product-card modern-card">
      <img class="product-photo" src="${product.photo || productPlaceholderImage(product)}" alt="Imagem de ${product.name}" />
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
        <span><small>Acabamento</small><strong>${product.finish || "A definir"}</strong></span>
        <span><small>Mínimo</small><strong>${(product.minQuantity || 1).toLocaleString("pt-BR")} peças</strong></span>
        <span><small>Preço</small><strong>${currency.format(product.price)} / peça</strong></span>
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
      ["Saldo realizado", finance.balance, finance.balance >= 0 ? "Positivo" : "Atenção"],
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
        <div class="finance-status-line">
          <strong>${isOpen ? "Em aberto" : item.unit}</strong>
          <span>${isOpen ? "Aguardando baixa financeira" : "Baixado no protótipo"}</span>
        </div>
        <p>${item.arrival}</p>
        <div class="card-actions">
          <button class="action-btn" data-edit-stock="${item.index}">Editar</button>
          ${isOpen
            ? `<button class="primary-btn" data-stock-restock="${item.index}">${isPayable ? "Marcar pago" : "Marcar recebido"}</button>`
            : `<button class="action-btn" data-stock-reopen="${item.index}">Reabrir</button>`}
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
        <button class="action-btn" data-romaneio="${order.id}">Romaneio expedição</button>
        <button class="action-btn" data-romaneio-client="${order.id}">Romaneio cliente</button>
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
    ["Saldo realizado", currency.format(finance.balance), finance.balance >= 0 ? "Operação positiva" : "Revisar pagamentos"],
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
    ["Saldo realizado", currency.format(finance.balance)]
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

function populateMatrixOptions(productName = "") {
  const list = document.querySelector("#matrix-options");
  if (!list) return;
  const products = productName
    ? state.products.filter((product) => product.name === productName)
    : state.products;
  list.innerHTML = products.map((product) => `
    <option value="${product.matrix}">${product.name} · ${product.material}</option>
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

function formatCep(value) {
  const digits = digitsOnly(value).slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
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

function fullClientAddress(client) {
  if (!client) return "Não informado";
  const street = [client.address, client.number].filter(Boolean).join(", ");
  const cityLine = [client.district, client.city, client.state].filter(Boolean).join(" - ");
  const cep = client.cep ? `CEP ${client.cep}` : "";
  return [street, cityLine, cep].filter(Boolean).join(" · ") || clientAddress(client);
}

function currentStateCities() {
  const uf = document.querySelector("#client-state")?.value || "SP";
  return state.cityCache[uf] || citiesByState[uf] || [];
}

function stateName(uf) {
  return brazilStates.find(([stateUf]) => stateUf === uf)?.[1] || uf;
}

function cityListForState(uf) {
  return state.cityCache[uf] || citiesByState[uf] || [];
}

function updateCityDatalist(uf) {
  const panel = document.querySelector("#city-picker-panel");
  if (panel && !panel.hidden) renderCityPicker();
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
  const stateInput = document.querySelector("#client-state");
  if (stateInput) stateInput.value = selectedState;
  updateCityDatalist(selectedState);
  document.querySelector("#client-city").value = selectedCity || "";
  loadCitiesForState(selectedState);
}

function renderStatePicker() {
  const panel = document.querySelector("#state-picker-panel");
  if (!panel) return;
  const current = document.querySelector("#client-state").value || "SP";
  panel.innerHTML = `
    <div class="client-picker-head">
      <strong>Estados do Brasil</strong>
      <span>${current} - ${stateName(current)}</span>
    </div>
    <div class="state-picker-grid">
      ${brazilStates.map(([uf, name]) => `
        <button class="state-picker-option ${uf === current ? "active" : ""}" type="button" data-select-state="${uf}">
          <strong>${uf}</strong>
          <span>${name}</span>
        </button>
      `).join("")}
    </div>
  `;
}

function toggleStatePicker(forceOpen = null) {
  const panel = document.querySelector("#state-picker-panel");
  if (!panel) return;
  const shouldOpen = forceOpen === null ? panel.hidden : forceOpen;
  panel.hidden = !shouldOpen;
  if (shouldOpen) renderStatePicker();
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

async function searchCep() {
  const cepInput = document.querySelector("#client-cep");
  const cep = digitsOnly(cepInput.value);
  if (cep.length !== 8) {
    showToast("Informe um CEP com 8 dígitos.");
    return;
  }

  try {
    showToast("Buscando CEP...");
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    if (data.erro) {
      showToast("CEP não encontrado.");
      return;
    }
    cepInput.value = formatCep(cep);
    document.querySelector("#client-address").value = data.logradouro || "";
    document.querySelector("#client-district").value = data.bairro || "";
    populateStateAndCityOptions(data.uf || "SP", data.localidade || "");
    showToast("Endereço preenchido pelo CEP.");
  } catch {
    showToast("Não foi possível buscar o CEP agora.");
  }
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

function renderMatrixPicker() {
  const panel = document.querySelector("#matrix-picker-panel");
  if (!panel) return;
  const productName = document.querySelector("#form-product").value;
  const query = normalize(document.querySelector("#form-matrix").value);
  const products = state.products
    .filter((product) => !productName || product.name === productName)
    .filter((product) => normalize(`${product.matrix} ${product.name} ${product.material} ${product.finish}`).includes(query));

  panel.innerHTML = `
    <div class="client-picker-head">
      <strong>Matrizes cadastradas</strong>
      <span>${products.length} encontrada(s)</span>
    </div>
    <div class="client-picker-list">
      ${products.map((product) => `
        <button class="client-picker-option" type="button" data-select-matrix="${product.matrix}">
          <strong>${product.matrix}</strong>
          <span>${product.name} · ${product.material} · ${product.finish || "Acabamento a definir"}</span>
        </button>
      `).join("") || `<p>Nenhuma matriz encontrada. Você ainda pode digitar manualmente.</p>`}
    </div>
  `;
}

function toggleMatrixPicker(forceOpen = null) {
  const panel = document.querySelector("#matrix-picker-panel");
  if (!panel) return;
  const shouldOpen = forceOpen === null ? panel.hidden : forceOpen;
  panel.hidden = !shouldOpen;
  if (shouldOpen) renderMatrixPicker();
}

function applyProductToOrder(productName) {
  const product = productByName(productName);
  populateMatrixOptions(productName);
  if (!product) return;
  document.querySelector("#form-matrix").value = product.matrix || "";
  if (!document.querySelector("#form-notes").value.trim()) {
    document.querySelector("#form-notes").value = product.notes || "";
  }
}

function applyMatrixToOrder(matrix) {
  const product = productByMatrix(matrix);
  if (!product) return;
  document.querySelector("#form-product").value = product.name;
  populateMatrixOptions(product.name);
  document.querySelector("#form-matrix").value = product.matrix;
  if (!document.querySelector("#form-notes").value.trim()) {
    document.querySelector("#form-notes").value = product.notes || "";
  }
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
  populateMatrixOptions(order ? order.product : "");
  toggleClientPicker(false);
  toggleProductPicker(false);
  toggleMatrixPicker(false);
  document.querySelector("#order-modal-title").textContent = order ? `Editar ${order.id}` : "Novo pedido";
  document.querySelector("#save-order-btn").textContent = order ? "Salvar alterações" : "Salvar pedido";
  document.querySelector("#form-order-id").value = order ? order.id : "";
  document.querySelector("#form-client").value = order ? order.client : clientName;
  document.querySelector("#form-product").value = order ? order.product : "";
  document.querySelector("#form-matrix").value = order ? order.matrix || "" : "";
  document.querySelector("#form-quantity").value = order ? order.quantity : 500;
  document.querySelector("#form-date").value = order ? order.date : "";
  if (!order) setDateInputValue("#form-date", new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  document.querySelector("#form-responsible").value = order ? order.responsible || "" : "";
  document.querySelector("#form-priority").value = order ? order.priority || orderPriority(order) : "Normal";
  document.querySelector("#form-notes").value = order ? order.notes : "";
  document.querySelector("#order-modal").showModal();
}

function openOrderForProduct(productName) {
  openOrderModal();
  document.querySelector("#form-product").value = productName;
  applyProductToOrder(productName);
  const product = productByName(productName);
  if (product) {
    const date = new Date(Date.now() + product.lead * 24 * 60 * 60 * 1000);
    setDateInputValue("#form-date", date);
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
  document.querySelector("#client-cep").value = client ? client.cep || "" : "";
  document.querySelector("#client-address").value = client ? client.address || "" : "";
  document.querySelector("#client-number").value = client ? client.number || "" : "";
  document.querySelector("#client-district").value = client ? client.district || "" : "";
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
  document.querySelector("#product-photo").value = product ? product.photo || "" : "";
  document.querySelector("#product-name").value = product ? product.name : "";
  document.querySelector("#product-category").value = product ? product.category : "Chaveiros";
  document.querySelector("#product-price").value = product ? product.price : "";
  document.querySelector("#product-lead").value = product ? product.lead : 7;
  document.querySelector("#product-finish").value = product ? product.finish || "Alto relevo" : "Alto relevo";
  document.querySelector("#product-min-quantity").value = product ? product.minQuantity || 100 : 100;
  document.querySelector("#product-material").value = product ? product.material : "";
  document.querySelector("#product-matrix").value = product ? product.matrix : "";
  document.querySelector("#product-notes").value = product ? product.notes : "";
  updateProductPhotoPreview();
  document.querySelector("#product-modal").showModal();
}

function closeProductModal() {
  document.querySelector("#product-modal").close();
}

function updateProductPhotoPreview() {
  const preview = document.querySelector("#product-photo-preview");
  const photo = document.querySelector("#product-photo").value;
  if (!preview) return;
  preview.innerHTML = photo
    ? `<img src="${photo}" alt="Prévia do produto" />`
    : `<span>Foto opcional</span>`;
}

function saveProductPhoto(file) {
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    showToast("Escolha uma imagem para o produto.");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    document.querySelector("#product-photo").value = String(reader.result);
    updateProductPhotoPreview();
    showToast("Foto do produto adicionada.");
  };
  reader.readAsDataURL(file);
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
  const matrix = document.querySelector("#form-matrix").value.trim();
  const quantity = Number(document.querySelector("#form-quantity").value);
  const date = document.querySelector("#form-date").value;
  const responsible = document.querySelector("#form-responsible").value.trim();
  const priority = document.querySelector("#form-priority").value;
  const notes = document.querySelector("#form-notes").value.trim();
  const productInfo = productByName(product) || productByMatrix(matrix);
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
      matrix: matrix || (productInfo ? productInfo.matrix : order.matrix),
      material: productInfo ? productInfo.material : order.material,
      responsible: responsible || order.responsible || "Equipe interna",
      priority,
      history: [...(order.history || []), "Pedido editado"],
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
    matrix: matrix || (productInfo ? productInfo.matrix : "A definir"),
    material: productInfo ? productInfo.material : "A validar",
    responsible: responsible || "Equipe interna",
    priority,
    history: ["Pedido registrado", "Aguardando conferência administrativa"],
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
      cep: "",
      address: "",
      number: "",
      district: "",
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
  const cep = document.querySelector("#client-cep").value.trim();
  const address = document.querySelector("#client-address").value.trim();
  const number = document.querySelector("#client-number").value.trim();
  const district = document.querySelector("#client-district").value.trim();
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
      cep,
      address,
      number,
      district,
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
      cep,
      address,
      number,
      district,
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
  const finish = document.querySelector("#product-finish").value;
  const minQuantity = Number(document.querySelector("#product-min-quantity").value);
  const material = document.querySelector("#product-material").value.trim();
  const matrix = document.querySelector("#product-matrix").value.trim();
  const photo = document.querySelector("#product-photo").value;
  const notes = document.querySelector("#product-notes").value.trim();

  if (!name || !category || Number.isNaN(price) || !lead || !finish || !minQuantity || !material || !matrix) {
    showToast("Preencha os dados obrigatórios do produto.");
    return;
  }

  const payload = {
    name,
    category,
    price,
    lead,
    finish,
    minQuantity,
    material,
    matrix,
    photo,
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

function reopenStock(index) {
  const item = state.stock[Number(index)];
  if (!item) return;
  item.unit = "Aberto";
  render();
  showToast(`${item.item} reaberto.`);
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
  order.history = [...(order.history || []), `Avançou para ${order.stage}`];
  render();
  showToast(`${order.id} avançou para ${order.stage}.`);
}

function finishOrder(id) {
  const order = state.orders.find((item) => item.id === id);
  if (!order) return;
  order.status = "Finalizado";
  order.stage = "Finalizado";
  order.shippingStatus = "Entregue";
  order.history = [...(order.history || []), "Finalizado na expedição"];
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
  order.history = [...(order.history || []), `Entrega: ${next}`];
  render();
  showToast(`${order.id}: entrega marcada como ${next}.`);
}

function closeDetails() {
  document.body.classList.remove("drawer-open");
  document.querySelector("#details-drawer").classList.remove("romaneio-mode");
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

function orderHistory(order) {
  const entries = order.history && order.history.length ? order.history : ["Pedido registrado"];
  return entries.map((entry, index) => `
    <div class="history-item">
      <span>${index + 1}</span>
      <div>
        <strong>${entry}</strong>
        <small>${index === entries.length - 1 ? "Atual" : "Concluído"}</small>
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

function clientAddress(client) {
  if (!client) return "Não informado";
  const city = client.city && client.city !== "Não informada" ? client.city : "";
  const stateUf = client.state || "";
  return [city, stateUf].filter(Boolean).join(" - ") || "Não informado";
}

function expeditionRomaneio(order, client, printedAt) {
  return `
    <div class="modal-actions no-print">
      <button class="ghost-btn" data-detail="${order.id}">Ver detalhes</button>
      <button class="action-btn" data-romaneio-client="${order.id}">Romaneio cliente</button>
      <button class="primary-btn" data-print-romaneio="true">Imprimir expedição</button>
    </div>
    <div class="romaneio-sheet print-document romaneio-expedition">
      <div class="romaneio-head">
        <div>
          <span class="romaneio-brand">Yubor</span>
          <h2>Romaneio de expedição</h2>
          <p>Documento interno para separação, conferência e envio.</p>
        </div>
        <div>
          <span>Pedido</span>
          <strong>${order.id}</strong>
          <p>Emitido em ${printedAt}</p>
        </div>
      </div>

      <div class="romaneio-order-hero">
        <div>
          <span class="pill ${statusClass(order.status)}">${order.status}</span>
          <h3>${order.product}</h3>
          <p>${order.quantity.toLocaleString("pt-BR")} peças · matriz ${order.matrix} · entrega ${formatDate(order.date)}</p>
        </div>
        <div>
          <span>Responsável</span>
          <strong>${order.shippingResponsible || order.responsible || "Equipe de expedição"}</strong>
        </div>
      </div>

      <div class="romaneio-section">
        <h3>Revisão da expedição</h3>
        <div class="romaneio-checklist single-check">
          <div class="romaneio-check"><span></span><div><strong>Pedido revisado e liberado para entrega</strong><small>Quantidade, produto, matriz e identificação conferidos pela expedição.</small></div></div>
        </div>
      </div>

      <div class="romaneio-section">
        <h3>Dados do cliente</h3>
        <div class="romaneio-grid">
          <div class="romaneio-field"><span>Cliente</span><strong>${order.client}</strong></div>
          <div class="romaneio-field"><span>Documento</span><strong>${client ? client.doc : "Não informado"}</strong></div>
          <div class="romaneio-field"><span>Telefone</span><strong>${client ? client.phone : "Não informado"}</strong></div>
          <div class="romaneio-field"><span>Endereço</span><strong>${fullClientAddress(client)}</strong></div>
        </div>
      </div>

      <div class="romaneio-section">
        <h3>Produção e conferência</h3>
        <table class="romaneio-table">
          <thead><tr><th>Produto</th><th>Matriz</th><th>Material</th><th>Quantidade</th><th>Volumes</th></tr></thead>
          <tbody>
            <tr>
              <td>${order.product}</td>
              <td>${order.matrix}</td>
              <td>${order.material}</td>
              <td>${order.quantity.toLocaleString("pt-BR")} peças</td>
              <td>${order.volumes || Math.max(1, Math.ceil(order.quantity / 500))}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="romaneio-section">
        <h3>Observações internas</h3>
        <div class="romaneio-note">${order.notes}</div>
      </div>

      <div class="romaneio-signatures">
        <div><span>Separação</span></div>
        <div><span>Conferência</span></div>
        <div><span>Expedição</span></div>
      </div>
    </div>
  `;
}

function clientRomaneio(order, client, printedAt) {
  const finished = order.status === "Finalizado";
  return `
    <div class="modal-actions no-print">
      <button class="ghost-btn" data-romaneio="${order.id}">Romaneio expedição</button>
      <button class="primary-btn" data-print-romaneio="true" ${finished ? "" : "disabled"}>${finished ? "Imprimir cliente" : "Disponível ao finalizar"}</button>
    </div>
    <div class="romaneio-sheet print-document romaneio-client">
      <div class="romaneio-head">
        <div>
          <span class="romaneio-brand">Yubor</span>
          <h2>Romaneio do cliente</h2>
          <p>Comprovante de entrega do pedido finalizado.</p>
        </div>
        <div>
          <span>Pedido</span>
          <strong>${order.id}</strong>
          <p>Emitido em ${printedAt}</p>
        </div>
      </div>

      ${finished ? "" : `<div class="romaneio-warning no-print">Finalize o pedido para liberar a impressão do romaneio do cliente.</div>`}

      <div class="romaneio-section">
        <h3>Dados do cliente</h3>
        <div class="romaneio-grid">
          <div class="romaneio-field"><span>Cliente</span><strong>${order.client}</strong></div>
          <div class="romaneio-field"><span>Documento</span><strong>${client ? client.doc : "Não informado"}</strong></div>
          <div class="romaneio-field"><span>Telefone</span><strong>${client ? client.phone : "Não informado"}</strong></div>
          <div class="romaneio-field"><span>Endereço da empresa</span><strong>${fullClientAddress(client)}</strong></div>
        </div>
      </div>

      <div class="romaneio-section">
        <h3>Produto entregue</h3>
        <table class="romaneio-table">
          <thead><tr><th>Produto</th><th>Quantidade</th><th>Valor</th><th>Entrega</th></tr></thead>
          <tbody>
            <tr>
              <td>${order.product}</td>
              <td>${order.quantity.toLocaleString("pt-BR")} peças</td>
              <td>${currency.format(order.revenue)}</td>
              <td>${formatDate(order.date)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="romaneio-section">
        <h3>Declaração de recebimento</h3>
        <div class="romaneio-note">Declaro que recebi os produtos descritos acima, conferidos em quantidade e identificação.</div>
      </div>

      <div class="romaneio-signatures client-signature">
        <div><span>Assinatura do cliente</span></div>
        <div><span>Documento / data</span></div>
      </div>
    </div>
  `;
}

function printCleanRomaneio() {
  const sheet = document.querySelector(".print-document");
  if (!sheet) {
    window.print();
    return;
  }

  const orderId = sheet.querySelector(".romaneio-head strong")?.textContent || "Romaneio";
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
        <style>
          @page { size: A4; margin: 12mm; }
          * { box-sizing: border-box; box-shadow: none !important; }
          html, body { margin: 0; background: #fff !important; color: #101820 !important; font-family: Arial, sans-serif; }
          body { padding: 0; font-size: 11px; }
          .print-document { margin: 0; padding: 0; border: 0; background: #fff !important; color: #101820 !important; }
          .romaneio-head { display: flex; justify-content: space-between; gap: 18px; align-items: flex-start; padding-bottom: 10px; margin-bottom: 12px; border-bottom: 1px solid #c7d0d6; }
          .romaneio-head h2 { margin: 5px 0 4px; font-size: 20px; }
          .romaneio-head p { margin: 0; color: #53616a; }
          .romaneio-head span, .romaneio-brand { display: block; color: #53616a; font-size: 9px; font-weight: 800; text-transform: uppercase; }
          .romaneio-head > div:last-child { text-align: right; }
          .romaneio-head strong { display: block; margin: 4px 0; font-size: 16px; }
          .no-print { display: none !important; }
          .pill { display: inline-block; padding: 4px 8px; border-radius: 999px; background: #e9f5f2; color: #157a6e; font-weight: 800; }
          .romaneio-order-hero { display: grid; grid-template-columns: 1fr 170px; gap: 10px; padding: 10px; margin-bottom: 12px; border: 1px solid #c7d0d6; border-radius: 6px; background: #f6f9fa; }
          .romaneio-order-hero h3 { margin: 6px 0 4px; font-size: 17px; }
          .romaneio-order-hero p { margin: 0; color: #53616a; }
          .romaneio-order-hero > div:last-child { text-align: right; align-self: center; }
          .romaneio-order-hero > div:last-child span { display: block; color: #53616a; font-size: 9px; font-weight: 800; text-transform: uppercase; }
          .romaneio-order-hero > div:last-child strong { display: block; margin-top: 5px; font-size: 15px; }
          .romaneio-section { margin-top: 12px; break-inside: avoid; }
          .romaneio-section h3 { font-size: 13px; margin-bottom: 6px; }
          .romaneio-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
          .romaneio-field, .romaneio-note { border: 1px solid #c7d0d6 !important; border-radius: 4px; padding: 7px; }
          .romaneio-field span { display: block; color: #53616a !important; font-size: 9px; text-transform: uppercase; font-weight: 800; margin-bottom: 3px; }
          .romaneio-table { width: 100%; border-collapse: collapse; border: 1px solid #c7d0d6; }
          .romaneio-table th, .romaneio-table td { padding: 7px; font-size: 10px; color: #101820 !important; border-bottom: 1px solid #c7d0d6 !important; text-align: left; }
          .romaneio-table th { background: #f2f5f6; color: #53616a !important; text-transform: uppercase; font-size: 9px; }
          .romaneio-checklist { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
          .romaneio-check { display: grid; grid-template-columns: 22px 1fr; gap: 7px; border: 1px solid #c7d0d6 !important; border-radius: 4px; padding: 7px; }
          .romaneio-check > span { width: 18px; height: 18px; border: 1px solid #9aa6ad !important; border-radius: 4px; }
          .romaneio-check strong, .romaneio-check small { display: block; }
          .romaneio-check small { color: #53616a; }
          .romaneio-footer, .romaneio-flow { display: none !important; }
          .romaneio-signatures { display: grid !important; grid-template-columns: repeat(3, 1fr) !important; gap: 14px; margin-top: 34px; }
          .romaneio-signatures.client-signature { grid-template-columns: 1.4fr .8fr !important; margin-top: 56px; }
          .romaneio-signatures div { min-height: 44px; display: flex; align-items: flex-end; justify-content: center; border-top: 1px solid #53616a !important; font-size: 10px; color: #53616a !important; }
        </style>
      </head>
      <body>${sheet.outerHTML}</body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  window.setTimeout(() => printWindow.print(), 350);
}

function openDetails(id, romaneio = false, romaneioType = "expedicao") {
  const order = state.orders.find((item) => item.id === id);
  if (!order) return;
  const client = state.clients.find((item) => item.name === order.client);
  const printedAt = new Date().toLocaleDateString("pt-BR");

  document.querySelector("#details-content").innerHTML = romaneio
    ? romaneioType === "cliente"
      ? clientRomaneio(order, client, printedAt)
      : expeditionRomaneio(order, client, printedAt)
    : `
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
      <div class="summary-item"><span>Responsável</span><strong>${order.responsible || "Equipe interna"}</strong></div>
      <div class="summary-item"><span>Prioridade</span><strong>${orderPriority(order)}</strong></div>
      <div class="summary-item"><span>Observações</span><strong>${order.notes}</strong></div>
    </div>
    <h3 style="margin-top: 20px;">Timeline do pedido</h3>
    <div class="timeline">${orderTimeline(order)}</div>
    <h3 style="margin-top: 20px;">Histórico de movimentações</h3>
    <div class="history-list">${orderHistory(order)}</div>
    <div class="modal-actions" style="margin-top: 20px;">
      <button class="action-btn" data-edit-order="${order.id}">Editar pedido</button>
      <button class="ghost-btn" data-romaneio="${order.id}">Romaneio expedição</button>
      <button class="ghost-btn" data-romaneio-client="${order.id}">Romaneio cliente</button>
      <button class="primary-btn" data-advance="${order.id}">Avançar etapa</button>
    </div>
  `;

  document.querySelector("#details-drawer").setAttribute("aria-hidden", "false");
  document.querySelector("#details-drawer").classList.toggle("romaneio-mode", Boolean(romaneio));
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
      <p>${client.phone} · ${client.email} · ${fullClientAddress(client)}</p>
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
document.querySelector("#profile-form").addEventListener("submit", saveProfileForm);
document.querySelector("#profile-phone").addEventListener("input", (event) => {
  event.target.value = formatPhone(event.target.value);
});
document.querySelector("#profile-photo-input").addEventListener("change", (event) => {
  saveProfilePhoto(event.target.files[0]);
  event.target.value = "";
});
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
  applyProductToOrder(document.querySelector("#form-product").value);
  const panel = document.querySelector("#product-picker-panel");
  if (panel && !panel.hidden) renderProductPicker();
});
document.querySelector("#toggle-matrix-picker").addEventListener("click", () => toggleMatrixPicker());
document.querySelector("#form-matrix").addEventListener("input", () => {
  const panel = document.querySelector("#matrix-picker-panel");
  if (panel && !panel.hidden) renderMatrixPicker();
});
document.querySelector("#new-client-btn").addEventListener("click", () => openClientModal());
document.querySelector("#client-form").addEventListener("submit", saveClient);
document.querySelector("#client-phone").addEventListener("input", (event) => {
  event.target.value = formatPhone(event.target.value);
});
document.querySelector("#client-cep").addEventListener("input", (event) => {
  event.target.value = formatCep(event.target.value);
});
document.querySelector("#search-cep-btn").addEventListener("click", searchCep);
document.querySelector("#client-doc").addEventListener("input", (event) => {
  event.target.value = formatDocument(event.target.value);
});
document.querySelector("#client-doc-type").addEventListener("change", () => {
  const input = document.querySelector("#client-doc");
  input.value = formatDocument(input.value);
});
document.querySelector("#toggle-state-picker").addEventListener("click", () => toggleStatePicker());
document.querySelector("#client-state").addEventListener("click", () => toggleStatePicker(true));
document.querySelector("#client-city").addEventListener("input", () => {
  const panel = document.querySelector("#city-picker-panel");
  if (panel && panel.hidden) toggleCityPicker(true);
  if (panel && !panel.hidden) renderCityPicker();
});
document.querySelector("#toggle-city-picker").addEventListener("click", () => toggleCityPicker());
document.querySelector("#cancel-client-btn").addEventListener("click", closeClientModal);
document.querySelector("#cancel-client-x").addEventListener("click", closeClientModal);
document.querySelector("#new-product-btn").addEventListener("click", () => openProductModal());
document.querySelector("#product-form").addEventListener("submit", saveProduct);
document.querySelector("#product-photo-input").addEventListener("change", (event) => {
  saveProductPhoto(event.target.files[0]);
  event.target.value = "";
});
document.querySelector("#remove-product-photo").addEventListener("click", () => {
  document.querySelector("#product-photo").value = "";
  updateProductPhotoPreview();
});
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
  const dashboardCard = target.closest("[data-dashboard-link]");
  const picker = target.closest("#custom-date-picker");

  if (!picker && !target.classList.contains("date-input-custom")) closeDatePicker();

  const dateNav = target.dataset.dateNav;
  const pickDate = target.dataset.pickDate;
  const dateClear = target.dataset.dateClear;
  const dateToday = target.dataset.dateToday;
  const detailId = target.dataset.detail;
  const romaneioId = target.dataset.romaneio;
  const romaneioClientId = target.dataset.romaneioClient;
  const advanceId = target.dataset.advance;
  const finishId = target.dataset.finish;
  const clientName = target.dataset.clientOrder;
  const clientDetail = target.dataset.clientDetail;
  const selectClient = target.dataset.selectClient;
  const selectProduct = target.dataset.selectProduct;
  const selectMatrix = target.dataset.selectMatrix;
  const selectState = target.dataset.selectState;
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
  const reopenStockIndex = target.dataset.stockReopen;

  if (dateNav) {
    datePicker.visibleDate.setMonth(datePicker.visibleDate.getMonth() + Number(dateNav));
    renderDatePicker();
    return;
  }
  if (pickDate && datePicker.input) {
    datePicker.input.value = pickDate;
    datePicker.input.dispatchEvent(new Event("change", { bubbles: true }));
    closeDatePicker();
    return;
  }
  if (dateClear && datePicker.input) {
    datePicker.input.value = "";
    datePicker.input.dispatchEvent(new Event("change", { bubbles: true }));
    closeDatePicker();
    return;
  }
  if (dateToday && datePicker.input) {
    datePicker.input.value = toDateInputValue(new Date());
    datePicker.input.dispatchEvent(new Event("change", { bubbles: true }));
    closeDatePicker();
    return;
  }

  if (dashboardCard) setView(dashboardCard.dataset.dashboardLink);
  if (detailId) openDetails(detailId);
  if (editOrderId) openOrderModal("", editOrderId);
  if (romaneioId) openDetails(romaneioId, true);
  if (romaneioClientId) openDetails(romaneioClientId, true, "cliente");
  if (advanceId) advanceOrder(advanceId);
  if (finishId) finishOrder(finishId);
  if (shippingStepId) advanceShipping(shippingStepId);
  if (clientName) openOrderModal(clientName);
  if (selectClient) {
    document.querySelector("#form-client").value = selectClient;
    toggleClientPicker(false);
  }
  if (selectProduct) {
    document.querySelector("#form-product").value = selectProduct;
    applyProductToOrder(selectProduct);
    toggleProductPicker(false);
  }
  if (selectMatrix) {
    applyMatrixToOrder(selectMatrix);
    toggleMatrixPicker(false);
  }
  if (selectState) {
    populateStateAndCityOptions(selectState, "");
    toggleStatePicker(false);
    loadCitiesForState(selectState).then(() => renderCityPicker());
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
  if (reopenStockIndex) reopenStock(reopenStockIndex);
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

document.addEventListener("keydown", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const dashboardCard = target.closest("[data-dashboard-link]");
  if (!dashboardCard || !["Enter", " "].includes(event.key)) return;
  event.preventDefault();
  setView(dashboardCard.dataset.dashboardLink);
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

document.querySelectorAll(".catalog-tab").forEach((button) => {
  button.addEventListener("click", () => {
    state.catalogMode = button.dataset.catalogMode;
    document.querySelectorAll(".catalog-tab").forEach((item) => item.classList.toggle("active", item === button));
    renderProducts();
  });
});

document.querySelector("#finance-date-filter").addEventListener("change", (event) => {
  state.financeDateFilter = event.target.value;
  if (state.financeDateFilter !== "personalizado") {
    state.financeDateStart = "";
    state.financeDateEnd = "";
    document.querySelector("#finance-date-start").value = "";
    document.querySelector("#finance-date-end").value = "";
  }
  renderStock();
});

document.querySelector("#finance-date-start").addEventListener("change", (event) => {
  state.financeDateStart = event.target.value;
  state.financeDateFilter = "personalizado";
  document.querySelector("#finance-date-filter").value = "personalizado";
  renderStock();
});

document.querySelector("#finance-date-end").addEventListener("change", (event) => {
  state.financeDateEnd = event.target.value;
  state.financeDateFilter = "personalizado";
  document.querySelector("#finance-date-filter").value = "personalizado";
  renderStock();
});

document.querySelector("#clear-finance-date-filter").addEventListener("click", () => {
  state.financeDateFilter = "todos";
  state.financeDateStart = "";
  state.financeDateEnd = "";
  document.querySelector("#finance-date-filter").value = "todos";
  document.querySelector("#finance-date-start").value = "";
  document.querySelector("#finance-date-end").value = "";
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
applyProfilePhoto();
applyProfileData();
populateClientOptions();
populateProductOptions();
populateMatrixOptions();
enhanceDateInputs();
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
