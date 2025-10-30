import { useState, useEffect } from 'react';
import { useBoard } from '../../context/BoardContext';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  FormGroup,
  Label,
  Input,
  Textarea,
  LabelsContainer,
  LabelCheckbox,
  AttachmentsContainer,
  AttachmentItem,
  AttachmentName,
  RemoveButton,
  AddAttachmentButton,
  ModalFooter,
  Button
} from './CardModal.styles';

const LABEL_OPTIONS = [
  { name: 'bug', color: '#eb5a46' },
  { name: 'feature', color: '#61bd4f' },
  { name: 'improvement', color: '#f2d600' },
  { name: 'task', color: '#00c2e0' },
  { name: 'urgent', color: '#ff6900' }
];

function CardModal({ card, boardId, onClose }) {
  const { state, dispatch } = useBoard();
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || '');
  const [selectedLabels, setSelectedLabels] = useState(card.labels || []);
  const [dueDate, setDueDate] = useState(card.dueDate || '');
  const [attachments, setAttachments] = useState(card.attachments || []);
  const [newAttachment, setNewAttachment] = useState('');

  const findListId = () => {
    const board = state.boards.find(b => b.id === boardId);
    if (!board) return null;

    for (const list of board.lists) {
      if (list.cards.some(c => c.id === card.id)) {
        return list.id;
      }
    }
    return null;
  };

  const listId = findListId();

  const handleLabelToggle = (labelName) => {
    setSelectedLabels(prev =>
      prev.includes(labelName)
        ? prev.filter(l => l !== labelName)
        : [...prev, labelName]
    );
  };

  const handleAddAttachment = () => {
    if (newAttachment.trim()) {
      setAttachments([...attachments, { name: newAttachment.trim(), url: '#' }]);
      setNewAttachment('');
    }
  };

  const handleRemoveAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!listId) return;

    dispatch({
      type: 'UPDATE_CARD',
      payload: {
        boardId,
        listId,
        cardId: card.id,
        updates: {
          title,
          description,
          labels: selectedLabels,
          dueDate,
          attachments
        }
      }
    });
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Edit Card</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter card title..."
            />
          </FormGroup>

          <FormGroup>
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter card description..."
            />
          </FormGroup>

          <FormGroup>
            <Label>Labels</Label>
            <LabelsContainer>
              {LABEL_OPTIONS.map((label) => (
                <LabelCheckbox
                  key={label.name}
                  checked={selectedLabels.includes(label.name)}
                  color={label.color}
                >
                  <input
                    type="checkbox"
                    checked={selectedLabels.includes(label.name)}
                    onChange={() => handleLabelToggle(label.name)}
                  />
                  {label.name}
                </LabelCheckbox>
              ))}
            </LabelsContainer>
          </FormGroup>

          <FormGroup>
            <Label>Due Date</Label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Attachments</Label>
            <AttachmentsContainer>
              {attachments.map((attachment, index) => (
                <AttachmentItem key={index}>
                  <AttachmentName>{attachment.name}</AttachmentName>
                  <RemoveButton onClick={() => handleRemoveAttachment(index)}>
                    Remove
                  </RemoveButton>
                </AttachmentItem>
              ))}
              <div style={{ display: 'flex', gap: '8px' }}>
                <Input
                  type="text"
                  value={newAttachment}
                  onChange={(e) => setNewAttachment(e.target.value)}
                  placeholder="Enter attachment name..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddAttachment();
                    }
                  }}
                />
                <AddAttachmentButton onClick={handleAddAttachment}>
                  Add
                </AddAttachmentButton>
              </div>
            </AttachmentsContainer>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button secondary onClick={onClose}>Cancel</Button>
          <Button primary onClick={handleSave}>Save Changes</Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
}

export default CardModal;
