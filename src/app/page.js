// src/app/page.js
import prisma from '@/lib/prisma';
import QuizStartPage from '@/components/QuizStartPage'; 

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
  
  return <QuizStartPage initialQuestions={questions} />;
}