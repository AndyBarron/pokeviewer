const APP_TITLE = 'PokéViewer';

export default {
  methods: {
    updatePageTitle (newTitle) {
      if (newTitle) {
        document.title = `${newTitle} | ${APP_TITLE}`;
      } else {
        document.title = APP_TITLE;
      }
    },
  },
  watch: {
    title: function(newTitle) {
      this.updatePageTitle(newTitle);
    }
  },
  mounted () {
    this.updatePageTitle(this.title);
  },
};
