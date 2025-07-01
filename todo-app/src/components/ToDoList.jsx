import { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from '../utils/useLocalStorage';
import { api } from '../utils/api';
import TaskCard from './TaskCard';
import AddTaskForm from './AddTaskForm';
import SearchBar from './SearchBar';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import Button from './Button';

const ToDoList = ({ filter = 'all' }) => {
  const [tasks, setTasks] = useLocalStorage('todos', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('newest');

  // Load initial data from API (JSONPlaceholder)
  useEffect(() => {
    const loadInitialTasks = async () => {
      // Only load if no tasks exist locally
      if (tasks.length > 0) return;

      setIsLoading(true);
      setError(null);

      try {
        const formattedTasks = await api.fetchTasks(10);
        setTasks(formattedTasks);
      } catch (err) {
        setError(err.message);
        console.error('Error loading tasks:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialTasks();
  }, []); // Empty dependency array to run only once

  // Add new task
  const handleAddTask = useCallback((newTask) => {
    setTasks(prev => [newTask, ...prev]);
  }, [setTasks]);

  // Toggle task completion
  const handleCompleteTask = useCallback((taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            completed: !task.completed,
            completedAt: !task.completed ? new Date().toISOString() : null
          }
        : task
    ));
  }, [setTasks]);

  // Delete task
  const handleDeleteTask = useCallback((taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  }, [setTasks]);

  // Edit task
  const handleEditTask = useCallback((taskId, newTitle) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, title: newTitle }
        : task
    ));
  }, [setTasks]);

  // Search functionality
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  // Clear completed tasks
  const handleClearCompleted = useCallback(() => {
    setTasks(prev => prev.filter(task => !task.completed));
  }, [setTasks]);

  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks;

    // Apply filter
    switch (filter) {
      case 'active':
        filtered = tasks.filter(task => !task.completed);
        break;
      case 'completed':
        filtered = tasks.filter(task => task.completed);
        break;
      default:
        filtered = tasks;
    }

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'completed':
          return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
        default: // newest
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return sorted;
  }, [tasks, filter, searchTerm, sortBy]);

  // Task statistics
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [tasks]);

  if (isLoading) {
    return <Loading message="Loading your tasks..." />;
  }

  if (error) {
    return (
      <ErrorMessage 
        message={error} 
        onRetry={() => window.location.reload()} 
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          My Tasks
        </h1>
        <div className="flex justify-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
          <span>Total: <span className="font-semibold">{stats.total}</span></span>
          <span>Active: <span className="font-semibold text-blue-600 dark:text-blue-400">{stats.active}</span></span>
          <span>Completed: <span className="font-semibold text-green-600 dark:text-green-400">{stats.completed}</span></span>
        </div>
      </div>

      {/* Add Task Form */}
      <AddTaskForm onAddTask={handleAddTask} />

      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <SearchBar onSearch={handleSearch} />
        
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field w-auto"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="completed">Completed Status</option>
          </select>
          
          {stats.completed > 0 && (
            <Button
              variant="secondary"
              onClick={handleClearCompleted}
              label={`Clear Completed (${stats.completed})`}
              className="text-sm"
            />
          )}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredAndSortedTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
              {searchTerm ? 'No matching tasks' : 'No tasks yet'}
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {searchTerm 
                ? 'Try adjusting your search terms' 
                : 'Add your first task to get started!'
              }
            </p>
          </div>
        ) : (
          filteredAndSortedTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={handleCompleteTask}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

ToDoList.propTypes = {
  filter: PropTypes.oneOf(['all', 'active', 'completed'])
};

export default ToDoList;