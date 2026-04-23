(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Footer year
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav
  const navRoot = $(".topNav");
  const toggle = $("[data-nav-toggle]");
  const mobileNav = $("#mobileNav");

  const setNavOpen = (open) => {
    if (!navRoot) return;
    navRoot.classList.toggle("is-open", open);
    toggle?.setAttribute("aria-expanded", String(open));
    mobileNav?.setAttribute("aria-hidden", String(!open));
  };

  toggle?.addEventListener("click", () => {
    const open = navRoot?.classList.contains("is-open") ?? false;
    setNavOpen(!open);
  });

  // Close on link click
  $$(".mobileNav__link", mobileNav ?? document).forEach((a) => {
    a.addEventListener("click", () => setNavOpen(false));
  });

  // Smooth anchor scroll with reduced-motion respect
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  const headerOffset = () => (navRoot ? navRoot.getBoundingClientRect().height : 0);

  const scrollToHash = (hash) => {
    const id = hash?.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    const y = window.scrollY + el.getBoundingClientRect().top - headerOffset() - 10;
    window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
  };

  $$('a[href^="#"]').forEach((a) => {
    const href = a.getAttribute("href") ?? "";
    if (href.length <= 1) return;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToHash(href);
      history.pushState(null, "", href);
    });
  });

  // Reveal on scroll
  const revealEls = $$("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }
})();

