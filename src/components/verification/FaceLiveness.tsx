import { FaceLivenessDetector } from "@aws-amplify/ui-react-liveness";

import { AWS_LIVENESS_REGION } from "../../config";

import { useTranslation } from "react-i18next";
import { useCallback, useState } from "react";
import { Button } from "../ui/button";

interface Props {
  livenessSessionId: string;
  onLivenessAnalysisComplete: () => Promise<void>;
  onUserCancel: () => void;
}

export const FaceLiveness = ({
  livenessSessionId,
  onLivenessAnalysisComplete,
  onUserCancel,
}: Props) => {
  const { t } = useTranslation();

  const [error, setError] = useState<any>();

  const handleError = (err: any) => {
    setError(err);
    console.log(err);
  };

  const CustomError = useCallback(() => {
    return (
      <div className="absolute inset-0 bg-shadown flex flex-col items-center justify-center gap-4 p-6 rounded-2xl ">
        <div className="space-y-2 text-center">
          <h4 className="font-medium text-gray-700">{error?.state}</h4>
          <p className="text-xs sm:text-sm text-gray-600">
            {error?.error.message}
          </p>
        </div>
        <Button onClick={onUserCancel}>Try again</Button>
      </div>
    );
  }, [error]);

  return (
    <div className="w-full -mt-[200px] h-full relative ">
      <FaceLivenessDetector
        sessionId={livenessSessionId}
        region={AWS_LIVENESS_REGION}
        onAnalysisComplete={onLivenessAnalysisComplete}
        disableStartScreen={true}
        onUserCancel={onUserCancel}
        onError={handleError}
        displayText={{
          cameraMinSpecificationsHeadingText: t(
            "cameraMinSpecificationsHeadingText"
          ),
          cameraMinSpecificationsMessageText: t(
            "cameraMinSpecificationsMessageText"
          ),
          cameraNotFoundHeadingText: t("cameraNotFoundHeadingText"),
          cameraNotFoundMessageText: t("cameraNotFoundMessageText"),
          a11yVideoLabelText: t("a11yVideoLabelText"),
          cancelLivenessCheckText: t("cancelLivenessCheckText"),
          goodFitCaptionText: t("goodFitCaptionText"),
          goodFitAltText: t("goodFitAltText"),
          hintCenterFaceText: t("hintCenterFaceText"),
          hintCenterFaceInstructionText: t("hintCenterFaceInstructionText"),
          hintFaceOffCenterText: t("hintFaceOffCenterText"),
          hintMoveFaceFrontOfCameraText: t("hintMoveFaceFrontOfCameraText"),
          hintTooManyFacesText: t("hintTooManyFacesText"),
          hintFaceDetectedText: t("hintFaceDetectedText"),
          hintCanNotIdentifyText: t("hintCanNotIdentifyText"),
          hintTooCloseText: t("hintTooCloseText"),
          hintTooFarText: t("hintTooFarText"),
          hintConnectingText: t("hintConnectingText"),
          hintVerifyingText: t("hintVerifyingText"),
          hintCheckCompleteText: t("hintCheckCompleteText"),
          hintIlluminationTooBrightText: t("hintIlluminationTooBrightText"),
          hintIlluminationTooDarkText: t("hintIlluminationTooDarkText"),
          hintIlluminationNormalText: t("hintIlluminationNormalText"),
          hintHoldFaceForFreshnessText: t("hintHoldFaceForFreshnessText"),
          hintMatchIndicatorText: t("hintMatchIndicatorText"),
          photosensitivityWarningBodyText: t("photosensitivityWarningBodyText"),
          photosensitivityWarningHeadingText: t(
            "photosensitivityWarningHeadingText"
          ),
          photosensitivityWarningInfoText: t("photosensitivityWarningInfoText"),
          photosensitivityWarningLabelText: t(
            "photosensitivityWarningLabelText"
          ),
          retryCameraPermissionsText: t("retryCameraPermissionsText"),
          recordingIndicatorText: t("recordingIndicatorText"),
          startScreenBeginCheckText: t("startScreenBeginCheckText"),
          tooFarCaptionText: t("tooFarCaptionText"),
          tooFarAltText: t("tooFarAltText"),
          waitingCameraPermissionText: t("waitingCameraPermissionText"),
        }}
        components={{
          ErrorView: CustomError,
        }}
      />
    </div>
  );
};
