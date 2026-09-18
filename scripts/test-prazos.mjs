/* Testes da contagem de prazo. Sem dependencia: node scripts/test-prazos.mjs */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const P = require('../assets/prazos.js');

let ok = 0;
const t = (nome, fn) => { fn(); ok++; console.log('  ok  ' + nome); };

t('28/09/2026 + 10 dias uteis = 13/10/2026 (feriado de 12/10 pulado)', () => {
  const r = P.calcularPrazo('2026-09-28', 'bacen');
  assert.equal(r.vencimento, '2026-10-13');
  assert.equal(r.diasContados, 10);
});

t('recebimento no sabado so comeca a contar na segunda', () => {
  const sabado = P.calcularPrazo('2026-10-03', 'bacen');   // 03/10/2026 = sabado
  const segunda = P.calcularPrazo('2026-10-05', 'bacen');  // mesma contagem
  assert.equal(sabado.vencimento, segunda.vencimento);
  assert.equal(sabado.vencimento, '2026-10-20');
});

t('sexta vespera de feriado: pula fim de semana e o feriado da segunda', () => {
  // 04/09/2026 = sexta; 07/09 (segunda) = Independencia
  const r = P.calcularPrazo('2026-09-04', 'bacen');
  assert.equal(r.vencimento, '2026-09-21');
});

t('virada de ano: usa o calendario de 2027 depois de 31/12', () => {
  // 28/12/2026 = segunda; 01/01/2027 = feriado numa sexta
  const r = P.calcularPrazo('2026-12-28', 'bacen');
  assert.equal(r.vencimento, '2027-01-12');
});

t('dias corridos ignoram feriado (20/11 conta normalmente)', () => {
  const corridos = P.calcularPrazo('2026-11-16', 'sac');   // 7 dias corridos
  assert.equal(corridos.vencimento, '2026-11-23');
  assert.equal(corridos.diasContados, 7);
  // o mesmo intervalo em dias uteis cai bem depois, porque pula 20/11 e os fins de semana
  const uteis = P.calcularPrazo('2026-11-16', 'reclameaqui'); // 5 dias uteis
  assert.equal(uteis.vencimento, '2026-11-24');
});

t('carnaval nao e dia util enquanto CONFIG.carnavalDiaUtil for false', () => {
  assert.equal(P.CONFIG.carnavalDiaUtil, false);
  assert.equal(P.ehDiaUtil('2026-02-17'), false);  // terca de carnaval
  assert.equal(P.ehDiaUtil('2026-02-19'), true);   // quinta seguinte
});

t('datas sao locais: nao escorregam um dia como toISOString faria', () => {
  assert.equal(P.fmt(new Date(2026, 0, 1)), '2026-01-01');
  assert.equal(P.calcularPrazo('2026-01-02', 'sac').vencimento, '2026-01-09');
});

console.log(`\n${ok} testes passaram`);
