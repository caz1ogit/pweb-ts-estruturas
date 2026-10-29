type TipoCliente = 'residencial' | 'rural' | 'comercial' | 'industrial';
type Bandeira = 'verde' | 'amarela' | 'vermelha1' | 'vermelha2';

function tarifaPorKwh(tipo: TipoCliente): number {
  switch (tipo) {
    case 'residencial':
    case 'rural':
      return 0.8;
    case 'comercial':
    case 'industrial':
      return 0.95;
  }
}

function adicionalBandeira(consumo: number, bandeira: Bandeira = 'verde'): number {
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

function mensagemBandeira(bandeira: Bandeira): string {
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

function nomeBandeira(bandeira: Bandeira): string {
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

const btn: HTMLElement | null = document.getElementById('calcular');
btn?.addEventListener('click', (): void => {
  const consumoEl: HTMLInputElement = document.getElementById('consumo') as HTMLInputElement;
  const tipoEl: HTMLSelectElement = document.getElementById('tipo') as HTMLSelectElement;
  const bandeiraEl: HTMLSelectElement = document.getElementById('bandeira') as HTMLSelectElement;
  const resultado: HTMLElement = document.getElementById('resultado') as HTMLElement;

  const consumo: number = Number(consumoEl.value);

  if (consumo <= 0) {
    resultado.textContent = 'Informe um consumo válido';
    resultado.className = 'erro';
    return;
  }

  const tipo: TipoCliente = tipoEl.value as TipoCliente;
  const bandeira: Bandeira = bandeiraEl.value as Bandeira;

  const energia: number = consumo * tarifaPorKwh(tipo);
  const adicional: number = adicionalBandeira(consumo, bandeira);
  const total: number = energia + adicional;
  const mensagem: string = mensagemBandeira(bandeira);

  resultado.textContent =
    `Energia: R$ ${energia.toFixed(2)}\n` +
    `Bandeira ${nomeBandeira(bandeira)}: R$ ${adicional.toFixed(2)}\n` +
    `Total: R$ ${total.toFixed(2)}\n` +
    mensagem;

  if (bandeira !== 'verde') {
    resultado.className = 'alerta';
  } else {
    resultado.className = '';
  }
});
