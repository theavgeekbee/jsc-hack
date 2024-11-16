interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, ...props }: InputProps) {
  return <div>
    <label htmlFor={props.id}>{label}</label>
    <input id={props.id} {...props} />
  </div>;
}
