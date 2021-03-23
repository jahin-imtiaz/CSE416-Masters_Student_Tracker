<template>
    <div>
    <b-navbar type="dark" variant="dark">
        <b-navbar-brand>Masters Student Tracking</b-navbar-brand>

        <b-collapse id="nav-collapse" is-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-navbar-nav>
                    <b-nav-item to="/gpd-home">Home</b-nav-item>
                    <b-nav-item to="/login">Logout</b-nav-item>
                </b-navbar-nav>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    </div> 
</template>


<script>
export default {
    name: 'NavBar',
    methods: {
        homeScreen() {
            // depends on type of user logged in
        }
    }
}
</script>

<style scoped>
 .navbar.navbar-dark.bg-dark{
    background-color: #800000!important;
    height: 60px;
 }
 .navbar-brand{
    right: 50px;
 }
 .navbar-dark .navbar-nav .nav-link {
     color: #d3d3d3!important;
 }
.navbar-dark .navbar-nav .nav-link:hover {
     color: #FFFFFF!important;
 }
</style>