<template>
  <div class="container" @mousedown.self="closeWindow">
    <form @submit.prevent="editContact">
      <label>Имя</label>
      <input type="text" v-model="contact.name" />

      <label>Номер</label>
      <input type="tel" v-model="contact.phone" />

      <button type="submit">
        {{newContact ? "Добавить пользователя"
        : "Изменить данные"}}
      </button>
      <button class="close" @click.prevent="closeWindow">x</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "EditContact",
  props: {
    contact: Object
  },
  data() {
    return {
      newContact: !this.contact.name
    };
  },
  methods: {
    closeWindow() {
      this.$emit("close", {});
    },
    editContact() {
      if (this.contact.name !== "" && this.contact.phone !== "") {
        let send = {
          id: this.contact.id,
          name: this.contact.name,
          phone: this.contact.phone
        };
        fetch("http://localhost:4000/api/contact", {
          method: this.newContact ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(send)
        }).then(() => {
          this.$emit("update", {});
          this.closeWindow();
        });
      }
    }
  }
};
</script>
<style lang="scss">
.container {
  z-index: 100;
  position: fixed;
  background: rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  form {
    position: relative;
    display: grid;
    grid-template-columns: auto 2fr;
    gap: 5px;
    align-items: center;
    background: white;
    padding: 25px;
    border-radius: 5px;
    label {
      text-align: end;
    }

    button[type="submit"] {
      border: none;
      background: hsl(180, 100%, 50%);
      padding: 10px;
      grid-column: 2 / 3;
      border-radius: 5px;

      &:hover {
        background: hsl(180, 90%, 70%);
      }
      &:active {
        background: hsl(180, 80%, 60%);
      }

      &:focus {
        outline: none;
        background: hsl(180, 90%, 70%);
      }
    }

    .close {
      position: absolute;
      top: 0;
      right: 0;
      border: none;
      background: coral;
      border-bottom-left-radius: 5px;
      border-top-right-radius: 5px;

      &:hover {
        background: crimson;
      }

      &:focus {
        outline: none;
      }
    }
  }
}
</style>