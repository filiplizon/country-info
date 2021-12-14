import React from 'react';
import styled from 'styled-components';
import Form from 'components/Form/Form';
import IconButton from 'components/IconButton/IconButton';
import { GrFormClose as CloseIcon } from 'react-icons/gr';

const Modal = ({ isModalOpen, setModalOpenFn, formType, isUserLoggedIn }) => (
  <StyledWrapper isUserLoggedIn={isUserLoggedIn} isModalOpen={isModalOpen}>
    <StyledIconButton onClick={() => setModalOpenFn(!isModalOpen)} isVisible color="white">
      <CloseIcon />
    </StyledIconButton>
    <Form setModalOpenFn={setModalOpenFn} formType={formType} />
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  z-index: 100;
  opacity: ${({ isModalOpen }) => (isModalOpen ? 1 : 0)};
  transition: 0.3s opacity;
  display: ${({ isModalOpen }) => (isModalOpen ? 'block' : 'none')};

  @media (min-width: 1100px) {
    top: 50%;
    left: 50%;
    width: 25%;
    height: 45%;
    background-color: ${({ theme }) => theme.secondary};
    transform: translate(-50%, -50%);
    opacity: ${({ isModalOpen }) => (isModalOpen ? 1 : 0)};
    border: ${({ theme }) => `1px solid ${theme.secondary}`};
  }
`;

const StyledIconButton = styled(IconButton)`
  position: absolute;
  background-color: #fff;
  top: calc(15vh + 10px);
  right: 10px;

  @media (min-width: 1100px) {
    right: 5px;
    top: 5px;
  }
`;

export default Modal;