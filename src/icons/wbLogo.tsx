import React from "react"; // why is this necessary?

type WBLogoProps = {
  width?: number;
  fillColor?: string;
};

export function WBLogoIcon({ width = 21, fillColor = "white" }: WBLogoProps) {
  return (
    <svg
      width={`${width}`}
      height={`${1.19 * width}`}
      viewBox="0 0 21 25"
      fill={fillColor}
      style={{ transition: "fill 2s ease" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 8.25553V14.2168L17.0228 4.47097L14.4197 0L0 8.25553Z" />
      <path d="M9.70299 11.6758L0 17.2112V23.1846L9.70299 17.6492V11.6758Z" />
      <path d="M11.8886 19.4131L2.22571 24.993H15.5035V19.4131H11.8886Z" />
    </svg>
  );
}
