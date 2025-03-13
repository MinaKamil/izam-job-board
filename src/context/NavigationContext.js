import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchNavigation, saveNavigation, trackDragEvent } from '../services/api';

const NavigationContext = createContext();

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

// Helper function to find an item by ID in the navigation tree
const findItemById = (items, id) => {
  for (const item of items) {
    if (item.id === id) {
      return item;
    }
    if (item.children) {
      const found = findItemById(item.children, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

// Helper function to create a deep copy of the navigation tree
const deepCopyNavTree = (navTree) => {
  return JSON.parse(JSON.stringify(navTree));
};

export const NavigationProvider = ({ children }) => {
  const [navTree, setNavTree] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNavigation = async () => {
      try {
        setIsLoading(true);
        const data = await fetchNavigation();
        setNavTree(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch navigation data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getNavigation();
  }, []);

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const toggleItemVisibility = (id) => {
    if (!navTree) return;

    const updatedNavTree = deepCopyNavTree(navTree);
    const item = findItemById(updatedNavTree.items, id);

    if (item) {
      item.visible = !item.visible;
      setNavTree(updatedNavTree);
    }
  };

  const updateItemTitle = (id, newTitle) => {
    if (!navTree) return;

    const updatedNavTree = deepCopyNavTree(navTree);
    const item = findItemById(updatedNavTree.items, id);

    if (item) {
      item.title = newTitle;
      setNavTree(updatedNavTree);
    }
  };

  const moveItem = (id, fromIndex, toIndex) => {
    if (!navTree) return;

    const updatedNavTree = deepCopyNavTree(navTree);

    const findParentArray = (items, id) => {
      for (const item of items) {
        if (item.id === id) {
          return items;
        }
        if (item.children) {
          const found = findParentArray(item.children, id);
          if (found) {
            return found;
          }
        }
      }
      return null;
    };

    const parentArray = findParentArray(updatedNavTree.items, id);

    if (parentArray) {
      const [movedItem] = parentArray.splice(fromIndex, 1);
      parentArray.splice(toIndex, 0, movedItem);
      setNavTree(updatedNavTree);

      trackDragEvent({ id, from: fromIndex, to: toIndex }).catch((err) => {
        console.error('Error tracking drag event:', err);
      });
    }
  };

  const saveChanges = async () => {
    if (!navTree) return;

    try {
      setIsLoading(true);
      await saveNavigation(navTree);
      setIsEditMode(false);
      setError(null);
    } catch (err) {
      setError('Failed to save navigation changes');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    navTree,
    isEditMode,
    isLoading,
    error,
    toggleEditMode,
    toggleItemVisibility,
    updateItemTitle,
    moveItem,
    saveChanges,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};