import os
import joblib
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(
    title="API de Regresion Lineal",
    description="API para predecir precios de viviendas segun la superficie en m2",
    version="1.0.0"
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "linear_regression_model.pkl")

try:
    # cargar el modelo entrenado
    model = joblib.load(MODEL_PATH)
except Exception:
    model = None

class housem2(BaseModel):
    area_m2: float = Field(..., examples=[82.5], description="Superficie de la vivienda en metros cuadrados")

@app.get("/")
def health():
    return {"message": "API de Regresion Lineal - Salud OK", "status": "OK", "model_loaded": model is not None}

@app.post("/predict")
def predict_price(data: housem2):
    if model is None:
        raise HTTPException(status_code=500, detail="Modelo no cargado. Ejecuta primero train.py")

    prediction = model.predict(np.array([[data.area_m2]]))
    return {
        "area_m2": data.area_m2,
        "predicted_price": round(float(prediction[0]), 2)
    }