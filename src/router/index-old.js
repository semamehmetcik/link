import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/home-page'
import UserLayout from '../layouts/user-layout'
import AboutPage from '../pages/about-page'
import NotFoundPage from '../pages/not-found-page'
import LoginPage from '../pages/login-page'
import CoursesPage from '../pages/courses-page'
import EventsPage from '../pages/events-page'
import ContactPage from '../pages/contact-page'
import UnAuthorizedPage from '../pages/unauthorized-page'
import ProtectedRoute from './protected-route'
import DashboardHomePage from '../pages/dashboard/home-page'
import AdminPage from '../pages/dashboard/admin-page'
import DeanPage from '../pages/dashboard/dean-page'
import ViceDeanPage from '../pages/dashboard/vice-dean-page'
import LessonPage from '../pages/dashboard/lessons-page'
import TeacherPage from '../pages/dashboard/teacher-page'
import ContactMessagesPage from '../pages/dashboard/contact-messages-page'
import MeetPage from '../pages/dashboard/meet-page'
import ChooseLessonPage from '../pages/dashboard/choose-lesson-page'
import StudentPage from '../pages/dashboard/student-page'
import StudentInfoPage from '../pages/dashboard/student-info-page'
import GradesMeetsPage from '../pages/dashboard/grades-meets-page'

const AppRouter = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="courses" element={<CoursesPage />} />
                    <Route path="events" element={<EventsPage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="unauthorized" element={<UnAuthorizedPage />} />

                    <Route path="dashboard">
                        <Route index element={<ProtectedRoute roles={["ADMIN", "MANAGER", "ASSISTANTMANAGER", "TEACHER", "STUDENT"]}><DashboardHomePage /></ProtectedRoute>} />
                        <Route path="admin-management" element={<ProtectedRoute roles={["ADMIN"]}><AdminPage /></ProtectedRoute>} />
                        <Route path="dean-management" element={<ProtectedRoute roles={["ADMIN"]}><DeanPage /></ProtectedRoute>} />
                        <Route path="vice-dean-management" element={<ProtectedRoute roles={["ADMIN", "MANAGER"]}><ViceDeanPage /></ProtectedRoute>} />
                        <Route path="lesson-management" element={<ProtectedRoute roles={["ADMIN", "ASSISTANTMANAGER"]}><LessonPage /></ProtectedRoute>} />
                        <Route path="teacher-management" element={<ProtectedRoute roles={["ADMIN", "ASSISTANTMANAGER"]}><TeacherPage /></ProtectedRoute>} />
                        <Route path="student-management" element={<ProtectedRoute roles={["ADMIN", "ASSISTANTMANAGER"]}><StudentPage /></ProtectedRoute>} />
                        <Route path="student-info-management" element={<ProtectedRoute roles={["TEACHER"]}><StudentInfoPage /></ProtectedRoute>} />
                        <Route path="grades-meets" element={<ProtectedRoute roles={["STUDENT"]}><GradesMeetsPage /></ProtectedRoute>} />
                        <Route path="meet-management" element={<ProtectedRoute roles={["ADMIN", "TEACHER"]}><MeetPage /></ProtectedRoute>} />
                        <Route path="contact-messages" element={<ProtectedRoute roles={["ADMIN", "MANAGER", "ASSISTANTMANAGER"]}><ContactMessagesPage /></ProtectedRoute>} />
                        <Route path="choose-lesson" element={<ProtectedRoute roles={["STUDENT"]}><ChooseLessonPage /></ProtectedRoute>} />
                    </Route>
                </Route>


                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    )
}

export default AppRouter