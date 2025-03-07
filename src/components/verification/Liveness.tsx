import VerificationContainer from "./VerificationContainer";
import Arrow from "@/assets/icons/fancy-arrow.svg";

import { useTranslation } from "react-i18next";
import { useCallback, useState } from "react";
import { useTokenStore } from "@/store";
import { toast } from "react-toastify";
import { createSession, getResult, verifyIdentity } from "@/hooks/useLiveness";
import { redirectOnError } from "@/utils/redirect";
// import { useNavigate } from "react-router-dom";
import Spinner from "../base/Spinner";
import Progress from "../base/Progress";

import { FaceLiveness } from "./FaceLiveness";
import "@aws-amplify/ui-react/styles.css";
import awsexports from "../../aws-export";
import { Amplify } from "aws-amplify";
import { cn } from "@/lib/utils";

Amplify.configure(awsexports);

interface Props {
  nextStep: () => void;
  prevStep: () => void;
}

export default function Liveness({}: Props) {
  // const navigate = useNavigate();
  const { t } = useTranslation();

  const { sessionToken, resetState, primaryColor } = useTokenStore();

  const [livenessOn, setLivenessOn] = useState(false);
  const [progress, setProgress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [livenessSessionId, setLivenessSessionId] = useState<string | null>(
    null
  );

  //Create Session
  const handleCreateSession = async () => {
    if (!sessionToken || loading) return;

    try {
      setLoading(true);
      const livesnessId = await createSession({ sessionToken });
      setLivenessSessionId(livesnessId);
      setLivenessOn(true);
    } catch (error: any) {
      console.log({ error });
      toast.error(error.message ?? t("error_occurred"), {
        onClose: () => redirectOnError(error),
      });
    } finally {
      setLoading(false);
    }
  };

  //Verify documents
  const handleVerifyIdentity = async () => {
    if (!sessionToken) return;
    try {
      setLivenessOn(false);
      setProgress(true);
      const result = await verifyIdentity({
        sessionToken,
      });

      if (typeof result !== "string") {
        throw new Error(t("result_not_valid"));
      }

      toast.success(t("verification_done"));
      window.location.href = result;
      resetState({ dosAndDontSeen: true });
    } catch (error: any) {
      setLivenessSessionId(null);
      setLivenessOn(false);
      toast.error(error.message ?? t("error_occurred"), {
        onClose: () => redirectOnError(error),
      });
    } finally {
      setProgress(false);
    }
  };

  const onLivenessAnalysisComplete = useCallback(async () => {
    if (!sessionToken || !livenessSessionId) return;
    setLivenessOn(false);

    try {
      const { isLive, remainingTries } = await getResult({
        livenessToken: livenessSessionId,
        sessionToken,
      });

      // console.log(
      //   "selfieName",
      //   selfieName,
      //   "redirectUrl",
      //   redirectUrl,
      //   "isLive",
      //   isLive,
      //   "remainingTries",
      //   remainingTries
      // );

      if (isLive) {
        handleVerifyIdentity();
      } else {
        if (remainingTries) {
          handleCreateSession();
        }
      }
    } catch (error: any) {
      toast.error(error.message ?? error ?? t("error_occurred"), {
        onClose: () => redirectOnError(error),
      });
    }
  }, [sessionToken, livenessSessionId]);

  // useEffect(() => {
  //   if (!sessionToken) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <>
      <VerificationContainer
        title={t("photosensitivityWarningHeadingText")}
        description={t("liveness_turn_on_camera")}
        icon={Arrow}
      >
        <div
          className={cn(
            "w-full text-sm text-gray-500  bg-gray-25 border border-dashed border-gray-100  flex items-center justify-center gap-4",
            !livenessSessionId && "rounded-xl",
            livenessOn
              ? "aspect-[4/6] sm:aspect-[6/4] h-full sm:h-auto"
              : "aspect-[6/4]"
          )}
        >
          {/* Liveness capture */}
          {livenessSessionId ? (
            <FaceLiveness
              livenessSessionId={livenessSessionId}
              onLivenessAnalysisComplete={onLivenessAnalysisComplete}
              onUserCancel={() => {
                setLivenessSessionId(null);
                setLivenessOn(false);
              }}
            />
          ) : (
            <div
              onClick={handleCreateSession}
              className="cursor-pointer  flex flex-col items-center justify-center gap-2"
            >
              {loading ? (
                <Spinner size={25} />
              ) : (
                <>
                  <i
                    style={{ color: primaryColor }}
                    className="pi pi-camera text-2xl opacity-90"
                  />
                  <span className="text-gray-400 text-xs md:text-sm">
                    {t("start_liveness_check")}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </VerificationContainer>

      <Progress
        text={t("verifying")}
        open={progress}
        onClose={() => setProgress(false)}
      />
    </>
  );
}
