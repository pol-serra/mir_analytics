import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import './App.css'
import PlazasAsignadas from './components/PlazasAsignadas/PlazasAsignadas';

function App() {
  return (
    <h1>HELLO</h1>,
    <div>
      <PlazasAsignadas />
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