/**
 * Google Apps Script REST API untuk Google Sheets - Wahena Furniture
 * Mengambil data furniture dari spreadsheet dan menyediakannya sebagai API
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
        result = getAllFurnitureData(spreadsheet, sheet);
        break;
      case 'getSheets':
        result = getSheetNames(spreadsheet);
        break;
      case 'getById':
        result = getFurnitureById(spreadsheet, sheet, id);
        break;
      case 'search':
        const query = params.query || '';
        result = searchFurniture(spreadsheet, sheet, query);
        break;
      case 'getByCategory':
        const category = params.category || '';
        result = getFurnitureByCategory(spreadsheet, sheet, category);
        break;
      default:
        result = {
          status: 'error',
          message: 'Invalid action parameter',
          availableActions: ['getAllData', 'getSheets', 'getById', 'search', 'getByCategory']
        };
    }
    
    // Return JSON response dengan CORS headers
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
      case 'addFurniture':
        result = addFurnitureData(spreadsheet, sheetName, data.furnitureData);
        break;
      case 'updateFurniture':
        result = updateFurnitureData(spreadsheet, sheetName, data.id, data.furnitureData);
        break;
      case 'deleteFurniture':
        result = deleteFurnitureData(spreadsheet, sheetName, data.id);
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
 * Mengambil semua data furniture dari sheet
 */
function getAllFurnitureData(spreadsheet, sheetName = null) {
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
    const furnitureData = [];
    
    // Konversi data ke format furniture object
    for (let i = 1; i < values.length; i++) {
      const furniture = {};
      
      for (let j = 0; j < headers.length; j++) {
        const header = headers[j];
        let value = values[i][j];
        
        // Format khusus untuk harga
        if (header.toLowerCase().includes('price') || header.toLowerCase().includes('harga')) {
          // Jika value adalah number, format sebagai currency Indonesia
          if (typeof value === 'number') {
            value = formatRupiah(value);
          } else if (typeof value === 'string' && !isNaN(value.replace(/[^\d]/g, ''))) {
            // Jika string berisi angka, format ulang
            const numValue = parseInt(value.replace(/[^\d]/g, ''));
            value = formatRupiah(numValue);
          }
        }
        
        furniture[header] = value;
      }
      
      // Tambahkan ID berdasarkan nomor baris
      furniture.id = i;
      furniture._rowNumber = i + 1;
      
      furnitureData.push(furniture);
    }
    
    return {
      status: 'success',
      data: furnitureData,
      count: furnitureData.length,
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
 * Format angka menjadi format Rupiah
 */
function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
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
 * Mengambil data furniture berdasarkan ID
 */
function getFurnitureById(spreadsheet, sheetName, id) {
  try {
    if (!id) {
      return {
        status: 'error',
        message: 'ID parameter is required'
      };
    }
    
    const allData = getAllFurnitureData(spreadsheet, sheetName);
    
    if (allData.status === 'error') {
      return allData;
    }
    
    const furniture = allData.data.find(item => item.id == id);
    
    if (!furniture) {
      return {
        status: 'error',
        message: `Furniture with ID ${id} not found`
      };
    }
    
    return {
      status: 'success',
      data: furniture,
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
 * Mencari furniture berdasarkan query
 */
function searchFurniture(spreadsheet, sheetName, query) {
  try {
    if (!query) {
      return {
        status: 'error',
        message: 'Query parameter is required'
      };
    }
    
    const allData = getAllFurnitureData(spreadsheet, sheetName);
    
    if (allData.status === 'error') {
      return allData;
    }
    
    const searchResults = allData.data.filter(furniture => {
      return Object.values(furniture).some(value => 
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
 * Mengambil furniture berdasarkan kategori
 */
function getFurnitureByCategory(spreadsheet, sheetName, category) {
  try {
    if (!category) {
      return {
        status: 'error',
        message: 'Category parameter is required'
      };
    }
    
    const allData = getAllFurnitureData(spreadsheet, sheetName);
    
    if (allData.status === 'error') {
      return allData;
    }
    
    const categoryResults = allData.data.filter(furniture => {
      // Cari di field yang mungkin berisi kategori
      const categoryFields = ['category', 'kategori', 'type', 'jenis'];
      return categoryFields.some(field => 
        furniture[field] && 
        String(furniture[field]).toLowerCase().includes(category.toLowerCase())
      );
    });
    
    return {
      status: 'success',
      data: categoryResults,
      count: categoryResults.length,
      category: category,
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
 * Menambah data furniture baru
 */
function addFurnitureData(spreadsheet, sheetName, furnitureData) {
  try {
    if (!furnitureData || typeof furnitureData !== 'object') {
      return {
        status: 'error',
        message: 'furnitureData must be an object'
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
    
    // Ambil header untuk menentukan urutan kolom
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const rowData = [];
    
    // Susun data sesuai urutan header
    headers.forEach(header => {
      rowData.push(furnitureData[header] || '');
    });
    
    const lastRow = sheet.getLastRow();
    const newRow = lastRow + 1;
    
    // Tambahkan data ke baris baru
    sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);
    
    return {
      status: 'success',
      message: 'Furniture data added successfully',
      newRowNumber: newRow,
      data: furnitureData,
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
 * Update data furniture berdasarkan ID
 */
function updateFurnitureData(spreadsheet, sheetName, id, furnitureData) {
  try {
    if (!id || !furnitureData || typeof furnitureData !== 'object') {
      return {
        status: 'error',
        message: 'ID and furnitureData (object) are required'
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
    
    // Ambil header untuk menentukan urutan kolom
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const rowData = [];
    
    // Susun data sesuai urutan header
    headers.forEach(header => {
      rowData.push(furnitureData[header] || '');
    });
    
    // Update data
    sheet.getRange(rowNumber, 1, 1, rowData.length).setValues([rowData]);
    
    return {
      status: 'success',
      message: 'Furniture data updated successfully',
      rowNumber: rowNumber,
      data: furnitureData,
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
 * Hapus data furniture berdasarkan ID
 */
function deleteFurnitureData(spreadsheet, sheetName, id) {
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
      message: 'Furniture data deleted successfully',
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
function testFurnitureAPI() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // Test getAllFurnitureData
  console.log('Testing getAllFurnitureData:');
  console.log(getAllFurnitureData(spreadsheet));
  
  // Test searchFurniture
  console.log('Testing searchFurniture:');
  console.log(searchFurniture(spreadsheet, null, 'sofa'));
}

/**
 * Fungsi untuk membuat sample data furniture (untuk testing)
 */
function createSampleFurnitureData() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheets()[0];
  
  // Header
  const headers = ['Product Name', 'Price', 'Image', 'Category', 'Description'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Sample data
  const sampleData = [
    [
      'Sofa King',
      3500000,
      'https://images.unsplash.com/photo-1663756915304-40b7eda63e41?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Sofa',
      'Sofa mewah dengan desain modern dan nyaman'
    ],
    [
      'Tempat Tidur Ratu Aini',
      4000000,
      'https://images.unsplash.com/photo-1758072328635-586f3c121af2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Tempat Tidur',
      'Tempat tidur queen size dengan desain elegan'
    ],
    [
      'Rak Buku Aesthetic',
      2000000,
      'https://images.unsplash.com/photo-1660224319984-4af12c1a469b?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Rak',
      'Rak buku dengan desain aesthetic dan minimalis'
    ]
  ];
  
  sheet.getRange(2, 1, sampleData.length, headers.length).setValues(sampleData);
  
  return {
    status: 'success',
    message: 'Sample furniture data created successfully'
  };
}