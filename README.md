# SolKBD Portfolio — www.solkbd.com

Portfolio profesional de **Jose Daniel Muñoz Martínez** bajo la marca **SolKBD — Tecnología Artesanal**.

Desarrollador fullstack y DevOps en Monterrey, N.L., México.

## Stack

| Capa      | Tecnología                            |
| --------- | ------------------------------------- |
| Frontend  | React 18 + Vite + TypeScript          |
| Backend   | FastAPI                               |
| Infra     | Docker Compose + Nginx                |
| Hosting   | Homelab `solgap` (Ubuntu 24.04) + Cloudflare |

## Estructura

```
frontend/   # SPA (Vite + React + TS)
backend/    # API FastAPI (scaffold)
data/       # Contenido editable (services.json, stack.json, projects.json)
infra/      # docker-compose + nginx config
.github/    # CI/CD 
```

## Desarrollo

### Frontend

```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
npm run build        # build de producción → frontend/dist
```

### Backend (opcional)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Stack completo con Docker

```bash
cd infra
docker compose -f docker-compose.dev.yml up   # desarrollo (hot reload)
docker compose up -d                          # producción (sirve frontend/dist)
```

## Contenido editable

Los datos de secciones viven en `data/*.json`. Los imports del frontend
(`frontend/src/data/*.json`) son symlinks a estos archivos — editar `data/`
es la fuente única de verdad.

- `data/services.json` — cinco servicios de la sección Servicios
- `data/stack.json` — tecnologías agrupadas por categoría
- `data/projects.json` — proyectos destacados
