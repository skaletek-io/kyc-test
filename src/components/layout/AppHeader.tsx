import AppLogo from "./AppLogo";
import LanguageSelector from "../base/LanguageSelector";
import ContactInfo from "../base/ContactInfo";
import QRCode from "../base/QRCode";

export default function AppHeader() {
  return (
    <nav className="container mx-auto flex items-center justify-between">
      <AppLogo />

      <div className="flex items-center gap-2 sm:gap-4">
        <LanguageSelector />

        <ContactInfo />
        <QRCode />
      </div>
    </nav>
  );
}
