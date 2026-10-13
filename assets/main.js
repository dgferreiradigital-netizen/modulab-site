// ===== Configuração =====
// Troque pelo número do WhatsApp com DDI + DDD, só dígitos. Ex.: 5511999998888
const WHATSAPP = "5511999999999";
const WA_DEFAULT_MSG = "Olá! Vim pelo site do ModuLAB e quero conversar sobre o CRM da minha empresa.";

const PAGES = [
  ["index.html", "Início"],
  ["metodo.html", "Método"],
  ["labs.html", "LABs"],
  ["ecossistema.html", "Ecossistema"],
  ["sobre.html", "Sobre"],
];

const waLink = (msg = WA_DEFAULT_MSG) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

const WA_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.43-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.23 9.43-9.44 9.43zm8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.8.72.7 5.8.7 12.07c0 2 .52 3.95 1.52 5.67L.6 23.28l5.67-1.49a11.33 11.33 0 0 0 5.78 1.47h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.33-8.02z"/></svg>`;

// Marca ModuLAB: quadrado aberto com o ponto (recriado em SVG a partir do logo oficial)
const LOGO = `<svg class="logo-mark" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="5" aria-hidden="true">
  <path d="M4 50V4h92v92H4V60M4 50h32"/>
  <circle cx="50" cy="50" r="9" fill="currentColor" stroke="none"/>
</svg>`;

function renderHeader() {
  const page = (p) => (p.split("/").pop() || "index").replace(/\.html$/, "");
  const here = page(location.pathname);
  const links = PAGES.map(([href, label]) =>
    `<li><a href="${href}"${page(href) === here ? ' aria-current="page"' : ""}>${label}</a></li>`
  ).join("");
  const el = document.querySelector("[data-header]");
  if (!el) return;
  el.outerHTML = `
  <header class="site-header">
    <div class="wrap nav">
      <a class="logo" href="index.html" aria-label="ModuLAB, início">${LOGO}<span>ModuLAB</span></a>
      <button class="nav-toggle" aria-label="Abrir menu" aria-expanded="false">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
      <ul class="nav-links">
        ${links}
        <li><a class="btn sm" href="contato.html">Fale com a gente</a></li>
      </ul>
    </div>
  </header>`;
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-links");
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
}

function renderFooter() {
  const el = document.querySelector("[data-footer]");
  if (!el) return;
  el.outerHTML = `
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <a class="logo" href="index.html">${LOGO}<span>ModuLAB</span></a>
          <p>Conhecimento aplicado em CRM Marketing, para o seu time aprender, executar e evoluir.</p>
        </div>
        <div>
          <h4>Navegação</h4>
          <ul>${PAGES.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join("")}</ul>
        </div>
        <div>
          <h4>LABs</h4>
          <ul>
            <li><a href="labs.html#crm">CRM LAB</a></li>
            <li><a href="labs.html#ai">AI LAB</a></li>
            <li><a href="labs.html#data">DATA LAB</a></li>
          </ul>
        </div>
        <div>
          <h4>Contato</h4>
          <ul>
            <li><a href="${waLink()}" target="_blank" rel="noopener">WhatsApp</a></li>
            <li><a href="https://www.linkedin.com/" target="_blank" rel="noopener">LinkedIn</a></li>
            <li><a href="contato.html">Formulário</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} ModuLAB. Todos os direitos reservados.</span>
        <span>Feito no Brasil.</span>
      </div>
    </div>
  </footer>
  <a class="wa-float" href="${waLink()}" target="_blank" rel="noopener" aria-label="Conversar no WhatsApp">${WA_ICON}</a>`;
}

function wireWhatsAppLinks() {
  document.querySelectorAll("[data-wa]").forEach((a) => {
    a.href = waLink(a.dataset.wa || WA_DEFAULT_MSG);
    a.target = "_blank";
    a.rel = "noopener";
  });
}

function wireContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;
  const params = new URLSearchParams(location.search);
  const pre = params.get("programa");
  if (pre && form.interesse) form.interesse.value = pre;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    const fields = [
      ["Nome", d.nome],
      ["Empresa", d.empresa],
      ["Cargo", d.cargo],
      ["Time de CRM", d.time],
      ["Interesse", d.interesse],
    ].filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`);
    let msg = ["Olá! Vim pelo site do ModuLAB.", "", ...fields].join("\n");
    if (d.mensagem) msg += `\n\nContexto: ${d.mensagem}`;
    window.open(waLink(msg), "_blank", "noopener");
  });
}

renderHeader();
renderFooter();
wireWhatsAppLinks();
wireContactForm();
