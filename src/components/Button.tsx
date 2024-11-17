interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "tertiary" | "disabled";
}

export default function Button({ variant, className, ...props }: ButtonProps) {
  return (
    <button className={`${variant ?? ""} ${className ?? ""}`} {...props} />
  );
}
