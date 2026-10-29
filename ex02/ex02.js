function tarifaPorKwh(tipo) {
    switch (tipo) {
        case 'residencial':
        case 'rural':
            return 0.8;
        case 'comercial':
        case 'industrial':
            return 0.95;
    }
}
function adicionalBandeira(consumo, bandeira = 'verde') {
    switch (bandeira) {
        case 'verde':
            return 0;
        case 'amarela':
            return consumo * 0.02;
        case 'vermelha1':
            return consumo * 0.04;
        case 'vermelha2':
            return consumo * 0.08;
    }
}
// Teste do parâmetro padrão: adicionalBandeira(100) devolve 0,
// porque a bandeira padrão é 'verde', cujo adicional por kWh é R$ 0,00.
console.log(adicionalBandeira(100));
function mensagemBandeira(bandeira) {
    switch (bandeira) {
        case 'verde':
            return 'Condições favoráveis de geração de energia.';
        case 'amarela':
            return 'Condições de geração menos favoráveis.';
        case 'vermelha1':
        case 'vermelha2':
            return 'Condições mais caras de geração. Economize!';
        default:
            return 'Bandeira desconhecida.';
    }
}
function nomeBandeira(bandeira) {
    switch (bandeira) {
        case 'verde':
            return 'verde';
        case 'amarela':
            return 'amarela';
        case 'vermelha1':
            return 'vermelha 1';
        case 'vermelha2':
            return 'vermelha 2';
    }
}
const btn = document.getElementById('calcular');
btn?.addEventListener('click', () => {
    const consumoEl = document.getElementById('consumo');
    const tipoEl = document.getElementById('tipo');
    const bandeiraEl = document.getElementById('bandeira');
    const resultado = document.getElementById('resultado');
    const consumo = Number(consumoEl.value);
    if (consumo <= 0) {
        resultado.textContent = 'Informe um consumo válido';
        resultado.className = 'erro';
        return;
    }
    const tipo = tipoEl.value;
    const bandeira = bandeiraEl.value;
    const energia = consumo * tarifaPorKwh(tipo);
    const adicional = adicionalBandeira(consumo, bandeira);
    const total = energia + adicional;
    const mensagem = mensagemBandeira(bandeira);
    resultado.textContent =
        `Energia: R$ ${energia.toFixed(2)}\n` +
            `Bandeira ${nomeBandeira(bandeira)}: R$ ${adicional.toFixed(2)}\n` +
            `Total: R$ ${total.toFixed(2)}\n` +
            mensagem;
    if (bandeira !== 'verde') {
        resultado.className = 'alerta';
    }
    else {
        resultado.className = '';
    }
});
export {};
//# sourceMappingURL=ex02.js.map