import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Estudiantes from './components/Estudiantes/ListEstudiantes';
import "bootstrap/dist/css/bootstrap.min.css"
import NewEstudiante from './components/Estudiantes/NewEstudiante';
import NavBar from './components/NavBar';
import UpdateEstudiante from './components/Estudiantes/UpdateEstudiante';
import Profesores from './components/Profesores/ListProfesores';
import NewProfesor from './components/Profesores/NewProfesor';
import UpdateProfesor from './components/Profesores/UpdateProfesor';
import Asignaturas from './components/Asignaturas/ListAsignaturas';
import NewAsignatura from './components/Asignaturas/NewAsignatura';
import UpdateAsignatura from './components/Asignaturas/UpdateAsignatura';
import Calificaciones from './components/Calificaciones/ListCalificaciones';
import NewCalificacion from './components/Calificaciones/NewCalificacion';
import UpdateCalificacion from './components/Calificaciones/UpdateCalificacion';

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/'  element={<Home/>}/>
        <Route path='/estudiantes'  element={<Estudiantes/>}/>
        <Route path='/profesores'  element={<Profesores/>}/>
        <Route path='/asignaturas'  element={<Asignaturas/>}/>
        <Route path='/calificaciones'  element={<Calificaciones/>}/>
        <Route path='/crear/estudiante'  element={<NewEstudiante/>}/>
        <Route path='/crear/profesor'  element={<NewProfesor/>}/>
        <Route path='/crear/asignatura'  element={<NewAsignatura/>}/>
        <Route path='/crear/calificacion'  element={<NewCalificacion/>}/>
        <Route path='/editar/estudiante'  element={<UpdateEstudiante/>}/>
        <Route path='/editar/profesor'  element={<UpdateProfesor/>}/>
        <Route path='/editar/asignatura'  element={<UpdateAsignatura/>}/>
        <Route path='/editar/calificacion'  element={<UpdateCalificacion/>}/>
      </Routes>
    </Router>
  );
}

export default App;
