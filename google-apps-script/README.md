# Google Apps Script REST API untuk Wahena Furniture Store

Script ini mengubah Google Sheets menjadi REST API khusus untuk data furniture yang dapat diakses secara publik.

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
GET https://script.google.com/macros/s/AKfycbxw_ksKGO_v-XNA_X1MKvj4cqCRr1SQP4gDx4hMmjMhAQP1tD7QgCNTsnWraERDWE8h/exec
GET https://script.google.com/macros/s/AKfycbxw_ksKGO_v-XNA_X1MKvj4cqCRr1SQP4gDx4hMmjMhAQP1tD7QgCNTsnWraERDWE8h/exec?action=getAllData
```

Response:
```json
{
  "status": "success",
  "data": [
    {
      "Product Name": "Sofa King",
      "Price": "Rp3.500.000",
      "Image": "https://images.unsplash.com/photo-1663756915304-40b7eda63e41?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "Category": "Sofa",
      "Description": "Sofa mewah dengan desain modern dan nyaman",
      "id": 1,
      "_rowNumber": 2
    },
    {
      "Product Name": "Tempat Tidur Ratu Aini",
      "Price": "Rp4.000.000",
      "Image": "https://images.unsplash.com/photo-1758072328635-586f3c121af2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "Category": "Tempat Tidur",
      "Description": "Tempat tidur queen size dengan desain elegan",
      "id": 2,
      "_rowNumber": 3
    }
  ],
  "count": 2,
  "sheetName": "Sheet1",
  "headers": ["Product Name", "Price", "Image", "Category", "Description"],
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
GET https://script.google.com/macros/s/AKfycbxw_ksKGO_v-XNA_X1MKvj4cqCRr1SQP4gDx4hMmjMhAQP1tD7QgCNTsnWraERDWE8h/exec?action=getById&id=1
```

Response:
```json
{
  "status": "success",
  "data": {
    "Product Name": "Sofa King",
    "Price": "Rp3.500.000",
    "Image": "https://images.unsplash.com/photo-1663756915304-40b7eda63e41?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Category": "Sofa",
    "Description": "Sofa mewah dengan desain modern dan nyaman",
    "id": 1,
    "_rowNumber": 2
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### 4. Cari Data
```
GET https://script.google.com/macros/s/AKfycbxw_ksKGO_v-XNA_X1MKvj4cqCRr1SQP4gDx4hMmjMhAQP1tD7QgCNTsnWraERDWE8h/exec?action=search&query=sofa
GET https://script.google.com/macros/s/AKfycbxw_ksKGO_v-XNA_X1MKvj4cqCRr1SQP4gDx4hMmjMhAQP1tD7QgCNTsnWraERDWE8h/exec?action=search&query=tempat%20tidur
```

Response:
```json
{
  "status": "success",
  "data": [
    {
      "Product Name": "Sofa King",
      "Price": "Rp3.500.000",
      "Image": "https://images.unsplash.com/photo-1663756915304-40b7eda63e41?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "Category": "Sofa",
      "Description": "Sofa mewah dengan desain modern dan nyaman",
      "id": 1,
      "_rowNumber": 2
    }
  ],
  "count": 1,
  "query": "sofa",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### 5. Ambil Data Berdasarkan Kategori
```
GET https://script.google.com/macros/s/AKfycbxw_ksKGO_v-XNA_X1MKvj4cqCRr1SQP4gDx4hMmjMhAQP1tD7QgCNTsnWraERDWE8h/exec?action=getByCategory&category=sofa
```

Response:
```json
{
  "status": "success",
  "data": [
    {
      "Product Name": "Sofa King",
      "Price": "Rp3.500.000",
      "Image": "https://images.unsplash.com/photo-1663756915304-40b7eda63e41?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "Category": "Sofa",
      "Description": "Sofa mewah dengan desain modern dan nyaman",
      "id": 1,
      "_rowNumber": 2
    }
  ],
  "count": 1,
  "category": "sofa",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### POST Requests

#### 1. Tambah Data Baru
```
POST https://script.google.com/macros/s/AKfycbxw_ksKGO_v-XNA_X1MKvj4cqCRr1SQP4gDx4hMmjMhAQP1tD7QgCNTsnWraERDWE8h/exec
Content-Type: application/json

{
  "action": "addFurniture",
  "furnitureData": {
    "Product Name": "Meja Makan Kayu Jati",
    "Price": 5000000,
    "Image": "https://images.unsplash.com/photo-furniture.jpg",
    "Category": "Meja",
    "Description": "Meja makan solid kayu jati untuk 6 orang"
  }
}
```

#### 2. Update Data
```
POST https://script.google.com/macros/s/AKfycbxw_ksKGO_v-XNA_X1MKvj4cqCRr1SQP4gDx4hMmjMhAQP1tD7QgCNTsnWraERDWE8h/exec
Content-Type: application/json

{
  "action": "updateFurniture",
  "id": 1,
  "furnitureData": {
    "Product Name": "Sofa King Updated",
    "Price": 3800000,
    "Image": "https://images.unsplash.com/photo-new-sofa.jpg",
    "Category": "Sofa",
    "Description": "Sofa mewah dengan desain modern dan sangat nyaman"
  }
}
```

#### 3. Hapus Data
```
POST https://script.google.com/macros/s/AKfycbxw_ksKGO_v-XNA_X1MKvj4cqCRr1SQP4gDx4hMmjMhAQP1tD7QgCNTsnWraERDWE8h/exec
Content-Type: application/json

{
  "action": "deleteFurniture",
  "id": 1
}
```

## Parameter

- `action`: Aksi yang ingin dilakukan (getAllData, getSheets, getById, search, getByCategory)
- `sheet`: Nama sheet (opsional, default menggunakan sheet pertama)
- `id`: ID data (nomor baris - 1)
- `query`: Kata kunci pencarian
- `category`: Kategori furniture (sofa, meja, tempat tidur, dll)

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
// Ambil semua data furniture
fetch('https://script.google.com/macros/s/AKfycbxw_ksKGO_v-XNA_X1MKvj4cqCRr1SQP4gDx4hMmjMhAQP1tD7QgCNTsnWraERDWE8h/exec')
  .then(response => response.json())
  .then(data => console.log(data));

// Cari furniture berdasarkan nama
fetch('https://script.google.com/macros/s/AKfycbxw_ksKGO_v-XNA_X1MKvj4cqCRr1SQP4gDx4hMmjMhAQP1tD7QgCNTsnWraERDWE8h/exec?action=search&query=sofa')
  .then(response => response.json())
  .then(data => console.log(data));

// Ambil furniture berdasarkan kategori
fetch('https://script.google.com/macros/s/AKfycbxw_ksKGO_v-XNA_X1MKvj4cqCRr1SQP4gDx4hMmjMhAQP1tD7QgCNTsnWraERDWE8h/exec?action=getByCategory&category=tempat%20tidur')
  .then(response => response.json())
  .then(data => console.log(data));

// Tambah furniture baru
fetch('https://script.google.com/macros/s/AKfycbxw_ksKGO_v-XNA_X1MKvj4cqCRr1SQP4gDx4hMmjMhAQP1tD7QgCNTsnWraERDWE8h/exec', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    action: 'addFurniture',
    furnitureData: {
      'Product Name': 'Kursi Kantor Ergonomis',
      'Price': 1500000,
      'Image': 'https://images.unsplash.com/photo-office-chair.jpg',
      'Category': 'Kursi',
      'Description': 'Kursi kantor dengan sandaran punggung ergonomis'
    }
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

## Format Data yang Diharapkan

Google Sheets harus memiliki struktur kolom sebagai berikut:

| Product Name | Price | Image | Category | Description |
|--------------|-------|-------|----------|-------------|
| Sofa King | 3500000 | https://images.unsplash.com/... | Sofa | Sofa mewah dengan desain modern |
| Tempat Tidur Ratu Aini | 4000000 | https://images.unsplash.com/... | Tempat Tidur | Tempat tidur queen size |

**Catatan Penting:**
- Kolom `Price` akan otomatis diformat menjadi format Rupiah (Rp3.500.000)
- Baris pertama harus berisi header kolom
- URL gambar harus valid dan dapat diakses publik

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

- Baris pertama di sheet akan dianggap sebagai header (Product Name, Price, Image, dll)
- ID dimulai dari 1 (baris kedua dalam sheet)
- Harga akan otomatis diformat dalam format Rupiah Indonesia
- Maksimal 6 menit execution time untuk Google Apps Script
- Rate limit: 100 requests per 100 seconds per user

## Sample Data

Untuk membuat sample data furniture, jalankan fungsi `createSampleFurnitureData()` di Google Apps Script Editor.