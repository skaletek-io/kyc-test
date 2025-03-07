import { ReactNode } from "react";

import IDIcon from "@/assets/icons/id-card.svg";
import LivenessIcon from "@/assets/icons/liveness.svg";
import { useTokenStore } from "@/store";

import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
// import ContinueOnMobile from "../base/ContinueOnMobile";

interface Props {
  children?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  title?: string;
  description?: string;
  icon?: string;
  className?: string;
}

export default function VerificationContainer({
  children,
  title,
  description,
  icon,
  footer,
  className,
}: Props) {
  const { t } = useTranslation();
  const { currentStep } = useTokenStore();

  return (
    <div
      className={cn(
        "w-full max-w-2xl flex flex-col gap-4 text-gray-700",
        className
      )}
    >
      <div className="rounded-3xl bg-[#EEF2F6]">
        {/* /// Header Section Start // */}
        <div className="py-2 md:py-4 px-4 flex items-center justify-between">
          <div className="flex  flex-col gap-1 ">
            <h4 className="text-sm md:text-base font-medium text-dark-400">
              {title}
            </h4>
            <span className="text-xs md:text-sm text-gray-500">
              {description}
            </span>
          </div>
          <img src={icon} />
        </div>
        {/* /// Header End Start // */}

        <div className="bg-white rounded-2xl bg-shadow ">
          {/* <div className="p-4 pb-0 hidden md:block">
            <ContinueOnMobile />
          </div> */}

          {/* /// Steps  Start // */}
          <div className="flex items-center justify-between gap-2 p-4 border-b border-dark-100/20">
            <div className="text-gray-400 text-sm hidden md:inline whitespace-nowrap">
              {t("steps_ahead")}
            </div>

            <div className="w-full md:w-fit flex justify-between items-center gap-2 font-medium text-sm ">
              <div
                className={cn(
                  "flex items-center gap-2 leading-4 md:max-w-[200px]",
                  currentStep !== "upload" && "line-through opacity-20"
                )}
              >
                <img src={IDIcon} />
                {t("id_card_upload")}
              </div>

              <span className="border-t w-4 sm:w-8 border-[#EAECF0]"></span>

              <div
                className={cn(
                  "flex items-center gap-2 leading-4 md:max-w-[200px] ",
                  currentStep !== "liveness" && "opacity-20"
                )}
              >
                <img src={LivenessIcon} />
                {t("liveness_check")}
              </div>
            </div>
          </div>
          {/* /// Steps  End // */}
          <div className="p-4">{children}</div>
        </div>
      </div>

      <div className="flex items-center gap-4 md:justify-end">{footer}</div>
    </div>
  );
}
