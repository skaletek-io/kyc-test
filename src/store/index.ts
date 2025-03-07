import { getPresignedUrls } from "@/hooks/useLiveness";
import { isValidHexColor } from "@/lib/utils";
import { PresignedUrl, VerificationStep } from "@/types";
import { base64ToFile, fileToBase64 } from "@/utils";
import { handleError } from "@/utils/error";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
  selectedLanguage: string;
  currentStep: VerificationStep;
  sessionToken: string | null;
  documentType: string | null;
  issuingCountry: string | null;
  frontImage: string | null;
  backImage: string | null;
  redirectUrl: string | null;
  firstName: string | null;
  lastName: string | null;
  numPages: number;
  presignedUrl: PresignedUrl | null;

  // Partner Info
  customLogo: string | null;
  customLogoWidth: string;
  customLogoHeight: string;
  partnerName: string | null;
  partnerPhone: string | null;
  partnerEmail: string | null;
  helpUrl: string | null;
  primaryColor: string;

  //Others
  dosAndDontSeen: boolean;
  idDemoSeen: boolean;
  qrCodeSeen: boolean;
  docSrc: "FILE" | "LIVE";
};

type Actions = {
  resetState: (newState?: Partial<State>) => void;
  resetTimeout: () => void;
  initializeStore: () => void;
  setState: (newState: Partial<State>) => void;
  setCurrentStep: (step: VerificationStep) => void;
  setSelectedLanguage: (lang: string) => void;
  setFrontImage: (file: File) => Promise<void>;
  setBackImage: (file: File) => Promise<void>;
  removeImage: (type: "frontImage" | "backImage") => void;
  getImageUrl: (type: "frontImage" | "backImage") => {
    file: File | null;
    url: string | null;
  };

  fetchPresignedUrls: () => Promise<void>;
  refreshPresignedUrls: () => Promise<PresignedUrl>;
};

const DEFAULT_COLOR = "#1261C1";

// Initial state values
const initialState: State = {
  selectedLanguage: "",
  currentStep: "upload",
  sessionToken: null,
  documentType: null,
  issuingCountry: null,
  frontImage: null,
  backImage: null,
  redirectUrl: null,
  firstName: null,
  lastName: null,
  numPages: 1,
  presignedUrl: null,
  primaryColor: DEFAULT_COLOR,

  // Partner Info
  customLogo: null,
  customLogoWidth: "200px",
  customLogoHeight: "70px",
  partnerName: null,
  partnerPhone: null,
  partnerEmail: null,
  helpUrl: null,

  //Others
  dosAndDontSeen: false,
  idDemoSeen: false,
  qrCodeSeen: false,
  docSrc: "FILE",
};

// Duration (in milliseconds) after which the state is reset
const RESET_TIMEOUT = 15 * 60 * 1000; // 15 minutes

export const useTokenStore = create<State & Actions>()(
  persist(
    (set, get) => {
      let timeoutId: ReturnType<typeof setTimeout> | null = null;

      const resetTimeout = () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
          set({ ...initialState });
          console.log("State has been reset due to inactivity.");
        }, RESET_TIMEOUT);
      };

      return {
        ...initialState,
        resetTimeout,

        setState: (newState) => {
          set((state) => ({ ...state, ...newState }));
          resetTimeout();
        },

        resetState: (newState) => {
          set({ ...initialState, currentStep: get().currentStep, ...newState });
          resetTimeout();
        },

        setCurrentStep: (step) => {
          set({ currentStep: step });
          resetTimeout();
        },

        setSelectedLanguage: (lang) => {
          set({ selectedLanguage: lang });
          resetTimeout();
        },

        setFrontImage: async (file) => {
          const base64 = await fileToBase64(file);
          set({ frontImage: base64 as string });
          resetTimeout();
        },

        setBackImage: async (file) => {
          const base64 = await fileToBase64(file);
          set({ backImage: base64 as string });
          resetTimeout();
        },

        removeImage: (type) => {
          if (type === "frontImage") return set({ frontImage: null });
          if (type === "backImage") return set({ backImage: null });
        },

        initializeStore: () => {
          const params = new URLSearchParams(location.search);

          const currentToken = get().sessionToken;
          const newToken = params.get("token");

          const currentStep =
            currentToken === newToken ? get().currentStep : "upload";

          let primaryColor = DEFAULT_COLOR;
          if (params.get("primary_color")) {
            const color = "#" + params.get("primary_color");
            primaryColor = isValidHexColor(color) ? color : primaryColor;
          }

          set({
            currentStep,
            sessionToken: params.get("token") || null,
            redirectUrl: params.get("returnTo") || null,
            documentType: params.get("document_type") || null,
            issuingCountry: params.get("issuing_country") || null,
            firstName: params.get("first_name") || null,
            lastName: params.get("last_name") || null,
            numPages: parseInt(params.get("num_pages") || "1"),
            docSrc: (params.get("doc_src") as State["docSrc"]) || "FILE",
            customLogo: params.get("logo_url") || null,
            customLogoWidth: params.get("logo_width") || "250px",
            customLogoHeight: params.get("logo_height") || "70px",
            partnerName: params.get("partner_name") || null,
            partnerPhone: params.get("partner_phone") || null,
            partnerEmail: params.get("partner_email") || null,
            helpUrl: params.get("help_url") || null,
            primaryColor,
          });

          get().fetchPresignedUrls();
          resetTimeout();
        },

        getImageUrl: (imageType) => {
          const imageBase64 = get()[imageType];
          const docType = get().documentType;
          if (imageBase64) {
            const file = base64ToFile(
              imageBase64,
              `${docType}-${imageType}.png`
            ) as File | null;

            const url = file ? URL.createObjectURL(file) : null;
            return { file, url };
          }
          return {
            file: null,
            url: null,
          };
        },

        fetchPresignedUrls: async () => {
          const sessionToken = get().sessionToken;
          if (!sessionToken || get().presignedUrl) return;

          try {
            const presignedUrl = await getPresignedUrls(sessionToken);
            set({ presignedUrl });
          } catch (error) {
            handleError(error, "Failed to prefetch upload URLs");
          }
        },

        refreshPresignedUrls: async () => {
          const sessionToken = get().sessionToken;
          if (!sessionToken) throw new Error("Session token is missing.");

          try {
            const presignedUrl = await getPresignedUrls(sessionToken);
            set({ presignedUrl });
            return presignedUrl;
          } catch (error: any) {
            handleError(error, "Failed to prefetch upload URLs");
          }
        },
      };
    },
    {
      name: "token-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
