<template>
<div>

  <p class="font-weight-thin mb-0 mt-6">Despesas por subcategorias</p>
    <v-col cols="6">
         <v-sheet
        :class="radius"
        :max-width="maxWidth"
        class="mx-auto "
        elevation="2"
        width="100%"
        rounded="xl"
        color="white"
      >
      <div class="px-5">
        <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Name
            </th>
            <th class="text-left">
              Calories
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in desserts"
            :key="item.name"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.calories }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
      </div>
      </v-sheet>

    </v-col>
</div>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            value: 'name',
            groupable: false,
          },
          { text: 'Category', value: 'category', align: 'right' },
          { text: 'Dairy', value: 'dairy', align: 'right' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            category: 'Ice cream',
            dairy: 'Yes',
          },
          {
            name: 'Ice cream sandwich',
            category: 'Ice cream',
            dairy: 'Yes',
          },
          {
            name: 'Eclair',
            category: 'Cookie',
            dairy: 'Yes',
          },
          {
            name: 'Cupcake',
            category: 'Pastry',
            dairy: 'Yes',
          },
          {
            name: 'Gingerbread',
            category: 'Cookie',
            dairy: 'No',
          },
          {
            name: 'Jelly bean',
            category: 'Candy',
            dairy: 'No',
          },
          {
            name: 'Lollipop',
            category: 'Candy',
            dairy: 'No',
          },
          {
            name: 'Honeycomb',
            category: 'Toffee',
            dairy: 'No',
          },
          {
            name: 'Donut',
            category: 'Pastry',
            dairy: 'Yes',
          },
          {
            name: 'KitKat',
            category: 'Candy',
            dairy: 'Yes',
          },
        ],
      }
    },
  }
</script>

