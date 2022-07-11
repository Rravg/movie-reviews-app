import axios from "axios";

class MovieDataService {
  getAll(page: number = 0) {
    return axios.get(`http://localhost:5000/api/v1/movies?page=${page}`);
  }

  get(id: number) {
    return axios.get(`http://localhost:5000/api/v1/movies/id/${id}`);
  }

  find(query: string, by: string = "title", page: number = 0) {
    return axios.get(
      `http://localhost:5000/api/v1/movies?${by}=${query}&page=${page}`
    );
  }

  createReview(data: object) {
    return axios.post("http://localhost:5000/api/v1/movies/review", data);
  }

  updateReview(data: object) {
    return axios.put("http://localhost:5000/api/v1/movies/review", data);
  }

  deleteReview(id: any, userId: any) {
    return axios.delete("http://localhost:5000/api/v1/movies/review", {
      data: { review_id: id, user_id: userId },
    });
  }

  getRatings() {
    return axios.get("http://localhost:5000/api/v1/movies/ratings");
  }
}

export default new MovieDataService();
