# 📝 Todo App

A modern, responsive Todo application built with React, Vite, and Tailwind CSS. This project demonstrates advanced React concepts including component architecture, state management, hooks usage, and API integration.

## ✨ Features

### 🏗️ Core Functionality
- ✅ Add new tasks with titles and descriptions
- ✏️ Edit existing tasks inline
- ☑️ Mark tasks as completed/incomplete
- 🗑️ Delete tasks
- 🔍 Search tasks by title or description
- 📊 Task statistics (total, active, completed)

### 🎨 User Interface
- 🌓 Dark/Light mode toggle
- 📱 Fully responsive design (mobile-first)
- 🎯 Clean, modern UI with Tailwind CSS
- ✨ Smooth animations and transitions
- 🧭 Intuitive navigation

### 📂 Filter & Sort
- 📋 View all tasks
- 🟡 Filter active tasks only
- ✅ Filter completed tasks only
- 🔤 Sort by: newest, oldest, alphabetical, completion status
- 🧹 Clear all completed tasks

### 💾 Data Management
- 💿 Local storage persistence
- 🌐 API integration with JSONPlaceholder
- ⏳ Loading states
- ❌ Error handling with retry functionality

## 🛠️ Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **PropTypes** - Runtime type checking
- **JSONPlaceholder API** - Demo API for initial data

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.jsx      # Reusable button component
│   ├── TaskCard.jsx    # Individual task display
│   ├── AddTaskForm.jsx # Form for adding new tasks
│   ├── SearchBar.jsx   # Search functionality
│   ├── Navbar.jsx      # Navigation component
│   ├── Footer.jsx      # Footer component
│   ├── Layout.jsx      # Layout wrapper
│   ├── Loading.jsx     # Loading state component
│   ├── ErrorMessage.jsx # Error display component
│   └── ToDoList.jsx    # Main todo list component
├── pages/              # Page components
│   ├── Home.jsx        # All tasks page
│   ├── Active.jsx      # Active tasks page
│   └── Completed.jsx   # Completed tasks page
├── context/            # React context providers
│   └── ThemeContext.jsx # Theme management
├── utils/              # Utility functions
│   └── useLocalStorage.js # Local storage hook
└── main.jsx           # App entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd todo-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📱 Usage

### Adding Tasks
1. Click on the input field at the top
2. Type your task title
3. Optionally add a description
4. Click "Add Task" or press Enter

### Managing Tasks
- **Complete:** Click the checkbox next to any task
- **Edit:** Click the "Edit" button on any active task
- **Delete:** Click the "Delete" button on any task

### Navigation
- **All Tasks:** View all tasks regardless of status
- **Active:** View only incomplete tasks
- **Completed:** View only completed tasks

### Search & Filter
- Use the search bar to find tasks by title or description
- Use the sort dropdown to organize tasks
- Clear completed tasks using the "Clear Completed" button

### Theme
- Toggle between light and dark modes using the theme button in the navbar
- Your preference is automatically saved

## 🧪 API Integration

The app integrates with the JSONPlaceholder API to load initial demo tasks:
- **Endpoint:** `https://jsonplaceholder.typicode.com/todos`
- **Limit:** 10 tasks
- **Fallback:** Local storage if API fails

## 🎯 Key React Concepts Demonstrated

### Component Architecture
- Functional components with hooks
- Component composition and reusability
- Props and PropTypes for type safety

### State Management
- `useState` for local component state
- `useEffect` for side effects
- `useContext` for global theme state
- Custom hooks for local storage

### Hooks Usage
- `useMemo` for expensive computations
- `useCallback` for function memoization
- Custom `useLocalStorage` hook

### Modern React Patterns
- Function-based components
- Controlled components
- Event handling
- Conditional rendering

## 🎨 Styling Features

### Tailwind CSS Utilities
- Responsive design classes
- Dark mode support
- Custom animations
- Utility-first approach

### Custom Components
- Reusable button variants
- Consistent form styling
- Card-based layouts
- Icon integrations

## 📊 Performance Features

- Debounced search (300ms)
- Memoized computed values
- Efficient re-renders with useCallback
- Local storage for data persistence

## 🌟 Best Practices

- **Code Organization:** Logical folder structure
- **Component Reusability:** DRY principles
- **Accessibility:** ARIA labels and semantic HTML
- **Error Handling:** Graceful error states
- **User Experience:** Loading states and feedback
- **Responsive Design:** Mobile-first approach

## 🔧 Customization

### Tailwind Configuration
Modify `tailwind.config.js` to customize:
- Colors and themes
- Animations
- Breakpoints
- Custom utilities

### Component Styling
Components use CSS classes defined in `src/index.css`:
- Button variants
- Form styling
- Card layouts
- Animation utilities

## 📈 Future Enhancements

- [ ] Task categories/tags
- [ ] Due dates and reminders
- [ ] Drag and drop reordering
- [ ] Export/import functionality
- [ ] Task sharing
- [ ] Advanced search filters
- [ ] Task templates
- [ ] Productivity analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ using React, Vite, and Tailwind CSS.

---

**Happy task managing! 📝✨**
