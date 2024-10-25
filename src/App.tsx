import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CustomerList from './pages/CustomerList';
import CustomerDetails from './pages/CustomerDetails';
import SaleOppCreation from './pages/SaleOppCreation';
import SaleOppEdit from './pages/SaleOppEdit';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>CRM System</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CustomerList />} />
          <Route path='/customer/detail/:cusid' element={<CustomerDetails />} />
          <Route path='/sales/create/:customerId' element={<SaleOppCreation />} />
          <Route path='/sales/edit/:saleId' element={<SaleOppEdit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
