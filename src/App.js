import React from 'react';
import './App.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'react-quill/dist/quill.snow.css';
import { useElementEditor } from './hooks/useElementEditor';
import DraggableElement from './components/DraggableElement';
import Sidebar from './components/Sidebar';

function App() {
  const { elements, selectedElement, editorRef, handleDragStart, handleDrop, handleElementClick, handleInputChange, handleCarouselImageChange, handleInputBlur, handleDelete } = useElementEditor();

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-gray-200 p-2 text-center border-b-2 border-gray-300">This is a fixed header, no need to modify</div>
      <div className="flex flex-1">
        <Sidebar selectedElement={selectedElement} onDragStart={handleDragStart} onInputChange={handleInputChange} onCarouselImageChange={handleCarouselImageChange} onInputBlur={handleInputBlur} />
        <div ref={editorRef} className="w-3/4 p-4 relative" onDragOver={e => e.preventDefault()} onDrop={handleDrop}>
          {elements.map(element => (
            <DraggableElement key={element.id} element={element} onDragStart={handleDragStart} onClick={handleElementClick} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
