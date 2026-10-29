function calcularTotal(valor: number, parcelas: number): number {
  if (parcelas <= 3) {
    return valor;
  }
  return valor * 1.02 ** parcelas;
}

function simularParcelamento(preco: number, entrada?: number): string {
  let financiado: number = preco;
  if (typeof entrada !== 'undefined') {
    financiado = preco - entrada;
  }
  let linhas: string = '';
  for (let p: number = 1; p <= 12; p++) {
    if (p === 7 || p === 8 || p === 9 || p === 11) {
      continue;
    }
    const total: number = calcularTotal(financiado, p);
    const valorParcela: number = total / p;
    if (valorParcela < 50) {
      break;
    }
    const juros: string = p <= 3 ? 'sem juros' : '2% a.m.';
    linhas += `<tr><td>${p}x</td><td>R$ ${valorParcela.toFixed(2)}</td><td>R$ ${total.toFixed(2)}</td><td>${juros}</td></tr>`;
  }
  return linhas;
}

const btn: HTMLElement | null = document.getElementById('simular');
btn?.addEventListener('click', (): void => {
  const precoEl: HTMLInputElement = document.getElementById('preco') as HTMLInputElement;
  const entradaEl: HTMLInputElement = document.getElementById('entrada') as HTMLInputElement;
  const resultado: HTMLElement = document.getElementById('resultado') as HTMLElement;
  const corpo: HTMLElement = document.getElementById('parcelas') as HTMLElement;

  const preco: number = Number(precoEl.value);

  if (entradaEl.value === '') {
    const financiado: number = preco;
    const linhas: string = simularParcelamento(preco);
    resultado.textContent = `Valor financiado: R$ ${financiado.toFixed(2)}`;
    corpo.innerHTML = linhas;
    return;
  }

  const entrada: number = Number(entradaEl.value);

  if (entrada >= preco) {
    resultado.textContent = 'A entrada cobre o valor total. Não há parcelas.';
    corpo.innerHTML = '';
    return;
  }

  const financiado: number = preco - entrada;
  const linhas: string = simularParcelamento(preco, entrada);
  resultado.textContent = `Valor financiado: R$ ${financiado.toFixed(2)}`;
  corpo.innerHTML = linhas;
});
