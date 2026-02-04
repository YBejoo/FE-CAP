# SI-CAP API Endpoints (Local Integration Guide)

Base URL (local): http://localhost:8787

## Response Format (Global)
- Success:
  - success: true
  - data: object | array
  - message?: string
  - meta?: { page, limit, total, totalPages }
- Error:
  - success: false
  - error: string
  - details?: array

## Frontend Field Mapping Notes
- Backend `id` field → Frontend expects specific ID field (e.g., `id_prodi`, `id_kurikulum`)
- Date fields should be ISO string or Unix timestamp
- Frontend will handle date conversion via `toDate()` utility

## Auth
- POST /api/auth/register
  - Body: { email, password, nama, role?, id_prodi? }
  - Response: { token? , user? } (see login for token)
- POST /api/auth/login
  - Body: { email, password }
  - Response: { token, user }
- POST /api/auth/refresh
  - Headers: Authorization: Bearer <token>
  - Response: { token }
- GET /api/auth/me
  - Headers: Authorization: Bearer <token>
  - Response: user profile
- POST /api/auth/change-password
  - Headers: Authorization: Bearer <token>
  - Body: { old_password, new_password }
- POST /api/auth/logout
  - Response: message

## Prodi
- GET /api/prodi
  - Query: none
  - Response: Array of Prodi objects
- GET /api/prodi/:id
  - Response: Single Prodi object
- POST /api/prodi (admin)
  - Body: { kode_prodi, nama_prodi, fakultas, jenjang, akreditasi? }
  - Response: Created Prodi object
- PUT /api/prodi/:id (admin)
  - Body: partial fields above
  - Response: Updated Prodi object
- DELETE /api/prodi/:id (admin)
  - Response: Success message

**Prodi Object (Backend → Frontend):**
```json
{
  "id": "string",              // Backend field → Frontend: id_prodi
  "kode_prodi": "string",      // Optional
  "nama_prodi": "string",      // Required
  "fakultas": "string",        // Optional
  "jenjang": "string",         // Optional
  "akreditasi": "string",      // Optional
  "created_at": "date",        // ISO string or timestamp
  "updated_at": "date"         // ISO string or timestamp
}
```

## Kurikulum
- GET /api/kurikulum
  - Query: id_prodi?, is_active? (true|false)
  - Response: Array of Kurikulum objects
- GET /api/kurikulum/:id
  - Response: Single Kurikulum object
- POST /api/kurikulum (admin, kaprodi)
  - Body: { nama_kurikulum, tahun_berlaku, id_prodi, is_active? }
  - Response: Created Kurikulum object
- PUT /api/kurikulum/:id (admin, kaprodi)
  - Body: partial fields above
  - Response: Updated Kurikulum object
- DELETE /api/kurikulum/:id (admin, kaprodi)
  - Response: Success message
- PATCH /api/kurikulum/:id/activate (admin, kaprodi)
  - Response: Updated Kurikulum object with is_active = true

**Kurikulum Object (Backend → Frontend):**
```json
{
  "id": "string",              // Backend field → Frontend: id_kurikulum
  "id_kurikulum": "string",    // Alternative backend field
  "nama_kurikulum": "string",  // Required
  "tahun_berlaku": number,     // Required (year as integer)
  "is_active": boolean,        // Required (default: false)
  "id_prodi": "string",        // Optional but recommended
  "created_at": "date",        // ISO string or timestamp
  "updated_at": "date"         // ISO string or timestamp
}
```

## Profil Lulusan
- GET /api/profil-lulusan
  - Query: id_kurikulum?
  - Response: Array of Profil Lulusan objects
- GET /api/profil-lulusan/kurikulum/:id
  - Response: Array of Profil Lulusan for specific Kurikulum
- GET /api/profil-lulusan/:id
  - Response: Single Profil Lulusan object
