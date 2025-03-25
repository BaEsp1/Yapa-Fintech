'use client';
import Swal from "sweetalert2";
import Button from "@/components/ui/Button";
import { ArrowBackIos, Settings } from "@mui/icons-material";
import { useState } from "react";
import { updateProfileData , ProfileData} from "@/utils/financialProfile/sendfinancialProfile";

interface ModalDataProps {
  title: string;
  value: number;
  onClose: () => void; 
}

export const ModalData = ({ title, value, onClose }: ModalDataProps) => {
  const [config, setConfig] = useState(false);
  const [updateData, setUpdateData] = useState<number>(value);

  const titleToKey: { [key: string]: keyof ProfileData } = {
    "Ingresos": "incomeMonthly",
    "Gastos": "expensesMonthly",
    "Capacidad de ahorro": "percentageSave"
  };

  const key = titleToKey[title];

  const handleOpenConfig = () => {
    setConfig(true);
  };

  const handleSave = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Verifica que esté bien los valores ingresados.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, modificar',
      cancelButtonText: 'Cancelar',
    });
  
    if (result.isConfirmed) {
      await updateProfileData(key, updateData);
  
      Swal.fire({
        title: '¡Éxito!',
        text: 'La información se ha modificado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      }).then(() => {

        window.location.reload();
      });
    } else {
      setConfig(false);
    }
  };

  const handleCancel = () => {
    setConfig(false); 
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg items-center">
            <button onClick={onClose} className="float-right p-1">
                <ArrowBackIos />
            </button>
        <h1 className="p-2 text-h5-medium text-white900">{title}</h1>
        {config ? (
          <>
            <h2 className="text-p2-regular px-2 pb-2">Ingresa un nuevo valor</h2>
            <div className="flex flex-row justify-center items-center p-2 ">
                <label className="text-h6-regular rounded border border-white300 w-[9.3em] p-1">
                { title === 'Capacidad de ahorro' ? "%" : "$"} <input
                type="number"
                value={updateData}
                step={0.01}
                className="w-[7.5em]"
                onChange={(e) => setUpdateData(Number(e.target.value))}
                /></label>
                            </div>
            <div className="p-2 pt-4 flex flex-rown items-center justify-end gap-4">
              <Button variant="basic" onClick={handleSave} size="medium">
                Aceptar
              </Button>
              <Button variant="solid" onClick={handleCancel} size="medium">
                Cancelar
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-around p-2">
            <h2 className="text-p2-regular pb-2">Valor ingresado previamente:</h2>
            <h1 className="text-h6-medium text-center">{ title === 'Capacidad de ahorro' ? "%" : "$"} {value.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}</h1>
            <div className="p-2 pt-4 flex flex-rown items-center justify-end gap-4">
              <Button variant="solid" onClick={onClose} size="medium">
                Aceptar
              </Button>
              <button onClick={handleOpenConfig}>
                <Settings />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
