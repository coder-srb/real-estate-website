import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  console.log("Incoming data:", req.body.data);

  // 1. Check if user exists
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) {
    return res.status(404).json({ message: "User with the provided email does not exist" });
  }

  try {
    // 2. Create residency and link user as owner
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: {
          connect: { email: user.email },
        },
      },
    });

    res.status(201).json({ message: "Residency created successfully", residency });
  } catch (err) {
    console.error("Residency creation error:", err);
    if (err.code === "P2002") {
      throw new Error("A residency with this address already exists for the user");
    }
    throw new Error(err.message);
  }
});


// function to get all the documents/residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send(residencies);
});

// function to get a specific document/residency
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const residency = await prisma.residency.findUnique({
      where: { id },
    });
    res.send(residency);
  } catch (err) {
    throw new Error(err.message);
  }
});