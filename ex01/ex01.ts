function calcularMedia(n1: number, n2: number): number {
  return (n1 + n2) / 2;
}

function dadosValidos(n1: number, n2: number, frequencia: number): boolean {
  if (n1 < 0 || n1 > 10 || n2 < 0 || n2 > 10 || frequencia < 0 || frequencia > 100) {
    return false;
  }
  return true;
}

function situacao(media: number, frequencia: number): string {
  if (frequencia < 75) {
    return 'Reprovado por falta';
  } else if (media >= 7) {
    return 'Aprovado';
  } else if (media >= 4) {
    const falta: number = 10 - media;
    return `Exame final (precisa tirar ${falta.toFixed(1)})`;
  } else {
    return 'Reprovado por nota';
  }
}

const btn: HTMLElement | null = document.getElementById('calcular');
btn?.addEventListener('click', (): void => {
  const nomeEl: HTMLInputElement = document.getElementById('nome') as HTMLInputElement;
  const n1El: HTMLInputElement = document.getElementById('n1') as HTMLInputElement;
  const n2El: HTMLInputElement = document.getElementById('n2') as HTMLInputElement;
  const freqEl: HTMLInputElement = document.getElementById('frequencia') as HTMLInputElement;
  const resultado: HTMLElement = document.getElementById('resultado') as HTMLElement;

  const nome: string = nomeEl.value.trim();
  const n1: number = Number(n1El.value);
  const n2: number = Number(n2El.value);
  const frequencia: number = Number(freqEl.value);

  if (!dadosValidos(n1, n2, frequencia)) {
    resultado.textContent = 'Dados inválidos';
    resultado.className = 'erro';
    return;
  }

  const media: number = calcularMedia(n1, n2);
  const sit: string = situacao(media, frequencia);
  resultado.textContent = `${nome}: média ${media.toFixed(1)}. ${sit}`;
  resultado.className = sit === 'Aprovado' ? 'sucesso' : 'erro';
});
