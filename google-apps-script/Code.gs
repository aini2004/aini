/**
 * Google Apps Script REST API untuk Google Sheets
 * Mengambil data dari spreadsheet aktif dan menyediakannya sebagai API
 */

// Fungsi utama untuk menangani HTTP GET requests
function doGet(e) {
  try {
    // Ambil parameter dari URL
    const params = e.parameter;
    const action = params.action || 'getAllData';
    const sheet = params.sheet || null;
    const id = params.id || null;
    
    // Dapatkan spreadsheet aktif
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    let result;
    
    switch (action) {
      case 'getAllData':
        result = getAllData(spreadsheet, sheet);
        break;
      case 'getSheets':
        result = getSheetNames(spreadsheet);
        break;
      case 'getById':
        result = getDataById(spreadsheet, sheet, id);
        break;
      case 'search':
        const query = params.query || '';
        result = searchData(spreadsheet, sheet, query);
        break;
      default:
        result = {
          status: 'error',
          message: 'Invalid action parameter',
          availableActions: ['getAllData', 'getSheets', 'getById', 'search']
        };
    }
    
    // Return JSON response
    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Fungsi untuk menangani HTTP POST requests
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action || 'addData';
    const sheetName = data.sheet || null;
    
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    let result;
    
    switch (action) {
      case 'addData':
        result = addData(spreadsheet, sheetName, data.rowData);
        break;
      case 'updateData':
        result = updateData(spreadsheet, sheetName, data.id, data.rowData);
        break;
      case 'deleteData':
        result = deleteData(spreadsheet, sheetName, data.id);
        break;
      default:
        result = {
          status: 'error',
          message: 'Invalid action parameter for POST request'
        };
    }
    
    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Mengambil semua data dari sheet tertentu atau sheet pertama
 */
function getAllData(spreadsheet, sheetName = null) {
  try {
    let sheet;
    
    if (sheetName) {
      sheet = spreadsheet.getSheetByName(sheetName);
      if (!sheet) {
        return {
          status: 'error',
          message: `Sheet '${sheetName}' not found`
        };
      }
    } else {
      sheet = spreadsheet.getSheets()[0]; // Ambil sheet pertama
    }
    
    const range = sheet.getDataRange();
    const values = range.getValues();
    
    if (values.length === 0) {
      return {
        status: 'success',
        data: [],
        message: 'No data found',
        sheetName: sheet.getName()
      };
    }
    
    // Baris pertama sebagai header
    const headers = values[0];
    const data = [];
    
    // Konversi data ke format object
    for (let i = 1; i < values.length; i++) {
      const row = {};
      for (let j = 0; j < headers.length; j++) {
        row[headers[j]] = values[i][j];
      }
      // Tambahkan ID berdasarkan nomor baris
      row._id = i;
      row._rowNumber = i + 1;
      data.push(row);
    }
    
    return {
      status: 'success',
      data: data,
      count: data.length,
      sheetName: sheet.getName(),
      headers: headers,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    return {
      status: 'error',
      message: error.toString()
    };
  }
}

/**
 * Mengambil nama semua sheet dalam spreadsheet
 */
function getSheetNames(spreadsheet) {
  try {
    const sheets = spreadsheet.getSheets();
    const sheetNames = sheets.map(sheet => ({
      name: sheet.getName(),
      id: sheet.getSheetId(),
      rowCount: sheet.getLastRow(),
      columnCount: sheet.getLastColumn()
    }));
    
    return {
      status: 'success',
      sheets: sheetNames,
      count: sheetNames.length,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    return {
      status: 'error',
      message: error.toString()
    };
  }
}

/**
 * Mengambil data berdasarkan ID (nomor baris)
 */
function getDataById(spreadsheet, sheetName, id) {
  try {
    if (!id) {
      return {
        status: 'error',
        message: 'ID parameter is required'
      };
    }
    
    const allData = getAllData(spreadsheet, sheetName);
    
    if (allData.status === 'error') {
      return allData;
    }
    
    const item = allData.data.find(row => row._id == id);
    
    if (!item) {
      return {
        status: 'error',
        message: `Data with ID ${id} not found`
      };
    }
    
    return {
      status: 'success',
      data: item,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    return {
      status: 'error',
      message: error.toString()
    };
  }
}

/**
 * Mencari data berdasarkan query
 */
function searchData(spreadsheet, sheetName, query) {
  try {
    if (!query) {
      return {
        status: 'error',
        message: 'Query parameter is required'
      };
    }
    
    const allData = getAllData(spreadsheet, sheetName);
    
    if (allData.status === 'error') {
      return allData;
    }
    
    const searchResults = allData.data.filter(row => {
      return Object.values(row).some(value => 
        String(value).toLowerCase().includes(query.toLowerCase())
      );
    });
    
    return {
      status: 'success',
      data: searchResults,
      count: searchResults.length,
      query: query,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    return {
      status: 'error',
      message: error.toString()
    };
  }
}

/**
 * Menambah data baru ke sheet
 */
function addData(spreadsheet, sheetName, rowData) {
  try {
    if (!rowData || !Array.isArray(rowData)) {
      return {
        status: 'error',
        message: 'rowData must be an array'
      };
    }
    
    let sheet;
    if (sheetName) {
      sheet = spreadsheet.getSheetByName(sheetName);
      if (!sheet) {
        return {
          status: 'error',
          message: `Sheet '${sheetName}' not found`
        };
      }
    } else {
      sheet = spreadsheet.getSheets()[0];
    }
    
    const lastRow = sheet.getLastRow();
    const newRow = lastRow + 1;
    
    // Tambahkan data ke baris baru
    sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);
    
    return {
      status: 'success',
      message: 'Data added successfully',
      newRowNumber: newRow,
      data: rowData,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    return {
      status: 'error',
      message: error.toString()
    };
  }
}

/**
 * Update data berdasarkan ID
 */
function updateData(spreadsheet, sheetName, id, rowData) {
  try {
    if (!id || !rowData || !Array.isArray(rowData)) {
      return {
        status: 'error',
        message: 'ID and rowData (array) are required'
      };
    }
    
    let sheet;
    if (sheetName) {
      sheet = spreadsheet.getSheetByName(sheetName);
      if (!sheet) {
        return {
          status: 'error',
          message: `Sheet '${sheetName}' not found`
        };
      }
    } else {
      sheet = spreadsheet.getSheets()[0];
    }
    
    const rowNumber = parseInt(id) + 1; // +1 karena header di baris 1
    
    if (rowNumber < 2 || rowNumber > sheet.getLastRow()) {
      return {
        status: 'error',
        message: 'Invalid row number'
      };
    }
    
    // Update data
    sheet.getRange(rowNumber, 1, 1, rowData.length).setValues([rowData]);
    
    return {
      status: 'success',
      message: 'Data updated successfully',
      rowNumber: rowNumber,
      data: rowData,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    return {
      status: 'error',
      message: error.toString()
    };
  }
}

/**
 * Hapus data berdasarkan ID
 */
function deleteData(spreadsheet, sheetName, id) {
  try {
    if (!id) {
      return {
        status: 'error',
        message: 'ID is required'
      };
    }
    
    let sheet;
    if (sheetName) {
      sheet = spreadsheet.getSheetByName(sheetName);
      if (!sheet) {
        return {
          status: 'error',
          message: `Sheet '${sheetName}' not found`
        };
      }
    } else {
      sheet = spreadsheet.getSheets()[0];
    }
    
    const rowNumber = parseInt(id) + 1; // +1 karena header di baris 1
    
    if (rowNumber < 2 || rowNumber > sheet.getLastRow()) {
      return {
        status: 'error',
        message: 'Invalid row number'
      };
    }
    
    // Hapus baris
    sheet.deleteRow(rowNumber);
    
    return {
      status: 'success',
      message: 'Data deleted successfully',
      deletedRowNumber: rowNumber,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    return {
      status: 'error',
      message: error.toString()
    };
  }
}

/**
 * Fungsi helper untuk testing
 */
function testAPI() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // Test getAllData
  console.log('Testing getAllData:');
  console.log(getAllData(spreadsheet));
  
  // Test getSheetNames
  console.log('Testing getSheetNames:');
  console.log(getSheetNames(spreadsheet));
}