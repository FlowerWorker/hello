use actix_web::{get, web, HttpRequest, HttpResponse, Responder, ResponseError};
use serde::{Deserialize, Serialize};
use serde_json::Value;

use crate::{run_async_typesense_query, search::{error::ReqError, state::SearchState}, services::search_service::get_search_results};

#[derive(Deserialize, Serialize)]
struct SearchQuery {
    q: String,
    query_by: String,
}

#[derive(Debug, Deserialize)]
struct SearchResult {
    pub found: usize,
    pub hits: Vec<Hit>,
}

#[derive(Debug, Deserialize)]
struct Hit {
    document: Value,
    highlights: Vec<Highlight>,
}

#[derive(Debug, Deserialize)]
struct Highlight {
    field: String,
    snippet: String,
}

#[get("/search")]
pub async fn search_docs(
    search_state: web::Data<SearchState>,
    query: web::Query<SearchQuery>,
    req: HttpRequest
) -> Result<impl Responder, impl ResponseError> {
    let segments: Vec<&str> = req.path().split('/').collect();
    let schema_name = segments.get(3).unwrap_or(&"not_found");
    let url = format!("{}/collections/{}/documents/search", search_state.typesense_url, schema_name);
    
    let body = serde_json::json!({
        "q": query.q,
        "query_by": query.query_by
    });

    let search_result = run_async_typesense_query!(
        &search_state,
        |state: &SearchState, url: String, body: serde_json::Value| {
            let response = get_search_results(state, url, body).map_err(ReqError::from)?;
            let search_result_json: SearchResult = response.json().map_err(ReqError::from)?;
            Ok::<SearchResult, ReqError>(search_result_json)
        },
        url,
        body
    )?;

    search_result.hits.get(0).map_or_else( 
        || Ok::<HttpResponse, ReqError>(HttpResponse::Ok().json("No matches found")),
        |hit| Ok::<HttpResponse, ReqError>(HttpResponse::Ok().json(hit.document.clone()))
    )
}
