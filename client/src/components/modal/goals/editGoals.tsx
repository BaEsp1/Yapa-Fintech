import Button from "@/components/ui/Button";
import { Delete } from "@mui/icons-material";

interface EditGoal {
    idGoal:number;
    description: string;
    objectiveType:string;
    frequency: string;
    amountObjective: number;
    startDate: Date;
    targetDate: Date;
    amount: number;
    progress: number;
    status:string;
}

interface EditGoalFormProps {
    editedGoal: EditGoal | null; 
    setEditedGoal: React.Dispatch<React.SetStateAction<EditGoal | null>>;
  handleSaveChanges: () => void;
  handleDelete: () => void;
  cancelChanges: () => void;
}

export const EditGoalForm: React.FC<EditGoalFormProps> = ({
  editedGoal,
  setEditedGoal,
  handleSaveChanges,
  handleDelete,
  cancelChanges
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (editedGoal) {
          setEditedGoal({
            ...editedGoal,
            amountObjective:Number(editedGoal.amountObjective),
            [name]: value,
          });
        }
      };

  return (
    <div>
      <div className="py-2">
        <label className="text-p2-medium">Descripción:</label>
        <input
          type="text"
          name="description"
          value={editedGoal?.description || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="py-2">
        <label className="text-p2-medium">Monto Objetivo:</label>
        <input
          type="number"
          name="amountObjective"
          value={editedGoal?.amountObjective || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="py-2">
        <label className="text-p2-medium">Fecha de Inicio:</label>
        <input
          type="date"
          name="startDate"
          value={editedGoal?.startDate ? new Date(editedGoal.startDate).toISOString().split('T')[0] : ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="py-2">
        <label className="text-p2-medium">Fecha Estimada:</label>
        <input
          type="date"
          name="targetDate"
          value={editedGoal?.targetDate ? new Date(editedGoal.targetDate).toISOString().split('T')[0] : ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="pt-4 flex justify-end gap-2">
        <Button variant="solid" size="medium" onClick={handleSaveChanges}>
          Guardar Cambios
        </Button>
        <Button variant="basic" size="medium" onClick={cancelChanges}>
          Cancelar
        </Button>
        <button onClick={handleDelete}>
          <Delete className="text-alert400" />
        </button>
      </div>
    </div>
  );
};
