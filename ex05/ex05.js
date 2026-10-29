const formatarReal = (valor) => {
    return `R$ ${valor.toFixed(2)}`;
};
function lerPrecos(texto) {
    const precos = [];
    let ignorados = 0;
    const linhas = texto.split('\n');
    for (let i = 0; i < linhas.length; i++) {
        const linha = linhas[i].trim();
        if (linha === '') {
            continue;
        }
        if (precos.length >= 20) {
            break;
        }
        const normalizada = linha.replace(',', '.');
        const valor = Number(normalizada);
        if (Number.isNaN(valor) || valor <= 0) {
            ignorados++;
            continue;
        }
        precos.push(valor);
    }
    return { precos: precos, ignorados: ignorados };
}
function somarItens(...precos) {
    let total = 0;
    for (const p of precos) {
        total += p;
    }
    return total;
}
function calcularDesconto(total, arg) {
    if (typeof arg === 'number') {
        return (total * arg) / 100;
    }
    const codigo = arg.toUpperCase();
    switch (codigo) {
        case 'BEMVINDO':
            return (total * 10) / 100;
        case 'PROMO20':
            return (total * 20) / 100;
        case 'MENOS15':
            if (total >= 100) {
                return 15;
            }
            return 0;
        default:
            return 0;
    }
}
function cupomValido(total, cupom) {
    const codigo = cupom.toUpperCase();
    switch (codigo) {
        case 'BEMVINDO':
        case 'PROMO20':
            return true;
        case 'MENOS15':
            return total >= 100;
        default:
            return false;
    }
}
const btn = document.getElementById('fechar');
btn?.addEventListener('click', () => {
    const itensEl = document.getElementById('itens');
    const cupomEl = document.getElementById('cupom');
    const fidEl = document.getElementById('fidelidade');
    const resultado = document.getElementById('resultado');
    const leitura = lerPrecos(itensEl.value);
    const precos = leitura.precos;
    const ignorados = leitura.ignorados;
    if (precos.length === 0) {
        resultado.textContent = 'Nenhum item válido';
        resultado.className = 'erro';
        return;
    }
    const subtotal = somarItens(...precos);
    const cupom = cupomEl.value.trim();
    let descontoCupom = 0;
    let linhaCupom = '';
    if (cupom !== '') {
        descontoCupom = calcularDesconto(subtotal, cupom);
        if (descontoCupom > 0 && cupomValido(subtotal, cupom)) {
            linhaCupom = `Cupom ${cupom.toUpperCase()}: - ${formatarReal(descontoCupom)}\n`;
        }
        else {
            linhaCupom = 'Cupom inválido ou não aplicável.\n';
            descontoCupom = 0;
        }
    }
    const baseFidelidade = subtotal - descontoCupom;
    let descontoFid = 0;
    let linhaFid = '';
    if (fidEl.checked) {
        descontoFid = calcularDesconto(baseFidelidade, 5);
        linhaFid = `Fidelidade (5%): - ${formatarReal(descontoFid)}\n`;
    }
    const total = subtotal - descontoCupom - descontoFid;
    const rotuloItens = precos.length === 1 ? 'item' : 'itens';
    let primeira = `Itens: ${precos.length} ${rotuloItens}`;
    if (ignorados > 0) {
        primeira += ` (${ignorados} ${ignorados === 1 ? 'linha ignorada' : 'linhas ignoradas'})`;
    }
    resultado.textContent =
        `${primeira}\n` +
            `Subtotal: ${formatarReal(subtotal)}\n` +
            linhaCupom +
            linhaFid +
            `Total a pagar: ${formatarReal(total)}`;
    resultado.className = '';
});
export {};
//# sourceMappingURL=ex05.js.map