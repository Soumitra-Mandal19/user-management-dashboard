import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

// Local copy of users data
let localUsers = [];

// Get users - check local copy first, then API if needed
export const getUsers = async () => {
  if (localUsers.length > 0) {
    // Return local copy if available
    return { data: localUsers };
  }

  try {
    // Fetch from API and store in local copy
    const response = await axios.get(API_URL);
    localUsers = response.data;
    return response;
  } catch (error) {
    throw error;
  }
};

// Get user by ID from local copy
export const getUserById = (id) => {
  const user = localUsers.find((u) => u.id === parseInt(id));
  if (user) {
    return Promise.resolve({ data: user });
  }
  // Fallback to API if not found locally
  return axios.get(`${API_URL}/${id}`);
};

// Delete user - update local copy after successful API call
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    // Update local copy
    localUsers = localUsers.filter((user) => user.id !== parseInt(id));
    return response;
  } catch (error) {
    throw error;
  }
};

// Add user - update local copy after successful API call
export const addUser = async (user) => {
  try {
    user.id = getNextId();
    const response = await axios.post(API_URL, user);
    // Add to local copy with generated ID (JSONPlaceholder returns created user)
    if (response.data) {
      localUsers.push(user);
    }
    return response;
  } catch (error) {
    throw error;
  }
};

// Update user - update local copy after successful API call
export const updateUser = async (id, user) => {
  try {
    // Api call will fail for id greater than 10, so we need to handle that
    // because the jsonplaceholder api will not work with id greater than 10
    let fakeId = id;
    if (fakeId > 10) {
      fakeId = 10;
    }
    const response = await axios.put(`${API_URL}/${fakeId}`, user);
    // Update local copy
    const index = localUsers.findIndex((u) => u.id === parseInt(id));
    if (index !== -1) {
      localUsers[index] = { ...localUsers[index], ...user };
    }
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Generates the next unique user ID based on the current localUsers array.
 * Finds the maximum existing user ID and returns the next integer.
 * Assumes all user IDs are numeric.
 *
 * @returns {number} The next available user ID.
 */
const getNextId = () => {
  const numbers = localUsers.map((user) => user.id);
  return Math.max(...numbers) + 1;
};