- POST /api/profil-lulusan (admin, kaprodi)
  - Body: { kode_profil, profil_lulusan, deskripsi, sumber, id_kurikulum }
  - Response: Created Profil Lulusan object
- PUT /api/profil-lulusan/:id (admin, kaprodi)
  - Body: partial fields above
  - Response: Updated Profil Lulusan object
- DELETE /api/profil-lulusan/:id (admin, kaprodi)
  - Response: Success message

**Profil Lulusan Object (Backend → Frontend):**
```json
{
  "id": "string",              // Backend field → Frontend: id_profil
  "kode_profil": "string",     // Required
  "profil_lulusan": "string",  // Required
  "deskripsi": "string",       // Required
  "sumber": "string",          // Required
  "id_kurikulum": "string",    // Required
  "created_at": "date",
  "updated_at": "date"
}
```

## KUL (Kompetensi Utama Lulusan)
- GET /api/kul
  - Query: id_kurikulum?
  - Response: Array of KUL objects
- GET /api/kul/:id
  - Response: Single KUL object
- POST /api/kul (admin, kaprodi)
  - Body: { kode_kul, kompetensi_lulusan, aspek, id_kurikulum }
  - Response: Created KUL object
- PUT /api/kul/:id (admin, kaprodi)
  - Body: partial fields above
  - Response: Updated KUL object
- DELETE /api/kul/:id (admin, kaprodi)
  - Response: Success message

**KUL Object (Backend → Frontend):**
```json
{
  "id": "string",              // Backend field → Frontend: id_kul
  "kode_kul": "string",        // Required
  "kompetensi_lulusan": "string", // Required
  "aspek": "string",           // Required: "Sikap" | "Pengetahuan" | "Keterampilan Umum" | "Keterampilan Khusus"
  "id_kurikulum": "string",    // Required
  "created_at": "date",
  "updated_at": "date"
}
```

## CPL
- GET /api/cpl
  - Query: id_kurikulum?
  - Response: Array of CPL objects
- GET /api/cpl/:id
  - Response: Single CPL object
- POST /api/cpl (admin, kaprodi)
  - Body: { kode_cpl, deskripsi_cpl, aspek, id_kurikulum }
  - Response: Created CPL object
- PUT /api/cpl/:id (admin, kaprodi)
  - Body: partial fields above
  - Response: Updated CPL object
- DELETE /api/cpl/:id (admin, kaprodi)
  - Response: Success message
- GET /api/cpl/matrix/pl
  - Query: id_kurikulum
  - Response: Matrix mapping data
- POST /api/cpl/matrix/pl (admin, kaprodi)
  - Body: { mappings: [{ id_cpl, id_profil }] }
  - Response: Success message

**CPL Object (Backend → Frontend):**
```json
{
  "id": "string",              // Backend field → Frontend: id_cpl
  "kode_cpl": "string",        // Required
  "deskripsi_cpl": "string",   // Required
  "aspek": "string",           // Required: "Sikap" | "Pengetahuan" | "Keterampilan Umum" | "Keterampilan Khusus"
  "id_kurikulum": "string",    // Required
  "created_at": "date",
  "updated_at": "date"
}
```

## Bahan Kajian
- GET /api/bahan-kajian
  - Query: id_kurikulum?
  - Response: Array of Bahan Kajian objects
- GET /api/bahan-kajian/:id
  - Response: Single Bahan Kajian object
- POST /api/bahan-kajian (admin, kaprodi)
  - Body: { kode_bk, nama_bahan_kajian, aspek, ranah_keilmuan, id_kurikulum }
  - Response: Created Bahan Kajian object
- PUT /api/bahan-kajian/:id (admin, kaprodi)
  - Body: partial fields above
  - Response: Updated Bahan Kajian object
- DELETE /api/bahan-kajian/:id (admin, kaprodi)
  - Response: Success message
- GET /api/bahan-kajian/matrix/cpl
  - Query: id_kurikulum
  - Response: Matrix mapping data
