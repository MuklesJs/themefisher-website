const validateFile = (fileInputRef, userDispatch) => {
  const fileInput = fileInputRef.current;
  if (!fileInput) return null;

  const validationMessageElement = document.getElementById("validationMessage");

  const file = fileInput.files[0];
  const allowedExtensions = ["jpg", "jpeg", "png"];
  const fileSizeLimit = 100 * 1024; // 100kb in bytes

  const fileExtension = file.name.split(".").pop().toLowerCase();
  if (!allowedExtensions.includes(fileExtension)) {
    validationMessageElement.textContent =
      "Please select a valid image file (jpg, jpeg, or png).";
    userDispatch({
      type: "UPDATE_ERROR",
      payload: true,
    });
    fileInput.value = ""; // Reset the file input
    return;
  }

  if (file.size > fileSizeLimit) {
    validationMessageElement.textContent =
      "File size exceeds the limit of 100kb.";
    userDispatch({
      type: "UPDATE_ERROR",
      payload: true,
    });
    fileInput.value = ""; // Reset the file input
    return;
  } else {
    userDispatch({
      type: "UPDATE_ERROR",
      payload: false,
    });
  }

  validationMessageElement.textContent = "";
};
export default validateFile;
