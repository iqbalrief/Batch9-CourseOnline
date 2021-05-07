import React from 'react'
import { Switch, Route } from "react-router-dom";
import MainLayout from './views/MainLayout'
import Home from './views/Home';
import Course from './views/course/Course'
import CourseContent from './views/CourseContent';
import Users from './views/users/User';

const MainRouter = () => {
  return (<>
    <Switch>
      <MainLayout >

        <Route exact path="/CourseOnline/dashboard/" component={Home} />
        <Route exact path="/CourseOnline/course/" component={Course} />
        <Route exact path="/CourseOnline/coursecontent/" component={CourseContent} />
        <Route exact path="/CourseOnline/user/" component={Users} />
        
      </MainLayout>
    </Switch>


  </>)
}

export default MainRouter