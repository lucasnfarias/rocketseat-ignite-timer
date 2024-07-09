import { ButtonContainer, ButtonContainerVariant } from "./Button.styles";

interface ButtonProps {
  variant?: ButtonContainerVariant;
}

export function Button({ variant = "primary" }: ButtonProps) {
  return <ButtonContainer variant={variant}>Enviar</ButtonContainer>;
}
