import ApiClient from "../utils/api-client";

const apiClient = new ApiClient("/boards");


export function fetchBoard(id) {
  return apiClient.get(`/${id}`);
}

export function addBoard(name) {
  return apiClient.post("/", { body: { name } });
}

export function fetchBoards() {
  return apiClient.get("/");
}

export function updateBoards(boards) {
  return apiClient.put("/", { body: boards });
}

export function deleteBoards(boards) {
  return apiClient.delete("/", { body: boards })
    .then(() => boards);
}
