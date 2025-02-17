import React, { useRef, useEffect } from 'react';

export interface MarketAsset {
  meta: {
    symbol: string;
    currency: string;
    exchangeName: string;
    fullExchangeName: string;
    longName: string;
  };
  body: Array<MarketData>;
}

export interface MarketData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adjclose: number;
  trend?: string;
}

interface LineChartLittleProps {
  bonos: MarketAsset[];
  cedears: MarketAsset[];
  symbol: string;
}

const LineChartLittle: React.FC<LineChartLittleProps> = ({ bonos, cedears, symbol }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Buscar el asset en bonos o cedears
  const asset = bonos.find((item) => item.meta.symbol === symbol) || cedears.find((item) => item.meta.symbol === symbol);
  const historicalData = asset?.body.map(({ date, close }) => ({ date, close })) || [];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && historicalData.length > 0) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        drawChart(ctx, historicalData);
      }
    }
  }, [historicalData]);

  const drawChart = (ctx: CanvasRenderingContext2D, data: { date: string; close: number }[]) => {
    const width = 100;
    const height = 70;
    canvasRef.current!.width = width;
    canvasRef.current!.height = height;

    const padding = 10;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = '#004AAD';
    ctx.lineWidth = 2;

    const prices = data.map((item) => item.close);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    const mapX = (index: number) => padding + (index * chartWidth) / (data.length - 1);
    const mapY = (price: number) => padding + chartHeight - (chartHeight * (price - minPrice)) / (maxPrice - minPrice);

    ctx.beginPath();
    ctx.moveTo(mapX(0), mapY(data[0].close));
    data.forEach((item, index) => {
      ctx.lineTo(mapX(index), mapY(item.close));
    });
    ctx.stroke();
  };

  return <canvas ref={canvasRef}></canvas>;
};

export default LineChartLittle;
