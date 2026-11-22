import pytest
from services.gemini import GeminiService


@pytest.fixture
def gemini_service():
    return GeminiService()


@pytest.fixture
def sample_raw_scholarship():
    return {
        "university": "   Cambridge University   ",
        "scholarship_name": "  Gates Cambridge  ",
        "status": "Pending Review"
    }