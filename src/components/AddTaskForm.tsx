
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AddTaskFormProps {
  onAdd: (taskName: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAdd }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskName.trim()) {
      onAdd(taskName.trim());
      setTaskName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-6 w-full">
      <Input
        type="text"
        placeholder="Nhập tên công việc mới"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className="flex-1"
      />
      <Button 
        type="submit" 
        className="bg-green-500 hover:bg-green-600 text-white"
      >
        Thêm
      </Button>
    </form>
  );
};

export default AddTaskForm;
