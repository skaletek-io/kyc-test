import { cn } from "@/lib/utils";

import imgPlaceholder from "@/assets/icons/image.svg";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import { useTokenStore } from "@/store";

import ScanIcon from "@/assets/img/scan.gif";

interface Props {
  className?: string;
  loading?: boolean;
  loadingText?: string;
  existingImageUrl?: string | null;
  waitForCroppedImage?: boolean;
  useDetection?: boolean;
  setImage?: (val: File | null) => void;
  removeImage?: () => void;
  onStartDetection?: () => void;
  scanMode?: boolean;
}

export default function UploadFile({
  className,
  existingImageUrl,
  loadingText,
  onStartDetection,
  setImage = () => {},
  removeImage = () => {},
  useDetection = false,
  loading = false,
  waitForCroppedImage = false,
  scanMode = true,
}: Props) {
  const { t } = useTranslation();
  const primaryColor = useTokenStore((state) => state.primaryColor);
  const translatedLoadingText = loadingText || t("loading");
  const [imageUrl, setImageUrl] = useState<string | null>(
    existingImageUrl || null
  );

  const onDropAccepted = useCallback(
    (files: File[]) => {
      setImage(files[0]);
      if (files[0] && !waitForCroppedImage) {
        setImageUrl(URL.createObjectURL(files[0]));
      } else {
        setImageUrl(null);
      }
    },
    [setImage]
  );

  const handleDeleteClick = () => {
    setImageUrl(null);
    setImage(null);
    if (removeImage) {
      removeImage();
    }
  };

  const handleClick = () => {
    if (useDetection) {
      onStartDetection?.();
    }
  };

  useEffect(() => {
    setImageUrl?.(existingImageUrl as string);
  }, [existingImageUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
    },
    maxSize: 20 * 1024 * 1024,
    noClick: loading,
    noDrag: loading,
    onDropAccepted,
    onDropRejected: (files) => {
      files[0]?.errors?.map(({ code }) => {
        const message =
          code == "file-too-large" ? "Image size is greater than 20mb" : code;
        toast.error(message);
      });
    },
  });

  const uploadStyle = cn(
    "relative w-full cursor-pointer aspect-[7/4] overflow-hidden rounded-xl bg-gray-25 border border-dashed border-gray-100 flex items-center justify-center gap-4",
    isDragActive && "border-primary bg-primary-light/30",
    className
  );
  return (
    <div className={uploadStyle}>
      {imageUrl ? (
        <div className="group w-full h-full relative">
          <img
            className="w-full h-full object-contain"
            src={imageUrl}
            alt="id"
          />

          {scanMode && loading ? (
            <div className=" absolute inset-0">
              <img
                className="w-full h-full object-cover"
                src={ScanIcon}
                alt="scanning"
              />
            </div>
          ) : (
            <div className="hidden group-hover:flex items-center justify-center absolute inset-0 bg-black/20 ">
              <Button onClick={handleDeleteClick} size="icon" color="error">
                <i className="pi pi-trash text-lg" />
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="absolute inset-0">
          {useDetection ? (
            <div
              onClick={handleClick}
              className=" cursor-pointer h-full w-full flex items-center justify-center"
            >
              <i
                style={{ color: primaryColor }}
                className="pi pi-camera text-3xl sm:text-5xl"
              />
            </div>
          ) : (
            <div
              {...getRootProps()}
              className="h-full w-full flex items-center justify-center flex-col text-center space-y-2 text-xs md:text-sm text-gray-500"
            >
              {loading ? (
                <>
                  <Spinner size={30} className="mx-auto" />
                  <h3>{translatedLoadingText}...</h3>
                </>
              ) : (
                <>
                  <input {...getInputProps()} />
                  <img
                    src={imgPlaceholder}
                    className="pointer-events-none mx-auto"
                  />
                  {/* <h3>{t("drag_and_drop")}</h3>
                  <p className="text-xs text-gray-400">
                    {t("upload_file_instruction")}
                  </p> */}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
