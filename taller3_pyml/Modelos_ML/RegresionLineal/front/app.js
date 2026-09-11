// =============================================
// CONFIGURACION
// =============================================
const API_URL = "https://machinelearning-production-f58d.up.railway.app";

// =============================================
// SINCRONIZAR SLIDER <-> INPUT
// =============================================
const areaInput = document.getElementById("area");
const slider    = document.getElementById("slider");
const sliderVal = document.getElementById("slider-value");

areaInput.value = slider.value;

slider.addEventListener("input", function () {
  areaInput.value = slider.value;
  sliderVal.textContent = slider.value + " m\u00B2";
});

areaInput.addEventListener("input", function () {
  var v = parseFloat(areaInput.value);
  if (!isNaN(v) && v >= 10 && v <= 500) {
    slider.value = v;
    sliderVal.textContent = v + " m\u00B2";
  }
});

// =============================================
// TIMEOUT COMPATIBLE CON TODOS LOS NAVEGADORES
// =============================================
function fetchWithTimeout(url, options, ms) {
  return new Promise(function (resolve, reject) {
    var timer = setTimeout(function () {
      reject(new Error("timeout"));
    }, ms);
    fetch(url, options)
      .then(function (res) { clearTimeout(timer); resolve(res); })
      .catch(function (err) { clearTimeout(timer); reject(err); });
  });
}

// =============================================
// VERIFICAR ESTADO DE LA API (no bloquea el boton)
// =============================================
function checkAPIStatus() {
  var dot  = document.getElementById("api-status");
  var text = document.getElementById("api-status-text");
  dot.className = "status-dot checking";
  text.textContent = "Verificando API...";

  fetchWithTimeout(API_URL + "/", {}, 6000)
    .then(function (res) {
      if (res.ok) {
        dot.className = "status-dot online";
        text.textContent = "API conectada y lista";
      } else {
        throw new Error("no ok");
      }
    })
    .catch(function () {
      dot.className = "status-dot offline";
      text.textContent = "API no disponible";
    });
}

// =============================================
// PREDECIR
// =============================================
function predict() {
  var area = parseFloat(areaInput.value);

  if (isNaN(area) || area <= 0) {
    showError("Ingresa un valor valido de superficie (m\u00B2).");
    return;
  }
  if (area < 10 || area > 500) {
    showError("El area debe estar entre 10 y 500 m\u00B2.");
    return;
  }

  hideResult();
  hideError();
  setLoading(true);

  fetchWithTimeout(
    API_URL + "/predict",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ area_m2: area })
    },
    10000
  )
    .then(function (res) {
      if (!res.ok) {
        return res.json().catch(function () { return {}; }).then(function (err) {
          throw new Error(err.detail || "Error del servidor (" + res.status + ")");
        });
      }
      return res.json();
    })
    .then(function (data) {
      showResult(data.area_m2, data.predicted_price);
    })
    .catch(function (err) {
      if (err.message === "timeout") {
        showError("El servidor tardo demasiado. Verifica que la API este activa.");
      } else {
        showError(err.message || "No se pudo conectar con el servidor.");
      }
    })
    .finally(function () {
      setLoading(false);
    });
}

// =============================================
// HELPERS UI
// =============================================
function setLoading(loading) {
  var btn     = document.getElementById("predict-btn");
  var btnText = document.getElementById("btn-text");
  var spinner = document.getElementById("btn-spinner");
  btn.disabled = loading;
  btnText.textContent = loading ? "Calculando..." : "\uD83D\uDD0D Predecir Precio";
  if (loading) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
}

function showResult(area, price) {
  var card    = document.getElementById("result-card");
  var priceEl = document.getElementById("result-price");
  var detail  = document.getElementById("result-detail");

  var formatted = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);

  priceEl.textContent = formatted;
  detail.textContent  = "Para una vivienda de " + area + " m\u00B2 \u2014 " +
    Math.round(price / area).toLocaleString("es-CO") + " COP/m\u00B2";
  card.classList.remove("hidden");
}

function hideResult() {
  document.getElementById("result-card").classList.add("hidden");
}

function showError(msg) {
  document.getElementById("error-msg").textContent = msg;
  document.getElementById("error-card").classList.remove("hidden");
}

function hideError() {
  document.getElementById("error-card").classList.add("hidden");
}

// =============================================
// ENTER para predecir
// =============================================
areaInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") predict();
});

// =============================================
// INICIAR
// =============================================
window.addEventListener("DOMContentLoaded", checkAPIStatus);
