/* =============================================================
   OuvPrazos — fonte unica de prazos por canal.
   ES5, sem dependencia, carregado antes do inline da home.

   Regras implementadas:
   - CONFIG.excluiDiaInicial: o dia do recebimento nao conta.
   - Demanda recebida em dia nao util so comeca a contar no proximo
     dia util (vale para os dois tipos de contagem).
   - tipo 'bd' = dias uteis: pula fim de semana e feriado.
   - tipo 'cd' = dias corridos: conta tudo, feriado inclusive.
   - CONFIG.carnavalDiaUtil=false: carnaval (segunda e terca) entra
     como dia nao util. Carnaval e ponto facultativo, nao feriado
     nacional, por isso fica numa lista propria e sob flag.

   Datas sempre locais no formato yyyy-mm-dd. Nunca toISOString:
   ele converte para UTC e no fuso do Brasil devolve o dia anterior.
   ============================================================= */
(function (root) {
  'use strict';

  /* Prazos por canal — DEVE espelhar a tabela de Canais do index.html.
     scripts/check-prazos.mjs falha o build se divergir. */
  var CANAIS = [
    { id: 'bacen',       rotulo: 'BACEN · RDR',     n: 10, tipo: 'bd' },
    { id: 'consumidor',  rotulo: 'Consumidor.gov',  n: 10, tipo: 'cd' },
    { id: 'reclameaqui', rotulo: 'Reclame Aqui',    n: 5,  tipo: 'bd' },
    { id: 'procon',      rotulo: 'PROCON',          n: 10, tipo: 'cd' },
    { id: 'ouvidoria',   rotulo: 'Ouvidoria',       n: 10, tipo: 'bd' },
    { id: 'sac',         rotulo: 'SAC',             n: 7,  tipo: 'cd' }
  ];

  /* Feriados nacionais. Moveis calculados a partir da Pascoa:
     2026 = 05/04 (Sexta-feira Santa 03/04, Corpus Christi 04/06)
     2027 = 28/03 (Sexta-feira Santa 26/03, Corpus Christi 27/05) */
  var FERIADOS = [
    /* 2026 */
    '2026-01-01', /* Confraternizacao Universal */
    '2026-04-03', /* Sexta-feira Santa */
    '2026-04-21', /* Tiradentes */
    '2026-05-01', /* Dia do Trabalho */
    '2026-06-04', /* Corpus Christi */
    '2026-09-07', /* Independencia */
    '2026-10-12', /* Nossa Senhora Aparecida */
    '2026-11-02', /* Finados */
    '2026-11-15', /* Proclamacao da Republica */
    '2026-11-20', /* Consciencia Negra (nacional desde 2024) */
    '2026-12-25', /* Natal */
    /* 2027 */
    '2027-01-01',
    '2027-03-26', /* Sexta-feira Santa */
    '2027-04-21',
    '2027-05-01',
    '2027-05-27', /* Corpus Christi */
    '2027-09-07',
    '2027-10-12',
    '2027-11-02',
    '2027-11-15',
    '2027-11-20',
    '2027-12-25'
  ];

  /* Carnaval (segunda e terca). Ponto facultativo, nao feriado. */
  var CARNAVAL = ['2026-02-16', '2026-02-17', '2027-02-08', '2027-02-09'];

  var CONFIG = {
    carnavalDiaUtil: false,
    excluiDiaInicial: true
  };

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  /* 'yyyy-mm-dd' -> Date local (meia-noite local, sem UTC) */
  function parse(iso) {
    if (iso instanceof Date) return new Date(iso.getFullYear(), iso.getMonth(), iso.getDate());
    var p = String(iso).split('-');
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }

  /* Date -> 'yyyy-mm-dd' pelos getters locais */
  function fmt(d) {
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function ehFeriado(d) {
    var iso = fmt(d);
    if (indexOf(FERIADOS, iso) !== -1) return true;
    if (!CONFIG.carnavalDiaUtil && indexOf(CARNAVAL, iso) !== -1) return true;
    return false;
  }

  function indexOf(arr, v) {
    for (var i = 0; i < arr.length; i++) if (arr[i] === v) return i;
    return -1;
  }

  function ehDiaUtil(data) {
    var d = parse(data), dow = d.getDay();
    if (dow === 0 || dow === 6) return false;
    return !ehFeriado(d);
  }

  function somaDias(d, n) {
    var r = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    r.setDate(r.getDate() + n);
    return r;
  }

  function canal(id) {
    for (var i = 0; i < CANAIS.length; i++) if (CANAIS[i].id === id) return CANAIS[i];
    return null;
  }

  /* calcularPrazo('2026-09-28','bacen') -> {vencimento:'2026-10-13', diasContados:10} */
  function calcularPrazo(dataISO, canalId) {
    var c = canal(canalId);
    if (!c) throw new Error('canal desconhecido: ' + canalId);

    var cursor = parse(dataISO);

    /* recebimento em dia nao util: a contagem so comeca no proximo dia util */
    while (!ehDiaUtil(cursor)) cursor = somaDias(cursor, 1);

    /* o dia inicial nao conta */
    if (CONFIG.excluiDiaInicial) cursor = somaDias(cursor, 1);

    var contados = 0;
    while (contados < c.n) {
      if (c.tipo === 'cd' || ehDiaUtil(cursor)) {
        contados++;
        if (contados === c.n) break;
      }
      cursor = somaDias(cursor, 1);
    }

    /* em dias corridos o vencimento pode cair em dia nao util; a norma
       conta assim, entao nao empurramos a data. */
    return { vencimento: fmt(cursor), diasContados: contados };
  }

  root.OuvPrazos = {
    CANAIS: CANAIS,
    FERIADOS: FERIADOS,
    CARNAVAL: CARNAVAL,
    CONFIG: CONFIG,
    canal: canal,
    ehDiaUtil: ehDiaUtil,
    calcularPrazo: calcularPrazo,
    fmt: fmt,
    parse: parse
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = root.OuvPrazos;
})(typeof window !== 'undefined' ? window : globalThis);
