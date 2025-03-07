import { cn } from "@/lib/utils";
import { useTokenStore } from "@/store";

interface PropType {
  color?: string;
  size?: number;
  width?: number;
  className?: string;
}

export default function Spinner({
  color,
  size = 20,
  width = 2.5,
  className,
}: PropType) {
  const primaryColor = useTokenStore((state) => state.primaryColor);
  const spinnerColor = color || primaryColor;

  const sizeStyle = {
    height: size,
    width: size,
  };

  const spinnerStyle = {
    borderColor: spinnerColor,
    ...sizeStyle,
    borderWidth: width,
  };

  //
  return (
    <div style={sizeStyle} className={cn("relative", className)}>
      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div
          style={{
            ...spinnerStyle,
            borderTopColor: "transparent",
          }}
          className=" border-solid  rounded-full animate-spin duration-700"
        ></div>
      </span>

      <span className="absolute  opacity-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div
          style={{ ...spinnerStyle, borderBottomColor: "transparent" }}
          className=" border-solid   rounded-full animate-spin"
        ></div>
      </span>
    </div>
  );
}
