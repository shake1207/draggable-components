import { ElementTypes } from '../constants/elementTypes';

const defaultImageUrl = 'https://fakeimg.pl/300';

export const createNewElement = (type, x, y) => {
  const baseElement = {
    id: Date.now(),
    x,
    y,
  };

  switch (type) {
    case ElementTypes.IMAGE:
      return {
        ...baseElement,
        type: ElementTypes.IMAGE,
        content: defaultImageUrl,
        width: 300,
        height: 300,
      };
    case ElementTypes.TEXT:
      return {
        ...baseElement,
        type: ElementTypes.TEXT,
        content: 'Hello from Meepshop!',
        width: 100,
        height: 50,
      };
    case ElementTypes.CAROUSEL:
      return {
        ...baseElement,
        type: ElementTypes.CAROUSEL,
        images: [defaultImageUrl, defaultImageUrl, defaultImageUrl],
        width: 500,
        height: 500,
        currentIndex: 0,
      };
    default:
      throw new Error(`Unsupported element type: ${type}`);
  }
};
