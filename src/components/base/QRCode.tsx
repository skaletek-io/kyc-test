import { cn } from "@/lib/utils";
import { useTokenStore } from "@/store";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import Alert from "./Alert";
import { Modal } from "./Modal";

import qrcode from "@/assets/icons/qr-code.svg";
import { QRCodeCanvas } from "qrcode.react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function QRCode() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const { qrCodeSeen, setState } = useTokenStore();

  const link = window.location.href;

  const onClose = () => {
    setOpen(false);

    if (!qrCodeSeen) {
      setState({ qrCodeSeen: true });
    }
  };

  useEffect(() => {
    if (!qrCodeSeen) {
      setOpen(true);
    }
  }, [qrCodeSeen]);

  return (
    <>
      {!isMobile && (
        <>
          <div
            onClick={() => setOpen((prev) => !prev)}
            style={{ boxShadow: "0px 1px 10px 0px #10182808" }}
            className={cn(
              !open && "animate__animated animate__wobble animate__repeat-2",
              "bg-white cursor-pointer flex items-center gap-2 text-sm font-medium text-dark-400 capitalize  p-2.5 rounded-xl border border-primary/20"
            )}
          >
            <img src={qrcode} alt="qr-code" />
          </div>

          <Modal
            modalClassName="max-w-md pb-4"
            title={t("scan_code")}
            open={open}
            onClose={onClose}
            spacing={false}
          >
            <div className="space-y-4">
              <div className="px-4">
                <Alert
                  color="#1261C1"
                  className="bg-[#E7F0FB] text-primary text-xs md:text-sm leading-4 py-2.5 md:items-start"
                >
                  {t("scan_to_continue")}
                </Alert>
              </div>

              <div className="px-4">
                <div className="bg-[#fafafa] w-full py-4 border-[0.5px] rounded-[8px] border-[#0000000D]">
                  <div className=" h-[200px] w-[200px] flex items-center justify-center mx-auto my-6 ">
                    <QRCodeCanvas size={200} value={link} />
                  </div>
                </div>
              </div>
              <div className="px-4 pt-4  md:border-t border-dark-100/50">
                <Button color="white" onClick={onClose}>
                  {t("dismiss")}
                </Button>
              </div>
            </div>
          </Modal>
        </>
      )}
    </>
  );
}
