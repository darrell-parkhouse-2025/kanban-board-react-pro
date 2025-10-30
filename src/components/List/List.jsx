import { useState } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { useBoard } from '../../context/BoardContext';
import Card from '../Card/Card';
import {
  ListContainer,
  ListHeader,
  ListTitle,
  ListTitleInput,
  ListActions,
  ActionButton,
  CardsContainer,
  AddCardButton,
  AddCardForm,
  CardInput,
  FormActions,
  SubmitButton,
  CancelButton,
  CardCount
} from './List.styles';

function List({ list, index, boardId, onEditCard }) {
  const { dispatch } = useBoard();
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cardTitle, setCardTitle] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [listTitle, setListTitle] = useState(list.title);

  const handleAddCard = () => {
    if (cardTitle.trim()) {
      dispatch({
        type: 'ADD_CARD',
        payload: {
          boardId,
          listId: list.id,
          title: cardTitle.trim()
        }
      });
      setCardTitle('');
      setIsAddingCard(false);
    }
  };

  const handleDeleteList = () => {
    if (window.confirm('Are you sure you want to delete this list?')) {
      dispatch({
        type: 'DELETE_LIST',
        payload: { boardId, listId: list.id }
      });
    }
  };

  const handleUpdateTitle = () => {
    if (listTitle.trim()) {
      dispatch({
        type: 'UPDATE_LIST',
        payload: {
          boardId,
          listId: list.id,
          updates: { title: listTitle.trim() }
        }
      });
    }
    setIsEditingTitle(false);
  };

  const activeCards = list.cards.filter(card => !card.archived);

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <ListContainer ref={provided.innerRef} {...provided.draggableProps}>
          <ListHeader {...provided.dragHandleProps}>
            {isEditingTitle ? (
              <ListTitleInput
                value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}
                onBlur={handleUpdateTitle}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleUpdateTitle();
                  if (e.key === 'Escape') {
                    setListTitle(list.title);
                    setIsEditingTitle(false);
                  }
                }}
                autoFocus
              />
            ) : (
              <>
                <ListTitle onClick={() => setIsEditingTitle(true)}>
                  {list.title}
                  <CardCount>{activeCards.length}</CardCount>
                </ListTitle>
                <ListActions>
                  <ActionButton onClick={handleDeleteList} title="Delete list">
                    ×
                  </ActionButton>
                </ListActions>
              </>
            )}
          </ListHeader>

          <Droppable droppableId={list.id} type="card">
            {(provided, snapshot) => (
              <CardsContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  backgroundColor: snapshot.isDraggingOver ? '#2a2a2a' : 'transparent'
                }}
              >
                {activeCards.map((card, index) => (
                  <Card
                    key={card.id}
                    card={card}
                    index={index}
                    listId={list.id}
                    boardId={boardId}
                    onEdit={onEditCard}
                  />
                ))}
                {provided.placeholder}
              </CardsContainer>
            )}
          </Droppable>

          {isAddingCard ? (
            <AddCardForm>
              <CardInput
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
                placeholder="Enter card title..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleAddCard();
                  }
                  if (e.key === 'Escape') {
                    setCardTitle('');
                    setIsAddingCard(false);
                  }
                }}
                autoFocus
              />
              <FormActions>
                <SubmitButton onClick={handleAddCard}>Add Card</SubmitButton>
                <CancelButton onClick={() => {
                  setCardTitle('');
                  setIsAddingCard(false);
                }}>
                  Cancel
                </CancelButton>
              </FormActions>
            </AddCardForm>
          ) : (
            <AddCardButton onClick={() => setIsAddingCard(true)}>
              + Add a card
            </AddCardButton>
          )}
        </ListContainer>
      )}
    </Draggable>
  );
}

export default List;
