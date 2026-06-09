import { createBrowserRouter } from "react-router-dom";
import Login from '../pages/login/Login'
import DashboardLayout from "../layouts/DashboardLayout";
import CreateTest from "../pages/CreateTest/CreateTest";
import AddQuestions from "../pages/AddQuestions/AddQuestions";
import QuestionLayout from "../layouts/QuestionLayout/QuestionLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import ConfirmationScreen from "../pages/ConfirmationScreen/ConfirmationScreen";
import EditTest from "../pages/EditTest/EditTest";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login/>
    },
    {
        element: <DashboardLayout/>,
        children: [
            {
                path: '/create-test',
                element: <CreateTest/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            }
        ]
    },
    {
        element: <QuestionLayout/>,
        children: [
            {
                path: '/add-questions/:testId',
                element: <AddQuestions/>
            },
            {
                path: '/confirm-test/:testId',
                element: <ConfirmationScreen/>
            },
            {
                path: '/edit-test/:testId',
                element: <EditTest/>
            }
        ]
    }
])

export default router

{/*/:testId*/}