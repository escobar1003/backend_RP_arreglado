from flask import Flask, request, jsonify
from ultralytics import YOLO
import os

app = Flask(__name__)

# 1. Cargar tu modelo entrenado de Recycling Points
# Asegúrate de poner el archivo 'best.pt' en la misma carpeta que este script
MODEL_PATH = "best.pt"
if os.path.exists(MODEL_PATH):
    model = YOLO(MODEL_PATH)
    print("🚀 ¡Modelo YOLOv11 cargado con éxito!")
else:
    print(f"❌ Error: No se encontró el archivo {MODEL_PATH} en esta ruta.")

@app.route("/predict", methods=["POST"])
def predict():
    # Verificar si viene una imagen en la petición
    if "image" not in request.files:
        return jsonify({"error": "No se envió ninguna imagen"}), 400
        
    file = request.files["image"]
    
    try:
        # Guardar temporalmente la imagen recibida de la app o backend
        temp_path = "temp_prediction.jpg"
        file.save(temp_path)
        
        # 2. Ejecutar la predicción de YOLOv11
        # Ponemos un umbral de confianza del 40% (0.4) para asegurar un buen filtro
        results = model.predict(source=temp_path, conf=0.4)
        result = results[0]
        
        # Eliminar el archivo temporal
        if os.path.exists(temp_path):
            os.remove(temp_path)
            
        # 3. Procesar las detecciones encontradas
        detections = []
        for box in result.boxes:
            # Obtener el nombre de la clase (metal, vidrio, organico, etc.)
            class_id = int(box.cls[0])
            label = model.names[class_id]
            
            # Obtener el porcentaje de confianza
            confidence = float(box.conf[0])
            
            detections.append({
                "objeto": label,
                "confianza": round(confidence, 2)
            })
            
        # Si no detectó nada que supere el umbral
        if len(detections) == 0:
            return jsonify({
                "status": "success",
                "detectado": False,
                "mensaje": "No se identificó material reciclable claro."
            })
            
        # Retornar la detección con mayor confianza
        mejor_deteccion = max(detections, key=lambda x: x["confianza"])
        
        return jsonify({
            "status": "success",
            "detectado": True,
            "resultado": mejor_deteccion
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    # Correr el servidor local en el puerto 5000
    app.run(host="0.0.0.0", port=5000, debug=True)