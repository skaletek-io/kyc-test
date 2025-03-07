import { useBreakpoint } from "@/hooks/useBreakpoint";
import Logo from "@/assets/skaletek.svg";
import MobileLogo from "@/assets/skaletek_mobile.svg";
import { useTokenStore } from "@/store";

const AppLogo = () => {
  const { xs: isMobile } = useBreakpoint();
  const maxWidth = isMobile ? "120px" : "180px";
  const maxHeight = "70px";

  const { customLogo, customLogoWidth } = useTokenStore();

  return (
    <div style={{ maxWidth, maxHeight }}>
      {customLogo ? (
        <img
          style={{ width: "100%", maxWidth: customLogoWidth, maxHeight }}
          src={customLogo}
          className="object-contain"
          alt="Logo"
        />
      ) : (
        <img src={isMobile ? MobileLogo : Logo} alt="Skaletek Logo" />
      )}
    </div>
  );
};

export default AppLogo;
