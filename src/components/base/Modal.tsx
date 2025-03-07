import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { DialogTitle } from "@radix-ui/react-dialog";

interface Props {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
  title?: string | ReactNode;
  modalClassName?: string;
  drawerClassName?: string;
  fullScreen?: boolean;
  noDrawer?: boolean;
  hideCloseButton?: boolean;
  spacing?: boolean;
  persistent?: boolean;
}

export function Modal({
  title,
  fullScreen,
  modalClassName,
  drawerClassName,
  children,
  spacing = true,
  noDrawer = false,
  persistent = false,
  open,
  onClose,
}: Props) {
  const isMobile = useIsMobile();

  const modalStyle = cn(
    fullScreen ? "!h-screen !w-screen !rounded-none" : "max-w-lg pb-6",
    "divided-x py-2  flex flex-col",
    modalClassName
  );

  const drawerStyle = cn("flex flex-col  max-h-[92vh]", drawerClassName);

  return (
    <>
      {isMobile && !noDrawer ? (
        <Drawer open={open} onOpenChange={onClose}>
          <DrawerContent className={drawerStyle}>
            {title && (
              <DrawerHeader className="border-b border-dark-100/50">
                <DialogTitle>{title}</DialogTitle>
              </DrawerHeader>
            )}

            <div
              onClick={onClose}
              className="absolute left-4 top-4 cursor-pointer h-8 w-8 rounded-full border border-dark-100/80 flex items-center justify-center"
            >
              <i className="pi pi-times text-sm text-dark-300" />
            </div>
            <div
              className={cn(
                "flex-1 overflow-y-auto no-scrollbar py-4",
                spacing && "px-4 "
              )}
            >
              {children}
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={onClose}>
          <DialogContent
            onInteractOutside={(e) => persistent && e.preventDefault()}
            className={modalStyle}
          >
            {title && (
              <DialogHeader className="border-b font-medium border-dark-100/50 p-4">
                <DialogTitle>{title}</DialogTitle>
              </DialogHeader>
            )}
            <div
              className={cn(
                "flex-1 overflow-y-auto no-scrollbar",
                spacing && "px-4 "
              )}
            >
              {children}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
