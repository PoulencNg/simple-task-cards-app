
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/components/ui/use-toast';
import AddTaskForm from './AddTaskForm';
import TaskCard from './TaskCard';
import { Task } from '@/types/Task';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const TodoList: React.FC = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([
    { id: uuidv4(), name: "Học HTML & CSS" },
    { id: uuidv4(), name: "Học JavaScript" },
    { id: uuidv4(), name: "Học React" },
    { id: uuidv4(), name: "Học Node.js" }
  ]);
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [editTaskName, setEditTaskName] = useState("");

  const handleAddTask = (taskName: string) => {
    const newTask: Task = {
      id: uuidv4(),
      name: taskName
    };
    
    setTasks([...tasks, newTask]);
    toast({
      title: "Đã thêm công việc mới",
      description: `"${taskName}" đã được thêm vào danh sách.`
    });
  };

  const handleEditClick = (id: string) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setEditTaskId(id);
      setEditTaskName(taskToEdit.name);
      setIsEditDialogOpen(true);
    }
  };

  const handleEditSave = () => {
    if (editTaskId && editTaskName.trim()) {
      setTasks(tasks.map(task => 
        task.id === editTaskId 
          ? { ...task, name: editTaskName.trim() } 
          : task
      ));
      
      setIsEditDialogOpen(false);
      toast({
        title: "Đã cập nhật công việc",
        description: "Công việc đã được cập nhật thành công."
      });
    }
  };

  const handleDeleteTask = (id: string) => {
    const taskToDelete = tasks.find(task => task.id === id);
    setTasks(tasks.filter(task => task.id !== id));
    
    if (taskToDelete) {
      toast({
        title: "Đã xóa công việc",
        description: `"${taskToDelete.name}" đã được xóa khỏi danh sách.`,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="w-full max-w-lg">
      <AddTaskForm onAdd={handleAddTask} />
      
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center p-4 text-gray-500">
            Không có công việc nào. Hãy thêm công việc mới!
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEditClick}
              onDelete={handleDeleteTask}
            />
          ))
        )}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sửa công việc</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <Input
              value={editTaskName}
              onChange={(e) => setEditTaskName(e.target.value)}
              placeholder="Nhập tên công việc mới"
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleEditSave}>
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TodoList;
