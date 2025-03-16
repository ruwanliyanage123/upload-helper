from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_pre_signed_url():
    return {"message": "This is a pre-signed URL."}