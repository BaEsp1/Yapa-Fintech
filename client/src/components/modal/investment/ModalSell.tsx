'use client'
import useOperationsStore, { Instrument } from '@/store/operations/operations';
import { Portfolio } from '@/store/portfoil/portfoilStore';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface ModalInvestmentProps {
    instru :  Portfolio| null,
    usd: number | undefined,
    inversionData:{
        name: string;
        price: number;
        currency: string;
        symbol: string;
        type: string;
      };
    onClose: () => void;
}


export const ModalSell = ({ onClose , instru , inversionData , usd}: ModalInvestmentProps) => {
  const [quantity, setQuantity] = useState(1);
  const { sellOperation } = useOperationsStore(); 
  const changeCurrency = usd || 1200

  const handleConfirm = async() => {
    const subtotal = inversionData.price * quantity;
    let total = subtotal;

    if (inversionData.currency === "USD") {
      total = subtotal * changeCurrency;
    }

    const instrument : Instrument = {
      name:inversionData.name,
      symbol: inversionData.symbol,
      type:inversionData.type,
      price: inversionData.price,
      currency: inversionData.currency === "USD" ? "ARS" : inversionData.currency, 
      quantity: quantity,
    }

    const operationData ={
      instrument,
      operationType: 'sell',
      currency: inversionData.currency === "USD" ? "ARS" : inversionData.currency, 
      subTotal: subtotal,
      totalPrice: total,
    }

    await sellOperation(operationData)

    Swal.fire({
      title: '¡Venta realizada!',
      text: 'Tu venta se ha confirmado con éxito.',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      timer: 3000,
      timerProgressBar: true,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg items-center">
        <h2 className="text-lg font-semibold mb-3 text-center">Confirmar Venta</h2>
        <p className="text-p2-regular text-white500 text-center pb-2">
          Por favor verifica que todos los datos sean correctos antes de confirmar
        </p>
        <p className="p-2">
          <strong>Activo:</strong> {inversionData.symbol}
        </p>
        <p className="p-2">
          <strong>Cantidad:</strong>
          <input
            type="number"
            min={1}
            max={instru?.object[3]}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border border-white300 rounded-lg w-[20%] px-1"
          />
        </p>
        <p className="p-2">
          <strong>Precio del dia de compra:</strong> ${instru?.purchasePrice.toFixed(2)} {inversionData.currency}
        </p>
        <p className="p-2">
          <strong>Precio unitario:</strong> ${inversionData.price.toFixed(2)} {inversionData.currency}
        </p>
        <p className="p-2">
          <strong>Subtotal:</strong> ${(inversionData.price * quantity).toFixed(2)} {inversionData.currency}
        </p>
        {inversionData.currency === "USD" ? (<>
          <p className="pl-2 text-p3-regular text-white700">Cotización del USD al dia es ${changeCurrency}</p>
          <p className="pt-4 p-2 text-center">
            <strong>Total: ${(inversionData.price * quantity * changeCurrency).toFixed(2)} ARS</strong>
          </p>
          <div className="flex justify-end gap-4">
          <button
            className="bg-gray-300 text-black py-2 px-4 rounded-full"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
          className="bg-accent400 text-white py-2 px-4 rounded-full"
          onClick={handleConfirm}
          >
            Confirmar
          </button>

        </div>
          </>
          
        ) : (<>
          <p className="pt-4 p-2 text-center">
            <strong>Total: ${(inversionData.price * quantity).toFixed(2)} {inversionData.currency}</strong>
          </p>
          <div className="flex justify-end gap-4">
          <button
            className="bg-gray-300 text-black py-2 px-4 rounded-full"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
          className="bg-accent400 text-white py-2 px-4 rounded-full"
          onClick={handleConfirm}
          >
            Confirmar
          </button>

        </div>
          </>
        )}
        
      </div>
    </div>
  );
};
