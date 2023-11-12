let Homepage;
const theme = "theme2";
if (theme === "theme1") {
    Homepage = import('./views/theme1/Homepage.vue');
} else if(theme === "theme2") {
    Homepage = import('./views/theme2/Homepage.vue');
}
export default Homepage;
