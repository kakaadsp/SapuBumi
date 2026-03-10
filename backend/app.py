import gradio as gr
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
import numpy as np
import cv2
import io
from PIL import Image

# Load model
try:
    model = YOLO("best.pt")
    print("✅ Model AI (best.pt) berhasil dimuat!")
except Exception as e:
    model = None
    print(f"❌ ERROR: {e}")

def detect_image(img_array):
    """Shared detection logic used by both Gradio UI and REST API"""
    if model is None:
        return {"status": "error", "message": "Model not loaded"}

    if len(img_array.shape) == 3 and img_array.shape[-1] == 4:
        img_array = cv2.cvtColor(img_array, cv2.COLOR_RGBA2RGB)

    results = model.predict(source=img_array, conf=0.4, verbose=False)

    data_sampah = []
    for r in results:
        for box in r.boxes:
            class_id = int(box.cls[0].item())
            class_name = model.names[class_id]
            if class_name.lower() == "garbage" or class_name == "0":
                x1, y1, x2, y2 = box.xyxy[0].tolist()
                confidence = round(box.conf[0].item() * 100, 1)
                data_sampah.append({
                    "label": "Tumpukan Sampah",
                    "confidence": f"{confidence}%",
                    "box": {"x1": round(x1, 2), "y1": round(y1, 2), "x2": round(x2, 2), "y2": round(y2, 2)}
                })

    jumlah = len(data_sampah)
    is_valid = jumlah > 0

    if jumlah >= 4:
        volume = "Banyak"
    elif jumlah >= 2:
        volume = "Sedang"
    elif jumlah > 0:
        volume = "Sedikit"
    else:
        volume = "N/A"

    return {
        "status": "sukses" if is_valid else "gagal",
        "isTrashDetected": is_valid,
        "itemCount": jumlah,
        "volume": volume,
        "message": f"Valid. Terdeteksi {jumlah} tumpukan." if is_valid else "Tidak ada sampah terdeteksi.",
        "detail_boxes": data_sampah
    }

# --- FastAPI app with CORS ---
app = FastAPI(title="SapuBumi API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api")
def read_root():
    return {"message": "API SapuBumi Menyala! 🌍"}

@app.post("/deteksi")
async def deteksi_sampah(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        img_array = np.array(image)
        result = detect_image(img_array)
        return JSONResponse(content=result)
    except Exception as e:
        return JSONResponse(status_code=500, content={"status": "error", "message": str(e)})

# --- Gradio UI ---
def gradio_detect(image):
    if image is None:
        return {"error": "No image provided"}
    return detect_image(np.array(image))

demo = gr.Interface(
    fn=gradio_detect,
    inputs=gr.Image(type="pil", label="Upload Foto Sampah"),
    outputs=gr.JSON(label="Hasil Deteksi"),
    title="🌍 SapuBumi - AI Trash Detector",
    description="Upload foto sampah untuk deteksi otomatis menggunakan YOLOv8. REST API juga tersedia di endpoint POST /deteksi",
)

# Mount Gradio onto FastAPI
app = gr.mount_gradio_app(app, demo, path="/")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=7860)
