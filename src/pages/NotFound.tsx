import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import notFoundIcon from "@/assets/404.svg";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <main className="flex items-center justify-center w-full h-full">
      <div className="bg-shadow w-full max-w-2xl mx-auto flex flex-col gap-6 items-center bg-white px-6 pb-10 rounded-3xl">
        <img src={notFoundIcon} alt="404" />
        <p className="text-sm md:text-base text-gray-600  text-center w-10/12 mx-auto">
          {t("404")}
        </p>
        <Button onClick={handleGoBack}>{t("go_back")}</Button>
      </div>
    </main>
  );
}
