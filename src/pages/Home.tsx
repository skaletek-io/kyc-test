import Loading from "@/components/base/Loading";
import Liveness from "@/components/verification/Liveness";
import { useTokenStore } from "@/store";
import { VerificationStep } from "@/types";
import { Suspense } from "react";

export default function Verification() {
  const { currentStep, setCurrentStep } = useTokenStore();
  const steps: VerificationStep[] = ["upload", "liveness", "doc_verify"];

  // const [open, setOpen] = useState(false);

  const nextStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    setCurrentStep(steps[currentIndex + 1]);
  };

  const prevStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    setCurrentStep(steps[currentIndex - 1]);
  };

  return (
    <main className="flex items-center justify-center h-full w-full">
      <Suspense fallback={<Loading />}>
        <Liveness nextStep={nextStep} prevStep={prevStep} />
      </Suspense>
    </main>
  );
}
