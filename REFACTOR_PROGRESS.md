# 📋 PROGRESS REFACTOR FRONTEND SI-CAP

**Tanggal:** 23 Februari 2026  
**Status:** Foundation Complete - Ready for Module Implementation  
**Debugging:** Comprehensive Logging Enabled 🔍

---

## 🔍 DEBUGGING & LOGGING

**Status:** ✅ ACTIVE

Sistem logging komprehensif telah ditambahkan untuk debugging data flow:

### Logging Layers:
1. **API Interceptor** (`app/lib/api.ts`)
   - 🌐 HTTP Request: Method, URL, Token status, Params, Body
   - ✅ HTTP Response: Status, Data structure
   - ❌ HTTP Error: Status code, Error messages, Response data

2. **Dashboard Service** (`app/services/dashboard.service.ts`)
   - 🟢 Fetch start/success/error markers
   - 📦 Raw API response
   - 📊 Unwrapped data structure
   - 🔢 Summary values preview

3. **Dashboard Hook** (`app/hooks/useDashboard.ts`)
   - 🎯 Hook lifecycle (mount, fetch, complete)
   - 📥 Data received from service
   - 🔄 State updates
   - ⚠️ Error handling flow

4. **Dashboard Page** (`app/pages/dashboard.tsx`)
   - 🗂️ Component data received
   - 📊 Stats structure validation
   - 🎨 Render state (loading, error, data preview)

### Cara Melihat Log:
1. Buka browser DevTools (F12)
2. Tab **Console**
3. Filter berdasarkan emoji:
   - 🌐 untuk API requests
   - 🟢 untuk Service layer
   - 🎯 untuk Hook layer
   - 🗂️ untuk Component layer

### Log Format:
```
🟢 [Dashboard Service] ========== FETCH START ==========
📋 [Dashboard Service] Request params: {...}
🌐 [Dashboard Service] Calling API: GET /dashboard
📦 [Dashboard Service] Raw API response: {...}
✅ [Dashboard Service] Unwrapped result: {...}
🟢 [Dashboard Service] ========== FETCH SUCCESS ==========
```

---

## ✅ YANG SUDAH DIKERJAKAN

### 1. **Setup & Preparation** ✅ COMPLETED

**File yang diupdate:**
- ✅ `app/lib/api.ts` - Standardized error handling, cleanup console.log
- ✅ `app/lib/constants.ts` - No changes needed (sudah bagus)
- ✅ `app/components/ui/loading.tsx` - NEW: Loading components
- ✅ `app/components/ui/error.tsx` - NEW: Error display components
- ✅ `app/components/ui/index.ts` - Added exports for new components

**Improvements:**
- ✨ Error messages standardized dengan `ERROR_MESSAGES` constant
- ✨ Development-only console.log (tidak akan muncul di production)
- ✨ User-friendly error messages (`error.userMessage`)
- ✨ Comprehensive error handling untuk semua HTTP status codes
- ✨ Loading skeleton components (Table, Card, Form, Page)
- ✨ Error display components (ErrorMessage, PageError, InlineError, EmptyState)

---

### 2. **Authentication** ✅ COMPLETED

**File yang diupdate:**
- ✅ `app/services/auth.service.ts` - Cleaned up, standardized
- ✅ `app/contexts/auth-context.tsx` - Improved error handling

**Improvements:**
- ✨ Proper TypeScript types dengan role enum
- ✨ Comprehensive JSDoc comments
- ✨ Error handling dengan try-catch blocks
- ✨ Development-only logging
- ✨ User-friendly error messages
- ✨ Token management improvements

---

### 3. **Dashboard** ✅ COMPLETED

**File yang diupdate:**
- ✅ `app/services/dashboard.service.ts` - Simplified, match dengan backend
- ✅ `app/hooks/useDashboard.ts` - Refactored untuk fokus pada stats

