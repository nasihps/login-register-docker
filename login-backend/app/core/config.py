import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    PROJECT_NAME: str = "Log Transition Project"
    PROJECT_VERSION: str = "1.0.0"
    # AZURE_OPENAI_ENDPOINT: str = os.getenv("AZURE_OPENAI_ENDPOINT")
    # AZURE_OPENAI_API_KEY: str = os.getenv("AZURE_OPENAI_API_KEY")
    # ACCESS_TOKEN_SECRET: str = os.getenv("ACCESS_TOKEN_SECRET")


settings = Settings()

