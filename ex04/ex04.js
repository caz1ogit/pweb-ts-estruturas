const formatarReal = (valor) => {
    return `R$ ${valor.toFixed(2)}`;
};
function formatarMeses(meses) {
    if (meses < 12) {
        return `${meses} ${meses === 1 ? 'mês' : 'meses'}`;
    }
    const anos = Math.floor(meses / 12);
    const resto = meses % 12;
    const parteAnos = `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
    if (resto === 0) {
        return parteAnos;
    }
    const parteMeses = `${resto} ${resto === 1 ? 'mês' : 'meses'}`;
    return `${parteAnos} e ${parteMeses}`;
}
function calcularMeses(meta, deposito, taxa = 0.5) {
    let saldo = 0;
    let depositado = 0;
    let meses = 0;
    while (saldo < meta) {
        meses++;
        if (meses > 600) {
            break;
        }
        saldo = saldo * (1 + taxa / 100) + deposito;
        depositado += deposito;
        if (meses % 12 === 0) {
            saldo += deposito;
            depositado += deposito;
        }
        if (meses >= 600) {
            break;
        }
    }
    return { meses: meses, saldo: saldo, depositado: depositado };
}
function exibirValor(rotulo, valor, formatar) {
    return `${rotulo}: ${formatar(valor)}`;
}
const btn = document.getElementById('calcular');
btn?.addEventListener('click', () => {
    const metaEl = document.getElementById('meta');
    const depositoEl = document.getElementById('deposito');
    const taxaEl = document.getElementById('taxa');
    const resultado = document.getElementById('resultado');
    const meta = Number(metaEl.value);
    const deposito = Number(depositoEl.value);
    if (meta <= 0 || deposito <= 0) {
        resultado.textContent = 'Informe valores positivos';
        resultado.className = 'erro';
        return;
    }
    let calc;
    if (taxaEl.value === '') {
        calc = calcularMeses(meta, deposito);
    }
    else {
        const taxa = Number(taxaEl.value);
        calc = calcularMeses(meta, deposito, taxa);
    }
    if (calc.saldo >= meta) {
        const rendimento = calc.saldo - calc.depositado;
        resultado.textContent =
            `Você atinge a meta em ${calc.meses} meses (${formatarMeses(calc.meses)}).\n` +
                `${exibirValor('Saldo final', calc.saldo, formatarReal)}\n` +
                `${exibirValor('Total depositado', calc.depositado, formatarReal)}\n` +
                `${exibirValor('Rendimento', rendimento, formatarReal)}`;
        resultado.className = 'sucesso';
    }
    else {
        resultado.textContent =
            `Meta inalcançável em 50 anos. ` +
                `${exibirValor('Saldo após 600 meses', calc.saldo, formatarReal)}`;
        resultado.className = 'erro';
    }
});
export {};
//# sourceMappingURL=ex04.js.map