function convert() {
  let videoURL = document.getElementById("videoURL").value.trim();
  const fileType = document.getElementById("fileType").value;

  // console.log(fileType);

  if (!videoURL) {
    alert("Please enter a valid YouTube video URL.");
    return;
  }

  // Remove everything after the first '&' character in the URL
  const ampersandIndex = videoURL.indexOf('&');
  if (ampersandIndex !== -1) {
    videoURL = videoURL.substring(0, ampersandIndex);
  }

  console.log(videoURL);

  // Extract the video ID from the YouTube URL
  // const videoID = extractVideoID(videoURL);

  // if (!videoID) {
  //   alert("Invalid YouTube video URL. Please enter a valid URL.");
  //   return;
  // }

  // const apiUrl = `https://convert2mp3s.com/api/single/${fileType}?url=${videoURL}`;
  const apiUrl = `https://convert2mp3s.com/api/widgetv2?url=${videoURL}`;
  const statusDiv = document.getElementById("status");
  const downloadLink = document.getElementById("downloadLink");

  statusDiv.innerText = "Conversion in progress...";
  downloadLink.style.display = "none";

  fetch(apiUrl)
    .then((response) => response.text())
    .then((data) => {
      const downloadUrl = data;
      if (downloadUrl) {
        statusDiv.innerText = "Download link generated.";
        downloadLink.style.display = "block";
        downloadLink.setAttribute("href", apiUrl);
      } else {
        statusDiv.innerText =
          "Conversion failed. Please check the URL and try again.";
      }
    })
    .catch((error) => {
      statusDiv.innerText = "An error occurred.";
      console.error(error);
    });
}

function extractVideoID(url) {
  const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function extractDownloadUrl(htmlText) {
  const match = htmlText.match(/<a href="(.*?)".*?>Download File<\/a>/);
  return match ? match[1] : null;
}
