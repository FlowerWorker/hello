
use std::error::Error;
use std::fmt;

use crate::database::error::DatabaseError;


#[derive(Debug)]
pub struct ValidationError {
    pub(crate) message: String,
   
}

impl fmt::Display for ValidationError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.message)
    }
}

impl Error for ValidationError {}

impl From<DatabaseError> for ValidationError {
    fn from(error: DatabaseError) -> Self {
        ValidationError {
            message: format!("Database error: {}", error),
        }
    }
}

impl From<diesel::result::Error> for ValidationError {
    fn from(error: diesel::result::Error) -> Self {
        ValidationError {
            message: format!("Database error: {}", error),
        }
    }
}

