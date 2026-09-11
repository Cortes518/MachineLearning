import os
import joblib
import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sklearn.linear_model import LinearRegression

app = FastAPI(
    title="API de Regresion Lineal",
    description="API para predecir precios de viviendas segun la superficie en m2",
    version="1.0.1"
)

# Permitir peticiones desde cualquier origen (necesario para el frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "linear_regression_model.pkl")

def train_and_save():
    """Entrena el modelo y lo guarda si no existe el archivo .pkl."""
    x = np.array([[50], [60], [70], [80], [90], [100], [110], [120], [130], [140]])
    y = np.array([150000, 180000, 210000, 240000, 270000, 300000, 330000, 360000, 390000, 420000])
    m = LinearRegression()
    m.fit(x, y)
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    joblib.dump(m, MODEL_PATH)
    print(f"Modelo entrenado y guardado en: {MODEL_PATH}")
    return m

# Cargar o entrenar el modelo
try:
    model = joblib.load(MODEL_PATH)
    print("Modelo cargado correctamente.")
except Exception:
    print("Modelo no encontrado, entrenando...")
    model = train_and_save()

class housem2(BaseModel):
    area_m2: float = Field(..., examples=[82.5], description="Superficie de la vivienda en metros cuadrados")

@app.get("/")
def health():
    return {"message": "API de Regresion Lineal - Salud OK", "status": "OK", "model_loaded": model is not None}

@app.post("/predict")
def predict_price(data: housem2):
    if model is None:
        raise HTTPException(status_code=500, detail="Modelo no disponible.")

    prediction = model.predict(np.array([[data.area_m2]]))
    return {
        "area_m2": data.area_m2,
        "predicted_price": round(float(prediction[0]), 2)
    }