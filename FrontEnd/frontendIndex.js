var name = '';
var file = null;
var encoded = null;
var fileExt = null;
window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const synth = window.speechSynthesis;
const recognition = new SpeechRecognition();
function voiceSearch() {
    recognition.start()
    recognition.onresult = (event) => {
    var speechToText = event.results[0][0].transcript;
    document.getElementById("search").value += speechToText;
    console.log(speechToText)
    var apigClient = apigClientFactory.newClient({ apiKey: "6mIjg8JbIpmExQac9AZa5WkoEz2YV6J9crKV1Jk1" });
    var params = {
      "q": speechToText
    };
    var body = {
      "q": speechToText
    };

    var additionalParams = {
      queryParams: {
        q: speechToText
      }
    };

    apigClient.searchGet(params, body, additionalParams)
      .then(function (result) {
        console.log('success OK');
        showImages(result.data);
        console.log(result.data.results);
      }).catch(function (result) {
        console.log(result);
        console.log(speechToText);
      });
  }

}

function readFile(input) {
  var reader = new FileReader();
  file = input.files[0];
  console.log(file)
  name = file.name;
  fileExt = name.split(".")[1];
  reader.onload = function (e) {
    var src = e.target.result;
    var newImage = document.createElement("img");
    newImage.src = src;
    encoded = newImage.outerHTML;
  }
  reader.readAsDataURL(file);
}

function upload() {
  last_index_quote = encoded.lastIndexOf('"');
  if (fileExt == 'jpg' || fileExt == 'jpeg') {
    encodedStr = encoded.substring(33, last_index_quote);
  }
  else {
    encodedStr = encoded.substring(32, last_index_quote);
  }
  var apigClient = apigClientFactory.newClient({ apiKey: "6mIjg8JbIpmExQac9AZa5WkoEz2YV6J9crKV1Jk1" });
  var labels = document.getElementById("custom_labels").value;
  var params = {
    "object": name,
    "folder": "coms6998-cloud-hw2-b2",
    "Content-Type": file.type+";base64",
    "x-amz-meta-customLabels": labels,
    "x-api-key": "6mIjg8JbIpmExQac9AZa5WkoEz2YV6J9crKV1Jk1",
  };

  var additionalParams = {
    headers: {
      "Content-Type": file.type+";base64",
      "x-amz-meta-customLabels": labels,
    }
  };

  apigClient.uploadFolderObjectPut(params, encodedStr, additionalParams)
    .then(function (result) {
      console.log('success OK');
      console.log(result);
      alert("You have uploaded the photo!");
    }).catch(function (result) {
      console.log(result);
    });

}
 window.onload = function(){
  var s = document.getElementById("search");
  if(s){
  s.addEventListener("keydown", function (e) {
    console.log(e.code)
      if (e.code === "ShiftLeft"||e.code=="ShiftRight") {
       search(e);
      }
  });
  }
};

function search() {
  var searchTerm = document.getElementById("search").value;
  var apigClient = apigClientFactory.newClient({ apiKey: "6mIjg8JbIpmExQac9AZa5WkoEz2YV6J9crKV1Jk1" });
  var params = {
    "q": searchTerm,
  };
  var body = {
    "q": searchTerm
  };

  var additionalParams = {
    queryParams: {
      q: searchTerm
    }
  };
  console.log(searchTerm);
  apigClient.searchGet({q:searchTerm},body,additionalParams)
    .then(function (result) {
      console.log('success OK');
      console.log(result)
      showImages(result.data);
    }).catch(function (result) {
      console.log(result);
    });
}

function showImages(res) {
  var newDiv = document.getElementById("div");
  if(typeof(newDiv) != 'undefined' && newDiv != null){
  while (newDiv.firstChild) {
    newDiv.removeChild(newDiv.firstChild);
  }
}
  console.log(res)
  console.log(res[0])

  if (res==undefined || res.length == 0) {
    var newContent = document.createTextNode("No images found");
    newDiv.appendChild(newContent);
    var currentDiv = document.getElementById("div1");
    document.body.insertBefore(newDiv, currentDiv);
  }
  else {
    for (var i = 0; i < res.length; i++) {

      var newDiv = document.getElementById("div");
      newDiv.style.display = 'inline'
      var newContent = new Image();
      newContent.src = res[i];
      newContent.style.padding = "20px";
      newContent.style.height = "200px";
      newContent.style.width = "200px";
      newDiv.appendChild(newContent);
      var currentDiv = document.getElementById("div1");
      document.body.insertBefore(newDiv, currentDiv);
    }
  }
}
