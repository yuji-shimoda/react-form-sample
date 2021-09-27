import './App.css';
import { Box, CssBaseline } from '@material-ui/core';
import Header from './Header';
import Footer from './Footer';
import Form from './components/Content';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <Box>
      <Header />
      <div style={{ padding: 30 }}>
        <Router>
          <Switch>
            <Route exact path="/" component={Form} />
            <Route exact path="/:lang" component={Form} />
          </Switch>
        </Router>
      </div>
      <Footer />
      <CssBaseline />
    </Box>
  );
}
export default App;