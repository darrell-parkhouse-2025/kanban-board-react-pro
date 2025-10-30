import styled from 'styled-components';

export const BoardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 20px;
`;

export const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 16px 24px;
  border-radius: 8px;
`;

export const BoardTitle = styled.h1`
  margin: 0;
  color: white;
  font-size: 24px;
  font-weight: 700;
`;

export const BoardTitleInput = styled.input`
  font-size: 24px;
  font-weight: 700;
  padding: 8px 12px;
  border: 2px solid white;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.9);
  outline: none;
`;

export const BoardActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const BoardButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

export const ListsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding-bottom: 20px;
  height: calc(100vh - 120px);

  &::-webkit-scrollbar {
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

export const AddListContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  width: 280px;
  min-width: 280px;
  padding: 12px;
  height: fit-content;
`;

export const AddListButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  text-align: left;
  color: white;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const AddListForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ListInput = styled.input`
  padding: 8px;
  border: 2px solid white;
  border-radius: 3px;
  font-size: 14px;
  outline: none;
  background: white;
`;

export const FormActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const SubmitButton = styled.button`
  background-color: white;
  color: #667eea;
  border: none;
  padding: 8px 16px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const CancelButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 16px;
  color: white;
  font-size: 14px;
  border-radius: 3px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;
