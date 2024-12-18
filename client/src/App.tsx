import Admin from "./pages/Admin";
import QuestionnaireDetails from "./pages/QuestionnaireDetails";
import Users from "./pages/Users";

import { Route, BrowserRouter, Routes } from "react-router-dom";

 
const App = () => {
  return (
    <>
        <BrowserRouter>
            <Routes>
                    <Route path="/ahmed-altiby-admin-controle" element={ <Admin /> } />
                    <Route path="/questionnaire/:id" element={ <Users /> } />
                    <Route path="/get-questionnaire-detailes/:id" element={ <QuestionnaireDetails /> } />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App   