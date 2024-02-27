import React from "react";

const Icon = ({
  name,
  width,
  height,
  strokeColor,
  strokeWidth,
  className,
  strokeLinecap,
  strokeLinejoin
}) => {

  const icons = {
    product: (
      <svg xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-package"
        width={width || "24"}
        height={height || "24"}
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth || "1.5"}
        stroke={strokeColor || "#2c3e50"}
        fill="none"
        strokeLinecap={strokeLinecap || "round"}
        strokeLinejoin={strokeLinejoin || "round"}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
        <path d="M12 12l8 -4.5" />
        <path d="M12 12l0 9" />
        <path d="M12 12l-8 -4.5" />
        <path d="M16 5.25l-8 4.5" />
      </svg>
    ),

    category: (
      <svg xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-category"
        width={width || "24"}
        height={height || "24"}
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth || "1.5"}
        stroke={strokeColor || "#2c3e50"}
        fill="none"
        strokeLinecap={strokeLinecap || "round"}
        strokeLinejoin={strokeLinejoin || "round"}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 4h6v6h-6z" />
        <path d="M14 4h6v6h-6z" />
        <path d="M4 14h6v6h-6z" />
        <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      </svg>
    ),

    cart: (
      <svg xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-shopping-cart"
        width={width || "24"}
        height={height || "24"}
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth || "1.5"}
        stroke={strokeColor || "#2c3e50"}
        fill="none"
        strokeLinecap={strokeLinecap || "round"}
        strokeLinejoin={strokeLinejoin || "round"}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M17 17h-11v-14h-2" />
        <path d="M6 5l14 1l-1 7h-13" />
      </svg>
    ),

    shop: (
      <svg xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-shopping-bag"
        width={width || "24"}
        height={height || "24"}
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth || "1.5"}
        stroke={strokeColor || "#2c3e50"}
        fill="none"
        strokeLinecap={strokeLinecap || "round"}
        strokeLinejoin={strokeLinejoin || "round"}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" />
        <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
      </svg>
    ),

    inventory: (
      <svg xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-packages"
        width={width || "24"}
        height={height || "24"}
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth || "1.5"}
        stroke={strokeColor || "#2c3e50"}
        fill="none"
        strokeLinecap={strokeLinecap || "round"}
        strokeLinejoin={strokeLinejoin || "round"}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M7 16.5l-5 -3l5 -3l5 3v5.5l-5 3z" />
        <path d="M2 13.5v5.5l5 3" />
        <path d="M7 16.545l5 -3.03" />
        <path d="M17 16.5l-5 -3l5 -3l5 3v5.5l-5 3z" />
        <path d="M12 19l5 3" />
        <path d="M17 16.5l5 -3" />
        <path d="M12 13.5v-5.5l-5 -3l5 -3l5 3v5.5" />
        <path d="M7 5.03v5.455" />
        <path d="M12 8l5 -3" />
      </svg>
    ),

    loader: (
      <svg xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-packages"
        width={width || "24"}
        height={height || "24"}
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth || "1.5"}
        stroke={strokeColor || "#2c3e50"}
        fill="none"
        strokeLinecap={strokeLinecap || "round"}
        strokeLinejoin={strokeLinejoin || "round"}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 3a9 9 0 1 0 9 9" />
      </svg>
    )
  }

  // alert(className)

  return (
    <div className={className || ''}>
      {icons[name]}
    </div>
  );
}

export default Icon;