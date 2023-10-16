"use server";

import prisma from "@/app/libs/prismadb";

export const getRandomPost = async () => {
  const recordsCount = await prisma.postStats.count();
  const skip = Math.floor(Math.random() * recordsCount);
  const query = await prisma.postStats.findMany({
    take: 1,
    skip: skip,
  });

  if (!query) return null;

  return query[0];
};
