import React, { useRef, useEffect, useState } from 'react';

interface HistoricalData {
  date: string;
  close: number;
  high: number;
  low: number;
  open: number;
  x?: number;
  y?: number;
}

interface BarChartProps {
  historicalData: HistoricalData[];
}

export const BarChartBig: React.FC<BarChartProps> = ({ historicalData }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<'close' | 'open' | 'high' | 'low'>('close');

  const lineColors = {
    close: '#65A5FF',
    open: '#92BFFF',
    high: '#C3DCFF',
    low: '#004AAD'
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        drawChart(ctx, historicalData, selectedMetric);
      }
    }
  }, [historicalData, selectedMetric]);

  const drawChart = (ctx: CanvasRenderingContext2D, data: HistoricalData[], metric: string) => {
    const width = 400;
    const height = 200;
    canvasRef.current!.width = width;
    canvasRef.current!.height = height;

    const padding = 15;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    ctx.clearRect(0, 0, width, height);

    const prices: { [key in 'close' | 'open' | 'high' | 'low']: number[] } = {
      close: data.map(item => item.close),
      open: data.map(item => item.open),
      high: data.map(item => item.high),
      low: data.map(item => item.low)
    };

    const selectedData = prices[metric as 'close' | 'open' | 'high' | 'low'];
    const minPrice = Math.min(...selectedData);
    const maxPrice = Math.max(...selectedData);

    const mapX = (index: number) => padding + (index * chartWidth) / (data.length - 1);
    const mapY = (price: number) => padding + chartHeight - (chartHeight * (price - minPrice)) / (maxPrice - minPrice);

    const barWidth = chartWidth / data.length - 5; 
    data.forEach((item, index) => {
      const barHeight = mapY(item[metric as 'close' | 'open' | 'high' | 'low']) - padding;

      ctx.fillStyle = lineColors[metric as 'close' | 'open' | 'high' | 'low'];
      ctx.fillRect(mapX(index) - barWidth / 2, barHeight, barWidth, chartHeight - barHeight);

      const formatDate = (dateString: string): string => {
        const date = new Date(dateString); // Convertir a objeto Date
        return "| " + date.toLocaleDateString('es-ES', {
          day: '2-digit', 
          month: 'short', 
        }) 
      };

      // Agregar la fecha en el eje X
      ctx.font = '9px Arial';
      ctx.fillStyle = '#000';
      ctx.fillText(formatDate(item.date), mapX(index) - barWidth / 2, height - 5);
    });

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const canvasRect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - canvasRect.left;

      let found = false;
      data.forEach((item, index) => {
        const barX = mapX(index);
        const barWidth = chartWidth / data.length - 5;
        const barStartX = barX - barWidth / 2;
        const barEndX = barX + barWidth / 2;

        // Verificamos si el mouse está dentro de la barra
        if (mouseX >= barStartX && mouseX <= barEndX) {
          // Calcular la altura de la barra
          const barHeight = mapY(item[metric as 'close' | 'open' | 'high' | 'low']) - padding;

          // Mostrar el tooltip justo encima de la barra
          setTooltip({
            x: barX - barWidth / 2 + barWidth / 2,  // Centrado sobre la barra
            y: barHeight - 15,  // Colocarlo por encima de la barra
            text: `Fecha: ${item.date}, ${metric.charAt(0).toUpperCase() + metric.slice(1)}: $${item[metric as 'close' | 'open' | 'high' | 'low'].toFixed(2)}`
          });
          found = true;
        }
      });
      if (!found) {
        setTooltip(null);
      }
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
    };
  };

  return (
    <div style={{ position: 'relative' }}>
      <canvas ref={canvasRef}></canvas>
      {tooltip && (
        <div
          style={{
            position: 'absolute',
            left: tooltip.x,
            top: tooltip.y,
            backgroundColor: 'white',
            border: '1px solid #ddd',
            padding: '5px',
            fontSize: '12px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            pointerEvents: 'none'  // Para evitar que el tooltip interfiera con el mouse
          }}
        >
          {tooltip.text}
        </div>
      )}

      {/* Botones de selección para la leyenda */}
      <div className="flex mt-4 w-full">
        <div className="flex flex-row gap-4 mx-auto">
          {[
            { metric: 'close', label: 'Cierre' },
            { metric: 'open', label: 'Apertura' },
            { metric: 'high', label: 'Máximo' },
            { metric: 'low', label: 'Mínimo' },
          ].map(({ metric, label }) => (
            <button
              key={metric}
              onClick={() => setSelectedMetric(metric as 'close' | 'open' | 'high' | 'low')}
              style={{
                padding: '4px 8px',
                backgroundColor: selectedMetric === metric ? '#f3f3f3': 'white',
                border: 'none',
                color: selectedMetric === metric ? 'black' : 'black',
                cursor: 'pointer',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                fontSize:'smaller',
                boxShadow:'0.5px 0.5px 1px 0px #e0e0e0'
              }}
            >
              {/* Círculo con color correspondiente */}
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: lineColors[metric as 'close' | 'open' | 'high' | 'low'],
                  marginRight: '8px',
                }}
              ></span>
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
