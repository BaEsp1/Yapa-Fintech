import { TestData } from "@/components/modal/Onbording/steps";

export default function  assignProfileFinance(test: TestData): string {
  let totalPuntos = 0;

  if (test.finance === "Las finanzas son básicamente como manejamos nuestro dinero") {
    totalPuntos += 1;
  } else if (test.finance === "Conozco sobre sobre varios instrumentos y he invertido en acciones y nuevas empresas") {
    totalPuntos += 2;
  } else if (test.finance === "Sé un poco sobre inversiones y he puesto mi dinero en bonos y cuentas de ahorro") {
    totalPuntos += 3;
  }

  if (test.objective === "Mantener mi dinero a salvo (ahorrando)") {
    totalPuntos += 1;
  } else if (test.objective === "Ganar un poco sin arriesgar demasiado (invertir con precaución)") {
    totalPuntos += 2;
  } else if (test.objective === "Apostar por grandes ganancias asumiendo más riesgos (invertir con audacia)") {
    totalPuntos += 3;
  }

  if (test.time === "Menos de 2 años") {
    totalPuntos += 1;
  } else if (test.time === "Entre 2 y 5 años") {
    totalPuntos += 2;
  } else if (test.time === "Más de 5 años") {
    totalPuntos += 3;
  }

  if (test.lost === "Vendo todo inmediatamente") {
    totalPuntos += 1;
  } else if (test.lost === "Espero un tiempo antes de tomar una decisión") {
    totalPuntos += 2;
  } else if (test.lost === "Aprovecho para comprar más") {
    totalPuntos += 3;
  }


  if (totalPuntos >= 4 && totalPuntos <= 7) {
    return "Sembrador de oportunidades";
  } else if (totalPuntos >= 8 && totalPuntos <= 10) {
    return "Explorador de nuevos caminos";
  } else if (totalPuntos >= 11 && totalPuntos <= 12) {
    return "Cazador de inversiones";
  } else {
    return "Error: La suma de puntos no es válida.";
  }
}

export const assignKnowLedge = (riskProfile: string) =>{

  if (riskProfile === "Sembrador de oportunidades") return "Inicial"
  if (riskProfile === "Explorador de nuevos caminos") return "Intermedio"
  if (riskProfile === "Cazador de inversiones") return "Avanzado"

}