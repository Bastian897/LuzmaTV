# LuzmaTV — Sitio Web

Sitio oficial de [LuzmaTV](https://luzmatv.cl), canal chileno de streaming. Programas, episodios, agenda en vivo, panel de administración.

## Stack

- **React 18** via CDN (unpkg) + **Babel standalone** — sin build step, sin bundler.
- **HTML/CSS/JS puro** — estático, deployable en cualquier CDN.
- **Supabase** (PostgreSQL + Auth + RLS) para episodios y programas dinámicos.
- **Hosting**: Vercel.

## Estructura

```
.
├── index.html              ← sitio público (entrypoint)
├── admin.html              ← panel de administración (entrypoint)
├── data.jsx                ← fallback estático (hosts, catLabel + datos bundled)
├── lzm-data.jsx            ← capa de datos remota (fetch Supabase + cache localStorage)
├── *.jsx                   ← componentes del sitio (Header, Hero, Episodes, etc.)
├── site.css, colors_and_type.css
├── assets/                 ← logos, fotos de hosts, iconos de plataformas
├── admin/                  ← panel admin
│   ├── admin.css
│   ├── AdminApp.jsx        ← shell + router de tabs
│   ├── AdminAuth.jsx       ← login
│   ├── supabase-client.jsx ← cliente + helpers CRUD
│   ├── EpisodesList.jsx, EpisodeForm.jsx
│   ├── ProgramsList.jsx, ProgramForm.jsx
│   ├── schema.sql, seed.sql ← SQL para Supabase
│   └── SETUP.md            ← cómo conectar Supabase
├── sitemap.xml, robots.txt
└── vercel.json             ← config de deploy
```

## Cómo correr local

```bash
python -m http.server 8000
# o
npx serve .
```

Abre http://localhost:8000/

> Sin Supabase configurado, el sitio funciona usando los datos bundled en `data.jsx`. El admin muestra un banner pidiendo configurar.

## Conectar Supabase (panel admin)

Ver instrucciones paso a paso en [`admin/SETUP.md`](admin/SETUP.md).

Resumen:
1. Crear proyecto en supabase.com → región São Paulo.
2. SQL Editor → ejecutar `admin/schema.sql` y luego `admin/seed.sql`.
3. Authentication → desactivar signup público → crear un usuario admin.
4. Copiar **Project URL** + **anon key** y pegarlas en:
   - `lzm-data.jsx` (líneas ~8-9)
   - `admin/supabase-client.jsx` (líneas ~7-8)
5. Commit + push → Vercel despliega.

## Deploy en Vercel

El repo está configurado para Vercel via `vercel.json`. Primera vez:

1. Importar el repo en vercel.com.
2. Framework Preset: **Other** (estático).
3. Build Command y Output Directory: dejarlos vacíos (auto-detecta).
4. Deploy.
5. Settings → Domains → conectar el dominio del cliente.

Cada push a `master` redespliega solo.

## Editar contenido

- **Episodios y programas**: usar el panel `/admin.html` (requiere Supabase configurado).
- **Hosts/conductores**: hardcoded en `data.jsx` (sección `hosts`).
- **JSON-LD destacado en `index.html`**: editar manualmente cuando se quiera actualizar a los crawlers (Google, redes sociales).

## SEO

- JSON-LD estructurado en `index.html` (Organization, BroadcastService, TVSeries, FAQ, ItemList de episodios destacados).
- `sitemap.xml` + `robots.txt`.
- `EpisodePage.jsx` inyecta un `VideoObject` runtime por episodio.
- Meta tags Open Graph + Twitter Card.

## Decisiones de arquitectura

- **Sin build step**: el código del repo es exactamente lo que se sirve. Diff = deploy.
- **Anon key pública**: por diseño de Supabase. La seguridad la da Row Level Security, no el secreto de la key.
- **Cache local de 5 min**: balance entre frescura y rendimiento. Forzar refresh: borrar `lzm-data-cache-v1` en localStorage.
- **Hosts en `data.jsx`**: cambian poco, no justifica BD. Programas y episodios sí.
- **JSON-LD híbrido**: estático para top-level + runtime injection por página de episodio.

## Licencia

Privado — © LuzmaTV.
