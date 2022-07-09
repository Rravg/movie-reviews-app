import { Request, Response, NextFunction } from "express";
import Filter from "../interfaces/Filter";
import MoviesDAO from "../dao/moviesDAO";

export default class MoviesController {
  static async apiGetMovies(req: Request, res: Response, next: NextFunction) {
    const moviesPerPage: number = req.query.moviesPerPage
      ? parseInt(req.query.moviesPerPage as string)
      : 20;
    const page = req.query.page ? parseInt(req.query.page as string) : 0;

    let filters: Filter = {};
    if (req.query.rated) {
      filters.rated = req.query.rated as string;
    } else if (req.query.title) {
      filters.title = req.query.title as string;
    }

    const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({
      filters,
      page,
      moviesPerPage,
    });

    let response: object = {
      movies: moviesList,
      page: page,
      filters: filters,
      entries_per_page: moviesPerPage,
      total_results: totalNumMovies,
    };

    res.json(response);
  }
}