**Improvements:**
- ✨ Simplified dashboard hook (tidak mixing berbagai data)
- ✨ Match dengan backend API response structure
- ✨ Proper TypeScript types
- ✨ Clean separation of concerns
- ✨ Support untuk recent activities (optional)

---

### 4. **Templates & Patterns** ✅ COMPLETED

**File yang dibuat:**
- ✅ `app/services/_template.service.ts` - Generic service template
- ✅ `app/hooks/_template.hook.ts` - Generic hook template

**Cara Menggunakan Template:**

1. **Copy template file:**
   ```bash
   # For service
   cp app/services/_template.service.ts app/services/nama-entity.service.ts
   
   # For hook
   cp app/hooks/_template.hook.ts app/hooks/useNamaEntity.ts
   ```

2. **Find & Replace:**
   - `[Entity]` → `NamaEntity` (PascalCase) - contoh: `Prodi`, `Kurikulum`
   - `[entity]` → `nama-entity` (kebab-case) - contoh: `prodi`, `kurikulum`
   - `[entity-endpoint]` → endpoint API - contoh: `/prodi`, `/kurikulum`

3. **Update types** sesuai dengan entity yang dibuat

4. **Tambahkan methods khusus** jika diperlukan (matrix, bulk, etc)

---

### 5. **Prodi Service** ✅ COMPLETED (Example Implementation)

**File yang diupdate:**
- ✅ `app/services/prodi.service.ts` - Refactored menggunakan pattern baru

**Improvements:**
- ✨ Match dengan template pattern
- ✨ Proper error handling
- ✨ Development logging
- ✨ JSDoc comments
- ✨ Type safety improvements

---

## 🔨 CARA MELANJUTKAN REFACTORING

### Step-by-Step untuk Each Module:

#### 1. **Kurikulum Service & Hook**
```bash
# Backend Endpoint: /api/kurikulum
# Methods: GET, POST, PUT, DELETE, PATCH /activate

Files to refactor:
- app/services/kurikulum.service.ts
- app/hooks/useKurikulum.ts
- app/pages/kurikulum.tsx (if needed)
```

**Additional Methods untuk Kurikulum:**
```typescript
// Activate specific kurikulum
export async function activateKurikulum(id: string): Promise<Kurikulum> {
  const { data } = await api.patch<ApiResponse<Kurikulum>>(`/kurikulum/${id}/activate`);
  return unwrapResponse(data);
}
```

---

#### 2. **Profil Lulusan Service & Hook**
```bash
# Backend Endpoint: /api/profil-lulusan
# Query: ?id_kurikulum={id}

Files to refactor:
- app/services/profil-lulusan.service.ts
- app/hooks/useProfilLulusan.ts
- app/pages/profil-lulusan.tsx
```

---

#### 3. **KUL (Kompetensi Utama Lulusan) Service & Hook**
```bash
# Backend Endpoint: /api/kul
# Query: ?id_kurikulum={id}&aspek={S|P|KU|KK}

Files to refactor:
- app/services/kul.service.ts
- app/hooks/useKompetensiUtama.ts
- app/pages/kompetensi-utama.tsx
```

**Filter by Aspek:**
```typescript
export async function getKULByAspek(id_kurikulum: string, aspek: 'S' | 'P' | 'KU' | 'KK'): Promise<KUL[]> {
  const { data } = await api.get<ApiResponse<KUL[]>>("/kul", {
    params: { id_kurikulum, aspek }
  });
  return unwrapResponse(data);
}
```

---

#### 4. **CPL Service & Hook + Matrix CPL-PL** 🔥 HIGH PRIORITY
```bash
# Backend Endpoints:
# - /api/cpl (CRUD)
# - /api/cpl/matrix/pl (Matrix CPL-PL)
# Query: ?id_kurikulum={id}&enrich=true

Files to refactor:
- app/services/cpl.service.ts
- app/hooks/useCpl.ts
- app/pages/cpl.tsx
```

