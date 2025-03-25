import { Operation } from "@/store/operations/operations"
import { ArrowBackIos } from "@mui/icons-material";
const encodeBase64 = (input: string) => {
    const complexString = `*${input}*`
  return btoa(complexString);
  };

interface DetailOperationProps {
    detail: Operation; 
    onClose: ()=> void;
  }
  
export const DetailOperation = ({ detail , onClose}: DetailOperationProps) => {
    const encodedId = encodeBase64(detail.idOperation.toString());

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[25em] lg:w-[95vh] relative flex flex-col gap-1 h-[34em] m-auto p-3">
            
            <div className="flex flex-col w-full p-2">
                <button onClick={onClose}
                className="flex justify-end pt-1">
                    <ArrowBackIos/>
                </button>
                <h1 className="text-h6-medium text-primary800">{detail.type=== "buy" ? "Compra": "Venta"} {detail.instrument.symbol}</h1>
                <h2 className="text-p2-medium text-white800"> {new Date(detail.createdAt).toLocaleString('es-AR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false, 
            })}hs</h2>
            </div>

            <div className="flex flex-col w-full p-2">
                <h2 className="text-white800 text-p2-regular">Estado actual</h2>
                <h3 className=" text-white900 text-p1-semibold">Se ha completado exitosamente!</h3>
            </div>

            <div className="flex flex-col w-full gap-1 text-white800  text-p1-regular p-2">
                <h1 className="text-h6-medium text-primary800">Detalle de la operación</h1>
                <h2 className="text-p1-regular">Tipo de operación: <span className="text-p1-medium">{detail.type=== "buy" ? "Compra": "Venta"}</span></h2>
                <h2 className="">Instrumento: <span className="text-p1-medium">{detail.instrument.type}</span></h2>
                <h2 className="">Nombre: <span className="text-p1-medium">{detail.instrument.name}</span></h2>
                <h2 className="">Símbolo: <span className="text-p1-medium"> {detail.instrument.symbol}</span></h2>
                <h2 className="">Cantidad: <span className="text-p1-medium"> {detail.instrument.quantity}</span></h2>
                <h2 className="">Precio:  <span className="text-p1-medium">$ {detail.instrument.price} {detail.currency}</span></h2>
                <h2 className="">Subtotal: <span className="text-p1-medium">$ {detail.subTotal} ARS</span></h2>
                <h2 className="">Total: <span className="text-p1-medium">$ {detail.totalPrice} ARS</span></h2>
            </div>
            <div className="flex flex-col w-full justify-center text-center">
                <h2 className="">Comprobante de operación:</h2>
                <h3 className="text-h6-medium text-accent400">#{encodedId + detail.idOperation}</h3>
            </div>
            </div>
        </div>
    )
}