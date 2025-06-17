# Picture Uploads with AWS S3-Compatible Storage (Cloudflare R2)

This project uses an S3-compatible API to upload and store pictures. Instead of AWS S3, we use [Cloudflare R2](https://developers.cloudflare.com/r2/) as the storage backend, which offers the same API interface.

## How It Works

- The backend uses the AWS SDK or an S3-compatible library to upload images.
- The storage endpoint is configured to point to Cloudflare R2.
- Uploaded images are stored in a specified R2 bucket.

## Presigned URL Logic

To securely upload and serve images without exposing your storage credentials, this project uses presigned URLs:

- **Upload:**  
  When a user wants to upload a photo, the backend generates a presigned URL for a specific object key using the S3-compatible API. The client can then upload the image directly to Cloudflare R2 using this URL, with a limited time window (e.g., 10 minutes). The backend ensures only allowed file types and safe filenames are accepted.

- **Download/View:**  
  To serve images, the backend generates a presigned GET URL for the requested object key. The client is redirected to this URL, which allows temporary, secure access to the image file.

Presigned URLs are time-limited and scoped to specific objects, so users can only upload or access files as permitted by the backend logic.

## API Endpoints

### `/generate-presigned-url` (POST)

- **Purpose:**  
  Generates a presigned URL for uploading a user photo directly to Cloudflare R2.
- **How it works:**  
  The client sends a request with the intended filename and content type. The backend validates the file type, generates a unique object key, and returns a presigned URL for uploading. The client then uploads the image file directly to R2 using this URL.

### `/public/image` (GET)

- **Purpose:**  
  Serves user-uploaded images securely.
- **How it works:**  
  The client requests an image by providing its key as a query parameter. The backend generates a presigned GET URL for the object and redirects the client to this temporary URL, allowing secure, time-limited access to the image.

## Required Environment Variables

Set the following variables in your `.env` file:

- **AWS_S3_ENDPOINT**: The S3-compatible endpoint URL (e.g., Cloudflare R2 endpoint)
- **AWS_REGION**: The region to use (for R2, usually `auto`)
- **AWS_ACCESS_KEY_ID**: Access key ID for authentication
- **AWS_SECRET_ACCESS_KEY**: Secret access key for authentication
- **AWS_S3_BUCKET_NAME**: The bucket name to use for storing objects

### Example `.env` File

```
AWS_S3_ENDPOINT=https://<accountid>.r2.cloudflarestorage.com
AWS_REGION=auto
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_S3_BUCKET_NAME=your-bucket-name
```

### How to Obtain Credentials

1. **Create a Cloudflare Account**: Sign up at [Cloudflare](https://dash.cloudflare.com/).
2. **Enable R2**: In the Cloudflare dashboard, enable R2 for your account.
3. **Create an R2 Bucket**: Go to the R2 section and create a new bucket.
4. **Generate Access Keys**:
    - In the R2 dashboard, go to "API Tokens" or "Access Keys".
    - Create a new Access Key and Secret Key pair.
    - Copy these values for use in your `.env` file.
5. **Find Your Account ID**: Your account ID is shown in the R2 dashboard and is used in the endpoint URL.

## Notes

- Do **not** commit your `.env` file or credentials to version control.
- The application code should load these variables from the environment at runtime.

## References

- [Cloudflare R2 Documentation](https://developers.cloudflare.com/r2/)
- [AWS S3 SDK Documentation](https://docs.aws.amazon.com/sdk-for-rust/latest/dg/welcome.html)
