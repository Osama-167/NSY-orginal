import axios from "axios";

const API = axios.create({
  baseURL: "https://nsybckend-production.up.railway.app/api",
});

// helper to show backend message
const unwrap = (res) => res.data;

const handleErr = (e) => {
  const msg =
    e?.response?.data?.message ||
    e?.response?.data?.error ||
    e?.message ||
    "Request failed";
  throw new Error(msg);
};

// CONTENT
export const getContent = async () => {
  try {
    return unwrap(await API.get("/content")); // { ok, data }
  } catch (e) {
    handleErr(e);
  }
};

export const updateContent = async (payload) => {
  try {
    return unwrap(await API.put("/content", payload));
  } catch (e) {
    handleErr(e);
  }
};

// REGISTRATIONS
export const getRegistrations = async (status = "") => {
  try {
    const qs = status ? `?status=${encodeURIComponent(status)}` : "";
    return unwrap(await API.get(`/registrations${qs}`)); // { ok, data }
  } catch (e) {
    handleErr(e);
  }
};

export const createRegistration = async (payload) => {
  try {
    return unwrap(await API.post("/registrations", payload)); // { ok, data }
  } catch (e) {
    handleErr(e);
  }
};

export const updateRegistrationStatus = async (id, status) => {
  try {
    return unwrap(await API.patch(`/registrations/${id}/status`, { status }));
  } catch (e) {
    handleErr(e);
  }
};

export const deleteRegistration = async (id) => {
  try {
    return unwrap(await API.delete(`/registrations/${id}`));
  } catch (e) {
    handleErr(e);
  }
};

// UPLOAD IMAGE
export const uploadImage = async (file) => {
  try {
    const fd = new FormData();
    fd.append("image", file); // لازم "image"
    return unwrap(
      await API.post("/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ); // { ok, url }
  } catch (e) {
    handleErr(e);
  }
};

export const api = {
  getContent,
  updateContent,

  getRegistrations,
  createRegistration,
  updateRegistrationStatus,
  deleteRegistration,

  uploadImage,
};
