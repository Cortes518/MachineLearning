# 🚀 Taller de Modelos de Machine Learning

Este repositorio contiene la implementación, entrenamiento y despliegue de tres modelos principales de Inteligencia Artificial y Machine Learning.

---

## 🌐 Enlaces de Despliegue de los Modelos

### 1. 📈 Regresión Lineal (Predicción de Precios de Vivienda)
- **Frontend (Web App):** [https://front-production-8cd2.up.railway.app/](https://front-production-8cd2.up.railway.app/)
- **Backend / API (FastAPI):** [https://machinelearning-production-f58d.up.railway.app/](https://machinelearning-production-f58d.up.railway.app/)
- **Documentación Swagger:** [https://machinelearning-production-f58d.up.railway.app/docs](https://machinelearning-production-f58d.up.railway.app/docs)

---

### 2. 🌲 Random Forest (Predicción de Enfermedades Médicas)
- **Aplicación Web (Streamlit):** *[Insertar link de despliegue aquí]*
- **Backend / API (si aplica):** *[Insertar link de despliegue aquí]*

---

### 3. 👁️ Visión Artificial (Detección de Rostros con OpenCV)
- **Ejecutar Notebook en la Nube (Binder):** [Abrir en MyBinder](https://mybinder.org/v2/gh/Cortes518/MachineLearning/main?labpath=taller3_pyml%2FModelos_ML%2FVisionArtificial%2Fubdex.ipynb)
- **Ver Notebook en GitHub:** [Ver ubdex.ipynb](https://github.com/Cortes518/MachineLearning/blob/main/taller3_pyml/Modelos_ML/VisionArtificial/ubdex.ipynb)

---

## 📁 Estructura del Proyecto (Modelos_ML)

`
Modelos_ML/
├── RandomForest/            # Clasificación de Enfermedades (Streamlit)
│   ├── 1.Crear_dataset.py
│   ├── 2.Entrenar_modelo.py
│   └── 3.Predecir_enfermedad.py
│
├── RegresionLineal/         # Predicción de Precios de Inmuebles (FastAPI + HTML/JS)
│   ├── back/                # API FastAPI en Python
│   └── front/               # Interfaz Web en HTML/CSS/JS
│
└── VisionArtificial/        # Detección de Rostros (OpenCV)
    ├── haarcascade_frontalface_default.xml
    ├── imagenes-caras-gratis.webp
    └── ubdex.ipynb
`
