<!--
Parent of VersionsModal.vue. Opens a modal of user version selections.

- Opens a modal passing versions list to modal and env (development or production)
- Receives emit message from child component to close modal (@clicked="onChildClick")
-->

<template>
  <span v-bind:style="{ display: showMenu }">
    <button class="version-btn" @click="openModal">
      {{ versionDisplay }}
    </button>
    <VersionsModal
      class="version-modal"
      v-if="showModal"
      :showModal="showModal"
      @clicked="onChildClick"
      :env="environment"
      :versions="workingVersion"
    />
  </span>
</template>

<script>
import { env, versions, versionsOis } from '../config.js';
import VersionsModal from './VersionsModal';

export default {
  name: 'versions',
  components: {
    VersionsModal,
  },
  data: () => ({
    environment: env,
    showModal: false,
    versions: versions,
    versionsOis: versionsOis,
    workingVersion: null,
    showMenu: 'none',
    versionDisplay: '',
  }),
  methods: {
    openModal() {
      this.showModal = !this.showModal;
    },
    onChildClick() {
      // The modal will send a msg to close when user clicks outside the modal
      this.showModal = false;
    },
    setVersionMenu() {
      if (
        this.$route.path.indexOf('/airnode/v') > -1 ||
        this.$route.path.indexOf('/airnode/pre-alpha') > -1
      ) {
        this.versionDisplay = this.$page.path.split('/')[2].replace(/\//g, '');
        this.workingVersion = this.versions;
        this.showMenu = 'block';
      } else if (this.$route.path.indexOf('/ois/v') > -1) {
        this.versionDisplay = this.$page.path.split('/')[2].replace(/\//g, '');
        this.workingVersion = this.versionsOis;
        this.showMenu = 'block';
      } else {
        this.showMenu = 'none';
      }
    },
  },
  watch: {
    $route($event) {
      this.setVersionMenu();
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.setVersionMenu();
    });
  },
};
</script>

<style scoped>
button.version-btn {
  outline: none;
  color: #7ce3cb;
  background-color: black;
  border: solid 0px black;
  font-weight: bold;
  font-size: medium;
  margin-right: 25px;
  cursor: pointer;
}
</style>

<style lang="stylus">

@media (max-width: $MQMobile)
  .version-modal
    margin-left -45px
</style>
