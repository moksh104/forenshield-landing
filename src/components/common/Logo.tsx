import logo from "@/assets/logo.webp";

export function Logo() {
  return (
    <div className="relative flex items-center justify-center h-[34px] w-[34px] sm:h-[38px] sm:w-[38px] lg:h-[42px] lg:w-[42px] group">
      <img
        src={logo}
        alt="ForenShield Logo"
        width={84}
        height={84}
        className="relative z-10 h-full w-full object-contain transition-[transform,filter] duration-[250ms] ease-in-out group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_oklch(0.55_0.22_260/0.55)]"
        style={{ imageRendering: "auto" }}
      />
    </div>
  );
}
