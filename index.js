// Henter createApp-funktionen fra Vue-biblioteket
const { createApp } = Vue;

// Opretter en Vue-applikation
createApp({

    data() {
        return {
            // Liste der skal indeholde blomster fra API'et
            flowers: [],

            // Gemmer eventuelle fejl
            error: null,

            // URL til API'et
            baseUrl: "https://localhost:7138/api/flowers",

            // Bruges til inputfeltet i HTML
            newColor: "",
            // Bruges til søgefeltet i HTML
            searchText: ""
        };
    },
    computed: {
    filteredFlowers() {
        return this.flowers.filter(flower =>
            flower.color &&
            flower.color
                .toLowerCase()
                .includes(this.searchText.toLowerCase())
        );
    }
},

    methods: {

        // Henter alle blomster fra API'et
        async getAllFlowers() {
            try {
                // await venter på at Axios får svar fra serveren
                const response = await axios.get(this.baseUrl);

                // response.data er JSON-data fra API'et
                this.flowers = response.data;

                this.error = null;
            }
            catch (error) {
                this.error = error;
                console.log(error);
            }
        },

        sortFlowers() {

         this.flowers.sort((a, b) => a.color.localeCompare(b.color)
    );

},


        // Opretter en ny blomst via API'et
        async createFlower() {
            try {
                const flowerData = {
                    color: this.newColor
                };

                // Sender HTTP POST request med JSON-data
                await axios.post(this.baseUrl, flowerData);

                // Henter listen igen efter oprettelse
                await this.getAllFlowers();

                // Tømmer inputfeltet
                this.newColor = "";

                this.error = null;
            }
            catch (error) {
                this.error = error;
                console.log(error);
            }
        },

        // Sletter en blomst ud fra ID
        async deleteFlower(id) {
            try {
                // Sender HTTP DELETE request
                await axios.delete(`${this.baseUrl}/${id}`);

                // Henter listen igen efter sletning
                await this.getAllFlowers();

                this.error = null;
            }
            catch (error) {
                this.error = error;
                console.log(error);
            }
        },

        // Opdaterer en blomst
        async updateFlower(flower) {
            try {
                // Sender HTTP PUT request med den opdaterede blomst
                await axios.put(
                    `${this.baseUrl}/${flower.id}`,
                    flower
                );

                // Henter listen igen efter update
                await this.getAllFlowers();

                this.error = null;
            }
            catch (error) {
                this.error = error;
                console.log(error);
            }
        }
    }

// Fortæller Vue at den skal styre elementet med id="app"
}).mount("#app");