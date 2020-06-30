import styled from "@emotion/styled";

const Form = styled.form`
  max-width: 600px;
  width: 95%;
  margin: 5rem auto 0 auto;
  background-color: #f2f2f2;
  padding: 5rem;
  border-radius: 5px;
  fieldset {
    margin: 2rem 0;
    border: 1px solid #e1e1e1;
    font-size: 1.8rem;
  }
`;

const Camp = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  label {
    flex: 0 0 150px;
    font-size: 1.4rem;
  }
  input,
  textarea {
    flex: 1;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1.4rem;
  }
  textarea {
    height: 300px;
  }
`;

const ButtonSubmit = styled.button`
  display: block;
  background-image: linear-gradient(#6637eb, #6639ed);
  width: 40%;
  margin: auto;
  padding: 1.5rem;
  tex-align: center;
  color: var(--white);
  font-size: 1.8rem;
  text-transform: uppercase;
  border: none;
  font-family: "Cousine", serif;
  font-weight: 700;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    transform: scale(1.04);
    transition: 0.5s all;
    box-shadow: -1px -1px 24px -3px rgba(0, 0, 0, 0.75);
  }
`;

const Error = styled.p`
  background: var(--danger);
  padding: 1rem;
  font-family: sans-serif;
  font-size: 1.4rem;
  color: var(--dangerText);
  text-align: center;
  margin: 2rem 0;
  border-radius: 4px;
`;

export { Form, Camp, ButtonSubmit, Error };
