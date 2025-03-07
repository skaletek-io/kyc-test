import { useEffect, useState } from "react";

import QuestionIcon from "@/assets/icons/question.svg";
import { Modal } from "../base/Modal";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

import RightIcon from "@/assets/icons/right.svg";
import WrongIcon from "@/assets/icons/wrong.svg";

import Dos1 from "@/assets/img/dos-1.png";
import Dos2 from "@/assets/img/dos-2.png";
import Dos3 from "@/assets/img/dos-3.png";
import Dos4 from "@/assets/img/dos-4.png";
import Dos5 from "@/assets/img/dos-5.png";
import Dos6 from "@/assets/img/dos-6.png";
import { useTranslation } from "react-i18next";
import { useTokenStore } from "@/store";
import { DialogTitle } from "@radix-ui/react-dialog";

interface intemType {
  image: string;
  type: "right" | "wrong";
  description: string;
}

export default function DosAndDonts() {
  const { dosAndDontSeen, setState } = useTokenStore();

  const { t } = useTranslation();
  const { md: isMobile } = useBreakpoint();
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);

    if (!dosAndDontSeen) {
      setState({ dosAndDontSeen: true });
    }
  };

  const items: intemType[] = [
    {
      image: Dos1,
      type: "right",
      description: t("dos1"),
    },
    {
      image: Dos2,
      type: "wrong",
      description: t("dos2"),
    },
    {
      image: Dos3,
      type: "wrong",
      description: t("dos3"),
    },
    {
      image: Dos4,
      type: "wrong",
      description: t("dos4"),
    },
    {
      image: Dos5,
      type: "wrong",
      description: t("dos5"),
    },
    {
      image: Dos6,
      type: "wrong",
      description: t("dos6"),
    },
  ];

  useEffect(() => {
    if (!dosAndDontSeen) {
      setOpen(true);
    }
  }, [dosAndDontSeen]);

  return (
    <>
      <div
        className="animate__animated animate__pulse animate__slower animate__infinite p-1 border md:border-2 border-dark-400/30 fixed bottom-10 right-6 md:right-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden cursor-pointer z-50"
        onClick={() => setOpen(true)}
      >
        <div className="p-1 border md:border-2 border-dark-400/70 w-full h-full rounded-full">
          <div className="animate bg-[#020B15] w-full h-full rounded-full flex items-center justify-center">
            <img src={QuestionIcon} />
          </div>
        </div>
      </div>

      <Modal
        title={isMobile ? t("dos_donts") : undefined}
        hideCloseButton
        fullScreen
        open={open}
        onClose={onClose}
      >
        <div className="md:space-y-8 ">
          <div className="fixed z-20 top-0 left-0 w-full bg-white hidden md:flex items-center justify-between border-b border-b-gray-200 p-4 ">
            <div className="flex items-center  gap-x-4">
              <div onClick={onClose} className="flex-shrink-0 cursor-pointer">
                <i className="pi pi-times text-gray-600" />
              </div>

              <h4 className="pl-4 border-l  border-l-gray-200 font-medium">
                {t("dos_donts")}
              </h4>
            </div>

            <Button onClick={onClose}> {t("go_to_liveness")}</Button>
          </div>

          <div className="md:hidden absolute bottom-4 left-0 w-full p-4 px-6 z-20">
            <Button block onClick={onClose}>
              {t("go_to_liveness")}
            </Button>
          </div>

          <div className="w-full h-full lg:w-10/12 xl:w-9/12 mx-auto space-y-4 md:pt-20 pb-16">
            <div className="w-full md:w-8/12 lg:w-6/12 space-y-2">
              <h4 className="text-sm sm:text-base text-gray-700 font-medium">
                <DialogTitle> {t("liveness_guide")}</DialogTitle>
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 font-light">
                {t("liveness_guid_text")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="bg-shadow border-[0.5px] border-gray-100/30 bg-white w-full p-3 md:p-2  mx-auto aspect-[6/4] rounded-3xl space-y-4"
                >
                  <div className="bg-gray-100 h-full flex items-center justify-center rounded-2xl relative">
                    <img
                      src={item.image}
                      className="w-full h-full object-contain"
                      alt=""
                    />
                    <div
                      className={cn(
                        "flex border-[0.5px] capitalize items-center gap-1.5 px-3  py-2 text-white text-xs rounded-full  absolute bottom-4 right-4",
                        item.type === "right"
                          ? "bg-[#039754] border-[#027A48]"
                          : "border-[#912018] bg-[#F04437]"
                      )}
                    >
                      <img
                        src={item.type === "right" ? RightIcon : WrongIcon}
                        alt=""
                      />
                      {t(item.type)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 font-light">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
