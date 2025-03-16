from fastapi import FastAPI


app = FastAPI(title="FastAPI Project", description="A sample FastAPI project with authentication and file uploads.")

# Include routes
# app.include_router(auth.router)
# app.include_router(users.router)
# app.include_router(uploads.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI Project!"}
