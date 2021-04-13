<template>
  <div class="browse-search-student">
    <NavBar />
    <br />
    <br />
    <h2>Browse/Search Student</h2>
    <br />
    <br />
    <b-container class="bv-example-row">
          <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Sort"
          label-for="sort-by-select"
          label-cols-sm="2"
          label-align-sm="right"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-input-group size="sm">
            <b-form-select
              id="sort-by-select"
              v-model="sortBy"
              :options="sortOptions"
              :aria-describedby="ariaDescribedby"
              class="w-75"
            >
              <template #first>
                <option value="">-- none --</option>
              </template>
            </b-form-select>

            <b-form-select
              v-model="sortDesc"
              :disabled="!sortBy"
              :aria-describedby="ariaDescribedby"
              size="sm"
              class="w-25"
            >
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="2"
          label-align-sm="right"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          v-model="sortDirection"
          label="Filter On"
          label-cols-sm="2"
          label-align-sm="right"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-form-checkbox-group
            v-model="filterOn"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          >
            <b-form-checkbox value="name">Name</b-form-checkbox>
            <b-form-checkbox value="graduation_semester">Graduation Semester</b-form-checkbox>
            <b-form-checkbox value="course_plan_status">Course Plan Validity</b-form-checkbox>
            <b-form-checkbox value="number_of_degree_requirements">Course Plan Completeness</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>

      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="Per page"
          label-for="per-page-select"
          label-cols-sm="2"
          label-align-sm="right"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
    <br />
    <div>
      <b-table striped hover
        :items="Students"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filter-included-fields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        stacked="md"
        show-empty
        small
        @filtered="onFiltered"
      >
        <template #cell(view_edit)="row">
          <b-button class="btn" @click="$router.push('/view-edit-gpd/' + row.item.student_ID)">
            View/Edit
          </b-button>
        </template>
        
      </b-table>
    </div>
    </b-container>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import axios from 'axios'

const { VUE_APP_BACKEND_API } = process.env

export default {
  name: 'BrowseSearchStudent',
  data() {
    return {
      Students: [],
      fields: [
          {
            key: 'student_ID',
            'label': 'Student ID',
            sortable: true,
          },
          {
            key: 'name',
            label: 'Full Name',
            sortable: true,
          },          
          {
            key: 'graduation_semester',
            label: 'Graduation Semester',
            sortable: true,
          },
          {
            key: 'number_of_semesters',
            label: 'Number of Semesters',
            sortable: true,
          },          
          {
            key: 'course_plan_status',
            label: 'Course Plan Status',
            sortable: false,
          },
          {
            key: 'number_of_degree_requirements',
            label: 'Number of Degree Requirements',
            sortable: false,
          },          
          {
            key: 'view_edit',
            label: '        ',
            sortable: false,
          }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show All" }],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
    }
  },
  computed: {
    sortOptions() {
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    }
  },
  methods: {
    getStudent() {
      axios
        .get(`${VUE_APP_BACKEND_API}/students`)
        .then((res) => {
          console.log('RETRIEVE STUDENTS', res.data)
          res.data.forEach(item => {
            this.Students.push({
              student_ID: item._id.sbu_id,
              name: item.firstName + " " + item.lastName,
              graduation_semester: item.graduationSem + " " + item.graduationYear,
              number_of_semesters: this.getSemesters(item.entrySem, item.entryYear, item.graduationYear),
              course_plan_status: "Incomplete",
              number_of_degree_requirements: "5 satisfied, 3 pending, 2 unsatisfied"
            })
          })
          this.totalRows = this.Students.length
        })
        .catch((err) => {
          console.log('RETRIEVE STUDENTS FAILED', err)
        })
    },
      onFiltered(filteredItems) {
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      getSemesters(entrySem, entryYear, graduationYear) {
        if (graduationYear < '2021') {
          return 'Graduated'
        }
        else {
          return 2*(2021 - entryYear) + (entrySem == 'Fall' ? 0 : 1)
        }
      }
  },
  mounted() {
    this.getStudent()
  },
  components: {
    NavBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  font-weight: bold;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.radioLeft {
    text-align:left;
}
.btn {
  padding: 5px 15px;
  border-radius: 10px;
  background-color: #a30e0e;
  float: right;
  color: white;
}
.btn:hover {
  background-color: #800000;
}
.tdbg {
  background-color: #a30e0e !important;
}
</style>
