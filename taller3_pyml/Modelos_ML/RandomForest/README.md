# 🌲 Modelo de Clasificación: Random Forest (Predicción de Enfermedades)

Este módulo utiliza un algoritmo de **Random Forest Classifier** para predecir enfermedades médicas basadas en una lista de síntomas del paciente. Incluye la generación de un conjunto de datos sintético/ampliado, el entrenamiento del modelo y una interfaz gráfica interactiva construida con **Streamlit**.

---

## 🌐 Enlaces de Despliegue

- **Frontend / App (Streamlit):** *[Insertar link de despliegue aquí]*
- **Backend / API (si aplica):** *[Insertar link de despliegue aquí]*

---

## 📁 Estructura del Proyecto

`
RandomForest/
├── 1.Crear_dataset.py       # Script para generar el conjunto de datos médicos
├── 2.Entrenar_modelo.py     # Script para entrenar y guardar el modelo Random Forest
├── 3.Predecir_enefermedad.py# Aplicación web interactiva en Streamlit
├── data/                    # Dataset almacenado (.csv)
└── Models/                  # Modelo entrenado (.pkl)
`

---

## 🚀 Requisitos e Instalación

Asegúrate de contar con Python instalado y ejecuta:

`ash
python -m pip install scikit-learn pandas numpy streamlit joblib
`

---

## 💻 Instrucciones de Uso

### 1. Generar el Dataset
`ash
python 1.Crear_dataset.py
`

### 2. Entrenar el Modelo
`ash
python 2.Entrenar_modelo.py
`

### 3. Ejecutar la Aplicación Interactiva (Streamlit)
`ash
streamlit run 3.Predecir_enefermedad.py
`
Se abrirá automáticamente tu navegador en http://localhost:8501.
