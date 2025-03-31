import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Posts from './components/Posts';
import PostDetails from './pages/PostDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatePost from './pages/CreatePost';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Router>
        <Routes>
          <Route path='/' element={<Posts />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/posts/:id' element={<PostDetails />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