**Matrix Management Methods:**
```typescript
// Get CPL-PL matrix
export async function getMatrixCplPl(id_kurikulum: string): Promise<MatrixMapping[]> {
  const { data } = await api.get<ApiResponse<MatrixMapping[]>>("/cpl/matrix/pl", {
    params: { id_kurikulum }
  });
  return unwrapResponse(data);
}

// Save CPL-PL matrix (bulk replace)
export async function saveMatrixCplPl(mappings: { id_cpl: string; id_profil: string }[]): Promise<void> {
  await api.post("/cpl/matrix/pl", { mappings });
}
```

**Matrix Component Example:**
```tsx
// app/components/matrix/MatrixCplPl.tsx
import { useState, useEffect } from 'react';
import { getMatrixCplPl, saveMatrixCplPl } from '~/services/cpl.service';

export function MatrixCplPl({ id_kurikulum }: { id_kurikulum: string }) {
  const [cpls, setCpls] = useState<CPL[]>([]);
  const [profils, setProfils] = useState<ProfilLulusan[]>([]);
  const [mappings, setMappings] = useState<Set<string>>(new Set());
  
  // ... implementation seperti di REFACTOR_FRONTEND_PLAN.md
}
```

---

#### 5. **Bahan Kajian Service & Hook + Matrix CPL-BK** 🔥 HIGH PRIORITY
```bash
# Backend Endpoints:
# - /api/bahan-kajian (CRUD)
# - /api/bahan-kajian/matrix/cpl (Matrix CPL-BK)

Files to refactor:
- app/services/bahan-kajian.service.ts
- app/hooks/useBahanKajian.ts
- app/pages/bahan-kajian.tsx
```

Similar pattern dengan CPL Matrix.

---

#### 6. **Mata Kuliah Service & Hook + Dosen Assignment + Matrix CPL-MK** 🔥 HIGH PRIORITY
```bash
# Backend Endpoints:
# - /api/mata-kuliah (CRUD)
# - /api/mata-kuliah/matrix/cpl (Matrix CPL-MK)
# - /api/mata-kuliah/:id/dosen (Dosen Assignment)

Files to refactor:
- app/services/mata-kuliah.service.ts
- app/services/dosen.service.ts
- app/hooks/useMataKuliah.ts
- app/hooks/useDosen.ts
- app/pages/mata-kuliah.tsx
```

**Dosen Assignment Methods:**
```typescript
// Assign dosen to mata kuliah
export async function assignDosen(id_mk: string, payload: {
  dosen_ids: string[];
  koordinator_id: string;
  tahun_akademik: string;
  semester_akademik: 'Ganjil' | 'Genap';
}): Promise<DosenPengampu[]> {
  const { data } = await api.post<ApiResponse<DosenPengampu[]>>(`/mata-kuliah/${id_mk}/dosen`, payload);
  return unwrapResponse(data);
}

// Get dosen assigned to mata kuliah
export async function getDosenPengampu(id_mk: string): Promise<DosenPengampu[]> {
  const { data } = await api.get<ApiResponse<DosenPengampu[]>>(`/mata-kuliah/${id_mk}/dosen`);
  return unwrapResponse(data);
}
```

---

#### 7. **CPMK Service & Hook + Sub-CPMK** 🔥 HIGH PRIORITY
```bash
# Backend Endpoints:
# - /api/cpmk (CRUD CPMK)
# - /api/cpmk/:id_cpmk/sub (Sub-CPMK)

Files to refactor:
- app/services/cpmk.service.ts
- app/hooks/useCpmk.ts
- app/pages/cpmk.tsx
```

**Sub-CPMK Methods:**
```typescript
// Get sub-CPMK for a CPMK
export async function getSubCpmk(id_cpmk: string): Promise<SubCPMK[]> {
  const { data } = await api.get<ApiResponse<SubCPMK[]>>(`/cpmk/${id_cpmk}/sub`);
  return unwrapResponse(data);
}

// Create sub-CPMK
export async function createSubCpmk(id_cpmk: string, input: CreateSubCPMKInput): Promise<SubCPMK> {
  const { data } = await api.post<ApiResponse<SubCPMK>>(`/cpmk/${id_cpmk}/sub`, input);
  return unwrapResponse(data);
}
```

