import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Posts from './components/Posts';
import PostDetails from './pages/PostDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path='/' element={<Posts />} />
          <Route path='/posts/:id' element={<PostDetails />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
