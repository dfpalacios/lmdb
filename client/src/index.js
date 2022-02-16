import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'

import App from './App'
import reportWebVitals from './reportWebVitals'
import UserProvider from './context/user/UserProvider'
import ModalProvider from './context/modal/ModalProvider'
import Index from './routes/index'
import About from './routes/about'
import BoxOffice from './routes/box-office'
import Movie from 'routes/movie'
import NotFound from 'routes/not-found'
import ProtectedRoute from 'components/routes/ProtectedRoute'
import Profile from 'routes/profile'

import 'utils/axiosHeaders'

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} >
              <Route index element={<Index />} />
              <Route path="about" element={<About />} />
              <Route path="box-office" element={<BoxOffice />} />
              <Route path="movie/:movieId" element={<Movie />} />
              <Route path="profile" element={<ProtectedRoute />}>
                <Route index element={<Profile />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
