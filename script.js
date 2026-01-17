const arlCheck = document.getElementById("arlCheck");
const arlNivel = document.getElementById("arlNivel");
const ccfCheck = document.getElementById("ccfCheck");
const ccfPorcentaje = document.getElementById("ccfPorcentaje");

arlCheck.addEventListener("change", () => {
  arlNivel.disabled = !arlCheck.checked;
});

ccfCheck.addEventListener("change", () => {
  ccfPorcentaje.disabled = !ccfCheck.checked;
});

function calcular() {
  const ingreso = Number(document.getElementById("ingreso").value);
  if (!ingreso || ingreso <= 0) {
    alert("Ingrese un valor válido");
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

  document.getElementById("resultado").innerHTML = `
    <h3>Resultado</h3>
    <p>IBC: $${ibc.toLocaleString()}</p>
    <p>Salud: $${salud.toLocaleString()}</p>
    <p>Pensión: $${pension.toLocaleString()}</p>
    <p>ARL: $${arl.toLocaleString()}</p>
    <p>CCF: $${ccf.toLocaleString()}</p>
    <h4>Total: $${total.toLocaleString()}</h4>
  `;
}
