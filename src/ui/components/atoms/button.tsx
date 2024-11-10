const buttonStyle = {
  shared:
    "flex justify-center items-center gap-1.5 w-full md:w-fit rounded-full",
  variants: {
    primary: "bg-shb-hb1 text-white hover:bg-shb-hb6",
    secondary:
      "bg-white text-shb-hb1 border border-shb-hb1 hover:bg-shb-gray-10 hover:text-shb-hb6 hover:border-shb-hb6",
    ghost: "text-shb-hb1 hover:bg-shb-gray-10 hover:text-shb-hb6",
    danger: "bg-white text-danger border border-danger hover:bg-shb-gray-10",
  },
  sizes: {
    small: "h-7 px-6 text-shb-text-3 leading-none",
    large: "h-12 px-6 text-shb-text-2",
  },
};

export default function Button({
  children,
  variant = "primary",
  size = "large",
  onClickHandler = () => {},
}: {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "small" | "large";
  onClickHandler?: () => void;
}) {
  return (
    <button
      className={`${buttonStyle.shared} ${buttonStyle.variants[variant]} ${buttonStyle.sizes[size]}`}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
}
