export interface IStockQuote {
  timeStampDate:string,
  date: string,
  open: number,
  high: number,
  low: number,
  close: number,
  histogram: number,
  stochasticsK: number,
  stochasticsD: number,
  SMA10: number,
  is3ArrowGreenPositive: boolean
}

// Reglas para senales: confirmacion cierre por arriba del maximo del dia de la senal
// a la Hr de entrar verificar que no este muy extendida: ejemplo AYI - Acuity Brands -> 11/9/2016

//Fix at signal confirmation all 3 should still being positive

//#include 3 arrows same day strict
//#include explanation about proximity to clear resistence to avoid opening close to resistence
//#so confirmation would be after prices pass that resistence clearly
