import { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const BoardContext = createContext();

const initialState = {
  boards: [
    {
      id: 'board-1',
      title: 'My Kanban Board',
      lists: [
        {
          id: 'list-1',
          title: 'To Do',
          cards: []
        },
        {
          id: 'list-2',
          title: 'In Progress',
          cards: []
        },
        {
          id: 'list-3',
          title: 'Done',
          cards: []
        }
      ]
    }
  ],
  currentBoardId: 'board-1',
  filters: {
    search: '',
    labels: [],
    sortBy: 'none'
  }
};

function boardReducer(state, action) {
  switch (action.type) {
    case 'LOAD_STATE':
      return action.payload;

    case 'SET_CURRENT_BOARD':
      return { ...state, currentBoardId: action.payload };

    case 'ADD_BOARD':
      return {
        ...state,
        boards: [...state.boards, {
          id: uuidv4(),
          title: action.payload.title,
          lists: []
        }]
      };

    case 'UPDATE_BOARD':
      return {
        ...state,
        boards: state.boards.map(board =>
          board.id === action.payload.id
            ? { ...board, ...action.payload.updates }
            : board
        )
      };

    case 'DELETE_BOARD':
      return {
        ...state,
        boards: state.boards.filter(board => board.id !== action.payload)
      };

    case 'ADD_LIST':
      return {
        ...state,
        boards: state.boards.map(board =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: [...board.lists, {
                  id: uuidv4(),
                  title: action.payload.title,
                  cards: []
                }]
              }
            : board
        )
      };

    case 'UPDATE_LIST':
      return {
        ...state,
        boards: state.boards.map(board =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.map(list =>
                  list.id === action.payload.listId
                    ? { ...list, ...action.payload.updates }
                    : list
                )
              }
            : board
        )
      };

    case 'DELETE_LIST':
      return {
        ...state,
        boards: state.boards.map(board =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.filter(list => list.id !== action.payload.listId)
              }
            : board
        )
      };

    case 'ADD_CARD':
      return {
        ...state,
        boards: state.boards.map(board =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.map(list =>
                  list.id === action.payload.listId
                    ? {
                        ...list,
                        cards: [...list.cards, {
                          id: uuidv4(),
                          title: action.payload.title,
                          description: action.payload.description || '',
                          labels: action.payload.labels || [],
                          dueDate: action.payload.dueDate || null,
                          attachments: action.payload.attachments || [],
                          archived: false,
                          createdAt: new Date().toISOString()
                        }]
                      }
                    : list
                )
              }
            : board
        )
      };

    case 'UPDATE_CARD':
      return {
        ...state,
        boards: state.boards.map(board =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.map(list =>
                  list.id === action.payload.listId
                    ? {
                        ...list,
                        cards: list.cards.map(card =>
                          card.id === action.payload.cardId
                            ? { ...card, ...action.payload.updates }
                            : card
                        )
                      }
                    : list
                )
              }
            : board
        )
      };

    case 'DELETE_CARD':
      return {
        ...state,
        boards: state.boards.map(board =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.map(list =>
                  list.id === action.payload.listId
                    ? {
                        ...list,
                        cards: list.cards.filter(card => card.id !== action.payload.cardId)
                      }
                    : list
                )
              }
            : board
        )
      };

    case 'ARCHIVE_CARD':
      return {
        ...state,
        boards: state.boards.map(board =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.map(list =>
                  list.id === action.payload.listId
                    ? {
                        ...list,
                        cards: list.cards.map(card =>
                          card.id === action.payload.cardId
                            ? { ...card, archived: true }
                            : card
                        )
                      }
                    : list
                )
              }
            : board
        )
      };

    case 'REORDER_CARDS':
      return {
        ...state,
        boards: state.boards.map(board =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.map(list => {
                  if (list.id === action.payload.sourceListId) {
                    const newCards = Array.from(list.cards);
                    const [removed] = newCards.splice(action.payload.sourceIndex, 1);

                    if (action.payload.sourceListId === action.payload.destinationListId) {
                      newCards.splice(action.payload.destinationIndex, 0, removed);
                      return { ...list, cards: newCards };
                    }

                    return { ...list, cards: newCards };
                  }

                  if (list.id === action.payload.destinationListId) {
                    const newCards = Array.from(list.cards);
                    const sourceList = board.lists.find(l => l.id === action.payload.sourceListId);
                    const movedCard = sourceList.cards[action.payload.sourceIndex];
                    newCards.splice(action.payload.destinationIndex, 0, movedCard);
                    return { ...list, cards: newCards };
                  }

                  return list;
                })
              }
            : board
        )
      };

    case 'REORDER_LISTS':
      return {
        ...state,
        boards: state.boards.map(board =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: (() => {
                  const newLists = Array.from(board.lists);
                  const [removed] = newLists.splice(action.payload.sourceIndex, 1);
                  newLists.splice(action.payload.destinationIndex, 0, removed);
                  return newLists;
                })()
              }
            : board
        )
      };

    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };

    default:
      return state;
  }
}

export function BoardProvider({ children }) {
  const [state, dispatch] = useReducer(boardReducer, initialState, (initial) => {
    const saved = localStorage.getItem('kanban-board-data');
    return saved ? JSON.parse(saved) : initial;
  });

  useEffect(() => {
    localStorage.setItem('kanban-board-data', JSON.stringify(state));
  }, [state]);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
}
