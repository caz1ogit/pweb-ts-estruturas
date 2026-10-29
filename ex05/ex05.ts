type Formatador = (valor: number) => string;

const formatarReal: Formatador = (valor: number): string => {
  return `R$ ${valor.toFixed(2)}`;
};

function lerPrecos(texto: string): { precos: number[]; ignorados: number } {
  const precos: number[] = [];
  let ignorados: number = 0;
  const linhas: string[] = texto.split('\n');
  for (let i: number = 0; i < linhas.length; i++) {
    const linha: string = linhas[i].trim();
    if (linha === '') {
      continue;
    }
    if (precos.length >= 20) {
      break;
    }
    const normalizada: string = linha.replace(',', '.');
    const valor: number = Number(normalizada);
    if (Number.isNaN(valor) || valor <= 0) {
      ignorados++;
      continue;
    }
    precos.push(valor);
  }
  return { precos: precos, ignorados: ignorados };
}

function somarItens(...precos: number[]): number {
  let total: number = 0;
  for (const p of precos) {
    total += p;
  }
  return total;
}

function calcularDesconto(total: number, percentual: number): number;
function calcularDesconto(total: number, cupom: string): number;
function calcularDesconto(total: number, arg: number | string): number {
  if (typeof arg === 'number') {
    return (total * arg) / 100;
  }
  const codigo: string = arg.toUpperCase();
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

function cupomValido(total: number, cupom: string): boolean {
  const codigo: string = cupom.toUpperCase();
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

const btn: HTMLElement | null = document.getElementById('fechar');
btn?.addEventListener('click', (): void => {
  const itensEl: HTMLTextAreaElement = document.getElementById('itens') as HTMLTextAreaElement;
  const cupomEl: HTMLInputElement = document.getElementById('cupom') as HTMLInputElement;
  const fidEl: HTMLInputElement = document.getElementById('fidelidade') as HTMLInputElement;
  const resultado: HTMLElement = document.getElementById('resultado') as HTMLElement;

  const leitura: { precos: number[]; ignorados: number } = lerPrecos(itensEl.value);
  const precos: number[] = leitura.precos;
  const ignorados: number = leitura.ignorados;

  if (precos.length === 0) {
    resultado.textContent = 'Nenhum item válido';
    resultado.className = 'erro';
    return;
  }

  const subtotal: number = somarItens(...precos);

  const cupom: string = cupomEl.value.trim();
  let descontoCupom: number = 0;
  let linhaCupom: string = '';
  if (cupom !== '') {
    descontoCupom = calcularDesconto(subtotal, cupom);
    if (descontoCupom > 0 && cupomValido(subtotal, cupom)) {
      linhaCupom = `Cupom ${cupom.toUpperCase()}: - ${formatarReal(descontoCupom)}\n`;
    } else {
      linhaCupom = 'Cupom inválido ou não aplicável.\n';
      descontoCupom = 0;
    }
  }

  const baseFidelidade: number = subtotal - descontoCupom;
  let descontoFid: number = 0;
  let linhaFid: string = '';
  if (fidEl.checked) {
    descontoFid = calcularDesconto(baseFidelidade, 5);
    linhaFid = `Fidelidade (5%): - ${formatarReal(descontoFid)}\n`;
  }

  const total: number = subtotal - descontoCupom - descontoFid;

  const rotuloItens: string = precos.length === 1 ? 'item' : 'itens';
  let primeira: string = `Itens: ${precos.length} ${rotuloItens}`;
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