---

#### 8. **RPS Service & Hook + Workflow** 🔥 HIGH PRIORITY
```bash
# Backend Endpoints:
# - /api/rps (CRUD)
# - /api/rps/:id/submit
# - /api/rps/:id/validate
# - /api/rps/:id/reject
# - /api/rps/:id_rps/minggu (RPS Minggu)

Files to refactor:
- app/services/rps.service.ts
- app/hooks/useRps.ts
- app/pages/rps/index.tsx
- app/pages/rps/new.tsx
```

**Workflow Methods:**
```typescript
// Submit RPS for review
export async function submitRps(id: string): Promise<RPS> {
  const { data } = await api.patch<ApiResponse<RPS>>(`/rps/${id}/submit`);
  return unwrapResponse(data);
}

// Validate RPS (Kaprodi)
export async function validateRps(id: string, catatan?: string): Promise<RPS> {
  const { data } = await api.patch<ApiResponse<RPS>>(`/rps/${id}/validate`, { catatan });
  return unwrapResponse(data);
}

// Reject RPS (Kaprodi)
export async function rejectRps(id: string, catatan: string): Promise<RPS> {
  const { data } = await api.patch<ApiResponse<RPS>>(`/rps/${id}/reject`, { catatan });
  return unwrapResponse(data);
}
```

**RPS Minggu Methods:**
```typescript
// Get RPS Minggu
export async function getRpsMinggu(id_rps: string): Promise<RPSMinggu[]> {
  const { data } = await api.get<ApiResponse<RPSMinggu[]>>(`/rps/${id_rps}/minggu`);
  return unwrapResponse(data);
}

// Create/Update RPS Minggu
export async function saveRpsMinggu(id_rps: string, minggu: RPSMingguInput[]): Promise<RPSMinggu[]> {
  const { data } = await api.post<ApiResponse<RPSMinggu[]>>(`/rps/${id_rps}/minggu`, { minggu });
  return unwrapResponse(data);
}
```

---

## 🎨 UI COMPONENTS YANG SUDAH TERSEDIA

Gunakan komponen-komponen ini di pages:

### Loading States
```tsx
import { TableSkeleton, PageLoading, LoadingSpinner } from '~/components/ui';

// Table skeleton while loading
{loading && <TableSkeleton rows={5} cols={4} />}

// Full page loading
{loading && <PageLoading message="Memuat data..." />}

// Inline spinner
<LoadingSpinner size="md" />
```

### Error Display
```tsx
import { ErrorMessage, PageError, EmptyState } from '~/components/ui';

// Inline error with retry
{error && <ErrorMessage message={error} onRetry={refetch} />}

// Full page error
{error && <PageError message={error} onRetry={refetch} />}

// Empty state
{data.length === 0 && (
  <EmptyState 
    title="Belum ada data"
    description="Silakan tambah data baru"
    action={<Button onClick={() => setDialogOpen(true)}>Tambah Data</Button>}
  />
)}
```

---

## 📝 CHECKLIST UNTUK SETIAP MODULE

Saat refactor setiap module, pastikan:

### Service File
- [ ] Import `isDevelopment` dari `import.meta.env.DEV`
- [ ] Add JSDoc comments untuk setiap function
- [ ] Wrap API calls dengan try-catch
- [ ] Log di development mode saja: `if (isDevelopment) console.log(...)`
- [ ] Use `unwrapResponse()` untuk extract data dari ApiResponse
- [ ] Export proper TypeScript types
- [ ] Handle errors dengan throw error (biarkan hook yang handle)

