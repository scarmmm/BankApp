import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
import os

from fastapi.middleware.cors import CORSMiddleware


MODEL_DIR = "models"

selected_features = joblib.load(os.path.join(MODEL_DIR, "selected_features.joblib"))
scaler = joblib.load(os.path.join(MODEL_DIR, "scaler.joblib"))


models = {
    1 : joblib.load(os.path.join(MODEL_DIR, "knn_model.joblib")), #directory followed by the model file name
    2 : joblib.load(os.path.join(MODEL_DIR, "log_reg_model.joblib")),
    3 : joblib.load(os.path.join(MODEL_DIR, "decision_tree_model.joblib")),
    4 : joblib.load(os.path.join(MODEL_DIR, "svc_model.joblib"))
}
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or restrict to specific IPs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoanInput(BaseModel):
    ApplicantIncome: float
    CoapplicantIncome: float
    LoanAmount: float
    Credit_History: float
    model_id: int
    Property_Area: int

@app.post("/predict")
def predict_loan(data: LoanInput): # create an instance of LoanInput
    if data.model_id not in models:
        raise HTTPException(status_code=400, detail=f"Invalid model name. Choose from: {list(models.keys())}")

    input_features = np.array([
        data.ApplicantIncome,
        data.CoapplicantIncome,
        data.LoanAmount,
        data.Credit_History,
        data.Property_Area

    ]).reshape(1, -1)
    print(f"Input Features: {input_features}")
    # Use the scaler on our raw input data
    input_scaled = scaler.transform(input_features)

    model = models[data.model_id]
    if data.model_id == 2:
        proba = model.predict_proba(input_scaled)
        threshold = .57
        prediction = (proba[:, 1] >= threshold).astype(int)[0]
        print(f"Probability: {proba}, Threshold: {threshold}, Prediction: {prediction}")
    else:
        prediction = model.predict(input_scaled)[0]
        print(f"Prediction: {prediction}")

    print(f"Model ID: {data.model_id}, Prediction: {prediction}, Input Features: {input_scaled}")

    result = "Approved" if prediction == 1 else "Denied"
    return {"prediction": result, "model_id": data.model_id}

if __name__ == "__main__":
    uvicorn.run(app, host = "0.0.0.0", port = 8000, log_level = "info") # run fastAPI app