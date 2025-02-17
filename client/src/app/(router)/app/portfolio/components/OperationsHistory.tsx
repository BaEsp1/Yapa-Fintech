'use client'

import Button from '@/components/ui/Button';
import { Operation } from '@/store/operations/operations'; // Asegúrate de que este tipo esté definido
import { useState } from 'react';

const ITEMS_PER_PAGE = 7;

interface OperationsListProps {
  operations: Operation[]; 
}

export default function OperationsHistory({ operations }: OperationsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const userOperations = operations;
  
  const totalPages = Math.ceil(userOperations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentOperations = userOperations.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const renderOperation = (operation: Operation, index:number) => (
    <div key={index} className="flex items-center justify-between py-4 border-b">
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className="font-medium">{operation.type === "venta" ? "Venta": "Compra" }</span>
          <span className="text-gray-600">{operation.symbol}</span>
        </div>
        <span className="text-sm text-gray-500">
          {operation.date} 
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className={`font-medium ${operation.type !== 'venta' ? 'text-red-500' : 'text-green-500'}`}>
            {operation.type !== 'venta'  ? '-' : '+'} ${operation.price.toFixed(2)}
          </p>

          <Button variant="text" className="text-blue-600 font-semibold mt-4">
            Ver
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl p-8">

      <div className="mb-6">
        <h5 className="text-h5-semibold">Historial de operaciones</h5>
      </div>

      <div className="divide-y">
        {userOperations.length === 0 ? (
          <p className="text-center text-gray-600 py-4">Aún no hay movimientos</p>
        ) : (
          currentOperations.map(renderOperation)
        )}
      </div>

      {userOperations.length > 0 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="small"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            {'<'}
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "basic" : "outline"}
              size="small"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="small"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            {'>'}
          </Button>
        </div>
      )}
    </div>
  );
}
