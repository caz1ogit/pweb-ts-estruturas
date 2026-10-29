type Formatador = (valor: number) => string;

const formatarReal: Formatador = (valor: number): string => {
  return `R$ ${valor.toFixed(2)}`;
};

function formatarMeses(meses: number): string {
  if (meses < 12) {
    return `${meses} ${meses === 1 ? 'mês' : 'meses'}`;
  }
  const anos: number = Math.floor(meses / 12);
  const resto: number = meses % 12;
  const parteAnos: string = `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
  if (resto === 0) {
    return parteAnos;
  }
  const parteMeses: string = `${resto} ${resto === 1 ? 'mês' : 'meses'}`;
  return `${parteAnos} e ${parteMeses}`;
}

interface ResultadoCalculo {
  meses: number;
  saldo: number;
  depositado: number;
}

function calcularMeses(meta: number, deposito: number, taxa: number = 0.5): ResultadoCalculo {
  let saldo: number = 0;
  let depositado: number = 0;
  let meses: number = 0;
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

function exibirValor(rotulo: string, valor: number, formatar: Formatador): string {
  return `${rotulo}: ${formatar(valor)}`;
}

const btn: HTMLElement | null = document.getElementById('calcular');
btn?.addEventListener('click', (): void => {
  const metaEl: HTMLInputElement = document.getElementById('meta') as HTMLInputElement;
  const depositoEl: HTMLInputElement = document.getElementById('deposito') as HTMLInputElement;
  const taxaEl: HTMLInputElement = document.getElementById('taxa') as HTMLInputElement;
  const resultado: HTMLElement = document.getElementById('resultado') as HTMLElement;

  const meta: number = Number(metaEl.value);
  const deposito: number = Number(depositoEl.value);

  if (meta <= 0 || deposito <= 0) {
    resultado.textContent = 'Informe valores positivos';
    resultado.className = 'erro';
    return;
  }

  let calc: ResultadoCalculo;
  if (taxaEl.value === '') {
    calc = calcularMeses(meta, deposito);
  } else {
    const taxa: number = Number(taxaEl.value);
    calc = calcularMeses(meta, deposito, taxa);
  }

  if (calc.saldo >= meta) {
    const rendimento: number = calc.saldo - calc.depositado;
    resultado.textContent =
      `Você atinge a meta em ${calc.meses} meses (${formatarMeses(calc.meses)}).\n` +
      `${exibirValor('Saldo final', calc.saldo, formatarReal)}\n` +
      `${exibirValor('Total depositado', calc.depositado, formatarReal)}\n` +
      `${exibirValor('Rendimento', rendimento, formatarReal)}`;
    resultado.className = 'sucesso';
  } else {
    resultado.textContent =
      `Meta inalcançável em 50 anos. ` +
      `${exibirValor('Saldo após 600 meses', calc.saldo, formatarReal)}`;
    resultado.className = 'erro';
  }
});
