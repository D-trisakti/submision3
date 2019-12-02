var base_url = "https://api.football-data.org/v2/";
function httpsFormated(url) {
  return url.replace(/^http:\/\//i, "https://");
}
// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}
// Blok kode untuk melakukan request data json
function getCompetitions() {

  fetch(base_url + "competitions/2021/standings?standingType=TOTAL",{
    headers : {
        'X-Auth-Token': "8e01521d33a942fd96c3c827ef85e6a4"
    }
  })
    .then(status)
    .then(json)
    .then(function(data)
     {
      console.log(data);
      var standingHTML = "";
      data.standings.forEach(function (competition) {
        standingHTML += `
        <div class="card-warpper">
        <table class="striped">
            <h5 class="card-title"><center>Klasemen Premier League </center></h5>  
          <thead>
            <tr>
              <td>Posisi</td>
              <td>Club</td>
              <td>Point</td>
              <td>menang</td>
              <td>seri</td>
              <td>kalah</td>
            </tr>
        </thead>
        `; 
       competition.table.forEach(function (group){
          standingHTML += `
          <tbody>
          <tr>
           <td>${group.position}</td>
           <td><img width ="20" height ="20" src="${group.team.crestUrl}"> <a href="/teams.html?id=${group.team.id}"> ${group.team.name}</a></td>
           <td>${group.points}</td>
           <td>${group.won}</td>
           <td>${group.draw}</td>
           <td>${group.lost}</td>
       </tr>
          </tbody>
          `;
       });
       standingHTML +="</table>";
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("standing").innerHTML = standingHTML;
      
    })
    .catch(error);
}

function getTeamById() {
  // Ambil nilai query parameter (?id=)
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  if ("caches" in window) {
    caches.match(base_url + "teams/" + idParam).then(function(response) {
      if (response) {
        response.json()
        .then(function(data) {
          console.log(data);
          var p,player = "";
          for (p in data.squad){
            player += "<tr>" + "<td>" +data.squad[p].name + "</td>" + "<td>" +data.squad[p].countryOfBirth + "</td>" + "<td>" +data.squad[p].position + "</td>" + "</tr>";
          }
         var teamsHTML = `
          <div class = "card-warpper">
          <center><h4><img width ="30" height ="30" src ="${data.crestUrl}">  ${data.shortName}</h4>
          <p>address : ${data.address}</p>
          <p>Email :  ${data.email}</p>
          <p>Phone :  ${data.phone}</p></center>
          <h5><center> Daftar Pemain ${data.name}</center></h5>
          <table>
              <thead>
              <tr>
                <td> Nama </td>
                <td> Asal Negara </td>
                <td> Posisi </td>
              </tr>
              </thead>
              <tbody>
              ${player}
              </tbody>
              </table>
         `;
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("body-content").innerHTML =teamsHTML;
        });
      }
    });
  };

  fetch(base_url + "teams/"+idParam,{
    headers : {
        'X-Auth-Token': "8e01521d33a942fd96c3c827ef85e6a4"
    }
  })
    .then(status)
    .then(json)
    .then(function(data) {
      console.log(data);
      var p,player = "";
      for (p in data.squad){
        player += "<tr>" + "<td>" +data.squad[p].name + "</td>" + "<td>" +data.squad[p].countryOfBirth + "</td>" + "<td>" +data.squad[p].position + "</td>" + "</tr>";
      }
     var teamsHTML = `
      <div class = "card-warpper">
      <center><h4><img width ="30" height ="30" src ="${data.crestUrl}">  ${data.shortName}</h4>
      <p>address : ${data.address}</p>
      <p>Email :  ${data.email}</p>
      <p>Phone :  ${data.phone}</p></center>
      <h5><center> Daftar Pemain ${data.name}</center></h5>
      <table>
          <thead>
          <tr>
            <td> Nama </td>
            <td> Asal Negara </td>
            <td> Posisi </td>
          </tr>
          </thead>
          <tbody>
          ${player}
          </tbody>
          </table>
     `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML =teamsHTML;
    });
}