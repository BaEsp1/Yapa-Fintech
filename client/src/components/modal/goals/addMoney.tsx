import Button from "@/components/ui/Button";

interface AddMoneyFormProps {
  deposited: number;
  amountToAdd: number;
  setAmountToAdd: React.Dispatch<React.SetStateAction<number>>;
  handleAddMoney: () => void;
  setError: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  cancelAdd: () => void
}

export const AddMoneyForm: React.FC<AddMoneyFormProps> = ({
  deposited,
  amountToAdd,
  setAmountToAdd,
  handleAddMoney,
  error,
  cancelAdd
}) => {
  return (
    <div className="py-4 flex flex-col items-center justify-center">
      <label className="border border-white200 rounded px-1">$ 
        <input
          type="number"
          value={amountToAdd}
          max={deposited}
          min={1}
          step="0.01"
          onChange={(e) => setAmountToAdd(Number(e.target.value))}
          className="w-[90%] p-2"
          placeholder="Monto a agregar"
        />
      </label>
      <h2 className="p-2 text-p2-medium text-center text-white800">Disponible: $ {deposited.toLocaleString()}</h2>
      {error !== "" && <p className="text-alert400 text-p2-regular text-center">{error}</p>}
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="solid" size="medium" onClick={handleAddMoney}>
          Ingresar
        </Button>
        <Button variant="basic" size="medium" onClick={cancelAdd}>
          Cancelar
        </Button>
      </div>
    </div>
  );
};
