import React from 'react';
import { Trash2 } from 'lucide-react';
import { ElementTypes } from '../constants/elementTypes';
import Carousel from './Carousel';
import { useDraggableElement } from '../hooks/useDraggableElement';

const DraggableElement = ({ element, onDragStart, onClick, onDelete }) => {
  const { handleDragStart, handleClick, handleDelete } = useDraggableElement(element, onDragStart, onClick, onDelete);

  const getElementContent = () => {
    switch (element.type) {
      case ElementTypes.IMAGE:
        return <img src={element.content} alt="Element" className="w-full h-full object-cover" />;
      case ElementTypes.TEXT:
        return <div className="p-2" dangerouslySetInnerHTML={{ __html: element.content }} />;
      case ElementTypes.CAROUSEL:
        return <Carousel element={element} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="absolute border border-gray-300 cursor-move element-wrapper"
      style={{
        left: element.x,
        top: element.y,
        width: element.type !== ElementTypes.TEXT ? `${element.width}px` : 'auto',
        height: element.type !== ElementTypes.TEXT ? `${element.height}px` : 'auto',
      }}
      onClick={handleClick}
      draggable
      onDragStart={handleDragStart}
    >
      <div className="delete-button">
        <Trash2 size={20} onClick={handleDelete} />
      </div>
      {getElementContent()}
    </div>
  );
};

export default DraggableElement;
