import { useState, useRef, useEffect } from 'react';
import { useBoard } from '../../context/BoardContext';
import {
  ToolbarContainer,
  SearchInput,
  Select,
  FilterButton,
  FilterDropdown,
  FilterTitle,
  FilterOption,
  LabelBadge
} from './Toolbar.styles';

const LABEL_OPTIONS = [
  { name: 'bug', color: '#eb5a46' },
  { name: 'feature', color: '#61bd4f' },
  { name: 'improvement', color: '#f2d600' },
  { name: 'task', color: '#00c2e0' },
  { name: 'urgent', color: '#ff6900' }
];

function Toolbar() {
  const { state, dispatch } = useBoard();
  const [showLabelFilter, setShowLabelFilter] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowLabelFilter(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { search: e.target.value }
    });
  };

  const handleSortChange = (e) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { sortBy: e.target.value }
    });
  };

  const handleLabelToggle = (label) => {
    const currentLabels = state.filters.labels || [];
    const newLabels = currentLabels.includes(label)
      ? currentLabels.filter(l => l !== label)
      : [...currentLabels, label];

    dispatch({
      type: 'SET_FILTERS',
      payload: { labels: newLabels }
    });
  };

  return (
    <ToolbarContainer>
      <SearchInput
        type="text"
        placeholder="Search cards..."
        value={state.filters.search}
        onChange={handleSearchChange}
      />

      <Select value={state.filters.sortBy} onChange={handleSortChange}>
        <option value="none">No Sorting</option>
        <option value="title">Sort by Title</option>
        <option value="dueDate">Sort by Due Date</option>
      </Select>

      <div ref={filterRef} style={{ position: 'relative' }}>
        <FilterButton
          active={state.filters.labels?.length > 0}
          onClick={() => setShowLabelFilter(!showLabelFilter)}
        >
          Labels {state.filters.labels?.length > 0 && `(${state.filters.labels.length})`}
        </FilterButton>

        {showLabelFilter && (
          <FilterDropdown>
            <FilterTitle>Filter by Label</FilterTitle>
            {LABEL_OPTIONS.map((label) => (
              <FilterOption key={label.name}>
                <input
                  type="checkbox"
                  checked={state.filters.labels?.includes(label.name)}
                  onChange={() => handleLabelToggle(label.name)}
                />
                <span>{label.name}</span>
                <LabelBadge color={label.color}>{label.name}</LabelBadge>
              </FilterOption>
            ))}
          </FilterDropdown>
        )}
      </div>
    </ToolbarContainer>
  );
}

export default Toolbar;
