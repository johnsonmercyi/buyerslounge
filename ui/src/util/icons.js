import React from "react";

const Icon = ({
  name,
  width,
  height,
  strokeColor,
  bgColor,
  strokeWidth,
  className,
  strokeLinecap,
  strokeLinejoin,
  onClickHandler,
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
        strokeLinecap={strokeLinecap || "square"}
        strokeLinejoin={strokeLinejoin || "square"}>
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
        strokeLinecap={strokeLinecap || "square"}
        strokeLinejoin={strokeLinejoin || "square"}>
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
        strokeLinecap={strokeLinecap || "square"}
        strokeLinejoin={strokeLinejoin || "square"}>
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
        strokeLinecap={strokeLinecap || "square"}
        strokeLinejoin={strokeLinejoin || "square"}>
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
        strokeLinecap={strokeLinecap || "square"}
        strokeLinejoin={strokeLinejoin || "square"}>
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
        strokeLinecap={strokeLinecap || "square"}
        strokeLinejoin={strokeLinejoin || "square"}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 3a9 9 0 1 0 9 9" />
      </svg>
    ),

    error: (
      <svg xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-packages"
        width={width || "24"}
        height={height || "24"}
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth || "1.5"}
        stroke={strokeColor || "#2c3e50"}
        fill="none"
        strokeLinecap={strokeLinecap || "square"}
        strokeLinejoin={strokeLinejoin || "square"}>

        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9 9v-1a3 3 0 0 1 6 0v1" />
        <path d="M8 9h8a6 6 0 0 1 1 3v3a5 5 0 0 1 -10 0v-3a6 6 0 0 1 1 -3" />
        <path d="M3 13l4 0" />
        <path d="M17 13l4 0" />
        <path d="M12 20l0 -6" />
        <path d="M4 19l3.35 -2" />
        <path d="M20 19l-3.35 -2" />
        <path d="M4 7l3.75 2.4" />
        <path d="M20 7l-3.75 2.4" />
      </svg>
    ),

    search: (
      <svg xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-packages"
        width={width || "24"}
        height={height || "24"}
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth || "1.5"}
        stroke={strokeColor || "#2c3e50"}
        fill="none"
        strokeLinecap={strokeLinecap || "square"}
        strokeLinejoin={strokeLinejoin || "square"}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
        <path d="M21 21l-6 -6" />
      </svg>
    ),

    "arrow-down": (
      <svg xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-packages"
        width={width || "24"}
        height={height || "24"}
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth || "1.5"}
        stroke={strokeColor || "#2c3e50"}
        fill="none"
        strokeLinecap={strokeLinecap || "square"}
        strokeLinejoin={strokeLinejoin || "square"}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M20.118 3h-16.225a2.914 2.914 0 0 0 -2.503 4.371l8.116 13.549a2.917 2.917 0 0 0 4.987 .005l8.11 -13.539a2.914 2.914 0 0 0 -2.486 -4.386z" strokeWidth={strokeWidth || "0"} fill="currentColor" />
      </svg>
    ),

    "arrow-up": (
      <svg xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-packages"
        width={width || "24"}
        height={height || "24"}
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth || "1.5"}
        stroke={strokeColor || "#2c3e50"}
        fill="none"
        strokeLinecap={strokeLinecap || "square"}
        strokeLinejoin={strokeLinejoin || "square"}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 1.67a2.914 2.914 0 0 0 -2.492 1.403l-8.11 13.537a2.914 2.914 0 0 0 2.484 4.385h16.225a2.914 2.914 0 0 0 2.503 -4.371l-8.116 -13.546a2.917 2.917 0 0 0 -2.494 -1.408z" strokeWidth={strokeWidth || "0"} fill="currentColor" />
      </svg>
    ),

    "arrow-left": (
      <svg xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-chevron-left"
        width={width || "24"}
        height={height || "24"}
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth || "1.5"}
        stroke={strokeColor || "#2c3e50"}
        fill="none"
        strokeLinecap={strokeLinecap || "square"}
        strokeLinejoin={strokeLinejoin || "square"}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M15 6l-6 6l6 6" />
      </svg>
    ),

    "arrow-right": (
      <svg xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-chevron-right"
        width={width || "24"}
        height={height || "24"}
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth || "1.5"}
        stroke={strokeColor || "#2c3e50"}
        fill="none"
        strokeLinecap={strokeLinecap || "square"}
        strokeLinejoin={strokeLinejoin || "square"}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9 6l6 6l-6 6" />
      </svg>
    ),

    "information-alert": (
      <svg xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-info-circle-filled"
        width={width || "24"}
        height={height || "24"}
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth || "1.5"}
        stroke={strokeColor || "#2c3e50"}
        fill="none"
        strokeLinecap={strokeLinecap || "square"}
        strokeLinejoin={strokeLinejoin || "square"}>

        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm0 9h-1l-.117 .007a1 1 0 0 0 0 1.986l.117 .007v3l.007 .117a1 1 0 0 0 .876 .876l.117 .007h1l.117 -.007a1 1 0 0 0 .876 -.876l.007 -.117l-.007 -.117a1 1 0 0 0 -.764 -.857l-.112 -.02l-.117 -.006v-3l-.007 -.117a1 1 0 0 0 -.876 -.876l-.117 -.007zm.01 -3l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z" strokeWidth="0" fill={`${bgColor || 'currentColor'}`} />
      </svg>
    ),

    "error-alert": (
      <svg xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-alert-triangle-filled"
        width={width || "24"}
        height={height || "24"}
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth || "1.5"}
        stroke={strokeColor || "#2c3e50"}
        fill="none"
        strokeLinecap={strokeLinecap || "square"}
        strokeLinejoin={strokeLinejoin || "square"}>

        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 1.67c.955 0 1.845 .467 2.39 1.247l.105 .16l8.114 13.548a2.914 2.914 0 0 1 -2.307 4.363l-.195 .008h-16.225a2.914 2.914 0 0 1 -2.582 -4.2l.099 -.185l8.11 -13.538a2.914 2.914 0 0 1 2.491 -1.403zm.01 13.33l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -7a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z" strokeWidth="0" fill={`${bgColor || "currentColor"}`} />
      </svg>
    ),

    edit: (
      <svg xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-pencil"
        width={width || "24"}
        height={height || "24"}
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth || "1.5"}
        stroke={strokeColor || "#2c3e50"}
        fill="none"
        strokeLinecap={strokeLinecap || "square"}
        strokeLinejoin={strokeLinejoin || "square"}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
        <path d="M13.5 6.5l4 4" />
      </svg>
    ),

    "edit-done": (
      <svg xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-pencil-check"
        width={width || "24"}
        height={height || "24"}
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth || "1.5"}
        stroke={strokeColor || "#2c3e50"}
        fill="none"
        strokeLinecap={strokeLinecap || "square"}
        strokeLinejoin={strokeLinejoin || "square"}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
        <path d="M13.5 6.5l4 4" />
        <path d="M15 19l2 2l4 -4" />
      </svg>
    ),

    upload: (
      <svg xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-cloud-upload"
        width={width || "24"}
        height={height || "24"}
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth || "1.5"}
        stroke={strokeColor || "#2c3e50"}
        fill="none"
        strokeLinecap={strokeLinecap || "square"}
        strokeLinejoin={strokeLinejoin || "square"}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
        <path d="M9 15l3 -3l3 3" />
        <path d="M12 12l0 9" />
      </svg>
    ),

    trash: (
      <svg xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-trash"
        width={width || "24"}
        height={height || "24"}
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth || "1.5"}
        stroke={strokeColor || "#2c3e50"}
        fill="none"
        strokeLinecap={strokeLinecap || "square"}
        strokeLinejoin={strokeLinejoin || "square"}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 7l16 0" />
        <path d="M10 11l0 6" />
        <path d="M14 11l0 6" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
      </svg>
    )
  }

  return (
    <div onClick={onClickHandler} className={className || ''}>
      {icons[name]}
    </div>
  );
}

export default Icon;