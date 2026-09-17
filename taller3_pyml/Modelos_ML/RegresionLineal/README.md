# 📈 Modelo de Regresión Lineal (Predicción de Precios de Inmuebles)

Este proyecto implementa un modelo de **Regresión Lineal** para estimar el precio estimado de viviendas en Colombia según su superficie en metros cuadrados (^2$). Cuenta con un backend desarrollado en **FastAPI** y un frontend web responsivo desplegados en **Railway**.

---

## 🌐 Enlaces de Despliegue

- **Frontend (Web App):** [https://front-production-8cd2.up.railway.app/](https://front-production-8cd2.up.railway.app/)
- **Backend / API (FastAPI):** [https://machinelearning-production-f58d.up.railway.app/](https://machinelearning-production-f58d.up.railway.app/)
- **Documentación API (Swagger):** [https://machinelearning-production-f58d.up.railway.app/docs](https://machinelearning-production-f58d.up.railway.app/docs)

---

## 📁 Estructura del Proyecto

`
RegresionLineal/
├── back/                    # API FastAPI
│   ├── main.py              # Endpoints API + entrenamiento automático al iniciar
│   ├── train.py             # Script independiente de entrenamiento
│   ├── run.py               # Script launcher multi-puerto (8000 y 8080)
│   ├── Dockerfile           # Configuración de Docker para Railway
│   └── requirements.txt     # Dependencias de Python
└── front/                   # Interfaz de Usuario Web
    ├── index.html           # Estructura HTML
    ├── style.css            # Estilos CSS responsivos
    ├── app.js               # Conexión asíncrona con el Backend
    ├── server.js            # Servidor estático Node.js ligero
    ├── package.json         # Configuración del paquete Node.js
    └── Procfile / railway.json
`

---

## 🛠️ Tecnologías Utilizadas

- **Backend:** Python, FastAPI, Scikit-Learn, Uvicorn, Joblib.
- **Frontend:** HTML5, CSS3 (Glassmorphism), JavaScript (Fetch API), Node.js.
- **Despliegue:** Railway, Docker, Nixpacks.

---

## 💻 Ejecución en Local

### Backend:
`ash
cd back
python -m pip install -r requirements.txt
uvicorn main:app --reload --port 8000
`

### Frontend:
Puedes abrir directamente el archivo ront/index.html en tu navegador o servirlo con Node:
`ash
cd front
node server.js
`
