import pytest
from pydantic import ValidationError
from services.gemini import GeminiService, ScholarshipSchema

# The Manual Cleaner Test
def test_sanitize_extracted_data_cleans_whitespace_and_status():
    service = GeminiService()
    raw_data = {
        "university": "   Oxford University   ",
        "scholarship_name": "  Clarendon Fund  ",
        "status": "In Progress"
    }
    result = service.sanitize_extracted_data(raw_data)

    assert result["university"] == "Oxford University"
    assert result["status"] == "🔲 Not Started"


def test_scholarship_schema_missing_required_fields_raises_validation_error():
    with pytest.raises(ValidationError):
        ScholarshipSchema()


# The Modern Fixture Test (Zero duplicate setup code!)
def test_sanitize_with_fixtures(gemini_service, sample_raw_scholarship):
    result = gemini_service.sanitize_extracted_data(sample_raw_scholarship)

    assert result["university"] == "Cambridge University"
    assert result["status"] == "🔲 Not Started"

# Parametrized Edge-Case Testing
@pytest.mark.parametrize("raw_input, expected_output", [
    ("   Oxford University   ", "Oxford University"),  
    ("Harvard University",        "Harvard University"), 
    ("  MIT  \t",                 "MIT"),                
])

def test_sanitize_university_variations(gemini_service, raw_input, expected_output):
    raw_data = {"university": raw_input}
    result = gemini_service.sanitize_extracted_data(raw_data)
    assert result["university"] == expected_output