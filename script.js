// ===============================
// CONSTANTES
// ===============================

// SMMLV 2026
const SMMLV_2026 = 1750905;

// ===============================
// UTILIDAD – FORMATEO MONEDA COP
// ===============================
function formatoCOP(valor) {
  return Math.round(valor).toLocaleString("es-CO");
}

// ===============================
// ELEMENTOS DEL DOM
// ===============================
const ingresoInput = document.getElementById("ingreso");
const arlCheck = document.getElementById("arlCheck");
const arlNivel = document.getElementById("arlNivel");
const ccfCheck = document.getElementById("ccfCheck");
const ccfPorcentaje = document.getElementById("ccfPorcentaje");
const resultadoDiv = document.getElementById("resultado");

// ===============================
// FORMATO INPUT INGRESO
// ===============================
ingresoInput.addEventListener("input", () => {
  let valor = ingresoInput.value.replace(/\D/g, "");
  if (valor === "") {
    ingresoInput.value = "";
    return;
  }
  ingresoInput.value = "$" + Number(valor).toLocaleString("es-CO");
});

// ===============================
// EVENTOS DE CHECKBOX
// ===============================
arlCheck.addEventListener("change", () => {
  arlNivel.disabled = !arlCheck.checked;
  if (!arlCheck.checked) arlNivel.value = "";
});

ccfCheck.addEventListener("change", () => {
  ccfPorcentaje.disabled = !ccfCheck.checked;
  if (!ccfCheck.checked) ccfPorcentaje.value = "";
});

// ===============================
// FUNCIÓN CALCULAR
// ===============================
function calcular() {
  const ingreso = Number(ingresoInput.value.replace(/\D/g, ""));

  if (!ingreso || ingreso <= 0) {
    alert("Ingrese un valor válido.");
    return;
  }

  // ====== CÁLCULO IBC ======
  let ibcCalculado = ingreso * 0.4;

  // Asegurar que IBC nunca sea menor que SMMLV
  let ibcCalculado = ingreso * 0.4;
let aplicaMinimo = false;

let ibc;
if (ibcCalculado < SMMLV_2026) {
  ibc = SMMLV_2026;
  aplicaMinimo = true;
} else {
  ibc = ibcCalculado;
}

  // ====== APORTES ======
  const salud = ibc * 0.125;
  const pension = ibc * 0.16;

  let arl = 0;
  if (arlCheck.checked && arlNivel.value) {
    arl = ibc * (arlNivel.value / 100);
  }

  let ccf = 0;
  if (ccfCheck.checked && ccfPorcentaje.value) {
    ccf = ibc * (ccfPorcentaje.value / 100);
  }

  const total = salud + pension + arl + ccf;

  // ====== MOSTRAR RESULTADOS ======
  resultadoDiv.innerHTML = `
  <h3>Resultado</h3>
  <p><strong>IBC:</strong> $${formatoCOP(ibc)}</p>

  ${aplicaMinimo ? `
    <p class="alerta">
      ⚠️ El IBC se ajustó al salario mínimo legal vigente 2026
      ($${formatoCOP(SMMLV_2026)}), conforme a la normativa colombiana.
    </p>
  ` : ""}

  <p>Salud (12.5%): $${formatoCOP(salud)}</p>
  <p>Pensión (16%): $${formatoCOP(pension)}</p>
  <p>ARL: $${formatoCOP(arl)}</p>
  <p>CCF: $${formatoCOP(ccf)}</p>
  <hr>
  <h4>Total a pagar: $${formatoCOP(total)}</h4>
`;
}

// ===============================
// FUNCIÓN NUEVO CÁLCULO
// ===============================
function nuevoCalculo() {
  ingresoInput.value = "";
  arlCheck.checked = false;
  ccfCheck.checked = false;
  arlNivel.value = "";
  ccfPorcentaje.value = "";
  arlNivel.disabled = true;
  ccfPorcentaje.disabled = true;
  resultadoDiv.innerHTML = "";
}
