import styled from "styled-components";

export type ButtonContainerVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "success";

interface ButtonContainerProps {
  variant: ButtonContainerVariant;
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;

  background: ${(props) => props.theme["green-500"]};
`;
