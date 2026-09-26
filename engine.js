/* PoolMath engine - honest pool math. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.PoolMath = factory();
})(typeof self !== 'undefined' ? self : this, function () {

  var GAL_PER_CUFT = 7.48;
  var LB_PER_GAL = 8.33;

  // Volume: rectangular L x W x average depth; round pool by diameter.
  function volumeGallons(shape, a, b, avgDepthFt) {
    var cuft;
    if (shape === 'round') cuft = Math.PI * Math.pow(a / 2, 2) * avgDepthFt;
    else cuft = a * b * avgDepthFt;
    return Math.round(cuft * GAL_PER_CUFT);
  }

  // Turnover: hours for the pump to move the whole volume once.
  function turnoverHours(gallons, pumpGpm) {
    if (pumpGpm <= 0) return 0;
    return Math.round(gallons / (pumpGpm * 60) * 10) / 10;
  }

  // Pump electric cost: HP -> kW (0.746) at real-world ~80% load efficiency factor of 1.0 (nameplate is draw).
  function pumpCostPerDay(hp, hoursPerDay, priceKwh) {
    var kw = hp * 0.746;
    return Math.round(kw * hoursPerDay * priceKwh * 100) / 100;
  }

  // The 24/7 myth: you need 1-1.5 turnovers a day, not 24 hours of pumping.
  function pumpingVerdict(hoursRun, turnoverHrs) {
    var turnovers = turnoverHrs > 0 ? hoursRun / turnoverHrs : 0;
    if (turnovers < 0.9) return { code: 'under', label: 'Under-circulated - the deep end is a swamp', turnovers: Math.round(turnovers * 10) / 10 };
    if (turnovers <= 1.6) return { code: 'right', label: 'Right in the pocket', turnovers: Math.round(turnovers * 10) / 10 };
    return { code: 'over', label: 'Paying to polish water that is already clean', turnovers: Math.round(turnovers * 10) / 10 };
  }

  // Evaporation: inches of surface loss per week -> gallons.
  function evapGallonsPerWeek(surfaceSqft, inchesPerWeek) {
    return Math.round(surfaceSqft * (inchesPerWeek / 12) * GAL_PER_CUFT);
  }

  // Heating: BTU to raise the pool deltaT degrees; hours at heater rating; cost at $/therm (100k BTU).
  function heatBTU(gallons, deltaT) { return Math.round(gallons * LB_PER_GAL * deltaT); }
  function heatHours(gallons, deltaT, heaterBtu, efficiency) {
    if (heaterBtu <= 0 || efficiency <= 0) return 0;
    return Math.round(heatBTU(gallons, deltaT) / (heaterBtu * efficiency) * 10) / 10;
  }
  function heatCost(gallons, deltaT, priceTherm, efficiency) {
    if (efficiency <= 0) return 0;
    return Math.round(heatBTU(gallons, deltaT) / 100000 / efficiency * priceTherm * 100) / 100;
  }

  function fmtGal(g) { return g.toLocaleString('en-US') + ' gal'; }

  return {
    GAL_PER_CUFT: GAL_PER_CUFT,
    volumeGallons: volumeGallons,
    turnoverHours: turnoverHours,
    pumpCostPerDay: pumpCostPerDay,
    pumpingVerdict: pumpingVerdict,
    evapGallonsPerWeek: evapGallonsPerWeek,
    heatBTU: heatBTU,
    heatHours: heatHours,
    heatCost: heatCost,
    fmtGal: fmtGal
  };
});
