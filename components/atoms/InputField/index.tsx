export interface InputFieldProps {
  label: string;
  placeholder: string;
  disabled?: boolean;
  value?: string;
  onChange?: () => void;
}

export default function InputField(props: InputFieldProps) {
  const { label, placeholder, disabled, value, onChange, ...nativeProps } =
    props;

  return (
    <>
      <label
        htmlFor="name"
        className="form-label text-lg fw-medium color-palette-1 mb-10"
      >
        {label}
      </label>
      <input
        type="text"
        className="form-control rounded-pill text-lg"
        id="name"
        name="name"
        aria-describedby="name"
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
        {...nativeProps}
      />
    </>
  );
}
