<template>
  <div id="app">
    <header>
      <input type="text" v-model="filter" />
      <button @click="openEdtiContact">+</button>
    </header>
    <main>
      <contact
        v-for="contact in filteredContacts"
        @choose="chooseContact"
        @delete="deleteContact"
        :key="contact.id"
        :contact="contact"
      />
    </main>
    <edit-contact
      v-if="choosenContact"
      :contact="choosenContact"
      @close="choosenContact = null"
      @update="getContacts"
    />
  </div>
</template>

<script>
import ContactVue from "./components/Contact.vue";
import EditContactVue from "./components/EditContact.vue";
import { v4 as uuid } from "uuid";

export default {
  name: "App",
  components: {
    contact: ContactVue,
    "edit-contact": EditContactVue
  },
  data() {
    return {
      contacts: [],
      filter: "",
      choosenContact: null
    };
  },
  computed: {
    filteredContacts() {
      return this.contacts.filter(contact => contact.name.match(this.filter));
    }
  },
  methods: {
    getContacts() {
      let url = new URL("http://localhost:4000/api/contact");
      fetch(url)
        .then(res => res.json())
        .then(body => {
          this.contacts = body;
        });
    },
    deleteContact(payload) {
      let url = new URL("http://localhost:4000/api/contact");
      fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }).then(() => {
        this.getContacts();
      });
    },
    chooseContact(payload) {
      this.choosenContact = this.contacts.find(
        contact => contact.id == payload.id
      );
    },
    openEdtiContact() {
      this.choosenContact = {
        id: uuid(),
        name: "",
        phone: ""
      };
      console.log(this.choosenContact.id);
    }
  },
  created() {
    this.getContacts();
  }
};
</script>

<style lang="scss">
@font-face {
  font-family: "My Roboto";
  src: url("./assets/Roboto-Regular.ttf");
}
body {
  margin: 0;
  padding: 0;
  font-family: "My Roboto";

  button,
  input {
    font-family: "My Roboto";
    font-size: 16px;
  }
}

header {
  background: coral;
  padding: 10px;
  position: relative;

  button {
    display: block;
    background: aqua;
    border: none;
    border-radius: 50%;
    position: absolute;
    font-size: 20px;
    width: 40px;
    height: 40px;
    bottom: -20px;
    right: 60px;

    &:hover {
      background: hsl(180, 90%, 70%);
    }
    &:active {
      background: hsl(180, 80%, 60%);
    }

    &:focus {
      outline: none;
    }
  }
}
#app {
  main {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    margin: 25px;
  }
}
</style>
