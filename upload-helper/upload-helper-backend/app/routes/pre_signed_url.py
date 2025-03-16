import boto3
import requests
from fastapi import APIRouter
from pydantic import BaseModel

from app.config import Configs

router = APIRouter()

class FileUploadRequest(BaseModel):
    file_name: str
    file_type: str

@router.post("/")
async def get_pre_signed_url(request: FileUploadRequest):
    s3_client = boto3.client("s3")
    s3_bucket_name = Configs.AWS_S3_BUCKET
    s3_object_key = f"uploads/{request.file_name}"
    pre_signed_url = s3_client.generate_presigned_url(
        "put_object",
        Params={"Bucket": s3_bucket_name, "Key": s3_object_key, "ContentType": request.file_type },
        ExpiresIn=3600
    )
    return {
        "pre_signed_url": pre_signed_url,
        "file_path": s3_object_key,
    }

