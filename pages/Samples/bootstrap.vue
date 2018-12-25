<template>
  <BContainer>
    <!-- User Interface controls -->
    <BRow>
      <BCol md="6"
class="my-1">
        <BFormGroup horizontal label="Filter" class="mb-0">
          <BInputGroup>
            <BFormInput
v-model="filter" placeholder="Type to Search"
/>
            <BInputGroupAppend>
              <BBtn :disabled="!filter"
@click="filter = ''"
>
Clear
</BBtn>
            </BInputGroupAppend>
          </BInputGroup>
        </BFormGroup>
      </BCol>
      <BCol md="6"
class="my-1">
        <BFormGroup horizontal label="Sort" class="mb-0">
          <BInputGroup>
            <BFormSelect v-model="sortBy"
:options="sortOptions">
              <option
slot="first" :value="null"> -- none -- </option>
            </BFormSelect>
            <BFormSelect v-model="sortDesc" :disabled="!sortBy" slot="append">
              <option :value="false"> Asc </option>
              <option :value="true"> Desc </option>
            </BFormSelect>
          </BInputGroup>
        </BFormGroup>
      </BCol>
      <BCol md="6"
class="my-1">
        <BFormGroup horizontal label="Sort direction" class="mb-0">
          <BInputGroup>
            <BFormSelect slot="append" v-model="sortDirection">
              <option value="asc"> Asc </option>
              <option value="desc"> Desc </option>
              <option value="last"> Last </option>
            </BFormSelect>
          </BInputGroup>
        </BFormGroup>
      </BCol>
      <BCol md="6"
class="my-1">
        <BFormGroup horizontal label="Per page" class="mb-0">
          <BFormSelect
v-model="perPage" :options="pageOptions"
/>
        </BFormGroup>
      </BCol>
    </BRow>

    <!-- Main table element -->
    <BTable
      show-empty
      stacked="md"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
    >
      <template
slot="name" slot-scope="row"
>
        {{ row.value.first }} {{ row.value.last }}
      </template>
      <template
slot="isActive" slot-scope="row"
>
        {{ row.value ? 'Yes :)' : 'No :(' }}
      </template>
      <template
slot="actions" slot-scope="row"
>
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <BButton
          size="sm"
          class="mr-1"
          @click.stop="info(row.item, row.index, $event.target)"
        >
          Info modal
        </BButton>
        <BButton size="sm"
@click.stop="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </BButton>
      </template>
      <template
slot="row-details" slot-scope="row"
>
        <BCard>
          <ul>
            <li v-for="(value, key) in row.item"
:key="key">
              {{ key }}: {{ value }}
            </li>
          </ul>
        </BCard>
      </template>
    </BTable>

    <BRow>
      <BCol md="6"
class="my-1">
        <BPagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          class="my-0"
        />
      </BCol>
    </BRow>

    <!-- Info modal -->
    <BModal
id="modalInfo" @hide="resetModal"
:title="modalInfo.title" ok-only
>
      <pre>{{ modalInfo.content }}</pre>
    </BModal>
  </BContainer>
</template>

<script>
const items = [
  { isActive: true, age: 40, name: { first: 'Dickerson', last: 'Macdonald' } },
  { isActive: false, age: 21, name: { first: 'Larsen', last: 'Shaw' } },
  {
    isActive: false,
    age: 9,
    name: { first: 'Mini', last: 'Navarro' },
    _rowVariant: 'success'
  },
  { isActive: false, age: 89, name: { first: 'Geneva', last: 'Wilson' } },
  { isActive: true, age: 38, name: { first: 'Jami', last: 'Carney' } },
  { isActive: false, age: 27, name: { first: 'Essie', last: 'Dunlap' } },
  { isActive: true, age: 40, name: { first: 'Thor', last: 'Macdonald' } },
  {
    isActive: true,
    age: 87,
    name: { first: 'Larsen', last: 'Shaw' },
    _cellVariants: { age: 'danger', isActive: 'warning' }
  },
  { isActive: false, age: 26, name: { first: 'Mitzi', last: 'Navarro' } },
  { isActive: false, age: 22, name: { first: 'Genevieve', last: 'Wilson' } },
  { isActive: true, age: 38, name: { first: 'John', last: 'Carney' } },
  { isActive: false, age: 29, name: { first: 'Dick', last: 'Dunlap' } }
]

export default {
  data() {
    return {
      items: items,
      fields: [
        {
          key: 'name',
          label: 'Person Full name',
          sortable: true,
          sortDirection: 'desc'
        },
        {
          key: 'age',
          label: 'Person age',
          sortable: true,
          class: 'text-center'
        },
        { key: 'isActive', label: 'is Active' },
        { key: 'actions', label: 'Actions' }
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: items.length,
      pageOptions: [5, 10, 15],
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      modalInfo: { title: '', content: '' }
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    }
  },
  methods: {
    info(item, index, button) {
      this.modalInfo.title = `Row #${index + 1}`
      this.modalInfo.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
    },
    resetModal() {
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>

<!-- table-complete-1.vue -->
