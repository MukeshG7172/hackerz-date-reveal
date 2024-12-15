// src/app/page.js
import prisma from '@/lib/prisma';
import QuizEndPage from '@/components/QuizEndPage'; 

async function getQuestions() {
  try {
    const questions = await prisma.question.findMany({
      orderBy: { id: 'asc' }
    });
    return questions;
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
}

export default async function Page() {
  const questions = await getQuestions();
  
  return <QuizEndPage initialQuestions={questions} />;
}