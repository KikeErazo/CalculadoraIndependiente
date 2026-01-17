const ingresoInput = document.getElementById("ingreso");

// SMLMV 2026 (ajústalo si cambia)
const SMLMV_2026 = 1600000;

ingresoInput.addEventListener("input", () => {
    let valor = ingresoInput.value.replace(/\D/g, "");
    ingresoInput.value = formatoPesos(valor);
});

function formatoPesos(valor) {
    if (!valor) return "";
    return "$" + Number(valor).toLocaleString("es-CO");
}

function calcular() {
    let ingreso = ingresoInput.value.replace(/\D/g, "");
    if (!ingreso) return;

    ingreso = Number(ingreso);

    // IBC = 40% del ingreso
    let ibc = ingreso * 0.4;

    // IBC mínimo = SMLMV 2026
    if (ibc < SMLMV_2026) {
        ibc = SMLMV_2026;
    }

    const salud = ibc * 0.125;
    const pension = ibc * 0.16;

    const arlPorc = Number(document.getElementById("arl").value);
    const arl = ibc * arlPorc;

    const ccfPorc = Number(document.getElementById("ccf").value);
    const ccf = ibc * ccfPorc;

    const total = salud + pension + arl + ccf;

    const resultado = document.getElementById("resultado");
    resultado.classList.remove("oculto");

    resultado.innerHTML = `
        <div>IBC aplicado: ${formatoPesos(ibc)}</div>
        <div>Salud (12.5%): ${formatoPesos(Math.round(salud))}</div>
        <div>Pensión (16%): ${formatoPesos(Math.round(pension))}</div>
        <div>ARL: ${formatoPesos(Math.round(arl))}</div>
        <div>Caja de Compensación: ${formatoPesos(Math.round(ccf))}</div>
        <div class="total">TOTAL A PAGAR: ${formatoPesos(Math.round(total))}</div>
    `;
}

function nuevoCalculo() {
    ingresoInput.value = "";
    document.getElementById("arl").value = "0";
    document.getElementById("ccf").value = "0";
    document.getElementById("resultado").classList.add("oculto");
}
