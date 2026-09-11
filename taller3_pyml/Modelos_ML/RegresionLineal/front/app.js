// =============================================
// CONFIGURACION - cambia esto por tu URL de Railway
// =============================================
const API_URL = "https://TU-URL.up.railway.app";
// Ejemplo: const API_URL = "https://regresionlineal-production.up.railway.app";

// =============================================
// SINCRONIZAR SLIDER <-> INPUT
// =============================================
const areaInput  = document.getElementById("area");
const slider     = document.getElementById("slider");
const sliderVal  = document.getElementById("slider-value");

// Inicializar input con valor del slider
areaInput.value = slider.value;

slider.addEventListener("input", () => {
  areaInput.value   = slider.value;
  sliderVal.textContent = slider.value + " m²";
});

areaInput.addEventListener("input", () => {
  const v = parseFloat(areaInput.value);
  if (!isNaN(v) && v >= 10 && v <= 500) {
    slider.value = v;
    sliderVal.textContent = v + " m²";
  }
});

// =============================================
// VERIFICAR ESTADO DE LA API AL CARGAR
// =============================================
async function checkAPIStatus() {
  const dot  = document.getElementById("api-status");
  const text = document.getElementById("api-status-text");
  dot.className  = "status-dot checking";
  text.textContent = "Verificando API...";

  try {
    const res = await fetch(API_URL + "/", { signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      dot.className  = "status-dot online";
      text.textContent = "API conectada y lista";
    } else {
      throw new Error("respuesta no OK");
    }
  } catch {
    dot.className  = "status-dot offline";
    text.textContent = "API no disponible";
  }
}

// =============================================
// PREDECIR
// =============================================
async function predict() {
  const area = parseFloat(areaInput.value);

  // Validar input
  if (isNaN(area) || area <= 0) {
    showError("Ingresa un valor valido de superficie (m²).");
    return;
  }
  if (area < 10 || area > 500) {
    showError("El area debe estar entre 10 y 500 m².");
    return;
  }

  hideResult();
  hideError();
  setLoading(true);

  try {
    const res = await fetch(API_URL + "/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ area_m2: area }),
      signal: AbortSignal.timeout(8000)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Error del servidor (" + res.status + ")");
    }

    const data = await res.json();
    showResult(data.area_m2, data.predicted_price);

  } catch (err) {
    if (err.name === "TimeoutError") {
      showError("El servidor tardó demasiado. Verifica que la API esté activa.");
    } else {
      showError(err.message || "No se pudo conectar con el servidor.");
    }
  } finally {
    setLoading(false);
  }
}

// =============================================
// HELPERS UI
// =============================================
function setLoading(loading) {
  const btn     = document.getElementById("predict-btn");
  const btnText = document.getElementById("btn-text");
  const spinner = document.getElementById("btn-spinner");
  btn.disabled       = loading;
  btnText.textContent = loading ? "Calculando..." : "🔍 Predecir Precio";
  spinner.classList.toggle("hidden", !loading);
}

function showResult(area, price) {
  const card    = document.getElementById("result-card");
  const priceEl = document.getElementById("result-price");
  const detail  = document.getElementById("result-detail");

  // Formatear precio en COP
  const formatted = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);

  priceEl.textContent = formatted;
  detail.textContent  = Para una vivienda de  m² — {(price / area).toLocaleString("es-CO", {maximumFractionDigits: 0})} COP/m²;
  card.classList.remove("hidden");
}

function hideResult() {
  document.getElementById("result-card").classList.add("hidden");
}

function showError(msg) {
  const card = document.getElementById("error-card");
  document.getElementById("error-msg").textContent = msg;
  card.classList.remove("hidden");
}

function hideError() {
  document.getElementById("error-card").classList.add("hidden");
}

// =============================================
// ENTER para predecir
// =============================================
areaInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") predict();
});

// =============================================
// INICIAR
// =============================================
window.addEventListener("DOMContentLoaded", checkAPIStatus);
