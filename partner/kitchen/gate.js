/* 도입 매장만. 값은 해시로만 둔다. */
(function () {
  var HASH = "da0940a5d499682956595b6268fad50f4a3ff829860f0e70b03ee41286139b4e";
  var KEY = "sb_kitchen_ok";
  var gate = document.getElementById("gate");
  var app = document.getElementById("app");
  var form = document.getElementById("gate-form");
  var err = document.getElementById("gate-err");

  function show() {
    if (gate) gate.hidden = true;
    if (app) app.hidden = false;
    document.documentElement.classList.add("in");
  }

  async function digest(text) {
    var buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf))
      .map(function (b) { return b.toString(16).padStart(2, "0"); })
      .join("");
  }

  try {
    if (sessionStorage.getItem(KEY) === "1") {
      show();
      return;
    }
  } catch (e) { /* private mode */ }

  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var input = document.getElementById("gate-pw");
    var pw = input ? String(input.value || "") : "";
    digest(pw.trim()).then(function (h) {
      if (h === HASH) {
        try { sessionStorage.setItem(KEY, "1"); } catch (e2) {}
        show();
      } else if (err) {
        err.hidden = false;
      }
    }).catch(function () {
      if (err) {
        err.textContent = "이 브라우저에서는 잠금을 열 수 없습니다. 크롬으로 열어 주십시오.";
        err.hidden = false;
      }
    });
  });
})();
