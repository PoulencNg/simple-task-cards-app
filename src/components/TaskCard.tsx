
import React from 'react';
import { Button } from '@/components/ui/button';
import { Task } from '@/types/Task';

interface TaskCardProps {
  task: Task;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 mb-3 bg-white rounded-lg shadow-sm border border-gray-100">
      <span className="text-lg">{task.name}</span>
      <div className="flex space-x-2">
        <Button 
          onClick={() => onEdit(task.id)} 
          className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 h-8"
        >
          Sửa
        </Button>
        <Button 
          onClick={() => onDelete(task.id)} 
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 h-8"
        >
          Xóa
        </Button>
      </div>
    </div>
  );
};

export default TaskCard;
