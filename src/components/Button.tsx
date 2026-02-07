type Props = {
  text: string
  onClick?: () => void
  type?: "button" | "submit"
  disabled?: boolean
}

export function Button({
  text,
  onClick,
  type = "button",
  disabled = false,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="bg-black text-white py-2 rounded hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {text}
    </button>
  )
}