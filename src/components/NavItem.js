import React, { useState, useRef, useEffect } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useNavigation } from '../context/NavigationContext'

const ItemTypes = {
  NAV_ITEM: 'nav-item'
};

const NavItem = ({ item, index, level }) => {
  const { isEditMode, toggleItemVisibility, updateItemTitle, moveItem } = useNavigation();
  const [isExpanded, setIsExpanded] = useState(isEditMode);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(item.title);
  const ref = useRef(null);

  // Drag functionality
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.NAV_ITEM,
    item: () => ({ id: item.id, index }),
    canDrag: () => isEditMode,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  useEffect(() => {
    if (isEditMode) {
      setIsExpanded(true);
    }
  }, [isEditMode]);
  // Drop functionality
  const [, drop] = useDrop({
    accept: ItemTypes.NAV_ITEM,
    hover: (draggedItem, monitor) => {
      if (!ref.current) return;
      const dragIndex = draggedItem.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) return;

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : 0;

      // Only perform the move when the mouse has crossed half of the item's height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      // Time to actually perform the action
      moveItem(draggedItem.id, dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      draggedItem.index = hoverIndex;
    },
  });

  // Connect drag and drop refs
  drag(drop(ref));

  // Toggle expand/collapse for items with children
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Toggle visibility in edit mode
  const handleToggleVisibility = (e) => {
    e.stopPropagation();
    toggleItemVisibility(item.id);
  };

  // Start editing title
  const handleStartEditing = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  // Save edited title
  const handleSaveTitle = () => {
    updateItemTitle(item.id, title);
    setIsEditing(false);
  };

  // Handle title change
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Handle key press in title field
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveTitle();
    }
  };

  return (
    <div className={`opacity-${isDragging ? '50' : '100'} ${!item.visible && !isEditMode ? 'hidden' : ''}`}>
      <div
        ref={ref}
        className={`flex items-center p-3 ${level === 0 || isEditMode ? "bg-[#F7F7F7]" : "bg-white"} ${level > 0 ? "pl-5" : "pl-2"} rounded mb-1 hover:${isEditMode ? 'bg-gray-200' : 'bg-gray-100'} ${isEditMode ? 'cursor-move' : 'cursor-pointer'} relative`}
      >
        {isEditMode ? (
          !isEditing && (
            <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.50759 1.66667C3.50759 2.10869 3.33199 2.53262 3.01943 2.84518C2.70687 3.15774 2.28295 3.33333 1.84092 3.33333C1.39889 3.33333 0.974971 3.15774 0.662411 2.84518C0.34985 2.53262 0.174255 2.10869 0.174255 1.66667C0.174255 1.22464 0.34985 0.800716 0.662411 0.488155C0.974971 0.175595 1.39889 0 1.84092 0C2.28295 0 2.70687 0.175595 3.01943 0.488155C3.33199 0.800716 3.50759 1.22464 3.50759 1.66667ZM1.84092 9.16667C2.28295 9.16667 2.70687 8.99107 3.01943 8.67851C3.33199 8.36595 3.50759 7.94203 3.50759 7.5C3.50759 7.05797 3.33199 6.63405 3.01943 6.32149C2.70687 6.00893 2.28295 5.83333 1.84092 5.83333C1.39889 5.83333 0.974971 6.00893 0.662411 6.32149C0.34985 6.63405 0.174255 7.05797 0.174255 7.5C0.174255 7.94203 0.34985 8.36595 0.662411 8.67851C0.974971 8.99107 1.39889 9.16667 1.84092 9.16667ZM1.84092 15C2.28295 15 2.70687 14.8244 3.01943 14.5118C3.33199 14.1993 3.50759 13.7754 3.50759 13.3333C3.50759 12.8913 3.33199 12.4674 3.01943 12.1548C2.70687 11.8423 2.28295 11.6667 1.84092 11.6667C1.39889 11.6667 0.974971 11.8423 0.662411 12.1548C0.34985 12.4674 0.174255 12.8913 0.174255 13.3333C0.174255 13.7754 0.34985 14.1993 0.662411 14.5118C0.974971 14.8244 1.39889 15 1.84092 15ZM11.0076 1.66667C11.0076 2.10869 10.832 2.53262 10.5194 2.84518C10.2069 3.15774 9.78295 3.33333 9.34092 3.33333C8.89889 3.33333 8.47497 3.15774 8.16241 2.84518C7.84985 2.53262 7.67426 2.10869 7.67426 1.66667C7.67426 1.22464 7.84985 0.800716 8.16241 0.488155C8.47497 0.175595 8.89889 0 9.34092 0C9.78295 0 10.2069 0.175595 10.5194 0.488155C10.832 0.800716 11.0076 1.22464 11.0076 1.66667ZM9.34092 9.16667C9.78295 9.16667 10.2069 8.99107 10.5194 8.67851C10.832 8.36595 11.0076 7.94203 11.0076 7.5C11.0076 7.05797 10.832 6.63405 10.5194 6.32149C10.2069 6.00893 9.78295 5.83333 9.34092 5.83333C8.89889 5.83333 8.47497 6.00893 8.16241 6.32149C7.84985 6.63405 7.67426 7.05797 7.67426 7.5C7.67426 7.94203 7.84985 8.36595 8.16241 8.67851C8.47497 8.99107 8.89889 9.16667 9.34092 9.16667ZM9.34092 15C9.78295 15 10.2069 14.8244 10.5194 14.5118C10.832 14.1993 11.0076 13.7754 11.0076 13.3333C11.0076 12.8913 10.832 12.4674 10.5194 12.1548C10.2069 11.8423 9.78295 11.6667 9.34092 11.6667C8.89889 11.6667 8.47497 11.8423 8.16241 12.1548C7.84985 12.4674 7.67426 12.8913 7.67426 13.3333C7.67426 13.7754 7.84985 14.1993 8.16241 14.5118C8.47497 14.8244 8.89889 15 9.34092 15Z" fill="#404040" />
            </svg>
          )
        ) : ''}
        {isEditing && isEditMode ? (
          <div className="flex items-center flex-1">
            <input
              value={title}
              onChange={handleTitleChange}
              onKeyPress={handleKeyPress}
              className="px-3 py-1 border border-gray-300 rounded-md mr-1 focus:outline-none focus:border-blue-500"
              autoFocus
            />
            <button
              onClick={handleSaveTitle}
              className="p-1 text-green-600 hover:bg-green-50 rounded-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
        ) : (
          <span className={`flex-1 ps-2 ${!item.visible ? 'text-gray-400' : 'text-gray-900'}`}>
            {item.title}
          </span>
        )}
        {item.children && item.children.length > 0 && (
          <button
            onClick={handleToggleExpand}
            className="p-1 hover:bg-gray-200 rounded-full mr-2"
          >
            {isEditMode ? '' : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isExpanded ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
              />
            </svg>}
          </button>
        )}
        {isEditMode && !isEditing && (
          <div className="flex items-center space-x-1">
            <button
              onClick={handleStartEditing}
              className="p-1 text-gray-600 rounded-full"
            >
              <svg width="20" height="20" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.3235 1.68283C20.6071 0.966506 19.6355 0.564087 18.6224 0.564087C17.6093 0.564087 16.6376 0.966506 15.9212 1.68283L2.41104 15.1953C2.01705 15.5891 1.74522 16.0883 1.62823 16.6328L0.586821 21.4922C0.559357 21.6198 0.564311 21.7523 0.601229 21.8775C0.638146 22.0027 0.705852 22.1167 0.798159 22.209C0.890466 22.3013 1.00443 22.369 1.12964 22.4059C1.25486 22.4428 1.38733 22.4478 1.51495 22.4203L6.37432 21.3789C6.9189 21.2619 7.41808 20.9901 7.81182 20.5961L21.3235 7.0844C22.0396 6.368 22.4419 5.39654 22.4419 4.38361C22.4419 3.37069 22.0396 2.39923 21.3235 1.68283ZM17.0267 2.78752C17.4538 2.38354 18.0218 2.16213 18.6097 2.17037C19.1975 2.17861 19.759 2.41585 20.1747 2.83164C20.5904 3.24743 20.8275 3.80898 20.8356 4.39687C20.8437 4.98476 20.6222 5.55263 20.2181 5.97971L19.5149 6.68283L16.3228 3.49143L17.0267 2.78752ZM15.2173 4.59611L18.4095 7.7883L6.70791 19.4922C6.52684 19.6732 6.29732 19.798 6.04698 19.8516L2.36651 20.6406L3.15557 16.961C3.20916 16.7106 3.33396 16.4811 3.51495 16.3L15.2173 4.59611Z" fill="#848484" />
              </svg>

            </button>
            <button
              onClick={handleToggleVisibility}
              className="p-1 text-gray-600 rounded-full"
            >
              {item.visible ? (
                <svg width="20" height="20" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.2214 8.39289C21.8077 6.19795 20.0359 4.5564 17.9061 3.46823C18.4734 4.43549 18.7571 5.48181 18.7571 6.60718C18.7571 8.32779 18.1456 9.79961 16.9225 11.0226C15.6995 12.2457 14.2277 12.8572 12.5071 12.8572C10.7865 12.8572 9.31465 12.2457 8.09162 11.0226C6.86859 9.79961 6.25708 8.32779 6.25708 6.60718C6.25708 5.48181 6.54075 4.43549 7.10808 3.46823C4.97825 4.5564 3.20648 6.19795 1.79279 8.39289C3.02977 10.2995 4.58065 11.8178 6.44542 12.9479C8.31019 14.0779 10.3307 14.6429 12.5071 14.6429C14.6834 14.6429 16.704 14.0779 18.5687 12.9479C20.4335 11.8178 21.9844 10.2995 23.2214 8.39289ZM13.1767 3.03575C13.1767 2.84974 13.1116 2.69163 12.9814 2.56142C12.8512 2.43121 12.6931 2.36611 12.5071 2.36611C11.3445 2.36611 10.347 2.78231 9.51461 3.61471C8.68221 4.44711 8.26601 5.4446 8.26601 6.60718C8.26601 6.79319 8.33111 6.9513 8.46132 7.08151C8.59153 7.21172 8.74964 7.27682 8.93565 7.27682C9.12166 7.27682 9.27977 7.21172 9.40998 7.08151C9.54019 6.9513 9.60529 6.79319 9.60529 6.60718C9.60529 5.80733 9.88896 5.12373 10.4563 4.5564C11.0236 3.98906 11.7072 3.70539 12.5071 3.70539C12.6931 3.70539 12.8512 3.64029 12.9814 3.51008C13.1116 3.37987 13.1767 3.22176 13.1767 3.03575ZM25.0071 8.39289C25.0071 8.70911 24.9141 9.02998 24.7281 9.3555C23.426 11.4946 21.6751 13.2083 19.4756 14.4964C17.276 15.7845 14.9531 16.4286 12.5071 16.4286C10.061 16.4286 7.7382 15.7822 5.53861 14.4894C3.33902 13.1966 1.58818 11.4853 0.286098 9.3555C0.100086 9.02998 0.00708008 8.70911 0.00708008 8.39289C0.00708008 8.07667 0.100086 7.7558 0.286098 7.43028C1.58818 5.30044 3.33902 3.58913 5.53861 2.29635C7.7382 1.00357 10.061 0.357178 12.5071 0.357178C14.9531 0.357178 17.276 1.00357 19.4756 2.29635C21.6751 3.58913 23.426 5.30044 24.7281 7.43028C24.9141 7.7558 25.0071 8.07667 25.0071 8.39289Z" fill="#848484" />
                </svg>

              ) : (
                  <svg width="20" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_72_3586)">
                      <path d="M20.1633 8.33936L18.9133 9.58936C21.5696 10.9956 22.8196 13.1831 23.2883 14.2769C22.1946 15.6831 18.9133 19.1206 12.3508 19.1206C11.2571 19.1206 10.4758 18.9644 9.53833 18.8081L8.28833 20.0581C9.53833 20.5269 10.9446 20.6831 12.3508 20.6831C21.2571 20.6831 25.0071 14.4331 25.0071 14.4331C25.0071 14.4331 24.0696 10.6831 20.1633 8.33936Z" fill="#848484" />
                      <path d="M18.7571 11.3081C18.7571 10.8394 18.7571 10.3706 18.6008 10.0581L11.1008 17.4019C11.5696 17.4019 12.0383 17.5581 12.5071 17.5581C15.9446 17.5581 18.7571 14.7456 18.7571 11.3081ZM23.9133 0.214355L17.0383 7.08936C15.7883 6.77686 14.2258 6.46436 12.5071 6.46436C2.03833 6.46436 0.00708008 14.4331 0.00708008 14.4331C0.00708008 14.4331 1.56958 17.2456 5.16333 19.1206L0.00708008 24.1206V25.2144H1.10083L25.0071 1.30811V0.214355H23.9133ZM6.25708 17.8706C3.75708 16.7769 2.35083 15.0581 1.72583 14.2769C2.19458 13.1831 3.44458 10.8394 6.56958 9.27686C6.41333 9.90186 6.25708 10.5269 6.25708 11.3081C6.25708 13.0269 7.03833 14.7456 8.28833 15.8394L6.25708 17.8706ZM9.69458 12.5581L8.13208 12.8706C8.13208 12.8706 7.66333 12.0894 7.66333 10.9956C7.66333 9.74561 8.28833 8.65186 8.28833 8.65186C9.06958 8.18311 10.3196 8.18311 10.3196 8.18311C10.3196 8.18311 9.53833 9.58936 9.53833 10.8394C9.38208 11.9331 9.69458 12.5581 9.69458 12.5581Z" fill="#848484" />
                    </g>
                    <defs>
                      <clipPath id="clip0_72_3586">
                        <rect width="25" height="25" fill="white" transform="translate(0.00708008 0.214355)" />
                      </clipPath>
                    </defs>
                  </svg>

              )}
            </button>
          </div>
        )}
      </div>
      {item.children && item.children.length > 0 && (
        <div className={`transition-all duration-200 ${isExpanded ? 'block' : 'hidden'}`}>
          {item.children.map((child, childIndex) => (
            <NavItem
              key={child.id}
              item={child}
              index={childIndex}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NavItem;