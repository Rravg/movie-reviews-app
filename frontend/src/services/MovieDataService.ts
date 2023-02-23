import axios from "axios";

const URL_STRING = "https://movies-revies-app-backend.up.railway.app";

class MovieDataService {
  getAll(page: number = 0) {
    return axios.get(`/api/v1/movies?page=${page}`);
  }

  get(id: number) {
    return axios.get(`${URL_STRING}/api/v1/movies/id/${id}`);
  }

  find(query: string, by: string = "title", page: number = 0) {
    return axios.get(
      `${URL_STRING}/api/v1/movies?${by}=${query}&page=${page}`
    );
  }

  createReview(data: object) {
    return axios.post(`${URL_STRING}/api/v1/movies/review`, data);
  }

  updateReview(data: object) {
    return axios.put(`${URL_STRING}/api/v1/movies/review`, data);
  }

  deleteReview(id: any, userId: any) {
    return axios.delete(`${URL_STRING}/api/v1/movies/review`, {
      data: { review_id: id, user_id: userId },
    });
  }

  getRatings() {
    return axios.get(`${URL_STRING}/api/v1/movies/ratings`);
  }
}

export default new MovieDataService();
