<template>
  <div class="pollEditor">
    <br>
    <h2>{{$t('editor.poll.heading')}}</h2>
    <b-form-input
      class="pollTitle"
      v-bind:value="pollTitle"
      v-on:input="pollTitle = $event"
      :maxlength="maxPollTitleLength"
    />
    <br>
    <b-form-group>
         <div class="pollRow">
            <b-form-radio class="pollRadio" disabled />
            <b-form-input
                class="pollAnswer"
                :maxlength="maxPollAnswerLength"
            />
            <b-button
                class="pollRemoveButton"
                @click="removeAnswer()"
                disabled
            >
            <font-awesome-icon icon="minus"/>
            </b-button>
        </div>
        <br>
        <b-button
            class="pollAddButton"
            @click="addAnswer()"
        >
        <font-awesome-icon icon="plus"/>
        </b-button>
    </b-form-group>
    <hr>
    <VueCtkDateTimePicker
      id="DatePicker"
      class="datePicker"
      format="DD-MM-YYYY"
      formatted="ll"
      onlyDate v-model="date"
      label="Select due date"
      color="#F9A618"
    >
    </VueCtkDateTimePicker>
    <br><br>
    <b-button
      class="postButton"
      @click="$emit('create-note', pollTitle, pollContent)"
    >
      {{$t('editor.poll.post')}}
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'PollEditor',
  data () {
    return {
      date: null,
      pollTitle: this.$t('editor.poll.title'),
      maxPollTitleLength: 50,
      maxPollAnswerLength: 30,
      pollContent: '<poll></poll>'
    }
  },
  methods: {
    addAnswer () {
      //
    },
    removeAnswer () {
      //
    }
  }
}
</script>

<style scoped>
  .pollTitle {
    width: 90%;
    margin-right: auto;
    margin-left: auto;
  }

  .pollRow {
    width: 90%;
    margin-right: auto;
    margin-left: auto;
  }

  .pollRadio {
    width: 10%;
  }

  .pollAnswer {
    width: 80%;
  }

  .pollRemoveButton {
    width: 10%;
  }

  .pollAddButton {
    width: auto;
  }

  .postButton {
    width: auto;
  }

  .datePicker {
    width: 300px;
    z-index: 10003;
  }
</style>
