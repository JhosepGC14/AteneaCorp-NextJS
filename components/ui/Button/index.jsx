import styled from "@emotion/styled";

const Button = styled.a`
  font-weight: 700;
  text-transform: uppercase;
  border: 1px solid var(--grayLight);
  padding: 0.8rem 2rem;
  margin-right: 1rem;
  transition: 0.5s all;
  background-color: ${(props) => (props.bgColor ? "#DA552F" : "white")};
  color: ${(props) => (props.bgColor ? "white" : "#000")};
  &:last-of-type {
    margin-right: 0;
  }
  &:hover {
    cursor: pointer;
    transform: scale(1.04);
    transition: 0.5s all;
    box-shadow: -1px -1px 24px -3px rgba(0, 0, 0, 0.75);
  }
`;

export default Button;
