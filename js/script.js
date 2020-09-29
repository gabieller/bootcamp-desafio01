//Estado global da aplicação
let inputUser = null
let submitSearch = null

let countM = null
let countF = null
let countAge = null
let avrAge = null

let allUser = []
let filtredUser = []

//Mapear elementos e função start
window.addEventListener('load', ()=> {
    inputUser = document.querySelector("#inputUser")
    submitSearch = document.querySelector("#submitSearch")

    fetchUsers()
})

//Fazendo requisição HTTP
async function fetchUsers() {
    const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo')
    const json = await res.json()
    allUser = json.results.map(user => { //Porque results.map
        const {name, gender, dob, picture} = user //Object destructuring

        return {
            firstName: name.first,
            surnameName: name.last,
            gender,
            age: dob.age,
            picture: picture.thumbnail
        }
    })
    render()
 }

 function render() { //Escrever os dados na tela
     console.log("rendering....")
 }