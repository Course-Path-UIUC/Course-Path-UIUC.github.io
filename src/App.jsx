import './style.css'
import Form from './Form';

const App = () => {
  return (
    <>
      <main className='p-8'>
        <h1 className='text-center text-4xl font-medium tracking-wide text-blue-900 sm:text-5xl dark:text-blue-50'>
          Course Path
        </h1>
        <p className='text-center text-balance text-slate-950 dark:text-slate-300'>
          Course path applies topological graph sorting to a list of classes to display them in an order that satisfies prerequisites.
        </p>
        <Form />
      </main>
      <footer className='text-center p-8 bg-slate-200 dark:bg-slate-800'>
        Made with 💙 by: Aastha - Daniel - Kristin
      </footer>
    </>
  );
};

export default App;
