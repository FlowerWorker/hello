use once_cell::sync::Lazy;
use regex::Regex;
use validator::ValidationError;

static PHONE_REGEX: Lazy<Regex> = Lazy::new(|| {
    Regex::new(r"^\+?[0-9]{7,15}$").unwrap()
});

pub fn validate_phone(value: &str) -> Result<(), ValidationError> {
    if PHONE_REGEX.is_match(value) {
        Ok(())
    } else {
        Err(ValidationError::new("invalid_phone"))
    }
}
