import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js";

Ui

Details

export class Home {
    constructor(){   
        document.querySelectorAll(".nav-link").forEach((link)=>{
            link.addEventListener("click",()=>{
                this.getActive(link);
                const category = link.getAttribute('data-category')
                this.getGames(category);        
            });
   
        });
        this.details = document.getElementById('details')
        this.games = document.getElementById('games')
        this.ui = new Ui();
        this.getGames('MMORPG');
    };
    

    async getActive(link){
        document.querySelector(".navbar-nav .active").classList.remove("active")
        link.classList.add("active")     
    }

    async getGames(category){
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'af5b79a18fmsh93143c8e17d058ap12de88jsn9c0013fc9202',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
        const response = await api.json();
       console.log(response);
       this.ui.displayDataGame(response);

       document.querySelectorAll(".card").forEach((card)=>{
        card.addEventListener("click", ()=>{
            this.details.classList.remove('d-none')
            this.games.classList.add('d-none')
            new Details(card.dataset.id);

        })
       })

    }
}


