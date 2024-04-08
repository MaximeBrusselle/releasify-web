import React, { useState } from 'react';
import ColorCard from "../components/ColorCard";
import image from "../assets/image.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

const AboutPage: React.FC = () => {
  const types = ["Artist", "Label", "Fan", "Other"];
  const [selected, setSelected] = useState<number>(0);

  const faqs: FAQ[] = [
    {
      question: "What is Shadcn?",
      answer: "ShadcN is a platform that allows artists to mint their music as NFTs and sell them to fans. It also allows fans to buy and sell music NFTs.",
    },
    {
      question: "What is an NFT?",
      answer: "NFT stands for non-fungible token. It is a unique digital asset that is stored on a blockchain.",
    },
    {
      question: "How do I mint an NFT?",
      answer: "To mint an NFT, you need to create a digital asset, such as a song or an image, and upload it to a platform that supports NFTs.",
    },
    {
      question: "How do I buy an NFT?",
      answer: "To buy an NFT, you need to connect your wallet to a platform that supports NFTs and purchase the NFT using cryptocurrency.",
    }
  ];

  const updateSelected = (index: number) => {
    setSelected(index);
  };

  return (
    <div className="w-full h-full flex flex-col p-4" >
      <div className="flex flex-row items-center justify-center">
        {types.map((type, index) => (
          <ColorCard
            title={type}
            imageUrl={image}
            selected={index === selected}
            index={index}
            selectCard={updateSelected}
            key={index}
          />
        ))}
      </div>
      <hr className="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
      <div className="accordionsFAQ flex flex-col justify-center items-center">
        {faqs.map((faq, index) => (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          </Accordion>

        ))}
      </div>
    </div>
  );
};

export default AboutPage;
