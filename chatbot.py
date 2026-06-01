from flask import Flask, request, jsonify
from groq import Groq

app = Flask(__name__)

client = Groq(api_key="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")

SISTEMA_PROMPT = """
Eres EcoBot, un asistente educativo especializado en reciclaje, sostenibilidad y manejo de residuos.
Tu función es ayudar a los usuarios de la app Recycling Points a:
- Aprender cómo reciclar correctamente diferentes materiales
- Identificar qué materiales son reciclables
- Conocer el impacto ambiental del reciclaje
- Resolver dudas sobre el proceso de reciclaje
- Motivar buenas prácticas ambientales

Responde siempre en español, de forma clara, amigable y educativa.
Si te preguntan algo que no tiene relación con reciclaje o medio ambiente, 
redirige la conversación hacia temas de sostenibilidad.
Mantén las respuestas concisas, máximo 3 párrafos.
"""

@app.route("/chatbot", methods=["POST"])
def chatbot():
    data = request.get_json()

    if not data or "pregunta" not in data:
        return jsonify({
            "status": "error",
            "mensaje": "No se recibió ninguna pregunta"
        }), 400

    pregunta = data["pregunta"].strip()

    if not pregunta:
        return jsonify({
            "status": "error",
            "mensaje": "La pregunta no puede estar vacía"
        }), 400

    try:
        respuesta = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": SISTEMA_PROMPT},
                {"role": "user", "content": pregunta}
            ],
            max_tokens=500
        )

        return jsonify({
            "status": "success",
            "pregunta": pregunta,
            "respuesta": respuesta.choices[0].message.content,
            "fuente": "EcoBot - Groq AI"
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "mensaje": "Error al procesar la pregunta",
            "error": str(e)
        }), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)