import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const TaskCard = ({ task, onComplete, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const handleEdit = () => {
    if (isEditing) {
      if (editText.trim() && editText !== task.title) {
        onEdit(task.id, editText.trim());
      }
      setIsEditing(false);
    } else {
      setEditText(task.title);
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setEditText(task.title);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="task-card animate-fade-in">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onComplete(task.id)}
          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 focus:ring-2"
        />
        
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="input-field"
              autoFocus
              onBlur={handleEdit}
            />
          ) : (
            <div className="flex-1">
              <h3 className={`text-lg font-medium ${
                task.completed 
                  ? 'text-gray-500 dark:text-gray-400 line-through' 
                  : 'text-gray-900 dark:text-gray-100'
              }`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-sm mt-1 ${
                  task.completed 
                    ? 'text-gray-400 dark:text-gray-500' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}>
                  {task.description}
                </p>
              )}
              <div className="flex items-center mt-2 space-x-2 text-xs text-gray-500 dark:text-gray-400">
                <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                {task.completed && task.completedAt && (
                  <span>• Completed: {new Date(task.completedAt).toLocaleDateString()}</span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <Button
                variant="primary"
                onClick={handleEdit}
                className="text-sm px-2 py-1"
                label="Save"
              />
              <Button
                variant="secondary"
                onClick={handleCancel}
                className="text-sm px-2 py-1"
                label="Cancel"
              />
            </>
          ) : (
            <>
              <Button
                variant="secondary"
                onClick={handleEdit}
                className="text-sm px-2 py-1"
                label="Edit"
                disabled={task.completed}
              />
              <Button
                variant="danger"
                onClick={() => onDelete(task.id)}
                className="text-sm px-2 py-1"
                label="Delete"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    completed: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
    completedAt: PropTypes.string
  }).isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default TaskCard;