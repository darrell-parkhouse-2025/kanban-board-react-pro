import { useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useBoard } from '../../context/BoardContext';
import List from '../List/List';
import Toolbar from '../Toolbar/Toolbar';
import CardModal from '../Modal/CardModal';
import {
  BoardContainer,
  BoardHeader,
  BoardTitle,
  BoardTitleInput,
  BoardActions,
  BoardButton,
  ListsContainer,
  AddListContainer,
  AddListButton,
  AddListForm,
  ListInput,
  FormActions,
  SubmitButton,
  CancelButton
} from './Board.styles';

function Board() {
  const { state, dispatch } = useBoard();
  const [isAddingList, setIsAddingList] = useState(false);
  const [listTitle, setListTitle] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [boardTitle, setBoardTitle] = useState('');
  const [editingCard, setEditingCard] = useState(null);

  const currentBoard = state.boards.find(board => board.id === state.currentBoardId);

  if (!currentBoard) return null;

  const handleAddList = () => {
    if (listTitle.trim()) {
      dispatch({
        type: 'ADD_LIST',
        payload: {
          boardId: currentBoard.id,
          title: listTitle.trim()
        }
      });
      setListTitle('');
      setIsAddingList(false);
    }
  };

  const handleUpdateBoardTitle = () => {
    if (boardTitle.trim()) {
      dispatch({
        type: 'UPDATE_BOARD',
        payload: {
          id: currentBoard.id,
          updates: { title: boardTitle.trim() }
        }
      });
    }
    setIsEditingTitle(false);
  };

  const handleDragEnd = (result) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'list') {
      dispatch({
        type: 'REORDER_LISTS',
        payload: {
          boardId: currentBoard.id,
          sourceIndex: source.index,
          destinationIndex: destination.index
        }
      });
      return;
    }

    dispatch({
      type: 'REORDER_CARDS',
      payload: {
        boardId: currentBoard.id,
        sourceListId: source.droppableId,
        destinationListId: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index
      }
    });
  };

  const handleEditCard = (card) => {
    setEditingCard(card);
  };

  const handleCloseModal = () => {
    setEditingCard(null);
  };

  const filteredLists = currentBoard.lists.map(list => {
    const filteredCards = list.cards.filter(card => {
      if (card.archived) return false;

      const searchTerm = state.filters.search.toLowerCase();
      if (searchTerm && !card.title.toLowerCase().includes(searchTerm)) {
        return false;
      }

      if (state.filters.labels.length > 0) {
        const hasMatchingLabel = card.labels?.some(label =>
          state.filters.labels.includes(label)
        );
        if (!hasMatchingLabel) return false;
      }

      return true;
    });

    let sortedCards = [...filteredCards];
    if (state.filters.sortBy === 'dueDate') {
      sortedCards.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    } else if (state.filters.sortBy === 'title') {
      sortedCards.sort((a, b) => a.title.localeCompare(b.title));
    }

    return { ...list, cards: sortedCards };
  });

  return (
    <BoardContainer>
      <BoardHeader>
        {isEditingTitle ? (
          <BoardTitleInput
            value={boardTitle}
            onChange={(e) => setBoardTitle(e.target.value)}
            onBlur={handleUpdateBoardTitle}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleUpdateBoardTitle();
              if (e.key === 'Escape') {
                setBoardTitle(currentBoard.title);
                setIsEditingTitle(false);
              }
            }}
            autoFocus
          />
        ) : (
          <BoardTitle
            onClick={() => {
              setBoardTitle(currentBoard.title);
              setIsEditingTitle(true);
            }}
          >
            {currentBoard.title}
          </BoardTitle>
        )}

        <BoardActions>
          <Toolbar />
        </BoardActions>
      </BoardHeader>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" type="list" direction="horizontal">
          {(provided) => (
            <ListsContainer ref={provided.innerRef} {...provided.droppableProps}>
              {filteredLists.map((list, index) => (
                <List
                  key={list.id}
                  list={list}
                  index={index}
                  boardId={currentBoard.id}
                  onEditCard={handleEditCard}
                />
              ))}
              {provided.placeholder}

              <AddListContainer>
                {isAddingList ? (
                  <AddListForm>
                    <ListInput
                      value={listTitle}
                      onChange={(e) => setListTitle(e.target.value)}
                      placeholder="Enter list title..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddList();
                        if (e.key === 'Escape') {
                          setListTitle('');
                          setIsAddingList(false);
                        }
                      }}
                      autoFocus
                    />
                    <FormActions>
                      <SubmitButton onClick={handleAddList}>Add List</SubmitButton>
                      <CancelButton onClick={() => {
                        setListTitle('');
                        setIsAddingList(false);
                      }}>
                        Cancel
                      </CancelButton>
                    </FormActions>
                  </AddListForm>
                ) : (
                  <AddListButton onClick={() => setIsAddingList(true)}>
                    + Add another list
                  </AddListButton>
                )}
              </AddListContainer>
            </ListsContainer>
          )}
        </Droppable>
      </DragDropContext>

      {editingCard && (
        <CardModal
          card={editingCard}
          boardId={currentBoard.id}
          onClose={handleCloseModal}
        />
      )}
    </BoardContainer>
  );
}

export default Board;
