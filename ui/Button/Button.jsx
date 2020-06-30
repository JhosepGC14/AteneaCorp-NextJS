import styled from "@emotion/styled";

const Button = styled.a`
  display: block;
  font-weight: 700;
  text-transform: uppercase;
  border: 1px solid var(--grayLight);
  border-radius: 5px;
  padding: 0.8rem 2rem;
  margin: 2rem auto;
  transition: 0.5s all;
  text-align: center;
  background-image: ${(props) =>
    props.bgColor ? "linear-gradient(#6637eb, #6639ed)" : "white"};
  color: ${(props) => (props.bgColor ? "white" : "#000")};
  &:last-of-type {
    margin-right: 0;
  }
  &:hover {
    cursor: pointer;
    transform: scale(1.04);
    transition: 0.5s all;
    box-shadow: 0px 2px 12px -2px rgba(0, 0, 0, 0.75);
  }
`;

export default Button;
