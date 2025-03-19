'use client';
import { GrowthProgressBar } from "@/components/progressBar/progressGoal";
import Button from "@/components/ui/Button";
import useWalletStore from "@/store/balance/totalbalance";
import { Goal } from "@/store/goal/goalStore";
import { apiGoal } from "@/utils/goalData/FetchGoal";
import { ArrowBackIos, Delete, Settings } from "@mui/icons-material";
import { redirect } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import { EditGoalForm } from "./editGoals";
import { AddMoneyForm } from "./addMoney";
import { RetireMoneyForm } from "./retMoney";

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
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState<Goal | null>(detail);
  const deposited = useWalletStore((state) => state.totalBalance.deposited);
  const [error, setError] = useState("");
  const [isAddingMoney, setIsAddingMoney] = useState(false);
  const [isRetireMoney, setIsRetireMoney] = useState(false);
  const [amountToAdd, setAmountToAdd] = useState(1);
  const [amountToRet, setAmountToRet] = useState(1);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    if (editedGoal && detail) {
      apiGoal.update(detail?.idGoal, editedGoal).then(() => {
        Swal.fire("Cambios guardados", "Los cambios se han guardado exitosamente.", "success");
        setIsEditing(false);
        // window.location.reload(); 
      }).catch((error) => {
        console.error("Error al guardar cambios:", error);
        Swal.fire("Error", "Hubo un error al guardar los cambios.", "error");
      });
    }
  };
  
  const handleRetire = async () => {
    if (Number(amountToRet) && detail) {
      const amount = Number(amountToRet);
  
      if (amount <= detail.amount) {
        await apiGoal.withdrawal(detail?.idGoal, amount);
        Swal.fire("Retiro exitoso", "Se ha retirado fondos a la meta.", "success");
        setIsRetireMoney(false);
        window.location.reload(); 
      } else {
        setError("El monto no es válido");
      }
    } else {
      setError("Ingresa un monto válido");
    }
  };
  
  const handleAddMoney = async () => {
    if (Number(amountToAdd) < deposited && detail) {
      const amount = Number(amountToAdd);
  
      await apiGoal.deposit(detail?.idGoal, amount);
      Swal.fire("Ingreso exitoso", "Se han añadido fondos a la meta.", "success");
      setIsAddingMoney(false);
      window.location.reload(); 
    } else {
      setError("Ingresa un monto válido");
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
  
    if (result.isConfirmed && detail) {
      await apiGoal.delete(detail?.idGoal);
      Swal.fire("Eliminada", "La meta ha sido eliminada.", "success");
      onClose();
      window.location.reload(); 
    }
  };
  

  const handleCancelChange = ()=>{
    setIsEditing(false)
  }
  const handleCancelRetire = ()=>{
    setIsRetireMoney(false)
  }
  const handleCancelAdd = ()=>{
    setIsAddingMoney(false)
  }

  const handleInvesment = () => {
    redirect("/app/home/investment");
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
            <EditGoalForm
              editedGoal={editedGoal}
              setEditedGoal={setEditedGoal}
              handleSaveChanges={handleSaveChanges}
              handleDelete={handleDelete}
              cancelChanges={handleCancelChange}
            />
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

              {!isAddingMoney && !isRetireMoney && (
                <div className="flex flex-row justify-around p-2 pt-4">
                  {deposited > 0 ? (
                    <Button variant="solid" size="medium" onClick={() => setIsAddingMoney(true)}>
                      Ingresar
                    </Button>
                  ) : (
                    <Button variant="solid" size="medium" onClick={handleInvesment}>
                      Depositar
                    </Button>
                  )}
                  {detail?.amount && detail?.amount > 0 ? (
                    <Button variant="basic" size="medium" onClick={() => setIsRetireMoney(true)}>
                      Retirar 
                    </Button>
                  ) : ""
                  }
                  <button onClick={handleEditClick}>
                    <Settings />
                  </button>
                  <button onClick={handleDelete}>
                    <Delete className="text-alert400" />
                  </button>
                </div>
              )}

              {/* Formularios para agregar o retirar dinero */}
              {isAddingMoney && (
                <AddMoneyForm
                  deposited={deposited}
                  amountToAdd={amountToAdd}
                  setAmountToAdd={setAmountToAdd}
                  handleAddMoney={handleAddMoney}
                  cancelAdd={handleCancelAdd}
                  setError={setError}
                  error={error}
                />
              )}

              {isRetireMoney && (
                <RetireMoneyForm
                  amountToRet={amountToRet}
                  setAmountToRet={setAmountToRet}
                  handleRetire={handleRetire}
                  availableAmount={detail?.amount || 0}
                  setError={setError}
                  cancelRet={handleCancelRetire}
                  error={error}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
