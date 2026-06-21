export type HeaderButtonProps = {
  type: "button" | "submit";
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  form?: string;
};

export default function HeaderButton({
  type,
  form,
  text,
  onClick,
  disabled = false,
}: HeaderButtonProps) {
  return (
    <button
      type={type}
      form={form}
      className="header-text-button"
      onClick={onClick}
      disabled={disabled}
      data-testid="header-button"
    >
      <span className="header-text-button-text text-truncate">{text}</span>
    </button>
  );
}
