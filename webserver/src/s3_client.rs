use aws_sdk_s3::{Client, Config};
use aws_sdk_s3::config::{Credentials, Region};
use aws_sdk_s3::operation::delete_object::DeleteObjectOutput;

pub fn create_s3_client() -> Client {
    let endpoint_url = std::env::var("AWS_S3_ENDPOINT").expect("Missing AWS_S3_ENDPOINT");
    let region = Region::new(std::env::var("AWS_REGION").unwrap_or_else(|_| "auto".to_string()));
    let credentials = Credentials::new(
        std::env::var("AWS_ACCESS_KEY_ID").expect("Missing AWS_ACCESS_KEY_ID"),
        std::env::var("AWS_SECRET_ACCESS_KEY").expect("Missing AWS_SECRET_ACCESS_KEY"),
        None,
        None,
        "static",
    );
    let config = Config::builder()
        .endpoint_url(endpoint_url)  // ✅ use this!
        .region(region)
        .credentials_provider(credentials)
        .build();

    Client::from_conf(config)
}
pub async fn delete_avatar_from_r2(
    client: &Client,
    key: &str,
) -> Result<DeleteObjectOutput, aws_sdk_s3::error::SdkError<aws_sdk_s3::operation::delete_object::DeleteObjectError>> {
    let bucket = std::env::var("AWS_S3_BUCKET_NAME").expect("Missing AWS_S3_BUCKET_NAME");
    client
        .delete_object()
        .bucket(bucket)
        .key(key)
        .send()
        .await
}

