const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#navigation");
function closeMenu(restoreFocus = false) {
  menu.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  if (restoreFocus) menuButton.focus();
}
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menu.classList.toggle("open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
});
menu.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.classList.contains("open"))
    closeMenu(true);
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".nav-wrap")) closeMenu();
});
document.addEventListener("focusin", (event) => {
  if (!event.target.closest(".nav-wrap")) closeMenu();
});
matchMedia("(min-width: 761px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});
const current = location.pathname.split("/").pop() || "index.html";
menu.querySelectorAll("a").forEach((link) => {
  if (link.getAttribute("href") === current)
    link.setAttribute("aria-current", "page");
});

const balance = document.querySelector("#balance");
const risk = document.querySelector("#risk");
if (balance && risk) {
  const updateRisk = () => {
    const valid = balance.value !== "" && balance.validity.valid;
    document.querySelector("#risk-percent").textContent =
      `${Number(risk.value).toFixed(1)}%`;
    document.querySelector("#risk-result").textContent = valid
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format((Number(balance.value) * Number(risk.value)) / 100)
      : "—";
  };
  balance.addEventListener("input", updateRisk);
  risk.addEventListener("input", updateRisk);
  updateRisk();
}

const search = document.querySelector("#faq-search");
if (search) {
  let category = "All questions";
  const filters = document.querySelectorAll("[data-filter]");
  const items = document.querySelectorAll(".faq-item");
  const filter = () => {
    const query = search.value.toLocaleLowerCase().trim();
    let count = 0;
    items.forEach((item) => {
      const visible =
        (category === "All questions" || item.dataset.category === category) &&
        item.textContent.toLocaleLowerCase().includes(query);
      item.hidden = !visible;
      if (visible) count++;
    });
    document.querySelector("#faq-count").textContent =
      `${count} ${count === 1 ? "question" : "questions"}`;
    document.querySelector(".empty-state").hidden = count !== 0;
  };
  filters.forEach((button) =>
    button.addEventListener("click", () => {
      category = button.dataset.filter;
      filters.forEach((other) =>
        other.setAttribute("aria-pressed", String(other === button)),
      );
      filter();
    }),
  );
  search.addEventListener("input", filter);
  document.querySelector("#reset-search").addEventListener("click", () => {
    search.value = "";
    category = "All questions";
    filters.forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.filter === category),
      ),
    );
    filter();
    search.focus();
  });
}

const form = document.querySelector(".contact-form");
if (form) {
  if (new URLSearchParams(location.search).get("topic") === "Android")
    form.elements.topic.value = "Android interest";
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submit = form.querySelector("button[type=submit]");
    const status = form.querySelector(".form-status");
    if (!form.reportValidity() || submit.disabled) return;
    submit.disabled = true;
    submit.setAttribute("aria-busy", "true");
    status.hidden = false;
    status.classList.remove("error");
    status.textContent = "Sending your message…";
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Message submission failed");
      status.textContent =
        "Your message is on its way. We’ll reply to your email as soon as we can.";
      form.reset();
    } catch {
      status.classList.add("error");
      status.textContent =
        "Your message couldn’t be sent. Please try again, or email support@elhamamini.cc. Your message is still here.";
    } finally {
      submit.disabled = false;
      submit.removeAttribute("aria-busy");
    }
  });
}
