import styled from 'styled-components';

export const CardContainer = styled.div`
  background: #2a2a2a;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  }
`;

export const CardTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: #e4e6eb;
`;

export const CardDescription = styled.p`
  margin: 0 0 8px 0;
  font-size: 12px;
  color: #b0b3b8;
  line-height: 1.4;
`;

export const CardLabels = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 8px;
`;

export const Label = styled.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background-color: ${props => props.color || '#dfe1e6'};
  color: white;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

export const DueDate = styled.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 3px;
  background-color: ${props => props.overdue ? '#eb5a46' : '#3a3a3a'};
  color: ${props => props.overdue ? 'white' : '#e4e6eb'};
`;

export const CardActions = styled.div`
  display: flex;
  gap: 4px;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 3px;
  font-size: 11px;
  color: #b0b3b8;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #3a3a3a;
    color: #e4e6eb;
  }
`;

export const AttachmentCount = styled.span`
  font-size: 11px;
  color: #b0b3b8;
  display: flex;
  align-items: center;
  gap: 4px;
`;
