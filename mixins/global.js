export default {
    name: 'GlobalMixin',
    computed: {
        isMobile() {
            return this.$vuetify.breakpoint.mobile;
        }
    }
}