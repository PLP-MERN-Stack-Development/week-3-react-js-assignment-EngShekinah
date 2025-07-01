// API utility functions for the Todo app

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const api = {
  // Fetch initial tasks from JSONPlaceholder
  async fetchTasks(limit = 10) {
    try {
      const response = await fetch(`${API_BASE_URL}/todos?_limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const tasks = await response.json();
      
      // Transform API data to match our task structure
      return tasks.map(task => ({
        id: task.id.toString(),
        title: task.title,
        description: '',
        completed: task.completed,
        createdAt: new Date().toISOString(),
        completedAt: task.completed ? new Date().toISOString() : null
      }));
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      throw error;
    }
  },

  // Simulate creating a task (for demonstration)
  async createTask(task) {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to create task:', error);
      throw error;
    }
  },

  // Simulate updating a task (for demonstration)
  async updateTask(id, updates) {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to update task:', error);
      throw error;
    }
  },

  // Simulate deleting a task (for demonstration)
  async deleteTask(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return true;
    } catch (error) {
      console.error('Failed to delete task:', error);
      throw error;
    }
  }
};