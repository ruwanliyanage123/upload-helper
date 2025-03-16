import os
from dotenv import load_dotenv

load_dotenv()

class Configs:
    AWS_S3_BUCKET = os.getenv("AWS_S3_BUCKET")