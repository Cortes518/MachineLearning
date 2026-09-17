# 👁️ Visión Artificial: Detección de Rostros con OpenCV

Este módulo implementa algoritmos de **Visión por Computador** utilizando **OpenCV (Haar Cascades)** para la detección de rostros en imágenes estáticas y en flujo de video en tiempo real desde la cámara web.

---

## 🌐 Enlaces de Despliegue

- **Frontend / Demo:** *[Insertar link de despliegue aquí]*
- **Backend / API (si aplica):** *[Insertar link de despliegue aquí]*

---

## 📁 Estructura del Proyecto

`
VisionArtificial/
├── haarcascade_frontalface_default.xml # Clasificador pre-entrenado de Haar para rostros
├── imagenes-caras-gratis.webp          # Imagen de prueba
└── ubdex.ipynb                         # Jupyter Notebook con el desarrollo paso a paso
`

---

## 🛠️ Tecnologías y Librerías

- **Lenguaje:** Python
- **Visión por Computador:** OpenCV (opencv-python==4.14.0.94)
- **Visualización:** Matplotlib
- **Entorno:** Jupyter Notebook / VS Code

---

## 🚀 Requisitos e Instalación

Asegúrate de instalar la versión estable de OpenCV compatible:

`ash
python -m pip install opencv-python==4.14.0.94 matplotlib
`

---

## 💻 Contenido del Cuaderno (ubdex.ipynb)

1. **Detección en Imágenes:** Carga una imagen, la convierte a escala de grises y aplica el clasificador detectMultiScale para dibujar rectángulos sobre los rostros detectados.
2. **Captura de Video en Tiempo Real:** Accede a la cámara del equipo (cv2.VideoCapture(0)) y procesa el flujo de video cuadro por cuadro en tiempo real.
