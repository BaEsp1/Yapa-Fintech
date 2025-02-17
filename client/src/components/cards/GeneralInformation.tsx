import { FinancialData } from "@/store/market/dataMarket"; 
import InstrumentInitialsCircle from "../graphs/InitialsCircle";

export interface InstrumentProps {
  id: string; 
  market: FinancialData[][];
  usd?:number;
  moneyWallet?:number;
}

export const GeneralInformationInstrument = ({ id, market }: InstrumentProps) => {
    let type: string = "Acción";
  const instrumento = market.flat().find(item => item.meta.symbol === id);

  if (!instrumento) {
    return <p>No se encontró el instrumento</p>;
  }

  const meta = instrumento.meta;

  if (meta.symbol.includes("bonos")) {
    type = "Bono";
  } else if (meta.symbol.includes("cedears")) {
    type = "CEDEAR";
  } else {
    type = "Acción";
  }

    return (
      <div className="flex flex-col gap-3 p-4 pt-2 w-full">
        <h1 className="text-h6-semibold text-white900">Información general</h1>
        <div className="flex items-center m-auto">
            <InstrumentInitialsCircle id={id}/>
        </div>
        <div className="flex flex-col w-full gap-2">
          <div className="flex flex-row justify-between">
            <h2 className="text-p1-regular text-white800">Nombre del activo</h2>
            <h2 className="text-p1-semibold text-white800">{instrumento.meta.longName}</h2>
          </div>
          <div className="flex flex-row justify-between">
            <h2 className="text-p1-regular text-white800">Tipo de activo</h2>
            <h2 className="text-p1-semibold text-white800">{type}</h2>
          </div>
          <div className="flex flex-row justify-between">
            <h2 className="text-p1-regular text-white800">Ticket</h2>
            <h2 className="text-p1-semibold text-white800">{instrumento.meta.symbol}</h2>
          </div>
          <div className="flex flex-row justify-between">
            <h2 className="text-p1-regular text-white800">Mercado de cotización</h2>
            <h2 className="text-p1-semibold text-white800">{instrumento.meta.exchangeName}</h2>
          </div>
        </div>
      </div>
    );
  };
  