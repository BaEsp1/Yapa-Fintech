'use client'
import Button from '@/components/ui/Button';
import { Operation } from '@/store/operations/operations'; 
import { useState } from 'react';
import { DetailOperation} from '../modal/operations/detail';

const ITEMS_PER_PAGE = 7;

interface OperationsListProps {
  operations: Operation[]; 
}

export default function OperationsHistory({ operations }: OperationsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const userOperations = operations;
  const [detail , setDetail]=useState(false)
  const [operationDetail, setOperationDetail] = useState<Operation>({
     idOperation:0,
      symbol: "",
      date: "",
      price:0,
      type:  'buy' ,
      instrument: { name:"", symbol: "", type:"", price:0, currency: "", quantity:0},
      createdAt : new Date(),
      totalPrice:0
  });
  const totalPages = Math.ceil(userOperations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentOperations = userOperations.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleOpenModal = (operation:Operation) =>{
    setOperationDetail(operation)
    setDetail(true)
  }

  const handleCloseModal = () =>{
    setDetail(false)
  }

  const renderOperation = (operation: Operation, index:number) => (
    <div key={index} className="flex items-center justify-between py-4 border-b">
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className="font-medium">{operation.type === "sell" ? "Venta": "Compra" }</span>
          <span className="text-gray-600">{operation.instrument.symbol}</span>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(operation.createdAt).toLocaleString('es-AR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, 
          })}
        </span>
      </div>

      <div className="flex flex-col items-center gap-2 ">
        <div className="text-right">
          <p className={`font-medium px-1 ${operation.type !== 'buy' ? 'text-red-500' : 'text-green-500'}`}>
            {operation.type !== 'buy'  ? '-' : '+'} $ {(operation.totalPrice).toFixed(2)}
          </p>
        </div>

          <Button variant="solid" className="text-blue-600 w-15 px-1" onClick={() => handleOpenModal(operation)}>
            Ver más
          </Button>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl p-8">
      {detail && <DetailOperation detail={operationDetail} onClose={handleCloseModal}/>}
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
