import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './web-pages/Home.jsx';
import CallForPapers from './web-pages/CallForPapers.jsx';
import Submission from './web-pages/Submission.jsx';
import ScheduleAgenda from './web-pages/ScheduleAgenda.jsx';
import Registration from './web-pages/Registration.jsx';
import VirtualConference from './web-pages/VirtualConference.jsx';
import CareerDevelopment from './web-pages/CareerDevelopment.jsx';
import Mentorship from './web-pages/Mentorship.jsx';
import ContactUs from './web-pages/ContactUs.jsx';
import PeerReviewSubmission from './web-pages/PeerReviewSubmission.jsx';
import PeerReviewDashboard from './web-pages/PeerReview.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import GoLive from './web-pages/GoLive.jsx';
import Login from './web-pages/Login.jsx';
import SignUp from './web-pages/signup.jsx';
import Admin from './web-pages/Admin.jsx';
import AdminHome from './web-pages/AdminHome.jsx';
import AdminSignup from './web-pages/AdminSignup.jsx';
import Files from './web-pages/Files.jsx';

import Profile from './web-pages/profile.jsx';
export default function MyApp() {
  const loggedIn = localStorage.getItem('loggedIn');
  console.log(loggedIn);
  const router = createBrowserRouter([
    {
      path: '/home',
      element: <Home />,
    },
    {
      path: '/call-for-papers',
      element: <CallForPapers />,
    },
    {
      path: '/peer-review',
      element: <PeerReviewDashboard />,
    },
    {
      path: '/peer-review/submission/:paperId',
      element: <PeerReviewSubmission />,
    },
    {
      path: '/schedule-agenda',
      element: <ScheduleAgenda />,
    },
    {
      path: '/registration',
      element: <Registration />,
    },
    {
      path: '/virtual-conference',
      element: <VirtualConference />,
    },
    {
      path: '/career-development',
      element: <CareerDevelopment />,
    },
    {
      path: '/mentorship',
      element: <Mentorship />,
    },
    {
      path: '/contact-us',
      element: <ContactUs />,
    },
    {
      path: '/go-live', // Add Go Live route
      element: <GoLive />,
    },
    {
      path: '/submission',

      element: <Submission />,
    },
    {
      path: '/', // Add Go Live route
      element: <Login />,
    },
    {
      path: '/signup', // Add Go Live route
      element: <SignUp />,
    },
    {
      path: '/admin', // Add Go Live route
      element: <Admin />,
    },
    {
      path: '/adminHome', // Add Go Live route
      element: <AdminHome />,
    },
    {
      path: '/adminSignup',
      element: <AdminSignup></AdminSignup>,
    },
    {
      path: '/profile',
      element: <Profile />,
    },
    {
      path: '/files', // Add route for Files
      element: <Files />, // Render the Files component added new route to this.
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
