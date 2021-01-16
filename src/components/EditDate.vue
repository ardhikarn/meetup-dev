<template>
  <v-dialog v-model="dialog" width="400" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="white" v-bind="attrs" v-on="on" text>
        <v-icon small left>mdi-pencil</v-icon> Edit Date
      </v-btn>
    </template>
    <v-card>
      <v-container>
        <v-card-title class="headline primary white--text">
          Edit Date
        </v-card-title>
        <v-card-text class="mt-3 text-center">
          <v-row justify="center">
            <v-col cols="12">
              <v-date-picker v-model="editDate" elevation="10"> </v-date-picker>
            </v-col>
            <v-col cols="12">
              <v-time-picker
                v-model="editTime"
                format="24hr"
                elevation="10"
              ></v-time-picker>
            </v-col>
          </v-row>
          <v-divider class="mt-12"></v-divider>
          <v-card-actions>
            <v-btn color="primary" text @click="onSave">
              Save
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text @click="dialog = false">
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'EditDate',
  props: ['meetup'],
  data() {
    return {
      dialog: false,
      editDate: null,
      editTime: null
    }
  },
  methods: {
    onSave() {
      const newDate = new Date(this.meetup.date)
      const newDay = new Date(this.editDate).getUTCDate()
      const newMonth = new Date(this.editDate).getUTCMonth()
      const newYear = new Date(this.editDate).getUTCFullYear()
      newDate.setUTCDate(newDay)
      newDate.setUTCMonth(newMonth)
      newDate.setUTCFullYear(newYear)

      // if TIME Changed
      if (this.editTime !== this.meetup.date) {
        const hours = this.editTime.match(/^(\d+)/)[1]
        const minutes = this.editTime.match(/:(\d+)/)[1]
        newDate.setHours(hours)
        newDate.setMinutes(minutes)
        const dataDate = {
          id: this.meetup.id,
          date: newDate
        }
        this.$store.dispatch('updateMeetup', dataDate)
        return (this.dialog = false)
      }

      const dataDate = {
        id: this.meetup.id,
        date: newDate
      }
      this.$store.dispatch('updateMeetup', dataDate)
      this.dialog = false
    }
  },
  created() {
    this.editDate = new Date(this.meetup.date).toISOString().substr(0, 10)
    this.editTime = new Date(this.meetup.date)
  }
}
</script>
