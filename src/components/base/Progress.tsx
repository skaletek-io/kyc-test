import { Modal } from "./Modal";

interface Props {
  open: boolean;
  onClose: () => void;
  text?: string;
}

export default function Progress({
  text = "Loading...",
  open,
  onClose,
}: Props) {
  return (
    <Modal
      title="Progress"
      open={open}
      onClose={onClose}
      modalClassName="max-w-md"
    >
      <div className=" h-[200px]   flex flex-col items-center justify-center gap-6">
        <div className="loader-animation w-16 h-16  bg-contain bg-no-repeat"></div>
        <span className="text-sm sm:text-base font-semibold text-dark-300">
          {text}
        </span>
      </div>
    </Modal>
  );
}
