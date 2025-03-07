import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import CallIcon from "@/assets/icons/call.svg";
import WebIcon from "@/assets/icons/globe.svg";
import MessageIcon from "@/assets/icons/message.svg";

import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslation } from "react-i18next";
import { useTokenStore } from "@/store";

interface ContactInfo {
  title: string;
  href: string;
  icon: string;
}

export default function ContactInfo() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();
  const { partnerName, partnerPhone, partnerEmail, helpUrl } = useTokenStore();

  const contactInfo: ContactInfo[] = [
    {
      title: partnerName || "skaletek.io",
      href: (partnerName && helpUrl) || `https://skaletek.io`,
      icon: WebIcon,
    },
    {
      title: partnerEmail || "info@skaletek.io",
      href: `mailto:${partnerEmail || "info@skaletek.io"}`,
      icon: MessageIcon,
    },
    {
      title: partnerPhone || "+1 (613) 908-9601",
      href: `tel:${partnerPhone || "+16139089601"}`,
      icon: CallIcon,
    },
  ];

  return (
    <div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <div
            style={{ boxShadow: "0px 1px 10px 0px #10182808" }}
            className=" rounded-xl bg-white cursor-pointer flex justify-center sm:justify-start items-center gap-2 text-sm font-medium text-dark-400  px-2.5 sm:px-4 py-2.5 border border-primary/20"
          >
            {isMobile ? (
              <span className="flex-shrink-0">
                <img src={CallIcon} alt="" />
              </span>
            ) : (
              t("contact_us")
            )}

            <span className="hidden sm:inline">
              <i
                className={`${
                  open ? "" : "rotate-90"
                }  transition-transform transform pi pi-chevron-right text-dark-100`}
              />
            </span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-fit bg-white">
          <DropdownMenuGroup className=" overflow-auto">
            {contactInfo.map((info) => (
              <DropdownMenuItem
                className="gap-2 py-2 text-dark-300"
                key={info.title}
              >
                <span className="flex-shrink-0">
                  <img src={info.icon} />
                </span>
                <a href={info.href} target="_blank">
                  {info.title}
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
