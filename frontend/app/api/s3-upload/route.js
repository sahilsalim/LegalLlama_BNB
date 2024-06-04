import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Initialize S3 client
const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_MY_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_MY_AWS_ACCESS_KEY,
        secretAccessKey: process.env.NEXT_PUBLIC_MY_AWS_SECRET_KEY,
    }
});

// Function to upload file to S3
export async function uploadFileToS3(fileBuffer, fileName, contentType) {
    const params = {
        Bucket: process.env.NEXT_PUBLIC_MY_S3_BUCKET_NAME,
        Key: `${fileName}`,
        Body: fileBuffer,
        ContentType: contentType
    };

    // Upload file to S3
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    // Construct S3 URL
    const s3Url = `https://${process.env.NEXT_PUBLIC_MY_S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
    const Key=(`${fileName}`)
    console.log(Key);
    return { Key, s3Url };
}

// Handler for POST request
// Handler for POST request
export async function POST(request) {
    try {
        // Get form data from request
        const formData = await request.formData();
        const file = formData.get("file");

        // Check if file exists in form data
        if (!file) {
            return NextResponse.json({ error: "File is required." }, { status: 400 });
        }

        // Convert file to buffer
        const fileBuffer = Buffer.from(await file.arrayBuffer());

        // Upload file to S3
        const { Key, fileName, s3Url } = await uploadFileToS3(fileBuffer, file.name, file.type);

        // Return success response with Key, fileName, and s3Url
        return NextResponse.json({ success: true, Key, fileName, s3Url });
    } catch (error) {
        // Return error response
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
