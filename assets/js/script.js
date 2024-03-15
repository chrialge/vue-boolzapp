const { createApp } = Vue

createApp({
    data() {
        return {
            searchContact: "",
            time: 0,
            newMessage: "",
            contactNumber: 0,
            contacts: [
                {
                    name: "Michele",
                    avatar: "/img/avatar_1.jpg",
                    visible: true,
                    messages: [
                        {
                            date: "10/01/2020 15:30:55",
                            message: "Hai portato a spasso il cane?",
                            status: "sent",
                        },
                        {
                            date: "10/01/2020 15:50:00",
                            message: "Ricordati di stendere i panni",
                            status: "sent",
                        },
                        {
                            date: "10/01/2020 16:15:22",
                            message: "Tutto fatto!",
                            status: "received",
                        },
                    ],
                },
                {
                    name: "Fabio",
                    avatar: "/img/avatar_2.jpg",
                    visible: true,
                    messages: [
                        {
                            date: "20/03/2020 16:30:00",
                            message: "Ciao come stai?",
                            status: "sent",
                        },
                        {
                            date: "20/03/2020 16:30:55",
                            message: "Bene grazie! Stasera ci vediamo?",
                            status: "received",
                        },
                        {
                            date: "20/03/2020 16:35:00",
                            message:
                                "Mi piacerebbe ma devo andare a fare la spesa.",
                            status: "sent",
                        },
                    ],
                },
                {
                    name: "Samuele",
                    avatar: "/img/avatar_3.jpg",
                    visible: true,
                    messages: [
                        {
                            date: "28/03/2020 10:10:40",
                            message: "La Marianna va in campagna",
                            status: "received",
                        },
                        {
                            date: "28/03/2020 10:20:10",
                            message: "Sicuro di non aver sbagliato chat?",
                            status: "sent",
                        },
                        {
                            date: "28/03/2020 16:15:22",
                            message: "Ah scusa!",
                            status: "received",
                        },
                    ],
                },
                {
                    name: "Alessandro B.",
                    avatar: "/img/avatar_4.jpg",
                    visible: true,
                    messages: [
                        {
                            date: "10/01/2020 15:30:55",
                            message: "Lo sai che ha aperto una nuova pizzeria?",
                            status: "sent",
                        },
                        {
                            date: "10/01/2020 15:50:00",
                            message: "Si, ma preferirei andare al cinema",
                            status: "received",
                        },
                    ],
                },
                {
                    name: "Alessandro L.",
                    avatar: "/img/avatar_5.jpg",
                    visible: true,
                    messages: [
                        {
                            date: "10/01/2020 15:30:55",
                            message: "Ricordati di chiamare la nonna",
                            status: "sent",
                        },
                        {
                            date: "10/01/2020 15:50:00",
                            message: "Va bene, stasera la sento",
                            status: "received",
                        },
                    ],
                },
                {
                    name: "Claudia",
                    avatar: "/img/avatar_6.jpg",
                    visible: true,
                    messages: [
                        {
                            date: "10/01/2020 15:30:55",
                            message: "Ciao Claudia, hai novità?",
                            status: "sent",
                        },
                        {
                            date: "10/01/2020 15:50:00",
                            message: "Non ancora",
                            status: "received",
                        },
                        {
                            date: "10/01/2020 15:51:00",
                            message: "Nessuna nuova, buona nuova",
                            status: "sent",
                        },
                    ],
                },
            ],
        };
    },
    methods: {
        /**
         * funzione che prende al click l'index
         * @param {number} contactId l'index del contatto selezionato
         */
        conversation(contactId) {
            console.log(this.contacts[contactId]);
            this.contactNumber = contactId;
            console.log(this.contactNumber);
        },

        /**
         * funzione che aggiunge un messaggio
         * @param {number} index del contatto
         */
        addMessage(index) {
            console.log(index);
            const message = this.newMessage;
            const status = "sent";
            this.generateMessage(message, index, status);
            this.startTimeMessageRespond(message, index, status);

            this.newMessage = "";
        },

        /**
         * funzione che genera il messaggio
         * @param {string} message il messaggio che deve essere inserito
         * @param {number} index del contatto
         * @param {string} status se e un messaggio inviato o mandato
         */
        generateMessage(message, index, status) {
            // variabili per ottenere la data odierna
            const data = new Date();
            let gg, mm, aaaa;
            gg = data.getDate() + "/";
            mm = data.getMonth() + 1 + "/";
            aaaa = data.getFullYear();
            const date = gg + mm + aaaa;

            // variabili per ottenere l orario odierna
            let Hh, Mm, Ss;
            Hh = data.getHours() + ":";
            Mm = data.getMinutes() + ":";
            Ss = data.getSeconds();
            const time = Hh + Mm + Ss;
            console.log(message, date, time);

            this.contacts[index].messages.push({
                date: date + " " + time,
                message: message,
                status: status,
            });
            console.log(this.contacts[index].messages);
        },

        /**
         * funzione che parte dopo un secondo che genera il messaggio di risposta
         * @param {string} message recupero il messaggio che poi cambiera
         * @param {number} index recupero per selezionare il giusto contatto
         * @param {string} status recupero lo status che poi cambiera
         */
        startTimeMessageRespond(message, index, status) {
            this.time = setInterval(() => {
                this.messageRespond(message, index, status);
            }, 1000);
        },

        /**
         * funzione che stoppa il messaggio di risposta se no li genera all'infinito
         */
        stopTimeMessageRespond() {
            clearInterval(this.time);
        },

        /**
         * funzione per il messaggio di risposta
         * @param {string} message messaggio cambiera in ok
         * @param {number} index mi serve per selezionare il giusto contatto
         * @param {string} status status cambiera in 'received'
         */
        messageRespond(message, index, status) {
            message = "ok";
            status = "received";
            this.generateMessage(message, index, status);
            console.log(this.time);
            if (this.time >= 4) {
                this.stopTimeMessageRespond();
            }
        },
        /**
         * FUNZIONE CHE CERCA I POSSIBILI CONTATTI MENTRE GLI ALTRI CAMBIA IL VISIBLE 
         */
        contactsSearch() {
            //CONSOLE.LOG PER LEGGERE IL VALORE DEL INPUT
            console.log(this.searchContact);
            // se la lunghezza della parola maggiore di 1
            if (this.searchContact.length > 1) {
                // prova se va
                console.log("ciao");
                
                /**
                 * //funzione che mi restituisce in questo caso solo gli oggetti che assomigliano  al   valore del input
                 * @param {array} arr contacts
                 * @param {*} query il valore di input
                 * @returns gli oggetti che assomigliano al valore dell'input
                 */
                function filterItems(arr, query) {
                    return arr.filter((el) =>
                        el.name.toLowerCase().includes(query.toLowerCase())
                    );
                }

                //costante di array dove racchiudere la funzione con i prametri -contatti -valoreinput
                const contactsArray = filterItems(
                    this.contacts,
                    this.searchContact
                );
                //prende tutti gli oggetti dentro all'array dei contatti che si assomiglia e li cambia visible
                contactsArray.forEach((element) => (element.visible = false));

                // stampare in console per vedere cosa ce dentro
                console.log(contactsArray);

                // PROVA
                console.log(this.contacts.includes(this.searchContact));

            }
        },

        /**
         * funzione che assegna l'ora giusta dei messaggi
         * @param {number} index l'indice del messaggio
         * @param {number} contactid l'indice del contatto
         * @returns hours example "16:30"
         */
        dataMessage(index, contactid) {
            let timeMessage = this.contacts[contactid].messages[index].date;

            timeMessage = timeMessage.split(" ");

            timeMessage = timeMessage[1];

            timeMessage = timeMessage.split(":");

            timeMessage = timeMessage[0] + ":" + timeMessage[1];
            return timeMessage;
        },
    },
    mounted() {
        this.contactsSearch();
    },
}).mount("#container");