"use client";

import { BlogPostType } from "@/app/(frontend)/(blog)/mikroblog/(tabs)/_types/BlogPost";
import { useState } from "react";
import SurveyAnswer from "./_components/SurveyAnswer";
import axios from "axios";
import toast from "react-hot-toast";
import formatDistance from "date-fns/formatDistance";
import { pl } from "date-fns/locale";

type SurveyProps = {
  questionnaire: NonNullable<BlogPostType["questionnaire"]>;
  markedOptions?: number[];
};

const Survey: React.FC<SurveyProps> = ({
  questionnaire,
  markedOptions = [],
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [voteCount, setVoteCount] = useState<number>(
    questionnaire.votes.length
  );
  const [answers, setAnswers] = useState(
    questionnaire.answers.map((answer) => ({
      ...answer,
      votes: questionnaire.votes.filter((vote) => vote.answerId === answer.id)
        .length,
      isMarked: markedOptions.includes(answer.id),
    }))
  );

  const handleOnClickAnswer = (id: number) => {
    setIsLoading(true);
    axios
      .post(`/api/blog/survey/${questionnaire.id}/vote`, { id })
      .then((res) => res.data)
      .then(({ markedIds, votes }) => {
        setAnswers((prev) => {
          const newState = [...prev];

          return newState.map((item) => ({
            ...item,
            votes: votes.filter(
              (voteitem: { answerId: number }) => voteitem.answerId === item.id
            ).length,
            isMarked: markedIds.includes(item.id),
          }));
        });

        setVoteCount(votes.length);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Wystąpił problem!");
      })
      .finally(() => setIsLoading(false));
  };

  const time = questionnaire.availableTo;

  const isAvailableTo = !!time;

  const isEndedSurvey = isAvailableTo ? new Date() > time : false;

  return (
    <div className="text-white w-full mb-[25px] relative">
      <h3 className="block mb-[5px] text-[1.17em] font-bold">
        {questionnaire.title}
      </h3>
      <ul className="mb-[10px]">
        {answers.map((answer) => (
          <SurveyAnswer
            key={answer.id}
            answer={answer}
            markOption={questionnaire.markOption}
            voteCount={voteCount}
            onClick={() => handleOnClickAnswer(answer.id)}
            disabled={isEndedSurvey || isLoading}
          />
        ))}
      </ul>
      <div className="my-[20px] text-center italic text-[#6e7578] text-[12px]">
        Wszystkich głosów: <span className="font-bold">{voteCount}</span>
      </div>
      {isAvailableTo && (
        <div>
          <time className="italic text-[#b6babb] text-[11px]">
            {isEndedSurvey
              ? "Ankieta została zakończona"
              : "Ankieta kończy się za " +
                formatDistance(questionnaire.availableTo!, new Date(), {
                  addSuffix: true,
                  locale: pl,
                })}
          </time>
        </div>
      )}
    </div>
  );
};

export default Survey;
