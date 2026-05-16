from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, menu, orders, admin

app = FastAPI(title="Drink Ordering API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(menu.router)
app.include_router(orders.router)
app.include_router(admin.router)


@app.get("/health")
def health():
    return {"status": "ok"}
