//Estado global da aplicação
let inputUser = null;
let submitSearch = null;

let showUsers = null;
let countUser = null;
let countM = null;
let countF = null;
let countAge = null;
let avrAge = null;

let filtredUser = [];

//Função start
window.addEventListener("load", () => {
  mapDom();
  fetchUsers();
});

//Mapear o DOM
const mapDom = () => {
  //Contar usuarios primeiro quadro
  countUser = document.querySelector("#countUser");

  //Exibir todos os usuarios
  showUsers = document.querySelector("#showUsers");

  //Contar generos
  countM = document.querySelector("#countM");
  countF = document.querySelector("#countF");

  //Soma idades
  countAge = document.querySelector("#countAge");

  //Média idades
  avrAge = document.querySelector("#avrAge");

  //Caixa de texto para pesquisa
  inputUser = document.querySelector("#inputUser");

  //Botão search
  submitSearch = document.querySelector("#submitSearch");

  inputUser.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      searchByName();
    }
  });
};

//Fazendo requisição HTTP e busca na API
async function fetchUsers() {
  const res = await fetch(
    "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
  );
  const json = await res.json();
  //Função map para filtrar apenas os dados que quero
  let allUser = json.results.map((user) => {
    const { name, gender, dob, picture } = user; //Object destructuring

    return {
      name: `${name.first} ${name.last}`,
      gender,
      age: dob.age,
      picture: picture.thumbnail,
    };
  });
  filtredUser = allUser;
  render(); // Porque eu tenho que chamar??
  //console.log(filtredUser)
}

function render() {
  //Escrever os dados na tela
}

//Busca usuarios pelo nome
const searchByName = () => {
  let filtered = filtredUser.filter((user) => {
    let userContains = user.name.toLowerCase().includes(inputUser.value.toLowerCase());
    return userContains;
  });
  userInfo(filtered);
  //statsInfo(filtered) //apagar ????
  sumStats(filtered)
  console.log(filtered);
};

//Tamanho do array com todos os usuarios e mostrar user na div
function userInfo(users) {
  const userTotal = users.length;
  countUser.innerHTML = userTotal;
  const items = users.map((user) => {
    return `<li>${user.name}</li>`;
  });
  showUsers.innerHTML = `<ul>${items.join(" ")}</ul>`;
}

//Estatisticas
 

//Soma idades
function sumStats(user) {
    const sum = user.reduce((acc, curr) => {
        return acc + curr.age
    }, 0)
    sumAge.innerHTML = `<ul>${sum}</ul>`;
    avgStats(sum, user)
}

//Cálculo média
function avgStats(sum, userArray) {
    const avg = ((sum)/userArray.length)
    //console.log(avg)
    avgAge.innerHTML = `<ul>${avg.toFixed(2)}</ul>`;
}

// Male
//     function showMale() {
//         let userMale = []
//         for (user of filtredUser) {
//             if (user.gender === "male")
//                 countM.innerHTML = userMale.length
//         }
//         return userMale
// }
