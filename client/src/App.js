import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

function App() {
  const [xlsxData, setXlsxData] = useState([]);
  const [selectedEspecialidad, setSelectedEspecialidad] = useState('');
  const [maxOrden, setMaxOrden] = useState(null);
  const [localidadesData, setLocalidadesData] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    const filePath = '/plazas_2023.xlsx'; // Ruta relativa a la carpeta "public"

    const fetchData = async () => {
      try {
        const response = await fetch(filePath);
        const arrayBuffer = await response.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const xlsxData = XLSX.utils.sheet_to_json(sheet);
        setXlsxData(xlsxData);

        // Obtener una lista de especialidades únicas
        const uniqueEspecialidades = Array.from(
          new Set(xlsxData.map((item) => item.Especialidad))
        );
        setEspecialidades(uniqueEspecialidades);
      } catch (error) {
        console.error('Error al cargar el archivo XLSX:', error);
      }
    };

    fetchData();
  }, []);

  const handleEspecialidadChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedEspecialidad(selectedValue);

    // Filtrar los datos para obtener solo la especialidad seleccionada
    const filteredData = xlsxData.filter((item) => item.Especialidad === selectedValue);

    const localidades = {};
    filteredData.forEach((item) => {
      const localidad = item.Localidad;
      const noOrden = item['Nº Orden'];

      if (!localidades[localidad] || noOrden > localidades[localidad]) {
        localidades[localidad] = noOrden;
      }
    });

    const localidadesData = Object.keys(localidades).map((localidad) => ({
      Localidad: localidad,
      'Nº Orden Máximo': localidades[localidad],
    }));
    setLocalidadesData(localidadesData);

    if (filteredData.length > 0) {
      // Encontrar el número máximo de "Nº Orden" en los datos filtrados
      const maxOrden = Math.max(...filteredData.map((item) => item['Nº Orden']));
      setMaxOrden(maxOrden);
    } else {
      // Si no se encontraron datos para la especialidad seleccionada
      setMaxOrden(null);
    }
  };

  return (
    <div>
      <h1>Leer Archivo XLSX</h1>

      <label>
        Seleccione Especialidad:
        <select value={selectedEspecialidad} onChange={handleEspecialidadChange}>
          <option value="">Seleccione una especialidad</option>
          {especialidades.map((especialidad) => (
            <option key={especialidad} value={especialidad}>
              {especialidad}
            </option>
          ))}
        </select>
      </label>
      {maxOrden !== null && (
        <div>
          Ultima plaza assignada para {selectedEspecialidad}: {maxOrden}
        </div>
      )}
      
      <div>
      {selectedEspecialidad && localidadesData.length > 0 && (
        <div>
          <h2>Tabla de Localidades y ultimas plazas assignadas</h2>
          <table>
            <thead>
              <tr>
                <th>Localidad</th>
                <th>Ultima plaza</th>
              </tr>
            </thead>
            <tbody>
              {localidadesData.map((item, index) => (
                <tr key={index}>
                  <td>{item.Localidad}</td>
                  <td>{item['Nº Orden Máximo']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>

    </div>
  );
}

export default App;


// import React, { useState, useEffect } from 'react';
// import * as XLSX from 'xlsx';
// function App() {

//   const [xlsxData, setXlsxData] = useState([]);
//   const [selectedEspecialidad, setSelectedEspecialidad] = useState('');
//   const [maxOrden, setMaxOrden] = useState(null);
//   const [especialidades, setEspecialidades] = useState([]);

//   useEffect(() => {
//     const filePath = '/plazas_2023.xlsx'; // Ruta relativa a la carpeta "public"

//     const fetchData = async () => {
//       try {
//         const response = await fetch(filePath);
//         const arrayBuffer = await response.arrayBuffer();
//         const data = new Uint8Array(arrayBuffer);
//         const workbook = XLSX.read(data, { type: 'array' });
//         const sheetName = workbook.SheetNames[0];
//         const sheet = workbook.Sheets[sheetName];
//         const xlsxData = XLSX.utils.sheet_to_json(sheet);
//         setXlsxData(xlsxData);

//         const uniqueEspecialidades = Array.from(
//           new Set(xlsxData.map((item) => item.Especialidad))
//         );
//         setEspecialidades(uniqueEspecialidades);
//       } catch (error) {
//         console.error('Error al cargar el archivo XLSX:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Leer Archivo XLSX</h1>
//       {xlsxData.length > 0 ? (
//         <div>
//           <h3>XLSX Data:</h3>
//           <pre>{JSON.stringify(xlsxData, null, 2)}</pre>
//         </div>
//       ) : (
//         <p>No XLSX data loaded</p>
//       )}
//     </div>
//   );
// }


// export default App;


  // CODE FOR READ CSV type file

  // const [csvData, setCsvData] = useState([]);

  // useEffect(() => {
  //   const filePath = 'plazas_2023.csv';

  //   const fetchData = () => {
  //     try {
  //       const xhr = new XMLHttpRequest();
  //       xhr.open('GET', filePath);
  //       xhr.onreadystatechange = function () {
  //         if (xhr.readyState === 4 && xhr.status === 200) {
  //           const data = xhr.responseText;
  //           const lines = data.split('\n');
  //           const result = [];
  //           const headers = lines[0].split(',');

  //           for (let i = 1; i < lines.length; i++) {
  //             const obj = {};
  //             const currentLine = lines[i].split(',');

  //             for (let j = 0; j < headers.length; j++) {
  //               obj[headers[j]] = currentLine[j];
  //             }

  //             result.push(obj);
  //           }

  //           setCsvData(result);
  //         }
  //       };
  //       xhr.send();
  //     } catch (error) {
  //       console.error('Error al cargar el archivo CSV:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // return (
  //   <div>
  //     <h1>Leer Archivo CSV</h1>
  //     {csvData.length > 0 ? (
  //       <div>
  //         <h3>CSV Data:</h3>
  //         <pre>{JSON.stringify(csvData, null, 2)}</pre>
  //       </div>
  //     ) : (
  //       <p>No CSV data loaded</p>
  //     )}
  //   </div>
  // );