- POST /api/bahan-kajian/matrix/cpl (admin, kaprodi)
  - Body: { mappings: [{ id_cpl, id_bk }] }
  - Response: Success message

**Bahan Kajian Object (Backend → Frontend):**
```json
{
  "id": "string",                // Backend field → Frontend: id_bahan_kajian
  "kode_bk": "string",           // Required
  "nama_bahan_kajian": "string", // Required
  "aspek": "string",             // Required: "Sikap" | "Pengetahuan" | "Keterampilan Umum" | "Keterampilan Khusus"
  "ranah_keilmuan": "string",    // Required
  "id_kurikulum": "string",      // Required
  "created_at": "date",
  "updated_at": "date"
}
```

## Mata Kuliah
- GET /api/mata-kuliah
  - Query: id_kurikulum?, semester?
  - Response: Array of Mata Kuliah objects
- GET /api/mata-kuliah/semester/:semester
  - Query: id_kurikulum
  - Response: Array of Mata Kuliah for specific semester
- GET /api/mata-kuliah/:id
  - Response: Single Mata Kuliah object
- POST /api/mata-kuliah (admin, kaprodi)
  - Body: { kode_mk, nama_mk, sks, semester, sifat, deskripsi?, id_kurikulum, id_bahan_kajian? }
  - Response: Created Mata Kuliah object
- PUT /api/mata-kuliah/:id (admin, kaprodi)
  - Body: partial fields above
  - Response: Updated Mata Kuliah object
- DELETE /api/mata-kuliah/:id (admin, kaprodi)
  - Response: Success message
- GET /api/mata-kuliah/matrix/cpl
  - Query: id_kurikulum
  - Response: Matrix mapping data
- POST /api/mata-kuliah/matrix/cpl (admin, kaprodi)
  - Body: { mappings: [{ id_cpl, id_mk }] }
  - Response: Success message
- POST /api/mata-kuliah/:id/dosen (admin, kaprodi)
  - Body: { dosen_ids: [string], tahun_akademik, semester_akademik, koordinator_id? }
  - Response: Success message

**Mata Kuliah Object (Backend → Frontend):**
```json
{
  "id": "string",              // Backend field → Frontend: id_mk
  "kode_mk": "string",         // Required
  "nama_mk": "string",         // Required
  "sks": number,               // Required (1-6)
  "semester": number,          // Required (1-8)
  "sifat": "string",           // Required: "Wajib" | "Pilihan" | "MKWK"
  "deskripsi": "string",       // Optional
  "id_kurikulum": "string",    // Required
  "id_bahan_kajian": "string", // Optional
  "created_at": "date",
  "updated_at": "date"
}
```

## Dosen
- GET /api/dosen
  - Query: id_prodi?
  - Response: Array of Dosen objects
- GET /api/dosen/search
  - Query: q?, id_prodi?
  - Response: Array of Dosen objects matching search
- GET /api/dosen/:id
  - Response: Single Dosen object
- GET /api/dosen/:id/mata-kuliah
  - Query: tahun_akademik?, semester_akademik?
  - Response: Array of Mata Kuliah assigned to Dosen
- POST /api/dosen (admin, kaprodi)
  - Body: { nip, nama_dosen, email?, bidang_keahlian, jabatan_fungsional, id_prodi, id_user? }
  - Response: Created Dosen object
- PUT /api/dosen/:id (admin, kaprodi)
  - Body: partial fields above
  - Response: Updated Dosen object
- DELETE /api/dosen/:id (admin, kaprodi)
  - Response: Success message

**Dosen Object (Backend → Frontend):**
```json
{
  "id": "string",                // Backend field → Frontend: id_dosen
  "nip": "string",               // Required
  "nama_dosen": "string",        // Required
  "email": "string",             // Optional
  "bidang_keahlian": "string",   // Optional
  "jabatan_fungsional": "string",// Optional
  "created_at": "date",
  "updated_at": "date"
}
```

