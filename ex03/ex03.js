function calcularTotal(valor, parcelas) {
    if (parcelas <= 3) {
        return valor;
    }
    return valor * 1.02 ** parcelas;
}
function simularParcelamento(preco, entrada) {
    let financiado = preco;
    if (typeof entrada !== 'undefined') {
        financiado = preco - entrada;
    }
    let linhas = '';
    for (let p = 1; p <= 12; p++) {
        if (p === 7 || p === 8 || p === 9 || p === 11) {
            continue;
        }
        const total = calcularTotal(financiado, p);
        const valorParcela = total / p;
        if (valorParcela < 50) {
            break;
        }
        const juros = p <= 3 ? 'sem juros' : '2% a.m.';
        linhas += `<tr><td>${p}x</td><td>R$ ${valorParcela.toFixed(2)}</td><td>R$ ${total.toFixed(2)}</td><td>${juros}</td></tr>`;
    }
    return linhas;
}
const btn = document.getElementById('simular');
btn?.addEventListener('click', () => {
    const precoEl = document.getElementById('preco');
    const entradaEl = document.getElementById('entrada');
    const resultado = document.getElementById('resultado');
    const corpo = document.getElementById('parcelas');
    const preco = Number(precoEl.value);
    if (entradaEl.value === '') {
        const financiado = preco;
        const linhas = simularParcelamento(preco);
        resultado.textContent = `Valor financiado: R$ ${financiado.toFixed(2)}`;
        corpo.innerHTML = linhas;
        return;
    }
    const entrada = Number(entradaEl.value);
    if (entrada >= preco) {
        resultado.textContent = 'A entrada cobre o valor total. Não há parcelas.';
        corpo.innerHTML = '';
        return;
    }
    const financiado = preco - entrada;
    const linhas = simularParcelamento(preco, entrada);
    resultado.textContent = `Valor financiado: R$ ${financiado.toFixed(2)}`;
    corpo.innerHTML = linhas;
});
export {};
//# sourceMappingURL=ex03.js.map