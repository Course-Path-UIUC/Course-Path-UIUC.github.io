import './style.css'
import CourseSelector from './CourseSelector';

const App = () => {
  return (
    <>
      <main className='p-8'>
        <h1>Course Path</h1>
        <p>Course path applies topological graph sorting to a list of classes to display them in an order that satisfies prerequisites.</p>
        <CourseSelector />
      </main>
      <footer className='p-8 bg-slate-200 dark:bg-slate-900'>
        Made with 💙 by: Aastha - Daniel - Kristin
      </footer>
    </>
  );
};

export default App;
