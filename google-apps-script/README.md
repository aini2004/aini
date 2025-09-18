# Google Apps Script REST API untuk Google Sheets

Script ini mengubah Google Sheets menjadi REST API yang dapat diakses secara publik.

## Setup

1. Buka Google Apps Script (script.google.com)
2. Buat project baru
3. Ganti kode default dengan kode dari `Code.gs`
4. Simpan project dengan nama yang sesuai
5. Deploy sebagai web app:
   - Klik "Deploy" > "New deployment"
   - Pilih type: "Web app"
   - Execute as: "Me"
   - Who has access: "Anyone"
   - Klik "Deploy"

## Endpoint API

### GET Requests

#### 1. Ambil Semua Data
```
GET https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
GET https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=getAllData
GET https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=getAllData&sheet=SheetName
```

Response:
```json
{
  "status": "success",
  "data": [
    {
      "column1": "value1",
      "column2": "value2",
      "_id": 1,
      "_rowNumber": 2
    }
  ],
  "count": 1,
  "sheetName": "Sheet1",
  "headers": ["column1", "column2"],
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### 2. Ambil Daftar Sheet
```
GET https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=getSheets
```

Response:
```json
{
  "status": "success",
  "sheets": [
    {
      "name": "Sheet1",
      "id": 123456,
      "rowCount": 10,
      "columnCount": 5
    }
  ],
  "count": 1,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### 3. Ambil Data Berdasarkan ID
```
GET https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=getById&id=1
GET https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=getById&id=1&sheet=SheetName
```

Response:
```json
{
  "status": "success",
  "data": {
    "column1": "value1",
    "column2": "value2",
    "_id": 1,
    "_rowNumber": 2
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### 4. Cari Data
```
GET https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=search&query=searchterm
GET https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=search&query=searchterm&sheet=SheetName
```

Response:
```json
{
  "status": "success",
  "data": [
    {
      "column1": "searchterm found here",
      "column2": "value2",
      "_id": 1,
      "_rowNumber": 2
    }
  ],
  "count": 1,
  "query": "searchterm",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### POST Requests

#### 1. Tambah Data Baru
```
POST https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
Content-Type: application/json

{
  "action": "addData",
  "sheet": "SheetName",
  "rowData": ["value1", "value2", "value3"]
}
```

#### 2. Update Data
```
POST https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
Content-Type: application/json

{
  "action": "updateData",
  "sheet": "SheetName",
  "id": 1,
  "rowData": ["newvalue1", "newvalue2", "newvalue3"]
}
```

#### 3. Hapus Data
```
POST https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
Content-Type: application/json

{
  "action": "deleteData",
  "sheet": "SheetName",
  "id": 1
}
```

## Parameter

- `action`: Aksi yang ingin dilakukan (getAllData, getSheets, getById, search)
- `sheet`: Nama sheet (opsional, default menggunakan sheet pertama)
- `id`: ID data (nomor baris - 1)
- `query`: Kata kunci pencarian

## Error Response

```json
{
  "status": "error",
  "message": "Error description",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Contoh Penggunaan dengan JavaScript

```javascript
// Ambil semua data
fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec')
  .then(response => response.json())
  .then(data => console.log(data));

// Cari data
fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=search&query=furniture')
  .then(response => response.json())
  .then(data => console.log(data));

// Tambah data baru
fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    action: 'addData',
    rowData: ['Sofa Baru', 'Rp 2.500.000', 'Sofa minimalis modern']
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

## Keamanan

- Script ini dapat diakses oleh siapa saja yang memiliki URL
- Untuk keamanan tambahan, Anda dapat menambahkan API key atau authentication
- Pastikan data yang disimpan tidak mengandung informasi sensitif

## Troubleshooting

1. **Error "Script function not found"**: Pastikan fungsi `doGet` dan `doPost` ada dalam script
2. **Error "Permission denied"**: Pastikan deployment settings sudah benar
3. **Data tidak muncul**: Periksa nama sheet dan pastikan ada data di spreadsheet
4. **CORS Error**: Google Apps Script secara otomatis menangani CORS untuk web apps

## Catatan

- Baris pertama di sheet akan dianggap sebagai header
- ID dimulai dari 1 (baris kedua dalam sheet)
- Maksimal 6 menit execution time untuk Google Apps Script
- Rate limit: 100 requests per 100 seconds per user