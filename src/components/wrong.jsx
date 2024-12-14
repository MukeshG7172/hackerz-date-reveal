// src/components/Wrong.jsx
export default function Wrong({ onRetry }) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-red-100">
        <h1 className="text-4xl mb-4 text-red-600">Wrong Answer!</h1>
        <button 
          onClick={onRetry}
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
        >
          Retry Quiz
        </button>
      </div>
    )
  }