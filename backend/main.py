from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "OpenOA API is running"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/analyze/aep")
def analyze_aep():
    # Mock response based on OpenOA examples
    return {
        "status": "success",
        "results": {
            "aep_GWh": 12.5,
            "uncertainty_percent": 5.2,
            "availability_GWh": 11.8,
            "curtailment_GWh": 0.3
        },
        "message": "Analysis completed using sample data (La Haute Borne)"
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
