'use client';
import Button from '@/components/ui/Button';
import { ExpandMore } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import LineChart from '@/components/graphs/linealChart';

export interface Asset {
  name: string;
  price: number;
  change: string;
  quantity:number;
  trend: string;
  historicalData: { 
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    adjclose: number;
  }[]; 
}

interface MarketAsset {
  meta: {
    symbol: string;
    currency: string;
    exchangeName: string;
    fullExchangeName: string;
    longName: string;
  };
  body: { 
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    adjclose: number;
  }[];
}

interface AssetListProps {
  assets: Asset[];    
  bonos: MarketAsset[]; 
  cedears: MarketAsset[]; 
}

export default function AssetList({ assets, bonos, cedears }: AssetListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleAssets, setVisibleAssets] = useState(4);
  
  const [assetsWithMarketInfo, setAssetsWithMarketInfo] = useState<Asset[]>([]);  

  const handleExpandToggle = () => {
    setIsExpanded(!isExpanded);
    setVisibleAssets(4);
  };

  const handleLoadMoreToggle = () => {
    setVisibleAssets(visibleAssets === 4 ? assets.length : 4);
  };


const getHistoricalData = (assetName: string, type: 'bonos' | 'cedears') => {
  let asset
  if (type === 'bonos') asset = bonos 
  else asset = cedears;
  // console.log(type)
  // console.log(asset)
  // console.log(assetName)
  const foundAsset = asset.find((item: MarketAsset) => item.meta.symbol.toLowerCase() === assetName.toLowerCase());
  // console.log(foundAsset)
  return foundAsset ? foundAsset.body : []; 
};


  useEffect(() => {

    const updatedAssets = assets.map((asset) => {
      const historicalData = [
        ...getHistoricalData(asset.name, 'bonos'),
        ...getHistoricalData(asset.name, 'cedears'),
      ];
      // console.log(historicalData)

      return {
        ...asset,
        historicalData: historicalData,
        change: historicalData.length > 0 
                ? (historicalData[0].close - historicalData[0].open).toFixed(2)
                : asset.change,
        trend: historicalData.length > 0 && (historicalData[0].close - historicalData[0].open) > 0
               ? 'positive'
               : 'negative',
      };
    });

    setAssetsWithMarketInfo(updatedAssets); 
  }, [assets, bonos, cedears]);  

  return (
    <div className='bg-white rounded-lg shadow-sm p-6'>
      <h5 className='text-h5-semibold mb-4'>Activos</h5>
      <p className='text-gray-600 mb-6'>
        En esta sección, encontrarás detalles sobre los activos en los que hemos invertido, incluyendo tendencias y análisis de mercado.
      </p>
      <div className='flex justify-between items-center'>
        <h6 className='text-h6-semibold text-white800'>Acciones y Bonos</h6>
        <div className='flex justify-center mb-4'>
          <button onClick={handleExpandToggle} className='text-white900 transition-colors'>
            <ExpandMore className={`transform transition-transform ${isExpanded ? 'rotate-180' : 'rotate-0'}`} />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className='flex flex-wrap justify-between items-center gap-2'>
          {assetsWithMarketInfo.slice(0, visibleAssets).map((asset, index) => (
            <div
              key={index}
              className='flex flex-col w-[200px] h-[180px] bg-primary25 rounded'
            >
              <h6 className='text-h6-bold px-2'>{asset.name}</h6>
              <span className='flex flex-row'>
              <p className='text-p1-regular text-white700 px-2'> ${asset.price}</p>
              <p className='text-p1-regular text-white200 px-2'> ${asset.price * asset.quantity}</p>
                </span>
              <LineChart historicalData={asset.historicalData} />
              <p className="text-p2-semibold px-2 text-accent400">
                {Number(asset.change) > 0 ? "+" + asset.change : "-" + asset.change}%
              </p>
            </div>
          ))}
        </div>
      )}

      {isExpanded && assetsWithMarketInfo.length > 4 && (
        <Button
          variant='text'
          onClick={handleLoadMoreToggle}
          className='mt-6 py-2 text-p1-semibold text-primary900 focus:transparent border-none focus:outline-none focus:ring-0 active:bg-transparent active:border-none'
        >
          {visibleAssets === 4 ? 'Ver más' : 'Ver menos'}
        </Button>
      )}
    </div>
  );
}
