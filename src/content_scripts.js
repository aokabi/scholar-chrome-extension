chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  console.log(msg.color);
  papers = [];
  $(".gs_ri").each(function (i, e) {
    // ここに一つずつの処理を入れる
    var title = $(e).find("h3").find("a").text();
    var authors = $(e).find(".gs_a").text().split(String.fromCharCode(160))[0];
    var year = $(e).find(".gs_a").text().split(String.fromCharCode(160))[2];
    papers.push(new Paper(title, authors, year));
  });
  var csv = CSV(papers);
  console.log(csv); 
  console.log(papers[1].year);
  console.log(papers[1].authors);
  const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
  var blob = new Blob([bom, csv], {"type": "text/csv"});
  const url = window.URL.createObjectURL(blob);
      setTimeout(() => {
              window.URL.revokeObjectURL(url);
            }, 1000)
  sendResponse(url);
});

class Paper {
  constructor(title, authors, year) {
    this.title = title;
    this.authors = authors;
    this.year = year;
  }
}

function CSV(array) {
  var keys = Object.keys(array[0]);
  var str = keys.join('\t')+"\n";

  array.forEach(function(obj) {
    str += keys.map(k => obj[k]).join('\t') + "\n";
  });
  return str
}
