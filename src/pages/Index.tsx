
import React from 'react';
import TodoList from '@/components/TodoList';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Danh sách công việc
        </h1>
        
        <TodoList />
      </div>
    </div>
  );
};

export default Index;
