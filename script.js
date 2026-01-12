function generate(){

  const email = document.getElementById("email").value.trim();
  const game = document.getElementById("game").value;

  if(email === ""){
    alert("Enter email");
    return;
  }

  fetch(game + ".csv")
  .then(res => res.text())
  .then(text => {
    const rows = text.split("\n");
    let found = false;

    for(let i=1;i<rows.length;i++){
      const [csvEmail,name] = rows[i].split(",");

      if(csvEmail && csvEmail.trim() === email){
        found = true;
        drawCertificate(name.trim(), game);
        break;
      }
    }

    if(!found){
      alert("No record found for this game");
    }
  });
}

function drawCertificate(name, game){
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const img = new Image();
  img.src = "certificate.png";

  img.onload = function(){
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img,0,0);

    // NAME
    ctx.fillStyle = "white";
    ctx.font = "300px Arial bold";
    ctx.textAlign = "left";
    ctx.fillText(name, 2100, 1920);

    // EVENT NAME
    ctx.fillStyle = "#ffd369";
    ctx.font = "150px Arial bold";
    ctx.fillText(game.toUpperCase(), 2400, 2400);

    document.getElementById("download").href = canvas.toDataURL("image/png");
  }
}

