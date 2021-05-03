import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import GPDHome from '../views/GPDHome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: GPDHome
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/gpd-home',
    name: 'GPD Home',
    component: () =>
      import(/* webpackChunkName: "gpdhome" */ '../views/GPDHome.vue')
  },
  {
    path: '/student-home',
    name: 'Student Home',
    component: () =>
      import(/* webpackChunkName: "studenthome" */ '../views/StudentHome.vue')
  },
  {
    path: '/add-student',
    name: 'Add Student',
    component: () =>
      import(/* webpackChunkName: "addstudent" */ '../views/AddStudent.vue')
  },
  {
    path: '/add-course',
    name: 'Add Course',
    component: () =>
      import(/* webpackChunkName: "addcourse" */ '../views/AddCourse.vue')
  },
  {
    path: '/browse-search-student',
    name: 'Browse/Search Student',
    component: () =>
      import(
        /* webpackChunkName: "browsesearch" */ '../views/BrowseSearchStudent.vue'
      )
  },
  {
    path: '/enrollment-trend',
    name: 'Enrollment Trend',
    component: () =>
      import(
        /* webpackChunkName: "enrollmenttrend" */ '../views/EnrollmentTrend.vue'
      )
  },
  {
    path: '/view-edit-gpd/:studentID',
    name: 'View/Edit (GPD)',
    component: () =>
      import(/* webpackChunkName: "view-edit-gpd" */ '../views/ViewEditGPD.vue')
  },
  {
    path: '/view-edit-student/:studentID',
    name: 'View/Edit (Student)',
    component: () =>
      import(
        /* webpackChunkName: "view-edit-student" */ '../views/ViewEditStudent.vue'
      )
  },
  {
    path: '/import-files',
    name: 'Import Files',
    component: () =>
      import(/* webpackChunkName: "import-files" */ '../views/ImportFiles.vue')
  },
  {
    path: '/suggest-course-plan/:studentID',
    name: 'Suggest Course Plan',
    component: () =>
      import(
        /* webpackChunkName: "suggest-course-plan" */ '../views/SuggestCoursePlan.vue'
      )
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
