/* Falha se a tabela de Canais do index.html divergir de OuvPrazos.CANAIS.
   A tabela e estatica por decisao de projeto; este script e o que impede
   que ela e a fonte unica sigam caminhos diferentes.
   node scripts/check-prazos.mjs */
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const require = createRequire(import.meta.url);
const P = require('../assets/prazos.js');
const raiz = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const html = fs.readFileSync(path.join(raiz, 'index.html'), 'utf8');

// cada linha da tabela: <div class="c1"><b>01</b>BACEN</div> ... <div class="c3" data-h="Prazo">10 <span data-i18n="u.bd">
const linhas = [...html.matchAll(
  /<div class="c1"><b>(\d+)<\/b>(?:<span[^>]*>)?([^<]*)[\s\S]*?<div class="c3" data-h="Prazo">(\d+)\s*<span data-i18n="u\.(bd|cd)">/g
)].map(m => ({ ordem: +m[1], rotulo: m[2].trim(), n: +m[3], tipo: m[4] }));

const erros = [];
if (linhas.length !== P.CANAIS.length) {
  erros.push(`a tabela tem ${linhas.length} canais e CANAIS tem ${P.CANAIS.length}`);
}
linhas.forEach((l, i) => {
  const c = P.CANAIS[i];
  if (!c) return;
  if (l.n !== c.n || l.tipo !== c.tipo) {
    erros.push(`linha ${l.ordem} (${l.rotulo}): tabela diz ${l.n} ${l.tipo}, CANAIS diz ${c.n} ${c.tipo} (id ${c.id})`);
  }
});

console.log('canais lidos da tabela:');
linhas.forEach((l, i) => console.log(`  ${String(l.ordem).padStart(2, '0')} ${l.rotulo.padEnd(16)} ${l.n} ${l.tipo}   <-> ${P.CANAIS[i] ? P.CANAIS[i].id : '???'}`));

if (erros.length) {
  console.error('\nDIVERGENCIA entre a tabela e assets/prazos.js:');
  erros.forEach(e => console.error('  - ' + e));
  process.exit(1);
}
console.log('\ntabela e CANAIS batem');
