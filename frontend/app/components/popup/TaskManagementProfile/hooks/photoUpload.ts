"use client";
export async function fetchCurrentUserPhoto(token: string): Promise<string | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/photo-upload`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.warn('Failed to fetch user photo');
    return null;
  }
  const data = await res.json();
  if (!data.image_url) return null;
  return data.image_url;
}

export async function getPresignedUrl(filename: string, contentType: string, token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/photo-upload/generate-presigned-url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ filename, content_type: contentType }),
  });

  if (!res.ok) throw new Error('Failed to get presigned URL');
  return res.json();
}

export async function uploadFileToS3(url: string, file: File) {
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  });

  if (!res.ok) throw new Error('Failed to upload file to S3');
}

export async function saveUploadedPhotoToBackend(key: string, token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/photo-upload/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ key }),
  });

  if (!res.ok) throw new Error('Failed to save photo key to backend');
}

export async function handlePhotoUpload(
    file: File,
    token: string,
) {
  if (!file) return;
  const { url, key } = await getPresignedUrl(file.name, file.type, token);
  await uploadFileToS3(url, file);
  await saveUploadedPhotoToBackend(key, token);
  return `${process.env.NEXT_PUBLIC_API_URL}/public/image?key=${encodeURIComponent(key)}`;
}

