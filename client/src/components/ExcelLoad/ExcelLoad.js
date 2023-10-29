import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function ExcelLoader() {
  const [excelData, setExcelData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(sheet);

      // Guardar los datos del archivo Excel en el estado
      setExcelData(excelData);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      <button onClick={() => setExcelData(null)}>Reset Data</button>
      {excelData ? (
        <div>
          <h3>Excel Data:</h3>
          <pre>{JSON.stringify(excelData, null, 2)}</pre>
        </div>
      ) : (
        <p>No Excel data loaded</p>
      )}
    </div>
  );
}

export default ExcelLoader;