### Hook File
- [ ] Import service functions
- [ ] State: `data`, `loading`, `error`
- [ ] `fetchData()` function dengan proper error handling
- [ ] Check for 401 errors (jangan set error message, biarkan auth handle)
- [ ] Use `useCallback` untuk functions yang di-pass sebagai props
- [ ] Use `useEffect` dengan dependency array yang benar
- [ ] Optimistic updates untuk create/update/delete
- [ ] Return: `{ data, loading, error, create, update, remove, refresh }`

### Page Component
- [ ] Use custom hook
- [ ] Show loading state dengan skeleton
- [ ] Show error state dengan error message component
- [ ] Show empty state when no data
- [ ] Confirm before delete
- [ ] Show success/error toast after operations
- [ ] Form validation (client-side)
- [ ] Proper form reset after create

---

## 🚀 QUICK START COMMANDS

### Run Development Server
```bash
npm run dev
# App runs at http://localhost:5173
```

### Type Check
```bash
npm run typecheck
```

### Build for Production
```bash
npm run build
```

---

## 📚 REFERENSI

### Dokumentasi Internal
- `REFACTOR_FRONTEND_PLAN.md` - Master plan untuk refactoring
- `RINGKASAN_FRONTEND.md` - Overview lengkap proyek
- `API.ENDPOINT.md` - Dokumentasi API backend lengkap
- `FRONTEND.md` - Detailed frontend development guide

### Pattern Files
- `app/services/_template.service.ts` - Service template
- `app/hooks/_template.hook.ts` - Hook template
- `app/services/prodi.service.ts` - Example implementation
- `app/services/auth.service.ts` - Example with complex logic
- `app/services/dashboard.service.ts` - Example with multiple endpoints

---

## 🎯 PRIORITAS KERJA SELANJUTNYA

### High Priority (Harus segera dikerjakan)
1. ⚠️ **CPL Service + Matrix CPL-PL**
2. ⚠️ **Bahan Kajian Service + Matrix CPL-BK**
3. ⚠️ **Mata Kuliah Service + Dosen Assignment + Matrix CPL-MK**
4. ⚠️ **RPS Service + Workflow System**
5. ⚠️ **CPMK Service + Sub-CPMK**

### Medium Priority
6. Kurikulum Service & Hook
7. Profil Lulusan Service & Hook
8. KUL Service & Hook
9. Laporan Service & Hook
10. Penilaian Service & Hook

### Low Priority
11. Mahasiswa Service & Hook (kalau dipakai)
12. Export/Import functionality
13. Advanced filtering & search
14. Pagination

---

## ✅ CARA VERIFY REFACTORING BERHASIL

Untuk setiap module yang sudah di-refactor:

### 1. Type Check Pass
```bash
npm run typecheck
# Tidak boleh ada error TypeScript
```

### 2. Manual Testing
- [ ] Create: Form bisa create data baru
- [ ] Read: Data tampil di table
- [ ] Update: Edit form pre-fill data, save berhasil
- [ ] Delete: Confirmation dialog muncul, data terhapus
- [ ] Loading: Skeleton tampil saat loading
- [ ] Error: Error message tampil jika gagal
- [ ] Empty: Empty state tampil jika tidak ada data

### 3. Console Check
- [ ] Tidak ada console.log di production build
- [ ] Development mode: log informatif tersedia
- [ ] Tidak ada unhandled errors

### 4. Network Check
- [ ] API calls menggunakan endpoint yang benar
- [ ] Request payload sesuai dengan backend expectation
- [ ] Response di-parse dengan benar
- [ ] Authorization header ada di setiap request

---

## 🔗 NEXT STEPS

1. **Pilih module dari High Priority list**
2. **Copy template service & hook**
3. **Customize sesuai dengan entity**
4. **Test CRUD operations**
5. **Update page component untuk menggunakan hook baru**
6. **Verify dengan checklist di atas**
7. **Move to next module**

---

**Good luck dengan refactoring! 🚀**

Jika ada pertanyaan atau butuh bantuan untuk module specific, silakan tanya dengan menyebut nama module nya.
