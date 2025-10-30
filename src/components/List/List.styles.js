import styled from 'styled-components';

export const ListContainer = styled.div`
  background-color: #1e1e1e;
  border-radius: 8px;
  width: 280px;
  min-width: 280px;
  max-height: calc(100vh - 180px);
  display: flex;
  flex-direction: column;
  margin-right: 12px;
`;

export const ListHeader = styled.div`
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ListTitle = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #e4e6eb;
  flex: 1;
`;

export const ListTitleInput = styled.input`
  font-size: 14px;
  font-weight: 600;
  padding: 4px 8px;
  border: 2px solid #0079bf;
  border-radius: 3px;
  outline: none;
  width: 100%;
  background: #2a2a2a;
  color: #e4e6eb;
`;

export const ListActions = styled.div`
  display: flex;
  gap: 4px;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 3px;
  color: #b0b3b8;
  font-size: 18px;
  line-height: 1;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2a2a2a;
    color: #e4e6eb;
  }
`;

export const CardsContainer = styled.div`
  padding: 0 8px;
  flex: 1;
  overflow-y: auto;
  min-height: 50px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #3a3a3a;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #4a4a4a;
  }
`;

export const AddCardButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  text-align: left;
  color: #b0b3b8;
  font-size: 14px;
  border-radius: 8px;
  margin: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2a2a2a;
    color: #e4e6eb;
  }
`;

export const AddCardForm = styled.div`
  padding: 8px;
`;

export const CardInput = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 2px solid #0079bf;
  border-radius: 3px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  min-height: 60px;
  outline: none;
  box-sizing: border-box;
  background: #2a2a2a;
  color: #e4e6eb;
`;

export const FormActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

export const SubmitButton = styled.button`
  background-color: #0079bf;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #026aa7;
  }
`;

export const CancelButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 16px;
  color: #b0b3b8;
  font-size: 14px;
  border-radius: 3px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2a2a2a;
    color: #e4e6eb;
  }
`;

export const CardCount = styled.span`
  font-size: 12px;
  color: #b0b3b8;
  margin-left: 8px;
`;
