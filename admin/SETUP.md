# LuzmaTV Admin — Setup Inicial

Pasos para conectar el panel admin con Supabase. Hacelo una sola vez.

## 1. Crear proyecto Supabase

1. Anda a https://supabase.com → Sign in.
2. **New Project**:
   - Name: `luzmatv`
   - Region: **South America (São Paulo)** (la más cercana a Chile)
   - Password de la DB: la que quieras, anótala bien.
3. Esperá ~1 min mientras se aprovisiona.

## 2. Crear las tablas

1. En el dashboard del proyecto: **SQL Editor** (icono `</>` a la izquierda).
2. **New query** → pega el contenido de `admin/schema.sql` → **Run**.
3. **New query** → pega el contenido de `admin/seed.sql` → **Run**.

Validación: en **Table Editor** deberías ver las tablas `programs` (3 filas) y `episodes` (6 filas).

## 3. Configurar Auth (un solo usuario admin)

1. **Authentication** → **Providers** → **Email**:
   - **Enable email signup**: **OFF** (importante — bloquea registros públicos)
   - **Confirm email**: **OFF** (es una cuenta interna, no requiere verificación)
   - Click **Save**.
2. **Authentication** → **Users** → **Add user** → **Create new user**:
   - Email: `admin@luzmatv.cl` (o el que prefieras)
   - Password: una clave fuerte (anotala — se comparte con el equipo)
   - **Auto Confirm User**: **ON**
3. Listo. Esta es la única cuenta que puede escribir en la BD.

## 4. Copiar las credenciales públicas

1. **Project Settings** (icono engranaje) → **API**.
2. Copia:
   - **Project URL**: `https://XXXX.supabase.co`
   - **anon public key**: `eyJhbGciOi...` (la llave larga)

> Estas credenciales son **públicas por diseño**. La seguridad la da Row Level Security (RLS), no el secreto de la key.

## 5. Pegarlas en el código

Editá estos dos archivos y reemplazá los placeholders:

### `lzm-data.jsx` (en la raíz)
```js
const SUPABASE_URL  = 'https://XXXX.supabase.co';  // <-- pegá acá
const SUPABASE_ANON = 'eyJhbGciOi...';             // <-- pegá acá
```

### `admin/supabase-client.jsx`
```js
const ADMIN_SUPABASE_URL  = 'https://XXXX.supabase.co';  // <-- pegá acá (el mismo)
const ADMIN_SUPABASE_ANON = 'eyJhbGciOi...';             // <-- pegá acá (la misma)
```

## 6. Commit + push

```bash
git add lzm-data.jsx admin/supabase-client.jsx
git commit -m "Conecta admin a Supabase"
git push
```

Vercel despliega automáticamente. En ~1 min:

- Sitio público: el dominio que tengas configurado (ej. `luzmatv.cl`)
- Panel admin: `<dominio>/admin.html`

## 7. Probar localmente (opcional)

```bash
cd "C:\Users\moren\Downloads\Luzma TV Web"
python -m http.server 8000
```

Abrí http://localhost:8000/admin.html → loguéate con las credenciales del paso 3 → crea un episodio → abrí http://localhost:8000/ → debería aparecer en "Últimos episodios".

## Troubleshooting

- **"Failed to fetch" en admin**: verifica que la URL y anon key en `supabase-client.jsx` coincidan exactamente con las del dashboard.
- **"new row violates row-level security policy"**: no estás logueado. Refrescá `/admin.html` y volvé a loguearte.
- **Sitio público muestra datos viejos**: el cache local dura 5 min. Abrí DevTools → Application → Local Storage → borra `lzm-data-cache-v1` → recargá.
- **JSON-LD desactualizado**: el bloque en `index.html` (líneas 155-187 aprox) se actualiza manualmente cuando querés que los crawlers vean los episodios más nuevos. En el futuro, el admin puede tener un botón "Generar JSON-LD".
