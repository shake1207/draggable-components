import React from 'react';
import ReactQuill from 'react-quill';
import { ElementTypes } from '../constants/elementTypes';

const Sidebar = ({ selectedElement, onDragStart, onInputChange, onCarouselImageChange, onInputBlur }) => {
  return (
    <div className="w-1/4 bg-gray-100 p-4 border-r-2 border-gray-300">
      <div draggable onDragStart={e => onDragStart(e, ElementTypes.IMAGE)} className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-2 cursor-move">
        圖片元件
      </div>
      <div draggable onDragStart={e => onDragStart(e, ElementTypes.TEXT)} className="bg-green-500 text-white px-4 py-2 rounded w-full mb-2 cursor-move">
        文字元件
      </div>
      <div draggable onDragStart={e => onDragStart(e, ElementTypes.CAROUSEL)} className="bg-purple-500 text-white px-4 py-2 rounded w-full mb-2 cursor-move">
        輪播元件
      </div>
      {selectedElement && (
        <div className="mt-4">
          <h3 className="font-bold mb-2">編輯元素</h3>
          {selectedElement.type === ElementTypes.TEXT && <ReactQuill value={selectedElement.content} onChange={value => onInputChange(value, 'content')} onBlur={onInputBlur} className="mb-2" />}
          {selectedElement.type === ElementTypes.IMAGE && (
            <input
              type="text"
              value={selectedElement.content}
              onChange={e => onInputChange(e.target.value, 'content')}
              onBlur={onInputBlur}
              className="w-full p-2 mb-2 border rounded"
              placeholder="圖片網址"
            />
          )}
          {(selectedElement.type === ElementTypes.IMAGE || selectedElement.type === ElementTypes.CAROUSEL) && (
            <>
              <input
                type="number"
                value={selectedElement.width}
                onChange={e => onInputChange(parseInt(e.target.value), 'width')}
                onBlur={onInputBlur}
                className="w-full p-2 mb-2 border rounded"
                placeholder="寬度"
              />
              <input
                type="number"
                value={selectedElement.height}
                onChange={e => onInputChange(parseInt(e.target.value), 'height')}
                onBlur={onInputBlur}
                className="w-full p-2 mb-2 border rounded"
                placeholder="高度"
              />
            </>
          )}
          {selectedElement.type === ElementTypes.CAROUSEL && (
            <div>
              {selectedElement.images.map((img, index) => (
                <input
                  key={index}
                  type="text"
                  value={img}
                  onChange={e => onCarouselImageChange(index, e.target.value)}
                  onBlur={onInputBlur}
                  className="w-full p-2 mb-2 border rounded"
                  placeholder={`圖片 ${index + 1} 網址`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
