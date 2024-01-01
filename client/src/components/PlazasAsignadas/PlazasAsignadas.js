import React, { useState, useEffect } from 'react';
import './PlazasAsignadas.css';

function PlazasAsignadas() {
  const [data, setData] = useState([]);
  const [selectedEspecialidad, setSelectedEspecialidad] = useState('');
  const [maxOrden, setMaxOrden] = useState(null);
  const [localidadesData, setLocalidadesData] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    const filePath = 'Data/plazas_2023.json'; // Cambia a la ruta de tu archivo JSON

    const fetchData = async () => {
      try {
        const response = await fetch(filePath);
        const jsonData = await response.json();
        setData(jsonData);

        // Obtener una lista de especialidades únicas
        const uniqueEspecialidades = Array.from(
          new Set(jsonData.map((item) => item.Especialidad))
        );
        setEspecialidades(uniqueEspecialidades);
        console.log(uniqueEspecialidades);
      } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
      }
    };

    fetchData();
  }, []);

  const handleEspecialidadChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedEspecialidad(selectedValue);

    // Filtrar los datos para obtener solo la especialidad seleccionada
    const filteredData = data.filter((item) => item.Especialidad === selectedValue);

    const localidades = {};
    filteredData.forEach((item) => {
      const localidad = item.Localidad;
      const noOrden = item['Nº Orden'];
      const centro = item.Centro;

      if (!localidades[localidad] || noOrden > localidades[localidad]) {
        localidades[localidad] = { noOrden, centro };
      }
    });

    const localidadesData = Object.keys(localidades).map((localidad) => ({
      Localidad: localidad,
      'Nº Orden Máximo': localidades[localidad].noOrden,
      Centro: localidades[localidad].centro,
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
      <h1>Asignación Plazas MIR 2023</h1>

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
          Última plaza asignada para {selectedEspecialidad}: {maxOrden}
        </div>
      )}
      
      <div className='table-container'>
        {selectedEspecialidad && localidadesData.length > 0 && (
          <div>
            <h2>Tabla de Localidades y últimas plazas asignadas</h2>
            <table className='table-element'>
              <thead>
                <tr>
                  <th>Localidad</th>
                  <th>Centro</th>
                  <th>Última plaza</th>
                </tr>
              </thead>
              <tbody>
                {localidadesData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.Localidad}</td>
                    <td>{item.Centro}</td>
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

export default PlazasAsignadas;


// import React, { useState, useEffect} from 'react';
// import * as XLSX from 'xlsx';
// import './PlazasAsignadas.css'

// function PlazasAsignadas() {
//   const [xlsxData, setXlsxData] = useState([]);
//   const [selectedEspecialidad, setSelectedEspecialidad] = useState('');
//   const [maxOrden, setMaxOrden] = useState(null);
//   const [localidadesData, setLocalidadesData] = useState([]);
//   const [especialidades, setEspecialidades] = useState([]);

//   useEffect(() => {
//     const filePath = 'Data/plazas_2023.xlsx'; 

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

//         // Obtener una lista de especialidades únicas
//         const uniqueEspecialidades = Array.from(
//           new Set(xlsxData.map((item) => item.Especialidad))
//         );
//         setEspecialidades(uniqueEspecialidades);
//         console.log(uniqueEspecialidades);
//       } catch (error) {
//         console.error('Error al cargar el archivo XLSX:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleEspecialidadChange = (event) => {
//     const selectedValue = event.target.value;
//     setSelectedEspecialidad(selectedValue);

//     // Filtrar los datos para obtener solo la especialidad seleccionada
//     const filteredData = xlsxData.filter((item) => item.Especialidad === selectedValue);

//     const localidades = {};
//     filteredData.forEach((item) => {
//       const localidad = item.Localidad;
//       const noOrden = item['Nº Orden'];
//       const centro = item.Centro;

//       if (!localidades[localidad] || noOrden > localidades[localidad]) {
//         localidades[localidad] = {noOrden,centro};
//       }
//     });

//     const localidadesData = Object.keys(localidades).map((localidad) => ({
//       Localidad: localidad,
//       'Nº Orden Máximo': localidades[localidad].noOrden,
//       Centro: localidades[localidad].centro,
//     }));
//     setLocalidadesData(localidadesData);

//     if (filteredData.length > 0) {
//       // Encontrar el número máximo de "Nº Orden" en los datos filtrados
//       const maxOrden = Math.max(...filteredData.map((item) => item['Nº Orden']));
//       setMaxOrden(maxOrden);
//     } else {
//       // Si no se encontraron datos para la especialidad seleccionada
//       setMaxOrden(null);
//     }
//   };

//   return (
//     <div>
//       <h1>Assignación Plazas MIR 2023</h1>

//       <label>
//         Seleccione Especialidad:
//         <select value={selectedEspecialidad} onChange={handleEspecialidadChange}>
//           <option value="">Seleccione una especialidad</option>
//           {especialidades.map((especialidad) => (
//             <option key={especialidad} value={especialidad}>
//               {especialidad}
//             </option>
//           ))}
//         </select>
//       </label>
//       {maxOrden !== null && (
//         <div>
//           Ultima plaza assignada para {selectedEspecialidad}: {maxOrden}
//         </div>
//       )}
      
//       <div className='table-container'>
//         {selectedEspecialidad && localidadesData.length > 0 && (
//           <div>
//             <h2>Tabla de Localidades y ultimas plazas assignadas</h2>
//             <table className='table-element'>
//               <thead>
//                 <tr>
//                   <th>Localidad</th>
//                   <th>Centro</th>
//                   <th>Ultima plaza</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {localidadesData.map((item, index) => (
//                   <tr key={index}>
//                     <td>{item.Localidad}</td>
//                     <td>{item.Centro}</td>
//                     <td>{item['Nº Orden Máximo']}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//     </div>
//   );
// }

// export default PlazasAsignadas;
