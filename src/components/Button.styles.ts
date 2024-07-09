import styled, { css } from "styled-components";

export type ButtonContainerVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "success";

interface ButtonContainerProps {
  variant: ButtonContainerVariant;
}

const buttonVariant = {
  primary: "purple",
  secondary: "orange",
  danger: "red",
  success: "green",
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;

  ${(props) =>
    css`
      background-color: ${buttonVariant[props.variant]};
    `}
`;
