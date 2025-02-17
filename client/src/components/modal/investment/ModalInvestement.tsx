import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface ModalInvestmentProps {
  inversionData: {
    price: number;
    currency: string;
    symbol: string;
    usd:number,
    moneyWallet:number
  };
  onClose: () => void;
}

export const ModalInvestement = ({ inversionData, onClose }: ModalInvestmentProps) => {
  const [quantity, setQuantity] = useState(1);
  const [buy, setBuy] = useState({
    symbol: "",
    price: 0,
    quantity: 0,
    subtotal: 0,
    total: 0,
    currency: "",
  });

  const changeCurrency = inversionData.usd
  const moneyWallet = inversionData.moneyWallet

  const handleNeedMoney = () =>{
    Swal.fire({
      title: '¡No puedes invertir aún!',
      text: 'Necesitas ingresar más dinero para poder invertir.',
      icon: 'info',
      confirmButtonText: 'Aceptar',
      timer: 3000,
      timerProgressBar: true,
    });

    onClose();
  }

  const handleConfirm = () => {
    const subtotal = inversionData.price * quantity;
    let total = subtotal;

    if (inversionData.currency === "USD") {
      total = subtotal * changeCurrency;
    }

  
    setBuy({
      symbol: inversionData.symbol,
      price: inversionData.price,
      quantity: quantity,
      subtotal: subtotal,
      total: total,
      currency: inversionData.currency === "USD" ? "ARS" : inversionData.currency, 
    });

    console.log(buy); 

   
    onClose();


    Swal.fire({
      title: '¡Inversión realizada!',
      text: 'Tu inversión se ha confirmado con éxito.',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      timer: 3000,
      timerProgressBar: true,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg items-center">
        <h2 className="text-lg font-semibold mb-3 text-center">Confirmar Inversión</h2>
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
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border border-white300 rounded-lg w-[20%] px-1"
          />
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
          <p className=" text-center text-white700 pb-2">
            { moneyWallet < inversionData.price * quantity * changeCurrency 
            ? "Dinero insuficiente para realizar la operación"
            : "Dinero restante: $" + (moneyWallet -(inversionData.price * quantity * changeCurrency)).toFixed(2) + "ARS"
            }
            </p>
          <div className="flex justify-end gap-4">
          <button
            className="bg-gray-300 text-black py-2 px-4 rounded-full"
            onClick={onClose}
          >
            Cancelar
          </button>
          { moneyWallet >= (inversionData.price * quantity * changeCurrency) ? 
          <button
          className="bg-accent400 text-white py-2 px-4 rounded-full"
          onClick={handleConfirm}
          >
            Confirmar
          </button>
          :
          <>
          <button
          className="bg-white500 text-white py-2 px-4 rounded-full"
          onClick={handleNeedMoney}
          >
            Confirmar
          </button></>}
        </div>
          </>
          
        ) : (<>
          <p className="pt-4 p-2 text-center">
            <strong>Total: ${(inversionData.price * quantity).toFixed(2)} {inversionData.currency}</strong>
          </p>
          <p className=" text-center text-white700 pb-2">
            Dinero restante: ${ (moneyWallet - (inversionData.price * quantity )).toFixed(2)} ARS
          </p>
          <div className="flex justify-end gap-4">
          <button
            className="bg-gray-300 text-black py-2 px-4 rounded-full"
            onClick={onClose}
          >
            Cancelar
          </button>
          { moneyWallet >= (inversionData.price * quantity ) ? 
          <button
          className="bg-accent400 text-white py-2 px-4 rounded-full"
          onClick={handleConfirm}
          >
            Confirmar
          </button>
          :
          <>
          <p className="text-p2-regular text-accent400">Necesitas ingresar más dinero para poder operar</p>
          <button
          className="bg-gray-300 text-white py-2 px-4 rounded-full"
          onClick={handleNeedMoney}
          >
            Confirmar
          </button></>}
        </div>
          </>
        )}
        
      </div>
    </div>
  );
};
