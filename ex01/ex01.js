function calcularMedia(n1, n2) {
    return (n1 + n2) / 2;
}
function dadosValidos(n1, n2, frequencia) {
    if (n1 < 0 || n1 > 10 || n2 < 0 || n2 > 10 || frequencia < 0 || frequencia > 100) {
        return false;
    }
    return true;
}
function situacao(media, frequencia) {
    if (frequencia < 75) {
        return 'Reprovado por falta';
    }
    else if (media >= 7) {
        return 'Aprovado';
    }
    else if (media >= 4) {
        const falta = 10 - media;
        return `Exame final (precisa tirar ${falta.toFixed(1)})`;
    }
    else {
        return 'Reprovado por nota';
    }
}
const btn = document.getElementById('calcular');
btn?.addEventListener('click', () => {
    const nomeEl = document.getElementById('nome');
    const n1El = document.getElementById('n1');
    const n2El = document.getElementById('n2');
    const freqEl = document.getElementById('frequencia');
    const resultado = document.getElementById('resultado');
    const nome = nomeEl.value.trim();
    const n1 = Number(n1El.value);
    const n2 = Number(n2El.value);
    const frequencia = Number(freqEl.value);
    if (!dadosValidos(n1, n2, frequencia)) {
        resultado.textContent = 'Dados inválidos';
        resultado.className = 'erro';
        return;
    }
    const media = calcularMedia(n1, n2);
    const sit = situacao(media, frequencia);
    resultado.textContent = `${nome}: média ${media.toFixed(1)}. ${sit}`;
    resultado.className = sit === 'Aprovado' ? 'sucesso' : 'erro';
});
export {};
//# sourceMappingURL=ex01.js.map