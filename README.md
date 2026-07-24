# shrtn-dashboard

Panel web en React que consume la API de [`shrtn-api`](../shrtn-api) y muestra en tiempo real
los enlaces acortados y sus estadísticas de clics.

## Funcionalidad

- Formulario para crear un enlace corto (URL destino + código opcional).
- Tabla con todos los enlaces: destino, nº de clics, botón de copiar.
- Gráfico de barras con el top 10 de enlaces por clics.
- Contador global de enlaces y clics totales.

Es un frontend 100% estático (SPA) — sin backend propio, llama directamente a la API de `shrtn-api`.

## Configuración

Necesitas la URL de una instancia de `shrtn-api` ya desplegada (o corriendo en local con `sam local start-api`).

```bash
cp .env.example .env   # y pon ahí tu VITE_API_URL
```

## Desarrollo

```bash
npm install
npm run dev
```

## Producción con Docker

```bash
VITE_API_URL=https://tu-api.execute-api.eu-west-1.amazonaws.com/prod \
  docker compose up -d --build
```

Sirve en `http://localhost:8081`.

## Estructura

```
src/
  api.js                  # cliente fetch hacia shrtn-api
  App.jsx                  # layout + estado global de enlaces
  components/
    NewLinkForm.jsx          # crear enlace
    LinksTable.jsx            # tabla de enlaces
    ClicksChart.jsx            # gráfico de barras (recharts)
```
