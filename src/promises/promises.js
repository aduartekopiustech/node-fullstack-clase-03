const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!id) {
        reject(new Error("User ID is required"));
        return;
      }

      resolve({ id, name: "John Doe" });
    }, 500);
  });
};
export default getUserById;
