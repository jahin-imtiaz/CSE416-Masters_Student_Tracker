<template>
  <div class="gpd-home">

    <b-container fluid="sm">
      <b-row>
        <b-col cols="6">

          <b-button-group>
            <b-button type="button" class="btn btn-default">Button 1</b-button>
            <b-button type="button" class="btn btn-default">Button 2</b-button>
            <b-button type="button" class="btn btn-default">Button 3</b-button>
          </b-button-group>

          <b-button-group>
            <b-button type="button" class="btn btn-default">Button 4</b-button>
            <b-button type="button" class="btn btn-default">Button 5</b-button>
            <b-button type="button" class="btn btn-default">Button 6</b-button>
          </b-button-group>

          <b-button-group>
            <b-button type="button" class="btn btn-default">Button 7</b-button>
            <b-button type="button" class="btn btn-default">Button 8</b-button>
            <b-button type="button" class="btn btn-default">Button 9</b-button>
          </b-button-group>

        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'GPDHome',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
