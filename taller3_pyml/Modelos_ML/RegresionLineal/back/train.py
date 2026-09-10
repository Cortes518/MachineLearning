import joblib
import numpy as np
import matplotlib.pyplot as plt
import os
from sklearn.linear_model import LinearRegression

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "models")
MODEL_PATH = os.path.join(MODELS_DIR, "linear_regression_model.pkl")

# predecir perecios de viviendas segun la superficie en m2
# Datos de entrenamiento (x) y (y)
x = np.array([[50], [60], [70], [80], [90], [100], [110], [120], [130], [140]])
y = np.array([150000, 180000, 210000, 240000, 270000, 300000, 330000, 360000, 390000, 420000])

# Crear y entrenar el modelo
model = LinearRegression()
model.fit(x, y)

# Guardar el modelo entrenado
os.makedirs(MODELS_DIR, exist_ok=True)
joblib.dump(model, MODEL_PATH)
print(f"Modelo guardado exitosamente en: {MODEL_PATH}")

#imprimir la informacion del modelo entrenado
print("Coeficiente de regresion:", model.coef_[0])
print("Término independiente:", model.intercept_)

#predicciones de prueba 
y_pred = model.predict(x)

#graficar datos reales
plt.scatter(x, y, color='red', label='Datos de entrenamiento')

#graficar los datos de entrenamiento y la linea de regresion
plt.plot(x,y_pred, color='blue', label='Linea de regresion')
plt.ylabel('Precio(cop)')
plt.xlabel('Superficie (m2)')
plt.title('Regresion Lineal - Precio de Viviendas')
plt.legend()
plt.grid(True)


# Guardar la grafica si fuera necesario o mostrarla