## CPMK
- GET /api/cpmk
  - Query: id_mk?
  - Response: Array of CPMK objects
- GET /api/cpmk/mata-kuliah/:id
  - Response: Array of CPMK objects for specific Mata Kuliah
- GET /api/cpmk/:id
  - Response: Single CPMK object
- POST /api/cpmk (admin, kaprodi, dosen)
  - Body: { kode_cpmk, deskripsi_cpmk, bobot_persentase, id_mk, id_cpl }
  - Response: Created CPMK object
- PUT /api/cpmk/:id (admin, kaprodi, dosen)
  - Body: partial fields above
  - Response: Updated CPMK object
- DELETE /api/cpmk/:id (admin, kaprodi, dosen)
  - Response: Success message
- POST /api/cpmk/:id/sub (admin, kaprodi, dosen)
  - Body: { kode_sub, deskripsi_sub_cpmk, indikator, kriteria_penilaian }
  - Response: Created SubCPMK object
- PUT /api/cpmk/:id/sub/:subId (admin, kaprodi, dosen)
  - Body: partial fields above
  - Response: Updated SubCPMK object
- DELETE /api/cpmk/:id/sub/:subId (admin, kaprodi, dosen)
  - Response: Success message

**CPMK Object (Backend → Frontend):**
```json
{
  "id": "string",              // Backend field → Frontend: id_cpmk
  "kode_cpmk": "string",       // Required
  "deskripsi_cpmk": "string",  // Required
  "bobot_persentase": number,  // Required (0-100)
  "kode_mk": "string",         // Optional (from Mata Kuliah relation)
  "id_mk": "string",           // Optional
  "id_cpl": "string",          // Required
  "created_at": "date",
  "updated_at": "date"
}
```

**SubCPMK Object (Backend → Frontend):**
```json
{
  "id": "string",                    // Backend field → Frontend: id_sub_cpmk
  "kode_sub": "string",              // Required
  "deskripsi_sub_cpmk": "string",    // Required
  "indikator": "string",             // Required
  "kriteria_penilaian": "string",    // Required
  "id_cpmk": "string",               // Required
  "created_at": "date",
  "updated_at": "date"
}
```

## RPS
- GET /api/rps
  - Query: id_mk?, id_kurikulum?, status?
  - Response: Array of RPS objects
- GET /api/rps/:id
  - Response: Single RPS object
- POST /api/rps (admin, kaprodi, dosen)
  - Body: { id_mk, tahun_akademik, semester_akademik, deskripsi_mk?, pustaka_utama?, pustaka_pendukung?, id_koordinator? }
  - Response: Created RPS object
- PUT /api/rps/:id (admin, kaprodi, dosen)
  - Body: partial fields above
  - Response: Updated RPS object
- DELETE /api/rps/:id (admin, kaprodi, dosen)
  - Response: Success message
- POST /api/rps/:id/minggu (admin, kaprodi, dosen)
  - Body: { minggu_ke, id_sub_cpmk?, materi, metode_pembelajaran?, waktu_menit?, pengalaman_belajar?, bentuk_penilaian?, bobot_penilaian? }
  - Response: Created RPS Minggu object
- PUT /api/rps/:id/minggu/:mingguId (admin, kaprodi, dosen)
  - Body: partial fields above
  - Response: Updated RPS Minggu object
- DELETE /api/rps/:id/minggu/:mingguId (admin, kaprodi, dosen)
  - Response: Success message
- POST /api/rps/:id/submit (dosen)
  - Body: { id_kaprodi }
  - Response: Updated RPS with status change
- POST /api/rps/:id/validate (kaprodi)
  - Body: { catatan? }
  - Response: Updated RPS with status = "Terbit"
- POST /api/rps/:id/reject (kaprodi)
  - Body: { catatan? }
  - Response: Updated RPS with status = "Draft"

