import { GrowthProgressBar } from "@/components/progressBar/progressGoal";
import Button from "@/components/ui/Button";
import { Goal, useGoalStore } from "@/store/goal/goalStore";
import { ArrowBackIos, Delete, Settings } from "@mui/icons-material";
import { useState } from "react";
import Swal from "sweetalert2";

interface DetailGoalProps {
  detail: Goal | null;
  icon: string;
  onClose: () => void;
}

export const DetailGoal: React.FC<DetailGoalProps> = ({
  detail,
  icon,
  onClose,
}) => {
  const { updateGoal, deleteGoal } = useGoalStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState<Goal | null>(detail);
  
  // Nuevo estado para manejar el input de dinero
  const [isAddingMoney, setIsAddingMoney] = useState(false);
  const [amountToAdd, setAmountToAdd] = useState<number | "">("");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    if (editedGoal) {
      updateGoal(editedGoal);
      setIsEditing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedGoal) {
      setEditedGoal({
        ...editedGoal,
        [name]: value,
      });
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez eliminada, no podrás recuperar esta meta.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    });
    if (result.isConfirmed) {
      await deleteGoal();
      Swal.fire("Eliminada", "La meta ha sido eliminada.", "success");
      onClose();
    }
  };

  const handleAddMoneyClick = () => {
    setIsAddingMoney(true);  
  };

  const handleAddMoney = () => {
    if ( Number(amountToAdd)> 0 && detail) {

      updateGoal({
        ...detail,
        amount: (detail?.amount || 0) + Number(amountToAdd),
      });
      setIsAddingMoney(false);
      setAmountToAdd(""); 
    }
  };

  const handleCancelAddMoney = () => {
    setIsAddingMoney(false);
    setAmountToAdd(""); 
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg items-center">
        <button onClick={onClose} className="float-right p-1">
          <ArrowBackIos />
        </button>

        <h1 className="p-2 text-h6-semibold">
          {detail?.description} <span>{icon}</span>
        </h1>

        <div className="p-2">
          <GrowthProgressBar currentStep={detail?.progress || 0} totalSteps={100} />
        </div>

        <div className="p-2 pt-4">
          {isEditing ? (
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
                <Button variant="basic" size="medium" onClick={() => setIsEditing(false)}>
                  Cancelar
                </Button>
                <button onClick={handleDelete}><Delete className="text-alert400" /></button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-p2-medium py-1 flex flex-row justify-between">
                Objetivo:
                <span className="text-p1-medium">
                  ${detail?.amountObjective.toLocaleString()}
                </span>
              </h2>

              <h2 className="text-p2-medium py-1 flex flex-row justify-between">
                Fecha de Inicio
                <span className="text-p1-medium">
                  {detail?.startDate
                    ? new Date(detail.startDate).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      })
                    : ""}
                </span>
              </h2>

              <h2 className="text-p2-medium py-1 flex flex-row justify-between">
                Fecha Estimada
                <span className="text-p1-medium">
                  {detail?.targetDate
                    ? new Date(detail.targetDate).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      })
                    : ""}
                </span>
              </h2>
              <div className="flex flex-col p-2 pt-4 justify-center items-center">
                <h2 className="text-p2-medium">Ahorro actual:</h2>
                <h2 className="text-h5-medium">$ {detail?.amount.toLocaleString()}</h2>
              </div>

              {!isAddingMoney ?
              <div className="flex flex-row justify-end gap-2 p-2 pt-4">
                <Button variant="solid" size="medium" onClick={handleAddMoneyClick}>
                  Agregar dinero
                </Button>
                {detail?.amount && detail?.amount > 0 ? (
                  <Button variant="basic" size="medium">
                    Retirar dinero
                  </Button>
                ) : (
                  ""
                )}
                <button onClick={handleEditClick}>
                  <Settings />
                </button>
              </div>
              : ""
              }
              
              {/* Mostrar el input para agregar dinero si está activado */}
              {isAddingMoney && (
                <div className="py-4">
                  <input
                    type="number"
                    value={amountToAdd}
                    onChange={(e) => setAmountToAdd(Number(e.target.value))}
                    className="w-full p-2 border rounded"
                    placeholder="Monto a agregar"
                  />
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="solid" size="medium" onClick={handleAddMoney}>
                      Ingresar
                    </Button>
                    <Button variant="basic" size="medium" onClick={handleCancelAddMoney}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
