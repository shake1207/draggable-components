export const useDraggableElement = (element, onDragStart, onClick, onDelete) => {
  const handleDragStart = e => {
    onDragStart(e, 'existing', element.id);
  };

  const handleClick = () => {
    onClick(element);
  };

  const handleDelete = e => {
    e.stopPropagation();
    onDelete(element.id);
  };

  return {
    handleDragStart,
    handleClick,
    handleDelete,
  };
};
