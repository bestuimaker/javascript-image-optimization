(function () {
  var uploadFiles = function (files, file, index, qualityIndex) {
    if (!file) return;
    if (!qualityIndex) qualityIndex = 0.6;

    console.log(index);
    new Compressor(file, {
      quality: qualityIndex,

      // The compression process is asynchronous,
      // which means you have to access the `result` in the `success` hook function.
      success(result) {
        const formData = new FormData();

        // The third parameter is required for server
        formData.append("profile-file", result, result.name);
  
        // Send the compressed image file to server with XMLHttpRequest.
        axios
          .post("http://localhost:3000/profile-upload-single", formData)
          .then(() => {
            console.log("Upload success");
            console.log(index);
            // totalPercent = totalPercent+i;
            // updateProgressBar(index);
          });
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  var toggleProgressBar = function (isEnable) {
    document.getElementById("upload-progress").style.display =
      isEnable === true ? "block" : "none";
  };
  var updateProgressBar = function (totalPercent) {
    console.log(totalPercent)
    document.getElementById("progress-bar").style.width = totalPercent+'%';
  };

  document.getElementById("profile-file").addEventListener("change", (e) => {});

  document.getElementById("upload-button").addEventListener("click", (e) => {
    e.preventDefault();
    var qualityIndex = parseFloat(document.getElementById("quality").value);
    const fileList = document.getElementById("profile-file").files;
    // toggleProgressBar(true);
    for (var i = 0; i < fileList.length; i++) {
      uploadFiles(fileList, fileList[i], i, qualityIndex);
    }
    console.log("done");
    // toggleProgressBar(false);
  });
})();
