import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "../base/Modal";
import { Button } from "../ui/button";
import { QRCodeCanvas } from "qrcode.react";

import AlertIcon from "../icons/AlertIcon";

export default function IdDemo() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);
  const link = window.location.href;

  return (
    <>
      <div className="bg-[#F4F4F5] flex items-center justify-between gap-4 text-sm p-3 rounded-xl">
        <div className="text-[#020B15] flex  gap-2">
          <AlertIcon fill="#000000" aria-hidden="true" />
          <p>{t("continue_on_mobile")}</p>
        </div>
        <Button
          onClick={() => setOpen(true)}
          color="primary"
          className="underline flex-shrink-0    "
        >
          {t("scan_to_continue")}
        </Button>
      </div>
      <Modal
        modalClassName="max-w-md pb-4"
        title={t("scan_code")}
        open={open}
        onClose={onClose}
        spacing={false}
        persistent
      >
        <div className="space-y-4">
          <div className="h-[200px] w-[200px] flex items-center justify-center mx-auto my-6 mb-8">
            <QRCodeCanvas size={200} value={link} />
          </div>

          <div className="px-4 pt-4  md:border-t border-dark-100/50">
            <Button color="white" onClick={onClose}>
              {t("dismiss")}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
