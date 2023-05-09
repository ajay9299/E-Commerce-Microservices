import { Request } from "express";

// <----------------------------------------Fetch pageNumber and limit from query----------------------------------------->
export const fetchPageNumberAndLimitFromQuery = (
  req: Request
): { pageNumber: number; limitNumber: number } => {
  const page = req.query.page as string;
  const limit = req.query.limit as string;
  return {
    pageNumber: Number(page),
    limitNumber: Number(limit),
  };
};
