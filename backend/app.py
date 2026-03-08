from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from ultralytics import YOLO
import cv2
import numpy as np
import io
from PIL import Image

app = FastAPI(title="SapuBumi API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model saat API nyala
try:
    model = YOLO("best.pt")
    print("✅ Model AI (best.pt) berhasil dimuat!")
except Exception as e:
    print(f"❌ ERROR: Gagal memuat best.pt. Pastikan filenya ada di folder yang sama! Detail: {e}")

@app.get("/")
def read_root():
    return {"message": "API SapuBumi Menyala! 🌍"}

@app.post("/deteksi")
async def deteksi_sampah(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        img_array = np.array(image)
        
        if img_array.shape[-1] == 4:
            img_array = cv2.cvtColor(img_array, cv2.COLOR_RGBA2RGB)

        results = model.predict(source=img_array, conf=0.4, verbose=False) 
        
        data_sampah = []
        for r in results:
            boxes = r.boxes
            for box in boxes:
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
                
        jumlah_deteksi = len(data_sampah)
        volume_status = "N/A"
        is_valid = False
        message = "Tidak ada sampah terdeteksi."

        if jumlah_deteksi > 0:
            is_valid = True
            message = f"Valid. Terdeteksi {jumlah_deteksi} tumpukan."
            if jumlah_deteksi >= 4: volume_status = "Banyak"
            elif jumlah_deteksi >= 2: volume_status = "Sedang"
            else: volume_status = "Sedikit"

        return JSONResponse(content={
            "status": "sukses" if is_valid else "gagal",
            "isTrashDetected": is_valid,
            "itemCount": jumlah_deteksi,
            "volume": volume_status,
            "message": message,
            "detail_boxes": data_sampah 
        })

    except Exception as e:
        return JSONResponse(status_code=500, content={"status": "error", "message": str(e)})
