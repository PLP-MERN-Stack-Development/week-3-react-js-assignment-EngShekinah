import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const AddTaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };

    onAddTask(newTask);
    setTitle('');
    setDescription('');
    setIsExpanded(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (e.target.value.trim() && !isExpanded) {
      setIsExpanded(true);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setIsExpanded(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="What needs to be done?"
            className="input-field text-lg"
            maxLength={200}
          />
        </div>

        {isExpanded && (
          <div className="animate-slide-in">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description (optional)"
              className="input-field resize-none"
              rows={3}
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {title.length}/200 characters
                {description && (
                  <span className="ml-4">{description.length}/500 characters (description)</span>
                )}
              </div>
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleCancel}
                  label="Cancel"
                />
                <Button
                  type="submit"
                  variant="primary"
                  label="Add Task"
                  disabled={!title.trim()}
                />
              </div>
            </div>
          </div>
        )}

        {!isExpanded && title.trim() && (
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              label="Add Task"
              className="animate-fade-in"
            />
          </div>
        )}
      </form>
    </div>
  );
};

AddTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired
};

export default AddTaskForm;