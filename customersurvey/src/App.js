//import logo from './logo.svg';
//import './App.css';
//import { createBrowserHistory } from 'history';
import FrontPage from './components/frontpage/frontpage';
import LoginPage from './components/login/login';
import RegisterPage from './components/register/register';
import ForgotPage from './components/login/forgot';
import OTPPage from './components/login/otp';
import {Routes,Route,useNavigate, useLocation} from "react-router-dom";
import HomePage from './components/login/homepage';
import SurveyPage from './components/login/Survey';
import All from './components/charts/all';
import AllBar from './components/charts/allbar';
import Page from './components/survey/user/page';
import TryMain from './components/survey/question/trymain';
import View from './components/survey/user/view';
import CustomerPage from './components/customer/cfirst';
import ViewPage from './components/customer/viewpage';
import CompletePage from './components/customer/completed';
import Userview from './components/customer/userview';
import EditMain from './components/edit/editmain';
import Question from './components/edit/equestion';
import OTPPageC from './components/customer/otpc';

import CreatePolls from "./components/poll/CreatePolls";

import { createBrowserHistory } from "history";
import ShowAllPolls from "./components/poll/ShowAllPolls";
import Pollcard from "./components/poll/pollcard";
import ShowGraph from "./components/poll/showgraph";
import CsurveyPage from './components/customer/coptions';
import CompletedPolls from './components/customer/cpolls/completedpolls';
import CustomerPolls from './components/customer/cpolls/customerPoll';
import PollCardCustomer from './components/customer/cpolls/pollcardcustomer';
import PollHomePage from './components/poll/pollhomepage';

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
          <Route path="/GraphPage" element={<All />} />
          <Route path='/BarGraph' element={<AllBar/>}/>
          <Route path="/Page" element={<Page navigate={navigate} location={useLocation()}/>} />
          <Route path="/create" element={<TryMain navigate={navigate} location={useLocation()}/>} />
          <Route path="/view" element={<View navigate={navigate} location={useLocation()}/>} />
          <Route path="/cfront" element={<CustomerPage />} />
          <Route path="/coptions" element={<CsurveyPage />} />
          <Route path="/otpc" element={<OTPPageC />} />
          <Route path="/viewpage" element={<ViewPage navigate={navigate} location={useLocation()}/>} />
          <Route path="/complete" element={<CompletePage navigate={navigate} />}/>
          <Route path="/userview" element={<Userview navigate={navigate} location={useLocation()}/>}/>
          <Route path="/editpage" element={<EditMain navigate={navigate} location={useLocation()}/>} />
          

          <Route path="/createPoll" element={<CreatePolls />} />
          <Route path="/showallpolls" element={<ShowAllPolls />} />
          <Route path="/poll/:id" element={<Pollcard />} />
          <Route path="/graph/:id" element={<ShowGraph />} />
          <Route path="/customerPoll" element={<CustomerPolls />} />
          <Route path="/completedPoll" element={< CompletedPolls/>}/>
          <Route path="/customerPoll/:id" element={<PollCardCustomer />} />
          <Route path="/pollhomepage" element={<PollHomePage/>}/>
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
