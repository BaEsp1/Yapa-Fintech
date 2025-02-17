import { BarChartBig } from "../graphs/BarChartBig";
import { InstrumentProps } from "./GeneralInformation";

export const PerformanceInstrument = ({ id, market }: InstrumentProps) => {
  const instrument = market.flat().find(item => item.meta.symbol === id);
  const historicalData = instrument?.body || [];

  if (!instrument) {
    return <p>No se encontró el instrumento</p>;
  }


  const variation = (instrument.body[instrument.body.length - 1].close - instrument.body[0].close) / instrument.body[0].close * 100;

  const min = Math.min(...historicalData.map(item => item.low)); 
  const max = Math.max(...historicalData.map(item => item.high)); 

  const lastClose = instrument.body[instrument.body.length - 1].close;
  const secondLastClose = instrument.body[instrument.body.length - 2]?.close;
  const dayVariation = secondLastClose ? ((lastClose - secondLastClose) / secondLastClose) * 100 : 0;


  const returnHistory = variation;

  return (
    <div className="p-4 w-full m-auto">
      <h1 className="text-h6-semibold">Desempeño</h1>
      <p className="text-p2-regular text-white400 text-center">En los últimos 10 días</p>
      <div className="flex justify-center items-center">
        <BarChartBig historicalData={historicalData} />
      </div>

      <p className="text-white800 text-p1-medium pl-2 pt-4">Al 13 de febrero de 2025</p>

      <div className="flex flex-col text-white800 p-2 gap-2">
        <label className="flex flex-row justify-between">
          <h2 className="text-p1-regular">Precio</h2>
          <h2 className="text-p1-semibold">${instrument.body[instrument.body.length - 1].close.toFixed(2)}</h2>
        </label>
        <label className="flex flex-row justify-between">
          <h2 className="text-p1-regular">Variación </h2>
          <h2 className="text-p1-semibold">
            {dayVariation > 0 ? (
              <span className="text-success700 text-p2-regular">▲</span>
            ) : (
              <span className="text-infoWarning text-p2-regular">▼</span>
            )}
            {dayVariation.toFixed(2)} %
          </h2>
        </label>
        <label className="flex flex-row justify-between">
          <h2 className="text-p1-regular">Máx y Mín recientes</h2>
          <h2 className="text-p1-semibold">${max.toFixed(2)} |  ${min.toFixed(2)}</h2>
        </label>
        <label className="flex flex-row justify-between">
          <h2 className="text-p1-regular">Volumen de operación</h2>
          <h2 className="text-p1-semibold">{instrument.body[instrument.body.length - 1].volume.toLocaleString()} diario</h2>
        </label>
        <label className="flex flex-row justify-between">
          <h2 className="text-p1-regular">Apertura</h2>
          <h2 className="text-p1-semibold">${instrument.body[instrument.body.length - 1].open.toFixed(2)}</h2>
        </label>
        <label className="flex flex-row justify-between">
          <h2 className="text-p1-regular">Cierre</h2>
          <h2 className="text-p1-semibold">${instrument.body[instrument.body.length - 1].close.toFixed(2)}</h2>
        </label>
        <label className="flex flex-row justify-between">
          <h2 className="text-p1-regular">Retorno histórico</h2>
          <h2 className="text-p1-semibold">{returnHistory.toFixed(2)}%</h2>
        </label>
      </div>
    </div>
  );
};
