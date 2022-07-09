import {
  Collection,
  FindCursor,
  MongoClient,
  WithId,
  Document,
  Db,
} from "mongodb";
import MoviesFilter from "../interfaces/MoviesFilter";

let movies: Collection | undefined;

export default class MoviesDAO {
  static async injectDB(conn: MongoClient) {
    if (movies) {
      return;
    }
    try {
      const database: Db = conn.db(process.env.MOVIEREVIEWS_NS);
      movies = database.collection("movies");
      console.log("Successful database injection");
    } catch (e) {
      console.error("Unable to connect in Movies Data-Access-Object: " + e);
    }
  }

  static async getMovies({
    filters = null,
    page = 0,
    moviesPerPage = 20,
  }: MoviesFilter) {
    let query: object = {};
    if (filters) {
      if ("title" in filters) {
        query = { $text: { $search: filters["title"] } };
      } else if ("rated" in filters) {
        query = { rated: { $eq: filters["rated"] } };
      }
    }
    let cursor: FindCursor<WithId<Document>> | undefined; // Posibbly undefined due to 'movies' variable.
    try {
      cursor = movies
        ?.find(query)
        .limit(moviesPerPage)
        .skip(moviesPerPage * page);

      const moviesList: WithId<Document>[] | undefined =
        await cursor?.toArray();
      const totalNumMovies: number | undefined = await movies?.countDocuments(
        query
      );

      return { moviesList, totalNumMovies };
    } catch (error) {
      console.error("Unable to issue find command- No valid query, " + error);
      return {
        moviesList: [],
        totalNumMovies: 0,
      };
    }
  }
}
