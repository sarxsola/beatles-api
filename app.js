var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]


http.createServer(function (req, res) {

  try {
  //INDEX API

  if(req.url === '/api'){
    res.writeHead(200, {'Content-Type' : 'application/json'});
    res.end(JSON.stringify(beatles));
  }


  //API INTEGRANTES
  else if(req.url.match(/\/api\/([a-zA-Z]+)/)){
    var artistName = req.url.split('/')[2].replace(/%20/g, " ");
    var beatleBuscado = beatles.filter((beatle) => beatle.name === artistName);

    if(beatleBuscado.length === 1) {
      try {
        res.writeHead(200, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify(beatleBuscado));
      }
      catch(error) {
        console.log(error);
      }
    }

    //SI HAY ERROR 
    else {
        failure(res);
    }
  }

  //INDEX
  else if(req.url === '/'){
    res.writeHead(200, {'Content-Type' : 'text-html'});
    var html = fs.readFileSync(`${__dirname}/index.html`);
    console.log("matias" + apellido)
    res.end(html);
  }
  
  //ARTISTA
  else{
    var nameUrl = req.url.split('/')[1];
    var artistName = nameUrl.replace(/%20/g, " ");
    var beatleBuscado = beatles.filter((beatle) => beatle.name === artistName);

    console.log(beatleBuscado);

    if(beatleBuscado.length === 1) {
      res.writeHead(200, {'Content-Type' : 'text-html'});
      var html = fs.readFileSync(`${__dirname}/beatle.html`, 'utf-8');
      var name = beatleBuscado[0].name;
      var birthdate = beatleBuscado[0].birthdate;
      var profilePic = beatleBuscado[0].profilePic;

      html = html.replace('{name}', name);
      html = html.replace('{name}', name);
      html = html.replace('{name}', name);
      html = html.replace('{birthdate}', birthdate);
      html = html.replace('{profilePic}', profilePic);
      html = html.replace('{nameUrl}', nameUrl);

      res.end(html)
    }

    // SI HAY ERROR
    else {
      failure(res);
    }
  }
}

  catch(error){
  console.log(error);
}

}).listen(1337, '127.0.0.1');

var failure = function(res) {
  res.writeHead(404, {'Content-Type' : 'text-html'});
  var html = fs.readFileSync(`${__dirname}/failure.html`);
  res.end(html);
}