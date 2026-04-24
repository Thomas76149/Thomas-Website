(() => {
  const raw = typeof window.FUN_SITE_URL === "string" ? window.FUN_SITE_URL.trim() : "";
  if (!raw) return;
  const base = raw.replace(/\/$/, "");
  document.querySelectorAll("a[data-fun-hub]").forEach((a) => {
    a.href = `${base}/`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  });
})();
