import Button from "@/components/ui/Button";

interface RetireMoneyFormProps {
  amountToRet: number;
  setAmountToRet: React.Dispatch<React.SetStateAction<number>>;
  handleRetire: () => void;
  availableAmount: number;
  setError: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  cancelRet: () => void
}

export const RetireMoneyForm: React.FC<RetireMoneyFormProps> = ({
  amountToRet,
  setAmountToRet,
  handleRetire,
  availableAmount,
  error,
  cancelRet 
}) => {
  return (
    <div className="py-4 flex flex-col items-center justify-center">
      <label className="border border-white200 rounded px-1">$ 
        <input
          type="number"
          value={amountToRet}
          max={availableAmount}
          min={1}
          step="0.01"
          onChange={(e) => setAmountToRet(Number(e.target.value))}
          className="w-[90%] p-2"
          placeholder="Monto a retirar"
        />
      </label>
      <h2 className="p-2 text-p2-medium text-center text-white800">Disponible: $ {availableAmount.toLocaleString()}</h2>
      {error !== "" && <p className="text-alert400 text-p2-regular text-center">{error}</p>}
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="solid" size="medium" onClick={handleRetire}>
          Retirar
        </Button>
        <Button variant="basic" size="medium" onClick={cancelRet}>
          Cancelar
        </Button>
      </div>
    </div>
  );
};
