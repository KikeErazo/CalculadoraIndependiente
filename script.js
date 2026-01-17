// ===============================
// FORMATO MONEDA COP
// ===============================
function formatoCOP(valor) {
  return Math.round(valor).toLocaleString("es-CO");
}

// ===============================
// ELEMENTOS
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
// CHECKBOXES
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
// CALCULAR
// ===============================
function calcular() {
  const ingreso = Number(ingresoInput.value.replace(/\D/g, ""));

  if (!ingreso || ingreso <= 0) {
    alert("Ingrese un valor válido.");
    return;
  }

  const ibc = ingreso * 0.4;
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

  resultadoDiv.innerHTML = `
    <h3>Resultado</h3>
    <p><strong>IBC:</strong> $${formatoCOP(ibc)}</p>
    <p>Salud: $${formatoCOP(salud)}</p>
    <p>Pensión: $${formatoCOP(pension)}</p>
    <p>ARL: $${formatoCOP(arl)}</p>
    <p>CCF: $${formatoCOP(ccf)}</p>
    <hr>
    <h4>Total a pagar: $${formatoCOP(total)}</h4>
  `;
}

// ===============================
// NUEVO CÁLCULO
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
