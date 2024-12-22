import QuizStartPage from '@/components/QuizStartPage'; 


export default async function Page() {
  const questions = [
    {
      id: 1,
      question: "What is the theme of Hackerz 2025?",
      option1: "White Hat Hackers",
      option2: "Black Hat Hackers",
      option3: "Cybersecurity",
      option4: "Communication",
      answer: "White Hat Hackers" 
    },
    {
      id: 2,
      question: "White Hat Hackers are know for?",
      option1: "Stealing data",
      option2: "Ethical Hacking",
      option3: "Non Ethical Hacking",
      option4: "Creating Viruses",
      answer: "Ethical Hacking"
    },
    {
      id: 3,
      question: "What is the FlagShip Event of Hackerz 2025?",
      option1: "Code-a-thon",
      option2: "Idea-a-thon(Seeds Start)",
      option3: "Competitive Programming",
      option4: "AI Challenge",
      answer: "Idea-a-thon(Seeds Start)"
    }
  ];
  
  
  return <QuizStartPage initialQuestions={questions} />;
}