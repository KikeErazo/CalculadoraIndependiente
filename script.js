const SMMLV_2026 = 1423500;

const ingresoInput = document.getElementById("ingreso");
const arlCheck = document.getElementById("arlCheck");
const arlNivelBox = document.getElementById("arlNivelBox");
const ccfCheck = document.getElementById("ccfCheck");
const ccfPorcentajeBox = document.getElementById("ccfPorcentajeBox");
const resultadoDiv = document.getElementById("resultado");

arlCheck.addEventListener("change", () => {
    arlNivelBox.classList.toggle("oculto", arlCheck.value === "no");
});

ccfCheck.addEventListener("change", () => {
    ccfPorcentajeBox.classList.toggle("oculto", ccfCheck.value === "no");
});

ingresoInput.addEventListener("input", () => {
    let valor = ingresoInput.value.replace(/\D/g, "");
    ingresoInput.value = valor ? formatoMoneda(valor) : "";
});

function formatoMoneda(valor) {
    return "$ " + Number(valor).toLocaleString("es-CO");
}

function formatoCOP(valor) {
    return Math.round(valor).toLocaleString("es-CO");
}

function calcular() {
    const ingreso = Number(ingresoInput.value.replace(/\D/g, ""));
    if (!ingreso) return;

    let ibcCalculado = ingreso * 0.4;
    let aplicaMinimo = ibcCalculado < SMMLV_2026;
    let ibc = aplicaMinimo ? SMMLV_2026 : ibcCalculado;

    let salud = ibc * 0.125;
    let pension = ibc * 0.16;

    let arl = 0;
    if (arlCheck.value === "si") {
        const porcentajeArl = document.getElementById("arlNivel").value / 100;
        arl = ibc * porcentajeArl;
    }

    let ccf = 0;
    if (ccfCheck.value === "si") {
        const porcentajeCcf = document.getElementById("ccfPorcentaje").value / 100;
        ccf = ibc * porcentajeCcf;
    }

    let total = salud + pension + arl + ccf;

    resultadoDiv.innerHTML = `
        ${aplicaMinimo ? `
        <div class="alerta">
            El IBC fue ajustado al salario mínimo legal vigente 2026
            ($${formatoCOP(SMMLV_2026)}).
        </div>` : ""}

        <div>IBC: $${formatoCOP(ibc)}</div>
        <div>Salud (12.5%): $${formatoCOP(salud)}</div>
        <div>Pensión (16%): $${formatoCOP(pension)}</div>
        <div>ARL: $${formatoCOP(arl)}</div>
        <div>CCF: $${formatoCOP(ccf)}</div>
        <div class="total">Total a pagar: $${formatoCOP(total)}</div>
    `;
}

function nuevoCalculo() {
    ingresoInput.value = "";
    resultadoDiv.innerHTML = "";
    arlCheck.value = "no";
    ccfCheck.value = "no";
    arlNivelBox.classList.add("oculto");
    ccfPorcentajeBox.classList.add("oculto");
}
