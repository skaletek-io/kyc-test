import { useTranslation } from "react-i18next";

export default function AppFooter() {
  const { t } = useTranslation();

  return (
    <footer className="container mx-auto text-xs sm:text-sm  p-2  flex items-center justify-center gap-4 md:gap-6 text-gray-500">
      <div>© Skaletek {new Date().getFullYear()}</div>
      <div>{t("privacy_policy")}</div>
    </footer>
  );
}
