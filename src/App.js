import './App.css';
import Content from './components/Content';
import { Box, CssBaseline } from '@material-ui/core';
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <Box>
      <Header />
      <div style={{ padding: 30 }}>
        <Content />
      </div>
      <Footer />
      <CssBaseline />
    </Box>
  );
}
export default App;