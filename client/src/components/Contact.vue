<template>
  <div class="contact">
    <h2>{{contact.name}}</h2>
    <p>тел: {{contact.phone}}</p>
    <button class="edit" @click="choose(contact.id)"></button>
    <button class="delete" @click.stop="deleteContact(contact.id)"></button>
  </div>
</template>

<script>
export default {
  name: "Contact",
  props: {
    contact: Object
  },
  data() {
    return {};
  },
  methods: {
    choose(id) {
      this.$emit("choose", { id });
    },
    deleteContact(id) {
      this.$emit("delete", { id });
    }
  }
};
</script>

<style lang="scss">
.contact {
  position: relative;
  background: aqua;
  padding: 10px;
  border-radius: 5px;
  h2 {
    margin: 0;
  }
  button{
    width: 30px;
    height: 30px;
    position: absolute;
    bottom: -15px;
    border: none;
    padding: 5px;
    border-radius: 50%;
  }
  .edit {
    right: 50px;
    background: center / 50% no-repeat url("../assets/pencel.png");
    background-color: lightgreen;

    &:hover {
      background-color: greenyellow;
    }

    &:focus {
      outline: none;
    }
  }
  .delete {
    right: 10px;
    background: center / 50% no-repeat url("../assets/gabage.png");
    background-color: coral;

    &:hover {
      background-color: crimson;
    }

    &:focus {
      outline: none;
    }
  }
}
</style>