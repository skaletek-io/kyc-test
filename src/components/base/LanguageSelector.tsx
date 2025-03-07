import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTokenStore } from "@/store";

import { ListType } from "@/types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const languages: ListType[] = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "French",
    value: "fr",
  },
  {
    label: "Spanish",
    value: "es",
  },
];

export default function LanguageSelector() {
  const isMobile = useIsMobile();
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const { selectedLanguage, setSelectedLanguage } = useTokenStore();

  const language: ListType | undefined = languages.find(
    (el) => el.value === selectedLanguage
  );

  useEffect(() => {
    changeLanguage(selectedLanguage || i18n.language);
  }, [i18n.language]);

  const changeLanguage = (lang: string) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <div
            aria-expanded={open}
            style={{ boxShadow: "0px 1px 10px 0px #10182808" }}
            className="bg-white cursor-pointer flex items-center gap-2 text-sm font-medium text-dark-400 capitalize px-4 py-2.5 rounded-xl border border-primary/20"
          >
            {(isMobile ? language?.value : language?.label) || "Select"}

            <i
              className={`${
                open ? "" : "rotate-90"
              } transition-transform transform pi pi-chevron-right text-dark-100`}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36 bg-white">
          <DropdownMenuGroup className=" overflow-auto">
            {languages.map((lang) => (
              <DropdownMenuItem
                onClick={() => changeLanguage(lang.value)}
                className={`${
                  lang.value == selectedLanguage
                    ? "text-primary/85 "
                    : "text-dark-300"
                }  gap-2 py-2 `}
                key={lang.value}
              >
                {lang.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
