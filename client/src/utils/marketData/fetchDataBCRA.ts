
export const fetchVariableData = async (variable: string) => {
  const variablesMap: { [key: string]: number } = {
    tasaDeInteres: 12,
    cotizacionUSD: 4,
  };

  const idVariable = variablesMap[variable];

  if (!idVariable) {
    console.error("Variable no válida");
    return [];
  }


  try {
    const response = await fetch(`https://api.bcra.gob.ar/estadisticas/v3.0/monetarias/${idVariable}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching data");
    }

    // console.log(response)
    const data = await response.json();

    const results = data.results.slice(0, 10); 
    return results;
  } catch (error) {
    console.error("Error fetching variable data", error);
    return [];  
  }
};
