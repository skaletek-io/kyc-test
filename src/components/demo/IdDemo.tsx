import { useTokenStore } from "@/store";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "../base/Modal";
import Alert from "../base/Alert";
import { Button } from "../ui/button";

import Gif from "@/assets/img/gif.gif";

export default function IdDemo() {
  const { idDemoSeen, setState } = useTokenStore();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);

    if (!idDemoSeen) {
      setState({ idDemoSeen: true });
    }
  };

  useEffect(() => {
    if (!idDemoSeen) {
      setOpen(true);
    }
  }, [idDemoSeen]);

  return (
    <Modal
      modalClassName="max-w-md pb-4"
      title={t("upload_process")}
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
            {t("upload_instruction")}
          </Alert>
        </div>

        <div className="px-4">
          <div className="bg-[#fafafa] w-full ">
            <img
              className="w-full object-center aspect-[6/4] object-cover "
              src={Gif}
              alt="ID Card demo"
            />
          </div>
        </div>
        <div className="px-4 pt-4  md:border-t border-dark-100/50">
          <Button onClick={onClose}>{t("dismiss")}</Button>
        </div>
      </div>
    </Modal>
  );
}
