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
    <b-container>
      <div
        v-for="(answer, index) in pollAnswers"
        :key="index"
      >
        <b-row>
          <b-col>
            <b-form-group>
            <b-form-radio
              disabled
            />
            </b-form-group>
          </b-col>
          <b-col cols="8">
            <b-form-input
              v-bind:value="pollAnswers[index].answer"
              v-on:input="pollAnswers[index].answer = $event"
              :maxlength="maxPollAnswerLength"
            >
            </b-form-input>
          </b-col>
          <b-col>
            <b-button
              variant="danger"
              @click="removeAnswer(index)"
            >
              <font-awesome-icon icon="minus"/>
            </b-button>
          </b-col>
        </b-row>
      </div>
    </b-container>
    <br>
    <b-button
        variant="primary"
        class="pollAddButton"
        @click="addAnswer()"
    >
    <font-awesome-icon icon="plus"/>
    </b-button>
    <hr>
    <VueCtkDateTimePicker
      id="DatePicker"
      class="datePicker"
      format="DD-MM-YYYY"
      formatted="ll"
      onlyDate v-model="date"
      color="#F9A618"
      :label="$t('editor.datePicker.dueDate')"
      :buttonNowTranslation="$t('editor.datePicker.currentDate')"
      :locale="$t('editor.datePicker.language')"
    >
    </VueCtkDateTimePicker>
    <br>
    <b-button
      variant="secondary"
      class="postButton"
      @click="createPoll()"
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
      pollAnswers: [
        { answer: 'Answer A' },
        { answer: '' }
      ],
      allowMultipleVotes: false,
      maxPollTitleLength: 50,
      maxPollAnswerLength: 30,
      pollContent: ''
    }
  },
  methods: {
    addAnswer () {
      this.pollAnswers.push({ answer: '' })
    },
    removeAnswer (index) {
      this.pollAnswers.splice(index, 1)
    },
    createPoll () {
      // pollTitle can't include question marks
      this.pollContent = '<div class="container">'
      var index = 0
      this.pollAnswers.forEach(pollAnswer => {
        const answer = pollAnswer.answer
        if (answer !== '') {
          this.pollContent += '<div class="row justify-content-center"><div class="align-self-center"><input type="radio" id=' + '"' +
          index + '"></div><div class="col-sm-auto"><b>' + answer + '</b></div></div>'
        }
        index++
      })
      this.pollContent += '</div>'
      this.$emit('create-poll', this.pollTitle, this.pollContent)
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

  .pollAddButton {
    width: 45%;
  }

  .postButton {
    width: auto;
  }

  .datePicker {
    width: 300px;
    z-index: 10003;
  }
</style>