**RPS Object (Backend → Frontend):**
```json
{
  "id": "string",              // Backend field → Frontend: id_rps
  "id_mk": "string",           // Optional
  "kode_mk": "string",         // Optional (from Mata Kuliah relation)
  "versi": number,             // Required (default: 1)
  "tgl_penyusunan": "date",    // ISO string or timestamp
  "dosen_pengampu": "string",  // Required
  "status": "string",          // Required: "Draft" | "Menunggu Validasi" | "Terbit"
  "created_at": "date",
  "updated_at": "date"
}
```

## Laporan
- GET /api/laporan/matrix-cpl-mk
  - Query: id_kurikulum
  - Response: Array of report objects
- GET /api/laporan/matrix-cpl-bk
  - Query: id_kurikulum
  - Response: Array of report objects
- GET /api/laporan/matrix-cpl-pl
  - Query: id_kurikulum
  - Response: Array of report objects
- GET /api/laporan/progress-cpl
  - Query: id_kurikulum, id_mk?
  - Response: Array of progress report objects

**Laporan Matrix CPL-MK Response:**
```json
[
  {
    "kode_mk": "string",
    "nama_mk": "string",
    "total_cpmk": number,
    "total_cpl": number,
    "rata_rata_bobot": number
  }
]
```

**Laporan Progress CPL Response:**
```json
[
  {
    "id_cpl": "string",
    "nama_cpl": "string",
    "bobot": number,
    "total_mk": number
  }
]
```

**Laporan Per Tahun Response:**
```json
[
  {
    "tahun": number,
    "total_kurikulum": number,
    "total_cpl": number,
    "total_mk": number
  }
]
```

## Health Check
- GET /
- GET /health

## Headers
- Authorization: Bearer <token> (for protected routes)
- Content-Type: application/json

---

## IMPORTANT NOTES FOR BACKEND DEVELOPERS

### Field Mapping Convention
Backend MUST return `id` field in response, Frontend will map it to entity-specific ID:
- `id` → `id_prodi` (Prodi)
- `id` → `id_kurikulum` (Kurikulum)
- `id` → `id_profil` (Profil Lulusan)
- `id` → `id_kul` (Kompetensi Utama Lulusan)
- `id` → `id_cpl` (CPL)
- `id` → `id_bahan_kajian` (Bahan Kajian)
- `id` → `id_mk` (Mata Kuliah)
- `id` → `id_dosen` (Dosen)
- `id` → `id_cpmk` (CPMK)
- `id` → `id_sub_cpmk` (Sub CPMK)
- `id` → `id_rps` (RPS)
- `id` → `id_penilaian` (Penilaian)

### Date Fields
- Backend can return dates as ISO string (`"2024-01-01T00:00:00.000Z"`) or Unix timestamp
- Frontend will convert via `toDate()` utility function
- Fields: `created_at`, `updated_at`, `tgl_penyusunan`

### Enum Values
**AspekCPL / AspekKUL:**
- "Sikap"
- "Pengetahuan"
- "Keterampilan Umum"
- "Keterampilan Khusus"

**SifatMK (Mata Kuliah):**
- "Wajib"
- "Pilihan"
- "MKWK"

**Status RPS:**
- "Draft"
- "Menunggu Validasi"
- "Terbit"

### Required vs Optional Fields
- Fields marked with `?` in Body are optional
- All `id`, `kode_*`, `nama_*`, `deskripsi_*` are typically required
- `created_at` and `updated_at` are auto-generated, optional in requests
- Foreign keys (`id_kurikulum`, `id_prodi`, etc.) are required where specified

### Response Wrapping
All successful responses should be wrapped in:
```json
{
  "success": true,
  "data": { ... } or [ ... ],
  "message": "Optional success message"
}
```

All error responses should be:
```json
{
  "success": false,
  "error": "Error message",
  "details": [] // Optional array of error details
}
```

### Pagination (if implemented)
```json
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```
