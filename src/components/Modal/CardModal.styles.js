import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

export const ModalContent = styled.div`
  background: #1e1e1e;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #2a2a2a;
  }

  &::-webkit-scrollbar-thumb {
    background: #3a3a3a;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #4a4a4a;
  }
`;

export const ModalHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #3a3a3a;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #e4e6eb;
  flex: 1;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: #b0b3b8;
  font-size: 24px;
  line-height: 1;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2a2a2a;
    color: #e4e6eb;
  }
`;

export const ModalBody = styled.div`
  padding: 24px;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #e4e6eb;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #3a3a3a;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
  background: #2a2a2a;
  color: #e4e6eb;

  &:focus {
    border-color: #0079bf;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #3a3a3a;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  outline: none;
  resize: vertical;
  min-height: 100px;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
  background: #2a2a2a;
  color: #e4e6eb;

  &:focus {
    border-color: #0079bf;
  }
`;

export const LabelsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const LabelCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => props.checked ? props.color : '#2a2a2a'};
  color: ${props => props.checked ? 'white' : '#e4e6eb'};
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s ease;

  input {
    display: none;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const AttachmentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const AttachmentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: #2a2a2a;
  border-radius: 4px;
  font-size: 14px;
  color: #e4e6eb;
`;

export const AttachmentName = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #eb5a46;
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 3px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(235, 90, 70, 0.1);
  }
`;

export const AddAttachmentButton = styled.button`
  background: #2a2a2a;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  color: #e4e6eb;
  font-size: 14px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #3a3a3a;
  }
`;

export const ModalFooter = styled.div`
  padding: 20px 24px;
  border-top: 1px solid #3a3a3a;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${props => props.primary && `
    background-color: #0079bf;
    color: white;

    &:hover {
      background-color: #026aa7;
    }
  `}

  ${props => props.secondary && `
    background-color: #2a2a2a;
    color: #e4e6eb;

    &:hover {
      background-color: #3a3a3a;
    }
  `}
`;
