<template>
  <v-dialog v-model="dialog" width="500" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" v-bind="attrs" v-on="on" text>
        <v-icon small left>mdi-pencil</v-icon> Edit Meetup
      </v-btn>
    </template>
    <v-card>
      <v-container>
        <v-card-title class="headline primary white--text">
          Edit Meetup
        </v-card-title>
        <v-card-text class="mt-3">
          <v-text-field
            v-model="editTitle"
            name="title"
            label="Title"
            id="title"
            :rules="[v => !!v || 'This field is required']"
          ></v-text-field>
          <v-text-field
            v-model="editLocation"
            name="location"
            label="Location"
            id="location"
            :rules="[v => !!v || 'This field is required']"
          ></v-text-field>
          <v-textarea
            v-model="editDescription"
            name="description"
            label="Description"
            id="description"
            :rules="[v => !!v || 'This field is required']"
          ></v-textarea>
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
  name: 'EditDialog',
  props: ['meetup'],
  data() {
    return {
      dialog: false,
      editTitle: this.meetup.title,
      editLocation: this.meetup.location,
      editDescription: this.meetup.description
    }
  },
  methods: {
    onSave() {
      if (
        this.editTitle.trim() === '' ||
        this.editLocation.trim() === '' ||
        this.editDescription.trim === ''
      ) {
        return
      }
      const editMeetup = {
        id: this.meetup.id,
        title: this.editTitle,
        location: this.editLocation,
        description: this.editDescription
      }
      this.$store.dispatch('updateMeetup', editMeetup)
      this.dialog = false
    }
  }
}
</script>
