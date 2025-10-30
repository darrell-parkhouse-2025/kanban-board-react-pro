import { Draggable } from '@hello-pangea/dnd';
import { useBoard } from '../../context/BoardContext';
import {
  CardContainer,
  CardTitle,
  CardDescription,
  CardLabels,
  Label,
  CardFooter,
  DueDate,
  CardActions,
  ActionButton,
  AttachmentCount
} from './Card.styles';

const LABEL_COLORS = {
  bug: '#eb5a46',
  feature: '#61bd4f',
  improvement: '#f2d600',
  task: '#00c2e0',
  urgent: '#ff6900'
};

function Card({ card, index, listId, boardId, onEdit }) {
  const { dispatch } = useBoard();

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch({
      type: 'DELETE_CARD',
      payload: { boardId, listId, cardId: card.id }
    });
  };

  const handleArchive = (e) => {
    e.stopPropagation();
    dispatch({
      type: 'ARCHIVE_CARD',
      payload: { boardId, listId, cardId: card.id }
    });
  };

  const isOverdue = () => {
    if (!card.dueDate) return false;
    return new Date(card.dueDate) < new Date();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (card.archived) return null;

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <CardContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onEdit(card)}
        >
          {card.labels && card.labels.length > 0 && (
            <CardLabels>
              {card.labels.map((label, idx) => (
                <Label key={idx} color={LABEL_COLORS[label] || '#dfe1e6'}>
                  {label}
                </Label>
              ))}
            </CardLabels>
          )}

          <CardTitle>{card.title}</CardTitle>

          {card.description && (
            <CardDescription>{card.description}</CardDescription>
          )}

          <CardFooter>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {card.dueDate && (
                <DueDate overdue={isOverdue()}>
                  {formatDate(card.dueDate)}
                </DueDate>
              )}

              {card.attachments && card.attachments.length > 0 && (
                <AttachmentCount>
                  📎 {card.attachments.length}
                </AttachmentCount>
              )}
            </div>

            <CardActions>
              <ActionButton onClick={handleArchive}>Archive</ActionButton>
              <ActionButton onClick={handleDelete}>Delete</ActionButton>
            </CardActions>
          </CardFooter>
        </CardContainer>
      )}
    </Draggable>
  );
}

export default Card;
