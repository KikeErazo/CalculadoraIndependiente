// ===============================
// UTILIDAD FORMATO MONEDA (COP)
// ===============================
function formatoCOP(valor) {
  return Math.round(valor).toLocaleString('es-CO');
}

// ===============================
// REFERENCIAS A ELEMENTOS
// ===============================
const arlCheck = document.getElementById("arlCheck");
const arlNivel = document.getElementById("arlNivel");
const ccfCheck = document.getElementById("ccfCheck");
const ccfPorcentaje = document.getElementById("ccfPorcentaje");
const ingresoInput = document.getElementById("ingreso");
const resultadoDiv = document.getElementById("resultado");

// ===============================
// EVENTOS CHECKBOX
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
// FUNCIÓN PRINCIPAL
// ===============================
function calcular() {
  const ingreso = Number(ingresoInput.value);

  if (!ingreso || ingreso <= 0) {
    alert("Por favor ingrese un ingreso mensual válido.");
    return;
  }

  // IBC = 40% del ingreso
  const ibc = ingreso * 0.4;

  // Aportes obligatorios
  const salud = ibc * 0.125;
  const pension = ibc * 0.16;

  // ARL (si aplica)
  let arl = 0;
  if (arlCheck.checked && arlNivel.value) {
    arl = ibc * (Number(arlNivel.value) / 100);
  }

  // Caja de compensación (si aplica)
  let ccf = 0;
  if (ccfCheck.checked && ccfPorcentaje.value) {
    ccf = ibc * (Number(ccfPorcentaje.value) / 100);
  }

  // Total
  const total = salud + pension + arl + ccf;

  // ===============================
  // MOSTRAR RESULTADOS
  // ===============================
  resultadoDiv.innerHTML = `
    <h3>Resultado del cálculo</h3>
    <p><strong>IBC (40%):</strong> $${formatoCOP(ibc)}</p>
    <p><strong>Salud (12.5%):</strong> $${formatoCOP(salud)}</p>
    <p><strong>Pensión (16%):</strong> $${formatoCOP(pension)}</p>
    <p><strong>ARL:</strong> $${formatoCOP(arl)}</p>
    <p><strong>Caja de Compensación:</strong> $${formatoCOP(ccf)}</p>
    <hr>
    <h4>Total a pagar: $${formatoCOP(total)}</h4>
  `;
}
