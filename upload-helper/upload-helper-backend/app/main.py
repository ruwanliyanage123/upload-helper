from fastapi import FastAPI

from app.routes import pre_signed_url

app = FastAPI(title="FastAPI Project", description="A sample FastAPI project with authentication and file uploads.")

# Include routes
# app.include_router(auth.router)
# app.include_router(users.router)
# app.include_router(uploads.router)
app.include_router(pre_signed_url.router, prefix= "/pre-signed-url")

@app.get("/test")
def read_root():
    return {"message": "Welcome to the FastAPI Project!"}
