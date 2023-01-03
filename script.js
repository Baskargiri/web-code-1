var div = document.createElement('div');
div.innerHTML =`
<span>Name :</span>
<input type="text" placeholder="Enter a name" id="name"><br><br>
<button id="btn">Search for the nationality</button><br>
<button id="res_btn">reset</button>
<div class="res">
<h2 id=fname></h2>
<p id="countries_1"></p>
<p id="countries_2"></p>
</div>`;
document.body.append(div);

var cl= document.getElementById('btn');
cl.addEventListener('click',search)

function search(e){
    e.preventDefault();
    var Name=document.getElementById('name').value;
    var mass = `https://api.nationalize.io?name=${Name}`;

    async function call(){
        try{
        var fetch_url= await fetch(mass);
        var data = await fetch_url.json();
        // console.log(data);

        var country = data.country[0].country_id; 
        var prob1 = data.country[0].probability;
        var rest_url= await fetch("https://restcountries.com/v2/all");
        var data_res = await rest_url.json();
        var fil = data_res.filter((e)=>e.alpha2Code==country);
        var cont=fil.map((e)=>e.name)
       // console.log(cont[0]);
        document.querySelector('h2').innerText=Name;
        document.querySelector('#countries_1').innerText=` Country id = ${country}   probability value = ${prob1} Country name = ${cont[0]}` 
        
        var country2 = data.country[1].country_id; 
        var prob2= data.country[1].probability;
        var rest_url= await fetch("https://restcountries.com/v2/all");
        var data_res = await rest_url.json();
        var fil = data_res.filter((e)=>e.alpha2Code==country2);
        // console.log(fil);
        var cont2=fil.map((e)=>e.name)
        // console.log(cont2[0]);
        document.querySelector('#countries_2').innerText=` Country id = ${country2}   probability value = ${prob2} Country name = ${cont2[0]}` 
        }
        catch{
            console.log("error in fetch form api")
        }

    
    }
    call()
}
 var clr=document.getElementById('res_btn');
 clr.addEventListener('click',()=>{
    document.getElementById('name').value="";
    document.querySelector('h2').innerText="";
    document.querySelector('#countries_2').innerText="";
    document.querySelector('#countries_1').innerText="";

 })


















