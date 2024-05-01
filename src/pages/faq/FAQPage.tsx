import React, { useState } from 'react';
import ColorCard from "../../components/ColorCard";
import image from "../../assets/artists/cryex_pfp.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import questionsData from "./questions"

const FAQPage: React.FC = () => {
  const categories = ["Artist", "Label", "Fan", "Other"];
  const [selectedCategory, setSelectedCategory] = useState('Artist');

  const updateSelected = (index: number) => {
    setSelectedCategory(categories[index]);
  };

  return (
    <div className="w-full h-full flex flex-col p-4" >
      <h1 className="text-3xl font-bold text-center">FAQ</h1>
      <div className="flex flex-row items-center justify-center">
        {categories.map((type, index) => (
          <ColorCard
            title={type}
            imageUrl={image}
            selected={selectedCategory === categories[index]}
            index={index}
            selectCard={updateSelected}
            key={index}
          />
        ))}
      </div>
      <hr className="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
      <div className="accordionsFAQ flex flex-col justify-center items-center">
        {questionsData[selectedCategory].map((question, index) => (
          <Accordion type="single" collapsible className="w-full" key={question.id}>
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger>{question.question}</AccordionTrigger>
              <AccordionContent>{question.answer}</AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
