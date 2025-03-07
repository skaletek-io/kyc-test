import axios from "axios";
import { API_BASEURL } from "../config";
import { SessionError } from "@/utils/error";
import { t } from "i18next";
import { Fields, PresignedUrl, SignedUrl } from "@/types";

// Define types for the function parameters and return values

export interface GetResultParams {
  livenessToken: string;
  sessionToken: string;
}

export interface GetResultResponse {
  selfieName: string;
  isLive: boolean;
  redirectUrl: string;
  remainingTries: number;
}

export const createSession = async ({
  sessionToken,
}: {
  sessionToken: string;
}): Promise<string> => {
  try {
    const response = await axios.post(`${API_BASEURL}/liveness`, null, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });

    const { liveness_token } = response?.data;
    if (liveness_token === "") throw new Error("could not get liveness token");
    return liveness_token;
  } catch (error: any) {
    const data = error?.response?.data;
    // console.log({ data });
    const message =
      data?.message || data?.liveness_error || t("error_occurred");
    throw new SessionError(message, { redirectUrl: data?.redirect_url });
  }
};

export const getResult = async ({
  livenessToken,
  sessionToken,
}: GetResultParams): Promise<GetResultResponse> => {
  try {
    const response = await axios.post(
      `${API_BASEURL}/liveness/result`,
      {
        liveness_token: livenessToken,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );

    const { success, redirect_url, remaining_tries } = response.data;
    return {
      selfieName: livenessToken,
      isLive: success,
      redirectUrl: redirect_url,
      remainingTries: remaining_tries,
    };
  } catch (error: any) {
    const data = error?.response?.data;
    const message = data?.message || data?.error || t("error_occurred");
    throw new SessionError(message, { redirectUrl: data?.redirect_url });
  }
};

export const verifyIdentity = async ({
  sessionToken,
}: {
  sessionToken: string;
}): Promise<string> => {
  try {
    const response = await axios.post(`${API_BASEURL}/verify/`, null, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });

    const output = response?.data?.redirect_url;
    return output;
  } catch (error: any) {
    const data = error?.response?.data;
    const message = data?.message || data?.error || t("error_occurred");
    throw new SessionError(message, { redirectUrl: data?.redirect_url });
  }
};

export const getPresignedUrls = async (
  sessionToken: string
): Promise<PresignedUrl> => {
  // console.log("API_BASEURL", API_BASEURL);
  try {
    const response = await axios.post(`${API_BASEURL}/presign`, null, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });

    if (!response?.data) throw new Error("could not get presigned urls");
    return response.data;
  } catch (error: any) {
    const data = error?.response?.data;
    const message = data?.message || data?.error || t("error_occurred");
    throw new SessionError(message, { redirectUrl: data?.redirect_url });
  }
};

export const detectDocumentOld = async ({
  sessionToken,
  b64image,
}: {
  sessionToken: string;
  b64image: string | ArrayBuffer | null;
}) => {
  if (!b64image) return;
  console.log("detecting document");
  const url = "https://kyc-api.skaletek.io/document/detect"; //old

  try {
    const response = await axios.post(
      url,
      { image: b64image },
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );

    const { success, bbox } = response?.data;
    if (!success) {
      console.warn(`unable to detect ID`);
    }
    return bbox;
  } catch (error: any) {
    const data = error?.response?.data;
    const message =
      data?.message || data?.liveness_error || "An error occurred";
    throw new SessionError(message, { redirectUrl: data?.redirect_url });
  }
};

export const detectDocument = async (file: File) => {
  console.log("detecting document");

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      "https://ml.dev.skaletek.io/detection/document",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const { success, bbox } = response?.data;
    if (!success) {
      console.warn(`unable to detect ID`);
    }
    return bbox;
  } catch (error: any) {
    const data = error?.response?.data;
    const message =
      data?.message || data?.liveness_error || "An error occurred";
    throw new SessionError(message, { redirectUrl: data?.redirect_url });
  }
};

export const uploadDocument = async (file: File, presignedUrl: SignedUrl) => {
  try {
    const { url, fields } = presignedUrl;
    const formData = new FormData();

    appendFields(formData, fields);
    formData.append("file", file);

    await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error: any) {
    const data = error?.response?.data;
    const message = data?.message || data?.error || t("error_occurred");
    throw new SessionError(message, { redirectUrl: data?.redirect_url });
  }
};

const appendFields = (formData: FormData, fields: Fields) => {
  Object.keys(fields).map((key) => {
    const fieldKey = key as keyof Fields;
    formData.append(key, fields[fieldKey]);
  });
};
