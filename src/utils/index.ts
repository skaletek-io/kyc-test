import { BBox } from "@/types/model";
import imageCompression from "browser-image-compression";

// Converts a File object to a base64 string
export const fileToBase64 = (
  file: File
): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// Converts a base64 string to a File object
export const base64ToFile = (
  base64String: string,
  fileName: string
): File | undefined => {
  if (!base64String) return undefined;

  const arr = base64String.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1];
  if (!mime) return undefined;

  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName, { type: mime });
};

// Downloads an image from a URL
export const downloadImage = (
  url: string,
  filename: string = "file_name"
): void => {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export function downloadImageFromArrayBuffer(
  arrayBuffer: ArrayBuffer,
  filename: string = "captured-image.jpg",
  mimeType: string = "image/jpeg"
) {
  // Create a Blob from the ArrayBuffer
  const blob = new Blob([arrayBuffer], { type: mimeType });

  // Create an object URL
  const url = URL.createObjectURL(blob);

  // Create a temporary anchor element
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;

  // Trigger the download
  document.body.appendChild(a);
  a.click();

  // Cleanup
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Compresses an image file
export async function compressImage(
  file: File,
  maxSizeMB: number = 4,
  maxWidthOrHeight: number = 1920
): Promise<File> {
  try {
    const options = {
      maxSizeMB,
      maxWidthOrHeight,
      useWebWorker: true,
    };
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error("Compression failed:", error);
    throw error;
  }
}

export const cropImageToFile = (
  imageUrl: string,
  bbox: BBox
): Promise<File> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imageUrl;
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const padding = 10;
      const [x1, y1, x2, y2] = bbox;

      const cropWidth = x2 - x1 + 2 * padding;
      const cropHeight = y2 - y1 + 2 * padding;

      const canvas = document.createElement("canvas");
      canvas.width = cropWidth;
      canvas.height = cropHeight;

      const context = canvas.getContext("2d")!;
      context.drawImage(
        img,
        x1 - padding,
        y1 - padding,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      canvas.toBlob((blob) => {
        const croppedFile = new File([blob!], "cropped_image.png", {
          type: "image/png",
        });
        resolve(croppedFile);
      }, "image/png");
    };
  });
};

export const cropImageToFileCompressed = (
  imageUrl: string,
  bbox: BBox,
  maxSizeMB = 5,
  quality = 0.9
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageUrl;
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const padding = 10;
      const [x1, y1, x2, y2] = bbox;

      const cropWidth = x2 - x1 + 2 * padding;
      const cropHeight = y2 - y1 + 2 * padding;

      const canvas = document.createElement("canvas");
      canvas.width = cropWidth;
      canvas.height = cropHeight;

      const context = canvas.getContext("2d")!;
      context.drawImage(
        img,
        x1 - padding,
        y1 - padding,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      const exportBlob = (currentQuality: number) => {
        canvas.toBlob(
          (blob) => {
            if (
              blob!.size / (1024 * 1024) > maxSizeMB &&
              currentQuality > 0.1
            ) {
              exportBlob(currentQuality - 0.1);
            } else {
              const croppedFile = new File([blob!], "cropped_image.jpg", {
                type: "image/jpeg",
              });
              resolve(croppedFile);
            }
          },
          "image/jpeg",
          currentQuality
        );
      };

      exportBlob(quality);
    };

    img.onerror = (error) => reject(error);
  });
};
