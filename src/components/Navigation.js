import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import NavItem from './NavItem';
import { useNavigation } from '../context/NavigationContext';

const Navigation = ({ toggleMenu }) => {
  const { navTree, isEditMode, isLoading, error, toggleEditMode, saveChanges } = useNavigation();

  if (isLoading && !navTree) {
    return (
      <div className="flex justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-2 text-red-600">
        <p className="text-base">{error}</p>
      </div>
    );
  }

  if (!navTree) {
    return (
      <div className="p-2">
        <p className="text-base">No navigation data available</p>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full max-w-[360px] bg-white rounded">
        <div className="flex items-center justify-between p-2 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <button
              className="lg:hidden"
              onClick={toggleMenu}
            >
              <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.0625 6.98275L2.94375 6.98275L6.34687 2.54529C6.506 2.33744 6.58256 2.06948 6.55971 1.80036C6.53685 1.53124 6.41645 1.28299 6.225 1.11024C6.03355 0.937484 5.78672 0.854371 5.53882 0.879184C5.29092 0.903997 5.06225 1.0347 4.90312 1.24255L0.215625 7.34914C0.184089 7.39771 0.155887 7.44874 0.13125 7.50181C0.13125 7.5527 0.131251 7.58323 0.0656257 7.63412C0.0231321 7.75081 0.000882838 7.87503 5.46441e-07 8.00051C0.000882857 8.12599 0.0231321 8.25021 0.0656257 8.36691C0.0656257 8.4178 0.0656254 8.44833 0.13125 8.49922C0.155887 8.55228 0.184089 8.60331 0.215626 8.65188L4.90312 14.7585C4.99127 14.8734 5.10165 14.9658 5.22642 15.0291C5.35118 15.0924 5.48727 15.1251 5.625 15.1249C5.84405 15.1253 6.05633 15.0425 6.225 14.8908C6.31993 14.8053 6.3984 14.7004 6.45592 14.582C6.51344 14.4636 6.54887 14.334 6.56019 14.2007C6.57151 14.0674 6.5585 13.933 6.52189 13.8052C6.48529 13.6773 6.42582 13.5586 6.34688 13.4557L2.94375 9.01828L14.0625 9.01828C14.3111 9.01828 14.5496 8.91105 14.7254 8.72018C14.9012 8.52931 15 8.27044 15 8.00051C15 7.73058 14.9012 7.47171 14.7254 7.28084C14.5496 7.08997 14.3111 6.98275 14.0625 6.98275Z" fill="#161616" />
              </svg>
            </button>
            <h2 className='text-lg font-semibold'>Menu</h2>
            </div>
          {isEditMode ? (
            <div className="flex gap-1">
              <button
                className="p-1 text-[#ED1F03] hover:bg-red-50 rounded-full border-2 border-[#ED1F03]"
                onClick={toggleEditMode}
                aria-label="cancel"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button
                className="p-1 text-[#3D8E41] hover:bg-green-50 rounded-full border-2 border-[#3D8E41]"
                onClick={saveChanges}
                aria-label="save"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              className="p-2 text-gray-600 hover:bg-gray-50 rounded-full"
              onClick={toggleEditMode}
              aria-label="edit"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          )}
        </div>

        <div className="p-1 overflow-y-auto h-[85vh]">
          {navTree.items.map((item, index) => (
            <NavItem 
              key={item.id} 
              item={item} 
              index={index} 
              level={0} 
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default Navigation;