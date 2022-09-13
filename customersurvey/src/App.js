//import logo from './logo.svg';
//import './App.css';
//import { createBrowserHistory } from 'history';
import FrontPage from './components/frontpage/frontpage';
import LoginPage from './components/login/login';
import RegisterPage from './components/register/register';
import ForgotPage from './components/login/forgot';
import OTPPage from './components/login/otp';
import {Routes,Route,useNavigate} from "react-router-dom";
import HomePage from './components/login/homepage';
import SurveyPage from './components/login/Survey';
import Piechart from './components/charts/charts';
import Page from './components/survey/user/page';
import TryMain from './components/survey/question/trymain';
import View from './components/survey/user/view';
import Barchart from './components/charts/bargraph';
import CustomerPage from './components/customer/cfirst';
import ViewPage from './components/customer/viewpage';
import CompletePage from './components/customer/completed';

import CreatePolls from "./components/poll/CreatePolls";

import { createBrowserHistory } from "history";
import ShowAllPolls from "./components/poll/ShowAllPolls";
import Pollcard from "./components/poll/pollcard";
import Showpoll from "./components/poll/showpoll";
import ShowGraph from "./components/poll/showgraph";
function App() {
  const navigate=useNavigate()
  const history = createBrowserHistory();
  //const navigate=createBrowserHistory()
  return (
    <div>
      <Routes>
          <Route path="/" element={<FrontPage/>} />
          <Route path="/login"  element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/SurveyPage" element={<SurveyPage />} />
          <Route path="/ForgotPage" element={<ForgotPage />} />
          <Route path="/OTPPage" element={<OTPPage />} />
          <Route path="/GraphPage" element={<Piechart />} />
          <Route path="/BarPage" element={<Barchart />} />
          <Route path="/Page" element={<Page navigate={navigate}/>} />
          <Route path="/create" element={<TryMain navigate={navigate}/>} />
          <Route path="/view" element={<View />} />
          <Route path="/cfront" element={<CustomerPage />} />
          <Route path="/viewpage" element={<ViewPage />} />
          <Route path="/complete" element={<CompletePage />}/>

          <Route path="/createPoll" element={<CreatePolls />} />
          <Route path="/showallpolls" element={<ShowAllPolls />} />
          <Route path="/showpoll" element={<Showpoll />} />
          <Route path="/poll/:id" element={<Pollcard />} />
          <Route path="/graph/:id" element={<ShowGraph />} />
      </Routes>
  
    </div>
  );
}
//<LoginPage />
//<RegisterPage />
//<FrontPage />
//  <ForgotPage />
//<UpdatePage />
export default App;
