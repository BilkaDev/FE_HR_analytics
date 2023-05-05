import { Routes, Route } from 'react-router-dom';

import { Home } from 'views/home/Home';
import { Profile } from 'views/profile/Profile';
import { Job } from 'views/jobs/job/Job';

import { AppRoute } from './AppRoute';
import { SignIn } from './views/signin/SignIn';
import { SignUp } from './views/signup/SignUp';
import { CenteredLayout } from './components/uiElements/centeredLayout/CenteredLayout';
import { Dashboard } from './views/dashboard/Dashboard';
import { ProtectedRoute } from './components/protectedRoute/ProtectedRoute';
import { DashboardLayout } from './components/dashboardLayout/DashboardLayout';
import { Jobs } from './views/jobs/Jobs';
import { AddJob } from './views/jobs/addJob/AddJob';
import { Candidates } from './views/candidates/candidates';
import { Candidate } from './views/candidates/candidate/Candidate';
import { AddCandidate } from './views/candidates/addCandidate/AddCandidate';

const App = () => {
  return (
    <Routes>
      <Route element={<CenteredLayout />}>
        <Route path={AppRoute.home} element={<Home />} />
        <Route path={AppRoute.signIn} element={<SignIn />} />
        <Route path={AppRoute.signUp} element={<SignUp />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path={AppRoute.dashboard} element={<Dashboard />} />
          <Route path={AppRoute.profile} element={<Profile />} />
          <Route path={AppRoute.jobs} element={<Jobs />} />
          <Route path={AppRoute.addJob} element={<AddJob />} />
          <Route path={`${AppRoute.jobs}/:id`} element={<Job />} />
          <Route path={AppRoute.candidates} element={<Candidates />} />
          <Route path={AppRoute.addCandidate} element={<AddCandidate />} />
          <Route path={`${AppRoute.candidates}/:id`} element={<Candidate />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
