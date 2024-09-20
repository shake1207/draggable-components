import { useState, useCallback, useRef } from 'react';
import { ElementTypes } from '../constants/elementTypes';
import { createNewElement } from '../utils';

export function useElementEditor() {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [draggingElement, setDraggingElement] = useState(null);
  const editorRef = useRef(null);

  const handleDelete = useCallback(id => {
    setElements(prevElements => prevElements.filter(el => el.id !== id));
    setSelectedElement(null);
  }, []);

  const handleDragStart = useCallback(
    (e, type, id) => {
      e.stopPropagation();
      if (Object.values(ElementTypes).includes(type)) {
        e.dataTransfer.setData('text/plain', type);
      } else {
        const element = elements.find(el => el.id === id);
        setDraggingElement(element);
        e.dataTransfer.setData('text/plain', 'existing');

        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        e.dataTransfer.setData('application/json', JSON.stringify({ offsetX, offsetY }));

        const dragImage = document.createElement('div');
        Object.assign(dragImage.style, {
          width: '100px',
          height: '100px',
          backgroundColor: 'lightgray',
          border: '2px dashed gray',
          borderRadius: '8px',
        });
        document.body.appendChild(dragImage);
        e.dataTransfer.setDragImage(dragImage, 50, 50);
        setTimeout(() => document.body.removeChild(dragImage), 0);
      }
    },
    [elements]
  );

  const handleDrop = useCallback(
    e => {
      e.preventDefault();
      const type = e.dataTransfer.getData('text');
      const editorRect = editorRef.current.getBoundingClientRect();
      let x = e.clientX - editorRect.left;
      let y = e.clientY - editorRect.top;

      x = Math.max(0, Math.min(x, editorRect.width));
      y = Math.max(0, Math.min(y, editorRect.height));

      if (Object.values(ElementTypes).includes(type)) {
        const newElement = createNewElement(type, x, y);
        setElements(prev => [...prev, newElement]);
      } else if (type === 'existing' && draggingElement) {
        const { offsetX, offsetY } = JSON.parse(e.dataTransfer.getData('application/json'));
        moveElement(x - offsetX, y - offsetY);
      }
      setDraggingElement(null);
    },
    [draggingElement]
  );

  const moveElement = useCallback(
    (x, y) => {
      const editorRect = editorRef.current.getBoundingClientRect();

      const updateElementPosition = element => {
        const elementWidth = element.width || 0;
        const elementHeight = element.height || 0;
        const newX = Math.max(0, Math.min(x, editorRect.width - elementWidth));
        const newY = Math.max(0, Math.min(y, editorRect.height - elementHeight));
        return { ...element, x: newX, y: newY };
      };

      if (selectedElement) {
        setSelectedElement(prev => updateElementPosition(prev));
      }

      setElements(prevElements => prevElements.map(el => (el.id === draggingElement.id ? updateElementPosition(el) : el)));
    },
    [selectedElement, draggingElement]
  );

  const handleElementClick = useCallback(element => {
    setSelectedElement(element);
  }, []);

  const handleInputChange = useCallback((value, property) => {
    setSelectedElement(prev => ({ ...prev, [property]: value }));
  }, []);

  const handleCarouselImageChange = useCallback((index, value) => {
    setSelectedElement(prev => {
      const newImages = [...prev.images];
      newImages[index] = value;
      return { ...prev, images: newImages };
    });
  }, []);

  const handleInputBlur = useCallback(() => {
    if (selectedElement) {
      setElements(prevElements => prevElements.map(el => (el.id === selectedElement.id ? { ...el, ...selectedElement } : el)));
    }
  }, [selectedElement]);

  return {
    elements,
    selectedElement,
    editorRef,
    handleDragStart,
    handleDrop,
    handleElementClick,
    handleInputChange,
    handleCarouselImageChange,
    handleInputBlur,
    handleDelete,
  };
}
