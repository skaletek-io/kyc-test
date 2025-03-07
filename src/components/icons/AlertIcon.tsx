interface Props {
  fill?: string;
  fillOpacity?: number;
}
export default function AlertIcon({
  fill = "#ED6C02",
  fillOpacity = 1,
}: Props) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.25 10C0.25 4.615 4.615 0.25 10 0.25C15.385 0.25 19.75 4.615 19.75 10C19.75 15.385 15.385 19.75 10 19.75C4.615 19.75 0.25 15.385 0.25 10ZM8.956 8.558C10.102 7.985 11.393 9.021 11.082 10.264L10.373 13.1L10.415 13.08C10.5912 13.0025 10.7905 12.9958 10.9715 13.0612C11.1526 13.1265 11.3016 13.259 11.3877 13.4312C11.4737 13.6033 11.4903 13.802 11.434 13.9861C11.3777 14.1702 11.2527 14.3255 11.085 14.42L11.045 14.442C9.898 15.015 8.607 13.979 8.918 12.736L9.628 9.9L9.586 9.92C9.49754 9.96916 9.40004 9.99991 9.29938 10.0104C9.19872 10.0209 9.09697 10.0109 9.00028 9.98102C8.90358 9.95114 8.81393 9.90201 8.73673 9.83657C8.65952 9.77113 8.59636 9.69074 8.55105 9.60025C8.50573 9.50975 8.4792 9.41102 8.47305 9.31001C8.4669 9.20899 8.48126 9.10777 8.51527 9.01244C8.54927 8.91712 8.60222 8.82967 8.67092 8.75535C8.73961 8.68103 8.82264 8.62138 8.915 8.58L8.956 8.558ZM10 7C10.1989 7 10.3897 6.92098 10.5303 6.78033C10.671 6.63968 10.75 6.44891 10.75 6.25C10.75 6.05109 10.671 5.86032 10.5303 5.71967C10.3897 5.57902 10.1989 5.5 10 5.5C9.80109 5.5 9.61032 5.57902 9.46967 5.71967C9.32902 5.86032 9.25 6.05109 9.25 6.25C9.25 6.44891 9.32902 6.63968 9.46967 6.78033C9.61032 6.92098 9.80109 7 10 7Z"
        fill={fill ?? "white"}
        fillOpacity={fillOpacity}
      />
    </svg>
  );
}
