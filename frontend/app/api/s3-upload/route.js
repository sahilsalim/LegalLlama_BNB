import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { exportingVariable } from "../../config";

const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_MY_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_MY_AWS_ACCESS_KEY,
        secretAccessKey: process.env.NEXT_PUBLIC_MY_AWS_SECRET_KEY,
    }
});

export async function uploadFileToS3(file, fileName) {
    const fileBuffer = file;

    const params = {
        Bucket: process.env.NEXT_PUBLIC_MY_S3_BUCKET_NAME,
        Key: fileName,
        Body: fileBuffer,
        ContentType: ".docx"
    };

    const key = exportingVariable; // Corrected variable name

    console.log(key);

    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    return params;
}

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ error: "File is required." }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = await uploadFileToS3(buffer, file.name);

        return NextResponse.json({ success: true, fileName });
    } catch (error) {
        return NextResponse.json({ error: error.message }); // Updated to include error message
    }
}
