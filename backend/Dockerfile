FROM python:3.10-slim

WORKDIR /app

# System deps for OpenCV
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# CPU-only PyTorch (small ~200MB vs full ~2GB)
RUN pip install --no-cache-dir \
    torch torchvision \
    --index-url https://download.pytorch.org/whl/cpu

# Install ultralytics WITHOUT its heavy deps (torch already installed)
RUN pip install --no-cache-dir --no-deps ultralytics

# Install only the lightweight deps ultralytics actually needs for inference
RUN pip install --no-cache-dir \
    numpy pillow opencv-python-headless \
    pyyaml requests tqdm psutil \
    matplotlib pandas scipy seaborn \
    py-cpuinfo

# Install FastAPI server
RUN pip install --no-cache-dir fastapi uvicorn python-multipart

# Copy app files
COPY --chown=1000:1000 . .

# Non-root user (required by HF Spaces)
RUN useradd -m -u 1000 user || true
USER user

EXPOSE 7860

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]
